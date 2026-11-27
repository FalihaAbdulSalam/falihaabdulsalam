import { motion, useReducedMotion } from 'motion/react';

export function HeroWorkspaceIllustration() {
  return (
    <div
      aria-hidden="true"
      data-testid="coding-workspace-illustration"
      className="pointer-events-none select-none"
    >
      <svg
        viewBox="0 0 380 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-xs"
      >
        <defs>
          <linearGradient id="archWebBar" x1="48" y1="36" x2="276" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDF3EC" />
            <stop offset="100%" stopColor="#F1F7F1" />
          </linearGradient>
          <linearGradient id="archAccentLine" x1="64" y1="68" x2="184" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2502A" />
            <stop offset="50%" stopColor="#7B2B52" />
            <stop offset="100%" stopColor="#15795B" />
          </linearGradient>
          <linearGradient id="sparkArea" x1="129" y1="142" x2="129" y2="174" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF8A5C" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FF8A5C" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle Architectural Grid Circle & Connector Paths */}
        <circle
          cx="186"
          cy="116"
          r="88"
          stroke="#FBC4AE"
          strokeOpacity="0.48"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <motion.path
          d="M28 118 Q48 118 52 96 M268 62 Q296 42 324 52"
          stroke="#9E3A66"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Responsive Web Portal Browser Frame */}
        <g>
          <rect
            x="44"
            y="32"
            width="236"
            height="162"
            rx="14"
            className="fill-white stroke-[#DCCFC7] dark:fill-[#1A1016] dark:stroke-slate-700"
            strokeWidth="1.5"
          />
          {/* Browser Chrome Header */}
          <path
            d="M44 46 C44 38.268 50.268 32 58 32 H266 C273.732 32 280 38.268 280 46 V58 H44 V46 Z"
            className="fill-[url(#archWebBar)] dark:fill-slate-800/95"
          />
          <line x1="44" y1="58" x2="280" y2="58" className="stroke-[#EADFD8] dark:stroke-slate-700" strokeWidth="1.2" />
          <circle cx="60" cy="45" r="3.5" fill="#A96F14" />
          <circle cx="72" cy="45" r="3.5" fill="#D9A441" />
          <circle cx="84" cy="45" r="3.5" fill="#1E8E63" />
          <rect
            x="100"
            y="39"
            width="112"
            height="12"
            rx="6"
            className="fill-white stroke-[#EADFD8] dark:fill-slate-900 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <text x="112" y="48" className="fill-[#7A6A64] dark:fill-orange-300" fontFamily="monospace" fontSize="7.5" fontWeight="600">
            app.kerala.gov.in
          </text>

          {/* Left Sidebar Component Tree */}
          <rect
            x="56"
            y="70"
            width="54"
            height="110"
            rx="8"
            className="fill-[#FDF8F4] stroke-[#EADFD8] dark:fill-slate-800/80 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <rect x="64" y="80" width="38" height="6" rx="3" fill="#E2502A" />
          <rect x="64" y="94" width="32" height="5" rx="2.5" className="fill-[#DCCFC7] dark:fill-slate-600" />
          <rect x="64" y="106" width="36" height="5" rx="2.5" className="fill-[#C7EBDD] dark:fill-emerald-500/70" />
          <rect x="64" y="118" width="28" height="5" rx="2.5" className="fill-[#DCCFC7] dark:fill-slate-600" />
          <rect x="64" y="130" width="34" height="5" rx="2.5" className="fill-[#EED3DE] dark:fill-rose-500/70" />
          {/* Design System Swatch Dots */}
          <circle cx="69" cy="162" r="4" fill="#E2502A" />
          <circle cx="81" cy="162" r="4" fill="#15795B" />
          <circle cx="93" cy="162" r="4" fill="#C08A1E" />

          {/* Main Dashboard UI Layout Grid */}
          <rect
            x="120"
            y="70"
            width="144"
            height="44"
            rx="8"
            className="fill-[#FDF8F4] stroke-[#EADFD8] dark:fill-slate-800/80 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <rect x="130" y="80" width="84" height="6" rx="3" fill="url(#archAccentLine)" />
          <rect x="130" y="92" width="114" height="4.5" rx="2.25" className="fill-[#DCCFC7] dark:fill-slate-600" />
          <rect x="130" y="101" width="76" height="4.5" rx="2.25" className="fill-[#EADFD8] dark:fill-slate-700" />

          {/* Metrics Sparkline Chart Card */}
          <rect
            x="120"
            y="122"
            width="88"
            height="58"
            rx="8"
            className="fill-white stroke-[#FBD9C9] dark:fill-slate-800/90 dark:stroke-orange-700/70"
            strokeWidth="1.2"
          />
          <text x="129" y="136" className="fill-[#9A2E12] dark:fill-orange-300" fontFamily="monospace" fontSize="8" fontWeight="700">
            UI Metrics
          </text>
          <path
            d="M129 166 L144 156 L159 161 L176 144 L196 149 L196 174 L129 174 Z"
            fill="url(#sparkArea)"
          />
          <motion.path
            d="M129 166 L144 156 L159 161 L176 144 L196 149"
            stroke="#FF8A5C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
          <circle cx="176" cy="144" r="3" fill="#15795B" stroke="#FFFFFF" strokeWidth="1.2" className="animate-node-breathe" />

          {/* Component Status Tile */}
          <rect
            x="215"
            y="122"
            width="49"
            height="58"
            rx="8"
            className="fill-[#F1F7F1] stroke-[#C7EBDD] dark:fill-emerald-950/70 dark:stroke-emerald-700/70"
            strokeWidth="1.2"
          />
          <circle cx="239.5" cy="144" r="10" className="fill-white dark:fill-slate-900" stroke="#15795B" strokeWidth="2" />
          <motion.path
            d="M235 144 L238.5 147.5 L245 140.5"
            stroke="#2AA37C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <rect x="225" y="162" width="29" height="5" rx="2.5" className="fill-[#116248]/35 dark:fill-emerald-400/50" />
        </g>

        {/* Overlapping React Native Mobile App Frame */}
        <g className="animate-float-slow">
          <rect
            x="246"
            y="72"
            width="88"
            height="138"
            rx="16"
            className="fill-white stroke-[#A9978E] dark:fill-[#1A1016] dark:stroke-slate-600"
            strokeWidth="1.8"
          />
          {/* Phone Notch */}
          <rect x="276" y="80" width="28" height="4" rx="2" className="fill-[#DCCFC7] dark:fill-slate-700" />
          {/* Mobile Screen Header */}
          <rect
            x="256"
            y="92"
            width="68"
            height="28"
            rx="7"
            className="fill-[#FDF3EC] stroke-[#FBD9C9] dark:fill-orange-950/80 dark:stroke-orange-700/70"
            strokeWidth="1"
          />
          <circle cx="268" cy="106" r="5" fill="#E2502A" />
          <rect x="278" y="101" width="36" height="4" rx="2" className="fill-[#9A2E12] dark:fill-orange-300" />
          <rect x="278" y="108" width="24" height="3.5" rx="1.75" fill="#FB9E7A" />
          {/* Mobile Action Cards */}
          <rect
            x="256"
            y="127"
            width="32"
            height="32"
            rx="7"
            className="fill-[#F1F7F1] stroke-[#C7EBDD] dark:fill-emerald-950/70 dark:stroke-emerald-700/70"
            strokeWidth="1"
          />
          <circle cx="272" cy="139" r="5" fill="#15795B" fillOpacity="0.25" />
          <rect x="262" y="149" width="20" height="3.5" rx="1.75" fill="#2AA37C" />
          <rect
            x="292"
            y="127"
            width="32"
            height="32"
            rx="7"
            className="fill-[#FCF4F6] stroke-[#EED3DE] dark:fill-rose-950/70 dark:stroke-rose-700/70"
            strokeWidth="1"
          />
          <circle cx="308" cy="139" r="5" fill="#7B2B52" fillOpacity="0.25" />
          <rect x="298" y="149" width="20" height="3.5" rx="1.75" fill="#C97AA2" />
          {/* Bottom Tab Bar */}
          <rect
            x="256"
            y="168"
            width="68"
            height="28"
            rx="7"
            className="fill-[#FDF8F4] stroke-[#EADFD8] dark:fill-slate-800 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <circle cx="271" cy="182" r="3" fill="#FF8A5C" />
          <circle cx="290" cy="182" r="3" className="fill-[#DCCFC7] dark:fill-slate-600" />
          <circle cx="309" cy="182" r="3" className="fill-[#DCCFC7] dark:fill-slate-600" />
          <text x="263" y="203" className="fill-[#574842] dark:fill-slate-300" fontFamily="monospace" fontSize="7" fontWeight="700">
            React Native
          </text>
        </g>

        {/* Meaningful Floating Tech Chip: React 19 + TS */}
        <g className="animate-float-slow" style={{ animationDelay: '0.8s' }}>
          <rect
            x="14"
            y="96"
            width="84"
            height="36"
            rx="10"
            className="fill-white stroke-[#FBD9C9] dark:fill-slate-900 dark:stroke-orange-600/70"
            strokeWidth="1.5"
          />
          <circle cx="28" cy="114" r="5" fill="#FF8A5C" fillOpacity="0.25" stroke="#FF8A5C" strokeWidth="1.5" />
          <text x="38" y="118" className="fill-[#2A1B22] dark:fill-slate-100" fontFamily="monospace" fontSize="9.5" fontWeight="700">
            &lt;React19 /&gt;
          </text>
        </g>

        {/* Floating API / State Sync Chip */}
        <g className="animate-float-alt" style={{ animationDelay: '1.3s' }}>
          <rect
            x="266"
            y="22"
            width="94"
            height="32"
            rx="10"
            className="fill-white stroke-[#C7EBDD] dark:fill-slate-900 dark:stroke-emerald-600/70"
            strokeWidth="1.5"
          />
          <circle cx="280" cy="38" r="3.5" fill="#1E8E63" className="animate-node-breathe" />
          <text x="289" y="41.5" className="fill-[#116248] dark:fill-emerald-300" fontFamily="monospace" fontSize="9.5" fontWeight="700">
            REST + TS
          </text>
        </g>
      </svg>
    </div>
  );
}

export function CodeVectorBackdrop({ variant = 'light' }: { variant?: 'light' | 'colorful' }) {
  const strokeColor = variant === 'colorful' ? '#8E2F5B' : '#7A6A64';
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.34] dark:opacity-[0.26]"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 600"
      fill="none"
    >
      {/* Subtle Architectural Geometry & Wireframe Motifs */}
      <g stroke={strokeColor} strokeOpacity="0.45" strokeWidth="1.6">
        <rect x="1030" y="250" width="96" height="62" rx="8" />
        <path d="M1018 318 H1138" strokeLinecap="round" strokeWidth="2.2" />
        <line x1="1046" y1="268" x2="1095" y2="268" />
        <line x1="1046" y1="280" x2="1110" y2="280" />
        <line x1="1046" y1="292" x2="1082" y2="292" />
      </g>

      {/* Orbital vector nodes */}
      <circle
        cx="145"
        cy="300"
        r="34"
        stroke="#15795B"
        strokeOpacity="0.45"
        strokeDasharray="6 6"
        strokeWidth="1.6"
      />
      <circle cx="179" cy="300" r="4.5" fill="#2AA37C" fillOpacity="0.7" className="animate-node-breathe" />
      <circle cx="1078" cy="405" r="24" stroke="#FF8A5C" strokeOpacity="0.45" strokeWidth="1.6" />
      <path d="M620 44 L636 60 L620 76 L604 60 Z" stroke="#E0B45C" strokeOpacity="0.52" strokeWidth="1.8" />
      <path
        d="M52 104 L88 104 M70 86 L70 122"
        stroke="#FF8A5C"
        strokeOpacity="0.45"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M1080 96 C1116 96 1136 120 1136 154"
        stroke="#5CC4A0"
        strokeOpacity="0.42"
        strokeWidth="1.6"
        strokeDasharray="5 5"
      />
    </svg>
  );
}

export function ProjectsBlueprintBackdrop() {
  return (
    <svg
      aria-hidden="true"
      data-testid="projects-blueprint-vector"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.42] dark:opacity-[0.28]"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 820"
      fill="none"
    >
      {/* Subtle isometric wireframe UI cards floating in margins */}
      <g className="animate-float-slow" stroke="#8E2F5B" strokeOpacity="0.28" strokeWidth="1.4">
        <rect x="44" y="90" width="128" height="84" rx="12" />
        <line x1="44" y1="112" x2="172" y2="112" />
        <circle cx="60" cy="101" r="2.8" fill="#9E3A66" fillOpacity="0.45" stroke="none" />
        <circle cx="70" cy="101" r="2.8" fill="#15795B" fillOpacity="0.45" stroke="none" />
        <rect x="58" y="124" width="46" height="34" rx="6" />
        <rect x="112" y="124" width="46" height="14" rx="4" />
        <rect x="112" y="144" width="34" height="14" rx="4" />
      </g>

      {/* Right margin modular grid & flowing Bézier route */}
      <g className="animate-float-alt" stroke="#15795B" strokeOpacity="0.3" strokeWidth="1.4">
        <rect x="1266" y="130" width="132" height="96" rx="14" />
        <path d="M1284 188 L1312 166 L1338 176 L1374 148" stroke="#15795B" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="1374" cy="148" r="4" fill="#2AA37C" fillOpacity="0.6" stroke="none" className="animate-node-breathe" />
      </g>

      {/* Flowing architectural arcs */}
      <path
        d="M-40 420 C220 320 420 520 720 410 C1020 300 1220 480 1480 390"
        stroke="#9E3A66"
        strokeOpacity="0.24"
        strokeWidth="1.5"
        strokeDasharray="7 7"
      />
      <path
        d="M-40 690 C280 610 560 760 880 660 C1140 580 1300 710 1480 650"
        stroke="#C08A1E"
        strokeOpacity="0.2"
        strokeWidth="1.4"
        strokeDasharray="6 8"
      />
    </svg>
  );
}

export function ExperienceRoadmapVector() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      data-testid="experience-roadmap-vector"
      className="pointer-events-none hidden lg:block select-none"
    >
      <svg viewBox="0 0 340 120" className="h-[116px] w-[330px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="roadmapBeam" x1="22" y1="60" x2="318" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A9701A" />
            <stop offset="35%" stopColor="#7B2B52" />
            <stop offset="70%" stopColor="#15795B" />
            <stop offset="100%" stopColor="#E2502A" />
          </linearGradient>
        </defs>

        {/* Soft container card */}
        <rect
          x="4"
          y="8"
          width="332"
          height="104"
          rx="16"
          className="fill-white/85 stroke-emerald-200/80 dark:fill-[#1A1016]/85 dark:stroke-slate-700/80"
          strokeWidth="1.2"
        />

        {/* Scroll-drawn milestone spline */}
        <motion.path
          d="M36 74 C76 74 88 46 128 46 C168 46 180 74 220 74 C260 74 270 42 306 42"
          stroke="url(#roadmapBeam)"
          strokeWidth="2.8"
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 4 Career Milestone Nodes */}
        {[
          { cx: 36, cy: 74, year: '2022', fill: '#A9701A' },
          { cx: 128, cy: 46, year: '2023', fill: '#7B2B52' },
          { cx: 220, cy: 74, year: '2024', fill: '#15795B' },
          { cx: 306, cy: 42, year: 'Now', fill: '#E2502A' },
        ].map((node, i) => (
          <g key={node.year}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="10"
              fill={node.fill}
              fillOpacity="0.16"
              className={i === 3 ? 'animate-node-breathe' : undefined}
            />
            <circle cx={node.cx} cy={node.cy} r="5.5" fill={node.fill} stroke="#FFFFFF" strokeWidth="1.8" />
            <text
              x={node.cx}
              y={node.cy > 60 ? node.cy + 22 : node.cy - 14}
              textAnchor="middle"
              className="fill-slate-600 dark:fill-slate-300"
              fontFamily="monospace"
              fontSize="9"
              fontWeight="600"
            >
              {node.year}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function CapabilitiesArchitectureIllustration() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      data-testid="capabilities-architecture-vector"
      className="pointer-events-none select-none"
    >
      <svg
        viewBox="0 0 460 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[460px]"
      >
        <defs>
          <linearGradient id="capFlow" x1="40" y1="66" x2="420" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2502A" />
            <stop offset="50%" stopColor="#15795B" />
            <stop offset="100%" stopColor="#C08A1E" />
          </linearGradient>
        </defs>

        <rect
          x="2"
          y="6"
          width="456"
          height="120"
          rx="18"
          className="fill-white/90 stroke-rose-200/80 dark:fill-[#1A1016]/90 dark:stroke-slate-700/80"
          strokeWidth="1.2"
        />

        {/* Scroll-drawn Data Flow Connectors between 4 Layers */}
        <motion.path
          d="M108 66 H142 M224 66 H258 M340 66 H368"
          stroke="url(#capFlow)"
          strokeWidth="2.2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Node 1: UI Systems */}
        <g className="animate-float-slow">
          <rect
            x="22"
            y="34"
            width="86"
            height="64"
            rx="12"
            className="fill-orange-50/90 stroke-orange-200 dark:fill-orange-950/75 dark:stroke-orange-700/70"
            strokeWidth="1.2"
          />
          <rect x="34" y="46" width="26" height="5" rx="2.5" fill="#E2502A" />
          <rect x="34" y="56" width="60" height="4" rx="2" className="fill-orange-200 dark:fill-orange-800" />
          <text x="34" y="83" className="fill-[#B93B18] dark:fill-orange-300" fontFamily="monospace" fontSize="9.5" fontWeight="700">
            UI Systems
          </text>
        </g>

        {/* Node 2: State & APIs */}
        <g className="animate-float-alt" style={{ animationDelay: '0.5s' }}>
          <rect
            x="140"
            y="34"
            width="84"
            height="64"
            rx="12"
            className="fill-emerald-50/90 stroke-emerald-200 dark:fill-emerald-950/75 dark:stroke-emerald-700/70"
            strokeWidth="1.2"
          />
          <circle cx="156" cy="52" r="5" fill="#15795B" />
          <circle cx="174" cy="52" r="5" fill="#2AA37C" fillOpacity="0.45" />
          <line x1="161" y1="52" x2="169" y2="52" stroke="#15795B" strokeWidth="1.5" />
          <text x="150" y="83" className="fill-[#116248] dark:fill-emerald-300" fontFamily="monospace" fontSize="9.5" fontWeight="700">
            REST + TS
          </text>
        </g>

        {/* Node 3: Motion + AI */}
        <g className="animate-float-slow" style={{ animationDelay: '1s' }}>
          <rect
            x="256"
            y="34"
            width="84"
            height="64"
            rx="12"
            className="fill-rose-50/90 stroke-rose-200 dark:fill-rose-950/75 dark:stroke-rose-700/70"
            strokeWidth="1.2"
          />
          <path d="M270 57 Q284 42 298 53 T326 48" stroke="#7B2B52" strokeWidth="2.2" strokeLinecap="round" />
          <text x="266" y="83" className="fill-[#5E1F40] dark:fill-rose-300" fontFamily="monospace" fontSize="9.5" fontWeight="700">
            Motion+AI
          </text>
        </g>

        {/* Node 4: Ship Live */}
        <g className="animate-float-alt" style={{ animationDelay: '1.4s' }}>
          <rect
            x="368"
            y="34"
            width="72"
            height="64"
            rx="12"
            className="fill-amber-50/90 stroke-amber-200 dark:fill-amber-950/70 dark:stroke-amber-700/70"
            strokeWidth="1.2"
          />
          <circle cx="404" cy="54" r="9" className="fill-white dark:fill-slate-900" stroke="#C08A1E" strokeWidth="2" />
          <path d="M400 54 L403 57 L409 51" stroke="#C08A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="383" y="83" className="fill-[#96650F] dark:fill-amber-300" fontFamily="monospace" fontSize="9.5" fontWeight="700">
            Ship 10k+
          </text>
        </g>
      </svg>
    </div>
  );
}

export function ContactDispatchIllustration() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      data-testid="contact-dispatch-vector"
      className="pointer-events-none mt-7 select-none"
    >
      <svg
        viewBox="0 0 380 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[380px]"
      >
        <defs>
          <linearGradient id="dispatchArc" x1="34" y1="90" x2="340" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2502A" />
            <stop offset="50%" stopColor="#7B2B52" />
            <stop offset="100%" stopColor="#15795B" />
          </linearGradient>
        </defs>

        <rect
          x="2"
          y="4"
          width="376"
          height="116"
          rx="16"
          className="fill-white/85 stroke-rose-200/80 dark:fill-[#1A1016]/85 dark:stroke-slate-700/80"
          strokeWidth="1.2"
        />

        {/* Scroll-drawn trajectory arc */}
        <motion.path
          d="M52 88 C116 24 228 24 316 58"
          stroke="url(#dispatchArc)"
          strokeWidth="2.2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Origin Node: Kerala Hub */}
        <circle cx="52" cy="88" r="14" fill="#E2502A" fillOpacity="0.14" className="animate-node-breathe" />
        <circle cx="52" cy="88" r="6" fill="#E2502A" stroke="#FFFFFF" strokeWidth="1.8" />
        <text x="26" y="110" className="fill-slate-600 dark:fill-slate-300" fontFamily="monospace" fontSize="8.5" fontWeight="600">
          Kerala, IN
        </text>

        {/* Floating Paper Plane / Message Vector */}
        <g className="animate-float-slow">
          <path
            d="M174 42 L202 32 L190 58 L184 48 L174 42 Z"
            fill="#8E2F5B"
            className="dark:fill-orange-400"
          />
          <path d="M184 48 L202 32" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
        </g>

        {/* Destination Card: Direct Response */}
        <g className="animate-float-alt">
          <rect
            x="252"
            y="40"
            width="106"
            height="56"
            rx="10"
            className="fill-[#F1F7F1] stroke-emerald-200 dark:fill-emerald-950/70 dark:stroke-emerald-700/70"
            strokeWidth="1.2"
          />
          <rect x="264" y="53" width="46" height="5" rx="2.5" fill="#15795B" />
          <rect x="264" y="64" width="80" height="4" rx="2" className="fill-emerald-200 dark:fill-emerald-800" />
          <rect x="264" y="74" width="62" height="4" rx="2" className="fill-emerald-200/80 dark:fill-emerald-800/80" />
        </g>
      </svg>
    </div>
  );
}

export function HeroFloatingTechIcons() {
  return (
    <div
      aria-hidden="true"
      data-testid="hero-floating-3d-icons"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* 1. Floating 3D React Icon — Open Gutter / Above Illustration on Mobile */}
      <div className="absolute left-2 top-[58%] scale-75 opacity-55 sm:left-2 sm:top-4 sm:scale-90 sm:opacity-75 xl:left-4 xl:top-10 xl:scale-100">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-orange-400/35">
          <div className="animate-orbit-path absolute inset-0 flex items-start justify-center">
            <div className="animate-orbit-counter -mt-5">
              <div
                data-testid="floating-3d-react"
                style={{ transform: 'perspective(520px) rotateX(14deg) rotateY(-16deg) rotate(-6deg)' }}
                className="relative flex h-13 w-13 items-center justify-center rounded-2xl border border-white/90 bg-gradient-to-br from-white/95 via-[#FDF3EC]/95 to-[#FBEADF]/90 shadow-[0_10px_22px_-6px_rgba(226,80,42,0.28),0_5px_0_0_rgba(147,197,253,0.9),inset_0_1px_1px_rgba(255,255,255,1)] dark:border-orange-400/45 dark:from-slate-800/95 dark:via-[#241320]/95 dark:to-[#4A1E12]/90 dark:shadow-[0_10px_24px_-6px_rgba(255,138,92,0.45),0_5px_0_0_rgba(30,58,138,0.85),inset_0_1px_1px_rgba(255,255,255,0.22)]"
              >
                <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="reactCore3d" cx="40%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#FFB695" />
                      <stop offset="55%" stopColor="#C4421E" />
                      <stop offset="100%" stopColor="#B93B18" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#FB7A4A" strokeWidth="2.1" />
                  <ellipse
                    cx="24"
                    cy="24"
                    rx="18"
                    ry="7"
                    transform="rotate(60 24 24)"
                    stroke="#F4724A"
                    strokeOpacity="0.9"
                    strokeWidth="2.1"
                  />
                  <ellipse
                    cx="24"
                    cy="24"
                    rx="18"
                    ry="7"
                    transform="rotate(120 24 24)"
                    stroke="#1F8F72"
                    strokeOpacity="0.9"
                    strokeWidth="2.1"
                  />
                  <circle cx="24" cy="24" r="4" fill="url(#reactCore3d)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Floating 3D TypeScript Icon — Center-Top Air Gap */}
      <div className="hidden lg:block absolute left-[48%] top-5 -translate-x-1/2 opacity-75 dark:opacity-85">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-rose-400/35">
          <div
            className="animate-orbit-path-reverse absolute inset-0 flex items-end justify-center"
            style={{ animationDelay: '-6s' }}
          >
            <div className="animate-orbit-counter-reverse -mb-6" style={{ animationDelay: '-6s' }}>
              <div
                data-testid="floating-3d-typescript"
                style={{ transform: 'perspective(520px) rotateX(12deg) rotateY(16deg) rotate(5deg)' }}
                className="relative flex h-13 w-13 items-center justify-center rounded-2xl border border-orange-300/80 bg-gradient-to-br from-[#FB9E7A] via-[#E2502A] to-[#B93B18] shadow-[0_10px_22px_-6px_rgba(226,80,42,0.34),0_5px_0_0_rgba(30,64,175,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.55)] dark:border-orange-400/60"
              >
                <svg viewBox="0 0 44 44" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="36" height="36" rx="8" fill="white" fillOpacity="0.12" />
                  <text
                    x="13"
                    y="31"
                    fill="#FFFFFF"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontSize="18"
                    fontWeight="800"
                    letterSpacing="-0.5"
                  >
                    TS
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating 3D React Native Icon — Right Gutter / Lower Corner on Mobile */}
      <div className="absolute right-2 top-[68%] scale-75 opacity-55 sm:right-3 sm:top-[38%] sm:scale-90 sm:opacity-75 xl:right-6 xl:scale-100">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-emerald-400/35">
          <div
            className="animate-orbit-path absolute inset-0 flex items-center justify-end"
            style={{ animationDelay: '-11s' }}
          >
            <div className="animate-orbit-counter -mr-6" style={{ animationDelay: '-11s' }}>
              <div
                data-testid="floating-3d-react-native"
                style={{ transform: 'perspective(520px) rotateX(12deg) rotateY(-14deg) rotate(6deg)' }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/90 bg-gradient-to-br from-white/95 via-[#F1F7F1]/95 to-[#E4F3EA]/90 shadow-[0_10px_22px_-6px_rgba(21,121,91,0.26),0_5px_0_0_rgba(94,234,212,0.9),inset_0_1px_1px_rgba(255,255,255,1)] dark:border-emerald-400/45 dark:from-slate-800/95 dark:via-[#10201A]/95 dark:to-[#0E4433]/90 dark:shadow-[0_10px_24px_-6px_rgba(42,163,124,0.45),0_5px_0_0_rgba(17,94,89,0.85),inset_0_1px_1px_rgba(255,255,255,0.22)]"
              >
                <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Mobile Device Frame */}
                  <rect
                    x="13"
                    y="5"
                    width="22"
                    height="38"
                    rx="5"
                    className="fill-white stroke-[#116248] dark:fill-slate-900 dark:stroke-emerald-400"
                    strokeWidth="2"
                  />
                  <rect x="20.5" y="8" width="7" height="1.8" rx="0.9" fill="#C7EBDD" />
                  <circle cx="24" cy="39" r="1.4" fill="#2AA37C" />
                  {/* Nested React Atom inside Native Screen */}
                  <ellipse cx="24" cy="23" rx="7.2" ry="2.8" stroke="#2AA37C" strokeWidth="1.3" />
                  <ellipse
                    cx="24"
                    cy="23"
                    rx="7.2"
                    ry="2.8"
                    transform="rotate(60 24 23)"
                    stroke="#A8457A"
                    strokeWidth="1.3"
                  />
                  <ellipse
                    cx="24"
                    cy="23"
                    rx="7.2"
                    ry="2.8"
                    transform="rotate(120 24 23)"
                    stroke="#F4724A"
                    strokeWidth="1.3"
                  />
                  <circle cx="24" cy="23" r="1.8" fill="#2AA37C" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
