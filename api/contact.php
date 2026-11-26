<?php
/**
 * Portfolio contact endpoint — plain PHP 7.4+, no dependencies, no framework.
 *
 * This exact file does two jobs:
 *
 *   1. Runs as a Vercel Serverless Function at /api/contact.php (see vercel.json,
 *      which selects the official PHP community runtime). That is what the
 *      portfolio form posts to in production, so no third-party form service is
 *      involved.
 *   2. Can be uploaded unchanged to any PHP 7.4+ host (cPanel/shared hosting,
 *      Hostinger, ...) if you would rather keep mail on traditional hosting.
 *
 * Delivering the email — first option that is configured wins:
 *
 *   - Authenticated SMTP when SMTP_HOST / SMTP_USER / SMTP_PASS are set.
 *     On Vercel there is no sendmail binary, so SMTP is the way to send mail
 *     from a function. Set them in Vercel -> Settings -> Environment Variables:
 *       SMTP_HOST    smtp.gmail.com
 *       SMTP_PORT    465            (465 = implicit TLS, 587 = STARTTLS)
 *       SMTP_USER    falihaabdulsalam@gmail.com
 *       SMTP_PASS    a Google App Password (not the normal account password)
 *       SMTP_SECURE  ssl            (ssl | tls | none — defaults from the port)
 *       SMTP_FROM    optional envelope sender, defaults to SMTP_USER
 *   - PHP mail() otherwise, which works on shared hosting but not on Vercel.
 *
 * Without either of those, the endpoint still runs and answers with a clear
 * error, so a submission never silently disappears.
 */

// Where enquiries should land.
const MAIL_TO = 'falihaabdulsalam@gmail.com';

// Origins allowed to post here, in addition to the site's own origin (which is
// always accepted, so preview deployments work too). Add more, comma separated,
// through the ALLOWED_ORIGINS environment variable.
const ALLOWED_ORIGIN = 'https://falihaabdulsalam.vercel.app';

// Minimum seconds between two submissions from the same IP address.
const MIN_SECONDS_BETWEEN_SENDS = 20;

// -----------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Read an environment variable with a fallback. */
function setting(string $key, string $default = ''): string
{
    $value = getenv($key);
    return $value === false || trim($value) === '' ? $default : trim($value);
}

/** Send a JSON response and stop. */
function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$requestHost = (string) ($_SERVER['HTTP_HOST'] ?? '');
$allowedOrigins = array_merge(
    [ALLOWED_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    array_filter(array_map('trim', explode(',', setting('ALLOWED_ORIGINS'))))
);
$sameOrigin = $origin !== '' && parse_url($origin, PHP_URL_HOST) === $requestHost;

if ($origin !== '' && ($sameOrigin || in_array($origin, $allowedOrigins, true) || in_array('*', $allowedOrigins, true))) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
} elseif ($origin !== '') {
    respond(403, ['errors' => [['message' => 'This origin is not allowed to post here.']]]);
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['errors' => [['message' => 'Use POST for this endpoint.']]]);
}

/** Read the payload whether the client sent JSON or form encoding. */
function read_input(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');

    if (str_contains($contentType, 'application/json')) {
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    if ($raw !== '' && empty($_POST)) {
        parse_str($raw, $parsed);
        return is_array($parsed) ? $parsed : [];
    }

    return $_POST;
}

/** Strip control characters and trim, so header injection cannot happen. */
function clean(string $value): string
{
    $value = str_replace(["\r", "\n", '%0a', '%0d'], ' ', $value);
    return trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $value) ?? '');
}

/** File-backed throttle: one submission per IP per window. */
function throttled(string $ip): bool
{
    $file = sys_get_temp_dir() . '/portfolio-contact-' . hash('sha256', $ip);
    $last = is_file($file) ? (int) file_get_contents($file) : 0;
    if ($last > 0 && (time() - $last) < MIN_SECONDS_BETWEEN_SENDS) {
        return true;
    }
    @file_put_contents($file, (string) time(), LOCK_EX);
    return false;
}

/** Read one SMTP reply (handles multi-line replies) and enforce its code. */
function smtp_expect($socket, array $okCodes, string $step): string
{
    $reply = '';
    while (($line = fgets($socket, 600)) !== false) {
        $reply .= $line;
        if (strlen($line) < 4 || $line[3] !== '-') {
            break;
        }
    }

    $code = (int) substr($reply, 0, 3);
    if (!in_array($code, $okCodes, true)) {
        throw new RuntimeException($step . ' -> ' . trim($reply));
    }

    return $reply;
}

/** Send one SMTP command and enforce the expected reply code. */
function smtp_command($socket, string $command, array $okCodes, string $step): string
{
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $okCodes, $step);
}

/**
 * Send the message over authenticated SMTP. Vercel functions have no sendmail,
 * so this is what actually delivers mail there.
 *
 * @throws RuntimeException when the server rejects any step.
 */
function send_via_smtp(string $to, string $subject, string $body, string $fromEmail, string $replyTo, string $replyName): void
{
    $host = setting('SMTP_HOST');
    $port = (int) setting('SMTP_PORT', '465');
    $secure = strtolower(setting('SMTP_SECURE', $port === 465 ? 'ssl' : 'tls'));
    $user = setting('SMTP_USER');
    $pass = setting('SMTP_PASS');
    $helo = parse_url('https://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), PHP_URL_HOST) ?: 'localhost';

    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false,
        ],
    ]);

    $socket = @stream_socket_client($remote, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new RuntimeException('connect ' . $remote . ' -> ' . $errstr);
    }
    stream_set_timeout($socket, 20);

    try {
        smtp_expect($socket, [220], 'greeting');
        smtp_command($socket, 'EHLO ' . $helo, [250], 'EHLO');

        if ($secure === 'tls') {
            smtp_command($socket, 'STARTTLS', [220], 'STARTTLS');
            if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('STARTTLS negotiation failed');
            }
            smtp_command($socket, 'EHLO ' . $helo, [250], 'EHLO after STARTTLS');
        }

        if ($user !== '') {
            smtp_command($socket, 'AUTH LOGIN', [334], 'AUTH LOGIN');
            smtp_command($socket, base64_encode($user), [334], 'AUTH username');
            smtp_command($socket, base64_encode($pass), [235], 'AUTH password');
        }

        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250], 'MAIL FROM');
        smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251], 'RCPT TO');
        smtp_command($socket, 'DATA', [354], 'DATA');

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $headers = [
            'From: Faliha Abdul Salam <' . $fromEmail . '>',
            'To: <' . $to . '>',
            'Reply-To: ' . $replyName . ' <' . $replyTo . '>',
            'Subject: ' . $encodedSubject,
            'Date: ' . date('r'),
            'Message-ID: <portfolio-' . bin2hex(random_bytes(8)) . '@' . $helo . '>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        $normalizedBody = preg_replace("/\r\n|\r|\n/", "\r\n", $body) ?? $body;
        $payload = implode("\r\n", $headers) . "\r\n\r\n" . preg_replace('/^\./m', '..', $normalizedBody) . "\r\n.";

        fwrite($socket, $payload . "\r\n");
        smtp_expect($socket, [250], 'message body');
        @fwrite($socket, "QUIT\r\n");
    } finally {
        @fclose($socket);
    }
}

$input = read_input();

// Honeypot: real people never fill a field they cannot see.
if (trim((string) ($input['_gotcha'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

$name    = clean((string) ($input['name'] ?? ''));
$email   = clean((string) ($input['email'] ?? ''));
$subject = clean((string) ($input['subject'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

$errors = [];

if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    $errors[] = ['field' => 'name', 'message' => 'Please share your name.'];
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 200) {
    $errors[] = ['field' => 'email', 'message' => 'That email address does not look right.'];
}
if (mb_strlen($subject) < 3 || mb_strlen($subject) > 150) {
    $errors[] = ['field' => 'subject', 'message' => 'Please add a short subject.'];
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    $errors[] = ['field' => 'message', 'message' => 'Please write between 10 and 5000 characters.'];
}

if ($errors) {
    respond(422, ['errors' => $errors]);
}

if (throttled($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
    respond(429, ['errors' => [['message' => 'That was quick — please wait a few seconds and try again.']]]);
}

$body = "New portfolio enquiry\n\n"
    . "Name:    {$name}\n"
    . "Email:   {$email}\n"
    . "Subject: {$subject}\n\n"
    . "{$message}\n";

$mailSubject = '[Portfolio Enquiry] ' . $subject;

if (setting('SMTP_HOST') !== '') {
    $fromEmail = setting('SMTP_FROM', setting('SMTP_USER', MAIL_TO));
    try {
        send_via_smtp(MAIL_TO, $mailSubject, $body, $fromEmail, $email, $name);
        respond(200, ['ok' => true]);
    } catch (Throwable $error) {
        error_log('portfolio contact.php SMTP failed: ' . $error->getMessage());
        respond(500, ['errors' => [['message' => 'The mail server refused the message. Please email me directly instead.']]]);
    }
}

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Portfolio <no-reply@' . preg_replace('/^www\./', '', $requestHost !== '' ? $requestHost : 'localhost') . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: portfolio-contact-php',
];

$sent = @mail(MAIL_TO, $mailSubject, $body, implode("\r\n", $headers), '-f' . MAIL_TO);

if (!$sent) {
    error_log('portfolio contact.php: mail() failed for ' . $email . ' (no SMTP_HOST configured)');
    respond(500, ['errors' => [['message' => 'The mail server refused the message. Please email me directly instead.']]]);
}

respond(200, ['ok' => true]);
