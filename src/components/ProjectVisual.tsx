import type { ProjectVisualType } from '../data/portfolioData';

interface ProjectVisualProps {
  visualType: ProjectVisualType;
  compact?: boolean;
}

export function ProjectVisual({ visualType, compact = false }: ProjectVisualProps) {
  const heightClass = compact ? 'min-h-44' : 'min-h-56';

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-xl border border-slate-200/80 bg-[#F8FAFC] dark:border-slate-700/80 dark:bg-[#0B1325]"
    >
      <div className={`relative flex w-full ${heightClass} flex-col overflow-hidden rounded-xl`}>
        {/* Subtle hairline architectural blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-45 dark:opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148, 163, 184, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {visualType === 'akshaya-portal' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#EFF6FF] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#121D35] dark:to-[#172554]/80 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#1D4ED8] dark:text-sky-400">AKSHAYA E-GOVERNANCE</span>
              <span className="shrink-0 rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-semibold text-[#1D4ED8] dark:border-blue-800/80 dark:bg-blue-950/80 dark:text-sky-300">
                KERALA GOV
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-3 shadow-2xs dark:border-slate-700 dark:bg-slate-900/90">
                <div className="mb-2 flex items-center gap-1.5">
                  <div className="h-2 w-12 rounded bg-[#3B82F6]" />
                  <div className="h-2 w-6 rounded bg-[#10B981]" />
                  <div className="h-2 w-5 rounded bg-[#F59E0B]" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-2 w-4/5 rounded bg-blue-100 dark:bg-blue-900/80" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-200">
                <span className="font-mono text-base font-bold tabular-nums leading-none text-[#D97706] dark:text-amber-400">
                  14
                </span>
                <span className="mt-1 text-[10px] font-medium">Districts</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">State Citizen Services</span>
              <span className="shrink-0 font-mono font-semibold text-[#1D4ED8] dark:text-sky-400">akshaya.kerala.gov.in</span>
            </div>
          </div>
        )}

        {visualType === 'exam-matrix' && (
          <div className="@container relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#EEF2FF] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#121C38] dark:to-[#1E1B4B]/80 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#4338CA] dark:text-indigo-400">EXAMINATION MATRIX</span>
              <span className="shrink-0 font-semibold text-[#D97706] dark:text-amber-400">20+ MODULES</span>
            </div>
            <div
              data-testid="exam-matrix-grid"
              className="grid grid-cols-2 gap-1.5 @[318px]:flex @[318px]:flex-wrap"
            >
              {[
                { name: 'Schedule', tone: 'border-blue-200 bg-blue-50 text-[#1D4ED8] dark:border-blue-800/80 dark:bg-blue-950/75 dark:text-sky-300' },
                { name: 'Timetable', tone: 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200' },
                { name: 'Scheme', tone: 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200' },
                { name: 'Allocation', tone: 'border-emerald-200 bg-emerald-50 text-[#0F766E] dark:border-teal-800/80 dark:bg-teal-950/75 dark:text-teal-300' },
                { name: 'Centers', tone: 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200' },
                { name: 'Valuation', tone: 'border-amber-200 bg-amber-50 text-[#B45309] dark:border-amber-800/80 dark:bg-amber-950/75 dark:text-amber-300' },
                { name: 'Dispatch', tone: 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200' },
                { name: 'Certificates', tone: 'border-violet-200 bg-violet-50 text-[#6D28D9] dark:border-violet-800/80 dark:bg-violet-950/75 dark:text-violet-300' },
              ].map((cell) => (
                <div
                  key={cell.name}
                  className={`rounded-md border px-2 py-1.5 text-center text-[10.5px] font-medium leading-tight whitespace-nowrap transition-transform duration-200 group-hover:scale-[1.03] @[318px]:flex-grow ${cell.tone}`}
                >
                  {cell.name}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">Multi-level approval flow</span>
              <span className="shrink-0 font-mono font-semibold text-[#4338CA] dark:text-indigo-400">C-DIT Production Suite</span>
            </div>
          </div>
        )}

        {visualType === 'legislative' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F0FDFA] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#0F1D2E] dark:to-[#042F2E]/80 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#0F766E] dark:text-teal-400">ASSEMBLY PROCEEDINGS</span>
              <span className="shrink-0 rounded border border-teal-200 bg-teal-50 px-2 py-0.5 font-semibold text-[#0F766E] dark:border-teal-800/80 dark:bg-teal-950/80 dark:text-teal-300">
                REST SYNC
              </span>
            </div>
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 240 100" className="h-24 w-full max-w-[230px] animate-float-slow">
                <path
                  d="M 28 86 A 92 92 0 0 1 212 86"
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 52 86 A 68 68 0 0 1 188 86"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 76 86 A 44 44 0 0 1 164 86"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <rect x="96" y="75" width="48" height="14" rx="3" fill="#EA580C" fillOpacity="0.9" />
              </svg>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">Accessible citizen portal</span>
              <span className="shrink-0 font-mono font-semibold text-[#0F766E] dark:text-teal-400">niyamasabha.in</span>
            </div>
          </div>
        )}

        {visualType === 'geofence-face' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F0FDFA] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#0F1E2F] dark:to-[#042F2E]/80 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#0F766E] dark:text-teal-400">BIOMETRIC + GPS FENCE</span>
              <span className="shrink-0 rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-950/80 dark:text-emerald-300">
                -30% SPOOFING
              </span>
            </div>
            <div className="flex items-center justify-center gap-3.5">
              <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <svg viewBox="0 0 96 96" className="h-full w-full animate-orbit-slow">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    fill="#14B8A6"
                    fillOpacity="0.18"
                    stroke="#14B8A6"
                    strokeDasharray="6 4"
                    strokeWidth="2"
                  />
                </svg>
                <svg viewBox="0 0 96 96" className="absolute inset-0 h-full w-full">
                  <circle
                    cx="48"
                    cy="48"
                    r="28"
                    className="fill-white dark:fill-slate-900"
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M36 42 C36 35, 60 35, 60 42"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <circle cx="42" cy="46" r="2" className="fill-[#0F172A] dark:fill-slate-100" />
                  <circle cx="54" cy="46" r="2" className="fill-[#0F172A] dark:fill-slate-100" />
                  <path
                    d="M41 55 Q48 61 55 55"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="min-w-0 space-y-1.5 text-[10.5px]">
                <div className="truncate rounded border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono font-medium text-emerald-800 dark:border-emerald-800/80 dark:bg-emerald-950/75 dark:text-emerald-300">
                  Face Match Verified
                </div>
                <div className="truncate rounded border border-blue-200 bg-blue-50 px-2 py-1 font-mono font-medium text-blue-800 dark:border-blue-800/80 dark:bg-blue-950/75 dark:text-sky-300">
                  Duty Pass Geo-Coded
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">React Web + Expo Native</span>
              <span className="shrink-0 font-mono font-semibold text-[#0F766E] dark:text-teal-400">trackease.cdit.org</span>
            </div>
          </div>
        )}

        {visualType === 'civic-typography' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F5F3FF] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#161936] dark:to-[#2E1065]/70 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#6D28D9] dark:text-violet-400">MUTATION OBSERVER</span>
              <span className="shrink-0 font-semibold text-[#BE185D] dark:text-pink-400">UNICODE REGEX</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-violet-200 bg-white p-2.5 sm:p-3 shadow-2xs dark:border-violet-800/70 dark:bg-slate-900/90">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">CM Connect</div>
                <div className="mt-0.5 text-[10.5px] font-medium text-slate-600 dark:text-slate-300">
                  മലയാളം + English Auto-Type
                </div>
              </div>
              <div className="shrink-0 rounded border border-violet-200 bg-violet-50 px-2 py-1 font-mono text-[10px] font-semibold text-[#6D28D9] dark:border-violet-700/80 dark:bg-violet-950/80 dark:text-violet-300">
                [\u0D00-\u0D7F]
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">useCountUp · Swiper</span>
              <span className="shrink-0 font-mono font-semibold text-[#6D28D9] dark:text-violet-400">cmwithme.kerala.gov.in</span>
            </div>
          </div>
        )}

        {visualType === 'globe-bilingual' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#EFF6FF] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#111D38] dark:to-[#172554]/80 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#1D4ED8] dark:text-sky-400">AMCHARTS5 3D GLOBE</span>
              <span className="shrink-0 rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-semibold text-[#1D4ED8] dark:border-blue-800/80 dark:bg-blue-950/80 dark:text-sky-300">
                EN / ML
              </span>
            </div>
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-24 w-24 animate-float-slow">
                <defs>
                  <radialGradient id="globeGradLight" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.35" />
                  </radialGradient>
                </defs>
                <circle cx="60" cy="60" r="46" fill="url(#globeGradLight)" stroke="#3B82F6" strokeWidth="1.6" />
                <ellipse cx="60" cy="60" rx="22" ry="46" fill="none" stroke="#60A5FA" strokeWidth="1.2" />
                <line x1="14" y1="60" x2="106" y2="60" stroke="#60A5FA" strokeWidth="1.2" />
                <line x1="22" y1="38" x2="98" y2="38" stroke="#93C5FD" strokeWidth="1" />
                <line x1="22" y1="82" x2="98" y2="82" stroke="#93C5FD" strokeWidth="1" />
                <circle cx="74" cy="48" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.3" />
                <circle cx="44" cy="52" r="3.8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.1" />
                <circle cx="82" cy="70" r="3.8" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1.1" />
              </svg>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">Global chapters plotted</span>
              <span className="shrink-0 font-mono font-semibold text-[#1D4ED8] dark:text-sky-400">mm.kerala.gov.in</span>
            </div>
          </div>
        )}

        {visualType === 'audio-player' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#FDF2F8] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#191632] dark:to-[#4C0519]/60 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#BE185D] dark:text-pink-400">SARVA AUDIOS</span>
              <span className="shrink-0 rounded border border-pink-200 bg-pink-50 px-2 py-0.5 font-semibold text-[#BE185D] dark:border-pink-800/80 dark:bg-pink-950/80 dark:text-pink-300">
                PLAY STORE
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs dark:border-slate-700 dark:bg-slate-900/90">
              <div className="flex h-12 items-end justify-between gap-1">
                {[38, 68, 92, 50, 84, 96, 62, 44, 78, 56, 86, 42, 70, 54].map((bar, i) => (
                  <div
                    key={i}
                    style={{
                      height: `${bar}%`,
                      animationDelay: `${(i * 110) % 700}ms`,
                    }}
                    className={`w-full rounded-sm animate-bar-equalizer ${
                      i < 6 ? 'bg-[#F59E0B]' : i < 10 ? 'bg-[#EC4899]' : 'bg-[#0D9488]'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 font-mono text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
                <span className="shrink-0 font-semibold text-[#BE185D] dark:text-pink-400">14:22</span>
                <span className="min-w-0 truncate">Expo Router · Background Audio</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">React Native · TypeScript</span>
              <span className="shrink-0 font-mono font-semibold text-[#BE185D] dark:text-pink-400">Google Play Release</span>
            </div>
          </div>
        )}

        {visualType === 'education-portal' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F0FDFA] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#101D2E] dark:to-[#042F2E]/80 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#0F766E] dark:text-teal-400">SCOLE-KERALA</span>
              <span className="shrink-0 rounded border border-teal-200 bg-teal-50 px-2 py-0.5 font-semibold text-[#0F766E] dark:border-teal-800/80 dark:bg-teal-950/80 dark:text-teal-300">
                MULTILINGUAL
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                { label: 'Courses', bar: 'bg-[#3B82F6]', tone: 'border-blue-100 bg-blue-50/50 dark:border-blue-800/70 dark:bg-blue-950/60' },
                { label: 'Admissions', bar: 'bg-[#10B981]', tone: 'border-teal-100 bg-teal-50/50 dark:border-teal-800/70 dark:bg-teal-950/60' },
                { label: 'Archives', bar: 'bg-[#F59E0B]', tone: 'border-amber-100 bg-amber-50/50 dark:border-amber-800/70 dark:bg-amber-950/60' },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`min-w-0 rounded-md border px-1.5 py-2.5 text-center ${item.tone}`}
                >
                  <div className={`mx-auto mb-1.5 h-1.5 w-8 rounded ${item.bar}`} />
                  <div className="truncate text-[10.5px] font-semibold text-slate-800 dark:text-slate-100">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">Institutional statistics</span>
              <span className="shrink-0 font-mono font-semibold text-[#0F766E] dark:text-teal-400">scolekerala.org</span>
            </div>
          </div>
        )}

        {visualType === 'ecommerce-admin' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F5F3FF] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#191635] dark:to-[#2E1065]/75 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#6D28D9] dark:text-violet-400">NEXT.JS + REDUX</span>
              <span className="shrink-0 font-semibold text-[#DB2777] dark:text-pink-400">360° COMMERCE</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0 rounded-lg border border-violet-200 bg-violet-50/70 p-2.5 dark:border-violet-800/70 dark:bg-violet-950/65">
                <div className="text-[10px] font-mono font-semibold text-[#7C3AED] dark:text-violet-300">STOREFRONT</div>
                <div className="mt-1 text-xs font-semibold leading-snug text-slate-900 dark:text-white">Catalog &amp; Checkout</div>
              </div>
              <div className="min-w-0 rounded-lg border border-pink-200 bg-pink-50/70 p-2.5 dark:border-pink-800/70 dark:bg-pink-950/65">
                <div className="text-[10px] font-mono font-semibold text-[#BE185D] dark:text-pink-300">ADMIN SUITE</div>
                <div className="mt-1 text-xs font-semibold leading-snug text-slate-900 dark:text-white">Pricing &amp; Promos</div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">SQL query &amp; cache tuned</span>
              <span className="shrink-0 font-mono font-semibold text-[#6D28D9] dark:text-violet-400">Snippet Commerce</span>
            </div>
          </div>
        )}

        {visualType === 'real-estate' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#FFF7ED] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#1F1828] dark:to-[#431407]/70 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#C2410C] dark:text-orange-400">CANADIAN LISTINGS</span>
              <span className="shrink-0 font-semibold text-[#EA580C] dark:text-amber-400">BOOKINGS</span>
            </div>
            <div className="rounded-lg border border-orange-200 bg-white p-2.5 sm:p-3 shadow-2xs dark:border-orange-800/60 dark:bg-slate-900/90">
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-xs font-semibold text-slate-900 dark:text-white">Interactive Property Catalog</span>
                <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums text-[#EA580C] dark:text-orange-400">CA</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10.5px] text-slate-700 dark:text-slate-200">
                <div className="truncate rounded border border-orange-100 bg-orange-50/70 px-1.5 py-1 text-center font-medium dark:border-orange-800/60 dark:bg-orange-950/60">
                  Tour Scheduling
                </div>
                <div className="truncate rounded border border-amber-100 bg-amber-50/70 px-1.5 py-1 text-center font-medium dark:border-amber-800/60 dark:bg-amber-950/60">
                  Filter &amp; Compare
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">React · Node.js</span>
              <span className="shrink-0 font-mono font-semibold text-[#C2410C] dark:text-orange-400">dreamsdwell.ca</span>
            </div>
          </div>
        )}

        {visualType === 'rainfall-ml' && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#EFF6FF] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#111E36] dark:to-[#0C4A6E]/70 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#0284C7] dark:text-sky-400">METEOROLOGICAL ML</span>
              <span className="shrink-0 font-semibold text-[#0D9488] dark:text-teal-400">PYTHON</span>
            </div>
            <svg viewBox="0 0 220 75" className="h-20 w-full">
              <defs>
                <linearGradient id="rainAreaLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#rainAreaLight)"
                points="10,70 10,60 45,45 80,50 115,22 150,34 185,15 210,25 210,70"
              />
              <polyline
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.5"
                points="10,60 45,45 80,50 115,22 150,34 185,15 210,25"
              />
              <polyline
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                points="10,65 45,55 80,56 115,36 150,42 185,28 210,33"
              />
            </svg>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">Historical forecast trends</span>
              <span className="shrink-0 font-mono font-semibold text-[#0284C7] dark:text-sky-400">GitHub Open Source</span>
            </div>
          </div>
        )}

        {(visualType === 'claude-ai' || visualType === 'carbon-system') && (
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#FFFBEB] p-3.5 sm:p-4 text-slate-800 dark:from-[#0F172A] dark:via-[#1C1A2F] dark:to-[#451A03]/65 dark:text-slate-100">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <span className="min-w-0 truncate font-semibold text-[#C2410C] dark:text-amber-400">
                {visualType === 'claude-ai' ? 'CLAUDE TYPESCRIPT' : 'IBM CARBON UI'}
              </span>
              <span className="shrink-0 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-semibold text-[#B45309] dark:border-amber-800/80 dark:bg-amber-950/80 dark:text-amber-300">
                {visualType === 'claude-ai' ? 'AI WORKFLOW' : 'VERCEL LIVE'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['bg-[#F59E0B]', 'bg-[#3B82F6]', 'bg-[#10B981]'].map((accent, item) => (
                <div key={item} className="h-14 rounded-md border border-slate-200 bg-white p-2 shadow-2xs dark:border-slate-700 dark:bg-slate-900/90">
                  <div className={`h-1.5 w-8 rounded ${accent}`} />
                  <div className="mt-2 h-1.5 w-12 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
              <span className="min-w-0 truncate">Public Repository</span>
              <span className="shrink-0 font-mono font-semibold text-[#C2410C] dark:text-amber-400">FalihaAbdulSalam</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
