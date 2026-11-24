import type { ProjectCategory, ProjectItem } from '../data/portfolioData';

export type FilterOption = 'All' | ProjectCategory;
export type SortOption = 'featured' | 'alphabetical';

export const FILTER_OPTIONS: FilterOption[] = [
  'All',
  'Public Sector',
  'Mobile & Native',
  'Commerce & Web',
  'AI & Open Source',
];

export function filterAndSortProjects(
  projects: ProjectItem[],
  category: FilterOption,
  query: string,
  sortBy: SortOption = 'featured',
): ProjectItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    const matchesCategory = category === 'All' || project.category === category;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      project.title,
      project.subtitle,
      project.organization,
      project.summary,
      ...project.stack,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  if (sortBy === 'alphabetical') {
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  return [...filtered].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return 0;
  });
}

export function getCategoryCounts(projects: ProjectItem[]): Record<FilterOption, number> {
  const counts: Record<FilterOption, number> = {
    All: projects.length,
    'Public Sector': 0,
    'Mobile & Native': 0,
    'Commerce & Web': 0,
    'AI & Open Source': 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (input.subject.trim().length < 3) {
    errors.subject = 'Please include a short subject.';
  }

  if (input.message.trim().length < 10) {
    errors.message = 'Please share a brief message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(toEmail: string, input: ContactFormInput): string {
  const subject = encodeURIComponent(input.subject.trim());
  const body = encodeURIComponent(
    `Hi Faliha,\n\n${input.message.trim()}\n\nBest regards,\n${input.name.trim()}\n${input.email.trim()}`,
  );
  return `mailto:${toEmail}?subject=${subject}&body=${body}`;
}

export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const scrollableDistance = scrollHeight - clientHeight;
  if (!Number.isFinite(scrollableDistance) || scrollableDistance <= 0) {
    return 0;
  }
  if (!Number.isFinite(scrollY) || scrollY <= 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, scrollY / scrollableDistance));
}

export interface SectionOffset {
  id: string;
  top: number;
}

export function getActiveSectionId(
  sections: SectionOffset[],
  activationOffset = 140,
): string {
  if (sections.length === 0) {
    return '';
  }

  let activeId = sections[0].id;
  for (const section of sections) {
    if (section.top <= activationOffset) {
      activeId = section.id;
    }
  }
  return activeId;
}

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'faliha-portfolio-theme';

export function resolveTheme(stored: string | null | undefined): ThemeMode {
  return stored === 'dark' ? 'dark' : 'light';
}

export function getNextTheme(theme: ThemeMode): ThemeMode {
  return theme === 'dark' ? 'light' : 'dark';
}

export interface ParsedMetric {
  target: number;
  suffix: string;
  useCommas: boolean;
}

export function parseMetricValue(raw: string): ParsedMetric {
  const match = raw.trim().match(/^([\d,]+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: raw, useCommas: false };
  }
  const numericPart = match[1];
  const suffix = match[2] ?? '';
  const target = Number.parseInt(numericPart.replace(/,/g, ''), 10);
  return {
    target: Number.isFinite(target) ? target : 0,
    suffix,
    useCommas: numericPart.includes(','),
  };
}

export function formatMetricValue(current: number, parsed: ParsedMetric): string {
  const safeValue = Math.max(0, Math.round(current));
  const formattedNumber = parsed.useCommas
    ? safeValue.toLocaleString('en-US')
    : String(safeValue);
  return `${formattedNumber}${parsed.suffix}`;
}

export function getSideSlideOffset(index: number, distance = 56): number {
  const safeDistance = Math.abs(Number.isFinite(distance) ? distance : 56);
  return index % 2 === 0 ? -safeDistance : safeDistance;
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  _replyto: string;
  _subject: string;
  message: string;
  _template: 'table';
  _captcha: 'false';
  _honey: string;
}

export function buildContactEmailEndpoint(toEmail: string): string {
  return `https://formsubmit.co/ajax/${encodeURIComponent(toEmail.trim())}`;
}

export function buildContactEmailPayload(input: ContactFormInput): ContactEmailPayload {
  const trimmedEmail = input.email.trim();
  const trimmedSubject = input.subject.trim();
  return {
    name: input.name.trim(),
    email: trimmedEmail,
    _replyto: trimmedEmail,
    _subject: `[Portfolio Inquiry] ${trimmedSubject}`,
    message: input.message.trim(),
    _template: 'table',
    _captcha: 'false',
    _honey: '',
  };
}

export interface ContactSendOutcome {
  status: 'sent' | 'needs-activation' | 'error';
  message: string;
}

export function parseContactSendResponse(ok: boolean, data: unknown): ContactSendOutcome {
  const record =
    data && typeof data === 'object' ? (data as Record<string, unknown>) : null;
  const rawMessage = typeof record?.message === 'string' ? record.message : '';
  const successFlag = record?.success === true || record?.success === 'true';

  if (ok && successFlag) {
    return {
      status: 'sent',
      message: 'Message sent successfully!',
    };
  }

  if (/activat/i.test(rawMessage)) {
    return {
      status: 'needs-activation',
      message:
        'A one-time activation email was just sent to confirm form delivery. Please check the inbox and click Activate Form, or use the email app link below.',
    };
  }

  return {
    status: 'error',
    message:
      rawMessage ||
      'Unable to send right now. Please try again or use your email app below.',
  };
}
