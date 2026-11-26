import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Github,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { CONTACT_FORM_ENDPOINT, PROFILE, SKILL_GROUPS } from '../data/portfolioData';
import {
  buildContactFormPayload,
  buildMailtoHref,
  parseContactSendResponse,
  resolveContactFormEndpoint,
  validateContactForm,
  type ContactFormInput,
} from '../utils/portfolio';
import {
  CapabilitiesArchitectureIllustration,
  ContactDispatchIllustration,
} from './VectorIllustrations';

const CAPABILITY_STYLES = [
  {
    topBar: 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5]',
    iconBg: 'bg-blue-50 text-[#1D4ED8] dark:bg-blue-950/80 dark:text-sky-400',
    cardBg: 'bg-white dark:bg-[#0F172A]/95',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-sky-400/80',
    Icon: Code2,
  },
  {
    topBar: 'bg-gradient-to-r from-[#0D9488] to-[#06B6D4]',
    iconBg: 'bg-teal-50 text-[#0F766E] dark:bg-teal-950/80 dark:text-teal-400',
    cardBg: 'bg-white dark:bg-[#0F172A]/95',
    hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-400/80',
    Icon: Database,
  },
  {
    topBar: 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899]',
    iconBg: 'bg-violet-50 text-[#7C3AED] dark:bg-violet-950/80 dark:text-violet-400',
    cardBg: 'bg-white dark:bg-[#0F172A]/95',
    hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-400/80',
    Icon: Layers,
  },
];

// The PHP handler that ships with the site (api/contact.php), or a configured
// Formspree/PHP URL from the build env. `vite dev` has no PHP runtime, so a
// same-origin handler falls back to the prefilled mail draft locally.
const resolvedContactEndpoint = resolveContactFormEndpoint(
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? CONTACT_FORM_ENDPOINT,
);
const CONTACT_ENDPOINT =
  import.meta.env.DEV && resolvedContactEndpoint?.startsWith('/')
    ? null
    : resolvedContactEndpoint;

export function CapabilitiesAndContact() {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [honeypot, setHoneypot] = useState('');
  const [sendStatus, setSendStatus] = useState<
    'idle' | 'sending' | 'sent' | 'mailto' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [fallbackMailtoHref, setFallbackMailtoHref] = useState<string | null>(null);

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API fallback when restricted in non-HTTPS iframe contexts
    }
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot.trim().length > 0) {
      return;
    }

    const validation = validateContactForm(formState);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      setSendStatus('idle');
      setStatusMessage('');
      return;
    }

    setFormErrors({});
    setStatusMessage('');
    const mailtoHref = buildMailtoHref(PROFILE.email, formState);
    setFallbackMailtoHref(mailtoHref);

    if (!CONTACT_ENDPOINT) {
      window.location.href = mailtoHref;
      setSendStatus('mailto');
      setStatusMessage(
        'Your email app is opening with this message prefilled — press send there and it reaches my inbox directly.',
      );
      return;
    }

    setSendStatus('sending');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(buildContactFormPayload(formState)),
      });

      let responseData: unknown = null;
      try {
        responseData = await response.json();
      } catch {
        responseData = null;
      }

      const outcome = parseContactSendResponse(response.ok, responseData);

      if (outcome.status === 'invalid') {
        setFormErrors(outcome.fieldErrors);
        setSendStatus('error');
        setStatusMessage('Please fix the highlighted fields and try again.');
        return;
      }

      setSendStatus(outcome.status);
      setStatusMessage(
        outcome.status === 'sent'
          ? `Message sent to ${PROFILE.email}! Thanks for reaching out, ${formState.name.trim()}.`
          : outcome.message,
      );

      if (outcome.status === 'sent') {
        setFormState({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setSendStatus('error');
      setStatusMessage(
        'Could not reach the mail service right now. You can retry or open your email app below.',
      );
    }
  };

  return (
    <>
      {/* Capabilities Section */}
      <section
        id="capabilities"
        className="relative overflow-hidden border-b border-violet-200/80 bg-gradient-to-br from-[#DBEAFE] via-[#E0E7FF] to-[#FCE7F3] py-16 lg:py-20 dark:border-violet-900/60 dark:bg-[linear-gradient(135deg,#0C1730_0%,#181438_50%,#27122B_100%)]"
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/src/assets/images/creative_section_backdrop_1794982039764.jpg"
            alt=""
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-50 dark:opacity-18"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#DBEAFE]/65 via-[#F3E8FF]/55 to-[#CCFBF1]/65 dark:from-[#0C1730]/85 dark:via-[#181438]/78 dark:to-[#0A2527]/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#7C3AED] dark:text-violet-400">
                <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" aria-hidden="true" />
                <span>03. Technical Capabilities</span>
              </p>
              <h2
                className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Core stack across frontend architecture, APIs, and AI workflows.
              </h2>
            </div>

            <CapabilitiesArchitectureIllustration />
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SKILL_GROUPS.map((group, idx) => {
              const style = CAPABILITY_STYLES[idx % CAPABILITY_STYLES.length];
              const Icon = style.Icon;
              const initialOffset =
                idx === 0 ? { opacity: 0, x: -56 } : idx === 2 ? { opacity: 0, x: 56 } : { opacity: 0, y: 28 };
              return (
                <motion.div
                  key={group.title}
                  initial={initialOffset}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -5, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                  transition={{ duration: 0.52, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-700/80 ${style.cardBg} shadow-sm transition-[box-shadow,border-color] duration-200 hover:shadow-lg ${style.hoverBorder}`}
                >
                  <div className={`h-1.5 w-full ${style.topBar}`} aria-hidden="true" />
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${style.iconBg}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-display mt-4 text-lg font-bold text-slate-950 dark:text-white">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {group.description}
                      </p>
                    </div>

                    <ul className="mt-6 grid grid-cols-1 gap-2 border-t border-slate-100 pt-4 text-sm text-slate-800 dark:border-slate-800 dark:text-slate-200">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center justify-between">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-[#E0F2FE] via-[#EDE9FE]/80 to-[#CCFBF1]/85 py-16 lg:py-20 dark:bg-[linear-gradient(135deg,#09182D_0%,#181436_50%,#092524_100%)]"
      >
        <div
          className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-500/15"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-8 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl dark:bg-teal-500/15"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Direct Contact Channels */}
            <motion.div
              initial={{ opacity: 0, x: -52 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#C2410C] dark:text-amber-400">
                <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#EA580C] to-[#EC4899]" aria-hidden="true" />
                <span>04. Contact &amp; Availability</span>
              </p>
              <h2
                className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s build reliable, fast software together.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Available for senior Front-End, React 19, Next.js, and React Native engineering
                roles or specialized platform architecture consulting.
              </p>

              <div className="mt-8 space-y-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-700/80">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <Mail className="h-4 w-4 text-[#2563EB] dark:text-sky-400" aria-hidden="true" />
                    <a href={`mailto:${PROFILE.email}`} className="font-medium hover:text-[#2563EB] dark:hover:text-sky-400">
                      {PROFILE.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                    <Phone className="h-4 w-4 text-[#0D9488] dark:text-teal-400" aria-hidden="true" />
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                      className="font-mono text-sm tabular-nums hover:text-[#2563EB] dark:hover:text-sky-400"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phone, 'phone')}
                    aria-label="Copy phone number"
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <MapPin className="h-4 w-4 text-[#EC4899] dark:text-pink-400" aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-slate-700/80">
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-2 text-xs font-semibold text-[#1D4ED8] transition-colors hover:bg-blue-100 dark:border-blue-800/80 dark:bg-blue-950/70 dark:text-sky-300 dark:hover:bg-blue-900/70"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.githubPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0F172A] to-[#1E1B4B] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:from-indigo-600 dark:to-blue-600"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{PROFILE.githubPrimaryHandle}</span>
                </a>
              </div>

              <ContactDispatchIllustration />
            </motion.div>

            {/* Interactive Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 52 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/80 dark:bg-[#0F172A]/95"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-[#2563EB] via-[#0D9488] to-[#EA580C]" aria-hidden="true" />
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">Send a Direct Message</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Messages submitted here are sent directly to{' '}
                    <span className="font-medium text-slate-700 dark:text-slate-200">{PROFILE.email}</span>.
                  </p>
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Name"
                        className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="Senior Front-End Role / React Native Consultation"
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Share role scope, project timeline, or engineering requirements..."
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <motion.button
                        type="submit"
                        disabled={sendStatus === 'sending'}
                        whileHover={sendStatus === 'sending' ? undefined : { y: -1 }}
                        whileTap={sendStatus === 'sending' ? undefined : { scale: 0.98 }}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:from-[#1D4ED8] hover:to-[#4338CA] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0F172A]"
                      >
                        {sendStatus === 'sending' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                      {sendStatus === 'sent' && (
                        <motion.div
                          key="sent"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          role="status"
                          data-testid="contact-sent"
                          className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 px-3.5 py-2.5 text-xs text-emerald-900 dark:border-emerald-800/80 dark:bg-emerald-950/60 dark:text-emerald-200"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          <span>{statusMessage}</span>
                        </motion.div>
                      )}

                      {sendStatus === 'mailto' && (
                        <motion.div
                          key="mailto"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          role="status"
                          data-testid="contact-mailto"
                          className="flex items-start gap-2.5 rounded-xl border border-sky-200 bg-sky-50/90 px-3.5 py-2.5 text-xs text-sky-950 dark:border-sky-800/80 dark:bg-sky-950/60 dark:text-sky-200"
                        >
                          <Mail
                            className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400"
                            aria-hidden="true"
                          />
                          <span>{statusMessage}</span>
                        </motion.div>
                      )}

                      {sendStatus === 'error' && (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          role="alert"
                          data-testid="contact-error"
                          className="flex flex-col gap-2 rounded-xl border border-red-200 bg-red-50/90 px-3.5 py-2.5 text-xs text-red-900 dark:border-red-900/80 dark:bg-red-950/60 dark:text-red-200"
                        >
                          <div className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                            <span>{statusMessage}</span>
                          </div>
                          {fallbackMailtoHref && (
                            <a
                              href={fallbackMailtoHref}
                              className="inline-flex w-fit items-center gap-1 font-semibold text-[#1D4ED8] underline underline-offset-2 dark:text-sky-400"
                            >
                              <span>Send via Email App</span>
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] py-8 text-slate-300 dark:border-slate-800 dark:from-[#070C18] dark:via-[#121032] dark:to-[#070C18]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-6 text-xs sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} <span aria-hidden="true">·</span>{' '}
            {PROFILE.location}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Resume PDF
            </a>
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn
            </a>
            <a href={PROFILE.githubPrimaryUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
