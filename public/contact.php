<?php
declare(strict_types=1);

// Prevent leaking PHP warnings or paths into JSON responses
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

// Recipient is locked server-side and never accepted from client input
const RECIPIENT_EMAIL = 'falihaabdulsalam@gmail.com';
const MAX_BODY_BYTES = 16384;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_SECONDS = 900; // 15 minutes

/**
 * Emit a JSON response and terminate execution.
 */
function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * UTF-8 safe string length with fallback if mbstring is unavailable.
 */
function safeLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

/**
 * Strip control characters and line breaks to prevent email header injection.
 */
function sanitizeHeaderValue(string $value): string
{
    $cleaned = preg_replace('/[\r\n\0]+/', ' ', $value);
    return trim($cleaned ?? '');
}

/**
 * Check whether an input string contains newline or null bytes.
 */
function hasHeaderInjectionChars(string $value): bool
{
    return preg_match('/[\r\n\0]/', $value) === 1;
}

/**
 * Build a safe server-owned From address for SPF/DMARC compatibility.
 */
function getServerFromEmail(): string
{
    $envFrom = getenv('CONTACT_FROM_EMAIL');
    if (is_string($envFrom) && filter_var(trim($envFrom), FILTER_VALIDATE_EMAIL)) {
        return trim($envFrom);
    }

    $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
    $host = strtolower(preg_replace('/:\d+$/', '', $host) ?? 'localhost');
    $host = preg_replace('/[^a-z0-9.-]/', '', $host) ?? '';

    if ($host === '' || $host === 'localhost' || filter_var($host, FILTER_VALIDATE_IP)) {
        return RECIPIENT_EMAIL;
    }

    return 'no-reply@' . ltrim($host, '.');
}

/**
 * Lightweight per-IP rate limiting stored in the system temp directory.
 */
function isRateLimited(): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', 'portfolio-contact-' . $ip);
    $file = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'contact_rl_' . $key . '.json';

    $now = time();
    $timestamps = [];

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return false;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return false;
        }

        $raw = stream_get_contents($handle);
        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                foreach ($decoded as $ts) {
                    if (is_int($ts) && ($now - $ts) < RATE_LIMIT_WINDOW_SECONDS) {
                        $timestamps[] = $ts;
                    }
                }
            }
        }

        if (count($timestamps) >= RATE_LIMIT_MAX_REQUESTS) {
            return true;
        }

        $timestamps[] = $now;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($timestamps));
        fflush($handle);
        return false;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
if ($method !== 'POST') {
    header('Allow: POST');
    respond(405, [
        'ok' => false,
        'message' => 'Method not allowed. Use POST to send a message.',
    ]);
}

// Enforce request size cap
$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > MAX_BODY_BYTES) {
    respond(413, [
        'ok' => false,
        'message' => 'Message payload is too large.',
    ]);
}

$rawBody = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (is_string($rawBody) && strlen($rawBody) > MAX_BODY_BYTES) {
    respond(413, [
        'ok' => false,
        'message' => 'Message payload is too large.',
    ]);
}

$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
$input = [];
if (strpos($contentType, 'application/json') !== false) {
    $decoded = is_string($rawBody) ? json_decode($rawBody, true) : null;
    if (!is_array($decoded)) {
        respond(400, [
            'ok' => false,
            'message' => 'Invalid JSON request payload.',
        ]);
    }
    $input = $decoded;
} else {
    $input = $_POST;
}

// Honeypot trap for automated spam bots
$honeypot = trim((string) ($input['website'] ?? $input['_honey'] ?? ''));
if ($honeypot !== '') {
    respond(200, [
        'ok' => true,
        'message' => 'Message sent successfully.',
    ]);
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$subject = trim((string) ($input['subject'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

$errors = [];

if (safeLength($name) < 2 || safeLength($name) > 120 || hasHeaderInjectionChars($name)) {
    $errors['name'] = 'Please enter a valid name (2 to 120 characters).';
}

if (
    $email === '' ||
    strlen($email) > 254 ||
    hasHeaderInjectionChars($email) ||
    filter_var($email, FILTER_VALIDATE_EMAIL) === false
) {
    $errors['email'] = 'Please enter a valid email address.';
}

if (safeLength($subject) < 3 || safeLength($subject) > 200 || hasHeaderInjectionChars($subject)) {
    $errors['subject'] = 'Please include a valid subject (3 to 200 characters).';
}

if (safeLength($message) < 10 || safeLength($message) > 5000) {
    $errors['message'] = 'Please share a message between 10 and 5,000 characters.';
}

if ($errors !== []) {
    respond(422, [
        'ok' => false,
        'message' => 'Please check the highlighted form fields.',
        'errors' => $errors,
    ]);
}

if (isRateLimited()) {
    respond(429, [
        'ok' => false,
        'message' => 'Too many messages sent recently. Please wait a few minutes before trying again.',
    ]);
}

$safeName = sanitizeHeaderValue($name);
$safeEmail = sanitizeHeaderValue($email);
$safeSubject = sanitizeHeaderValue($subject);
$cleanMessage = str_replace("\0", '', $message);

$mailSubject = '[Portfolio Inquiry] ' . $safeSubject;
$encodedSubject = '=?UTF-8?B?' . base64_encode($mailSubject) . '?=';
$fromEmail = getServerFromEmail();

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Portfolio Contact <' . $fromEmail . '>',
    'Reply-To: ' . $safeEmail,
    'X-Mailer: PHP/' . phpversion(),
];

$emailBody = implode("\r\n", [
    'New portfolio contact message',
    '----------------------------------------',
    'Name: ' . $safeName,
    'Email: ' . $safeEmail,
    'Subject: ' . $safeSubject,
    'Submitted (UTC): ' . gmdate('Y-m-d H:i:s') . ' UTC',
    '----------------------------------------',
    '',
    $cleanMessage,
    '',
]);

// Use 4-argument mail() only (never pass untrusted data to the 5th additional_params argument)
$sent = @mail(
    RECIPIENT_EMAIL,
    $encodedSubject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$sent) {
    respond(500, [
        'ok' => false,
        'message' => 'The mail server could not deliver your message right now. Please try again or use your email app below.',
    ]);
}

respond(200, [
    'ok' => true,
    'message' => 'Message sent successfully.',
]);
