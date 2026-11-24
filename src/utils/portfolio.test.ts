import test from 'node:test';
import assert from 'node:assert/strict';
import { ADDITIONAL_PROJECT_GROUPS, PROFILE, PROJECTS, PUBLIC_GITHUB_REPOS } from '../data/portfolioData';
import {
  buildContactEmailEndpoint,
  buildContactEmailPayload,
  buildMailtoHref,
  calculateScrollProgress,
  filterAndSortProjects,
  formatMetricValue,
  getActiveSectionId,
  getCategoryCounts,
  getNextTheme,
  getSideSlideOffset,
  parseContactSendResponse,
  parseMetricValue,
  resolveTheme,
  THEME_STORAGE_KEY,
  validateContactForm,
} from './portfolio';

test('getCategoryCounts sums all projects accurately across categories', () => {
  const counts = getCategoryCounts(PROJECTS);
  assert.equal(counts.All, PROJECTS.length);
  const sumCategories =
    counts['Public Sector'] +
    counts['Mobile & Native'] +
    counts['Commerce & Web'] +
    counts['AI & Open Source'];
  assert.equal(sumCategories, PROJECTS.length);
});

test('filterAndSortProjects prioritizes Akshaya and Niyamasabha flagship portals while keeping CM Connect un-highlighted', () => {
  const featuredList = filterAndSortProjects(PROJECTS, 'All', '', 'featured');
  assert.equal(featuredList[0].id, 'akshaya');
  assert.equal(featuredList[0].liveUrl, 'https://akshaya.kerala.gov.in');
  const top4Ids = featuredList.slice(0, 4).map((p) => p.id);
  assert.ok(top4Ids.includes('niyamasabha'));
  assert.ok(top4Ids.includes('malayalam-mission'));
  assert.ok(top4Ids.includes('scole-kerala'));
  assert.ok(!top4Ids.includes('cm-connect'));
  const cmConnect = featuredList.find((p) => p.id === 'cm-connect');
  assert.ok(cmConnect);
  assert.equal(cmConnect.featured, false);
  assert.ok(featuredList.every((p) => !JSON.stringify(p).includes('exui.cditproject.org')));
  assert.ok(featuredList.every((p) => p.id !== 'ente-keralam' && p.id !== 'mediavault'));
});

test('filterAndSortProjects filters by category and search query across stack and title', () => {
  const mobileProjects = filterAndSortProjects(PROJECTS, 'Mobile & Native', '');
  assert.equal(mobileProjects.length, 2);
  assert.ok(mobileProjects.every((p) => p.category === 'Mobile & Native'));

  const trackeaseResults = filterAndSortProjects(PROJECTS, 'All', 'TrackEase');
  assert.equal(trackeaseResults.length, 1);
  assert.equal(trackeaseResults[0].id, 'trackease');

  const amchartsResults = filterAndSortProjects(PROJECTS, 'Public Sector', 'AmCharts5');
  assert.equal(amchartsResults.length, 1);
  assert.equal(amchartsResults[0].id, 'malayalam-mission');

  const emptyResults = filterAndSortProjects(PROJECTS, 'Mobile & Native', 'AmCharts5');
  assert.equal(emptyResults.length, 0);
});

test('filterAndSortProjects alphabetical sort orders titles lexicographically', () => {
  const sorted = filterAndSortProjects(PROJECTS, 'All', '', 'alphabetical');
  for (let i = 1; i < sorted.length; i += 1) {
    assert.ok(sorted[i - 1].title.localeCompare(sorted[i].title) <= 0);
  }
});

test('validateContactForm enforces required fields and email format', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Name',
    email: 'name@example.com',
    subject: 'Senior Front-End Role',
    message: 'We would love to discuss a React Native and Next.js engineering opportunity.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildMailtoHref encodes subject and sender details cleanly', () => {
  const href = buildMailtoHref(PROFILE.email, {
    name: 'Neha',
    email: 'neha@example.com',
    subject: 'Project Collaboration',
    message: 'Interested in collaborating on a React portal.',
  });
  assert.ok(href.startsWith(`mailto:${PROFILE.email}?subject=Project%20Collaboration`));
  assert.ok(href.includes('neha%40example.com'));
  assert.ok(JSON.stringify(ADDITIONAL_PROJECT_GROUPS).includes('akshaya.kerala.gov.in'));
});

test('calculateScrollProgress clamps ratios safely between 0 and 1', () => {
  assert.equal(calculateScrollProgress(0, 3000, 900), 0);
  assert.equal(calculateScrollProgress(-50, 3000, 900), 0);
  assert.equal(calculateScrollProgress(1050, 3000, 900), 0.5);
  assert.equal(calculateScrollProgress(2100, 3000, 900), 1);
  assert.equal(calculateScrollProgress(2500, 3000, 900), 1);
  assert.equal(calculateScrollProgress(100, 900, 900), 0);
  assert.equal(calculateScrollProgress(Number.NaN, 3000, 900), 0);
});

test('getActiveSectionId resolves the active section as viewport scrolls down', () => {
  const sections = [
    { id: 'top', top: 0 },
    { id: 'projects', top: 760 },
    { id: 'experience', top: 2400 },
    { id: 'contact', top: 4100 },
  ];
  assert.equal(getActiveSectionId(sections, 140), 'top');
  assert.equal(
    getActiveSectionId(
      [
        { id: 'top', top: -700 },
        { id: 'projects', top: 90 },
        { id: 'experience', top: 1700 },
        { id: 'contact', top: 3400 },
      ],
      140,
    ),
    'projects',
  );
  assert.equal(
    getActiveSectionId(
      [
        { id: 'top', top: -4050 },
        { id: 'projects', top: -3290 },
        { id: 'experience', top: -1650 },
        { id: 'contact', top: 50 },
      ],
      140,
    ),
    'contact',
  );
  assert.equal(getActiveSectionId([], 140), '');
});

test('resolveTheme defaults cleanly to light and honors persisted dark preference', () => {
  assert.equal(THEME_STORAGE_KEY, 'faliha-portfolio-theme');
  assert.equal(resolveTheme(null), 'light');
  assert.equal(resolveTheme(undefined), 'light');
  assert.equal(resolveTheme(''), 'light');
  assert.equal(resolveTheme('light'), 'light');
  assert.equal(resolveTheme('system'), 'light');
  assert.equal(resolveTheme('dark'), 'dark');
});

test('getNextTheme alternates between light and dark modes', () => {
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});

test('parseMetricValue and formatMetricValue preserve commas and suffixes accurately', () => {
  const users = parseMetricValue('10,000+');
  assert.deepEqual(users, { target: 10000, suffix: '+', useCommas: true });
  assert.equal(formatMetricValue(10000, users), '10,000+');
  assert.equal(formatMetricValue(4520.4, users), '4,520+');

  const speed = parseMetricValue('25%');
  assert.deepEqual(speed, { target: 25, suffix: '%', useCommas: false });
  assert.equal(formatMetricValue(25, speed), '25%');

  const modules = parseMetricValue('20+');
  assert.deepEqual(modules, { target: 20, suffix: '+', useCommas: false });
  assert.equal(formatMetricValue(-5, modules), '0+');
});

test('getSideSlideOffset alternates left and right horizontal offsets cleanly', () => {
  assert.equal(getSideSlideOffset(0, 64), -64);
  assert.equal(getSideSlideOffset(1, 64), 64);
  assert.equal(getSideSlideOffset(2, 64), -64);
  assert.equal(getSideSlideOffset(3, -40), 40);
  assert.equal(getSideSlideOffset(0), -56);
});

test('Claude Clone project and public repo link directly to https://claudeclone.ai.studio/', () => {
  const claudeProject = PROJECTS.find((p) => p.id === 'claude-ai-app');
  assert.ok(claudeProject);
  assert.equal(claudeProject.liveUrl, 'https://claudeclone.ai.studio/');
  assert.equal(claudeProject.liveLabel, 'claudeclone.ai.studio');

  const claudeRepo = PUBLIC_GITHUB_REPOS.find((r) => r.name === 'Claude');
  assert.ok(claudeRepo);
  assert.equal(claudeRepo.liveUrl, 'https://claudeclone.ai.studio/');
});

test('buildContactEmailEndpoint and buildContactEmailPayload target falihaabdulsalam@gmail.com', () => {
  const endpoint = buildContactEmailEndpoint(PROFILE.email);
  assert.equal(endpoint, 'https://formsubmit.co/ajax/falihaabdulsalam%40gmail.com');

  const payload = buildContactEmailPayload({
    name: '  Aarav  ',
    email: ' aarav@example.com ',
    subject: ' Frontend Role ',
    message: '  Interested in discussing a React role.  ',
  });
  assert.equal(payload.name, 'Aarav');
  assert.equal(payload.email, 'aarav@example.com');
  assert.equal(payload._replyto, 'aarav@example.com');
  assert.equal(payload._subject, '[Portfolio Inquiry] Frontend Role');
  assert.equal(payload.message, 'Interested in discussing a React role.');
  assert.equal(payload._template, 'table');
  assert.equal(payload._captcha, 'false');
});

test('parseContactSendResponse distinguishes sent, needs-activation, and error states', () => {
  assert.equal(parseContactSendResponse(true, { success: 'true', message: 'The form was submitted successfully.' }).status, 'sent');
  assert.equal(parseContactSendResponse(true, { success: true }).status, 'sent');
  assert.equal(
    parseContactSendResponse(true, {
      success: 'false',
      message: 'This form needs Activation. We sent you an email.',
    }).status,
    'needs-activation',
  );
  assert.equal(parseContactSendResponse(false, { message: 'Server error' }).status, 'error');
  assert.equal(parseContactSendResponse(false, null).status, 'error');
});
