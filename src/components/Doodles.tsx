import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.9, ease: "easeInOut" as const },
      opacity: { delay, duration: 0.15 },
    },
  }),
};

type DoodleProps = {
  className?: string;
  delay?: number;
  stroke?: string;
};

/** Hand-drawn circled scribble (for emphasising a word) */
export function CircleScribble({ className = "", delay = 0, stroke = "#3D6B5D" }: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 220 70"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-hidden
    >
      <motion.path
        d="M112 8C60 4 12 16 9 36c-3 21 44 30 102 28 59-2 104-13 100-32C208 14 160 3 96 8"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={draw}
        custom={delay}
      />
    </motion.svg>
  );
}

/** Rough underline stroke */
export function SketchUnderline({ className = "", delay = 0, stroke = "#3D6B5D" }: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 240 14"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-hidden
    >
      <motion.path
        d="M4 9c40-5 90-6 118-4 30 2-16 4 6 5 30 1 78-5 108-6"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        variants={draw}
        custom={delay}
      />
    </motion.svg>
  );
}

/** Curvy annotation arrow */
export function CurvedArrow({ className = "", delay = 0, stroke = "#5B6C8F", flip = false }: DoodleProps & { flip?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 90 70"
      fill="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-hidden
    >
      <motion.path
        d="M6 6c8 30 30 50 68 52"
        stroke={stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        variants={draw}
        custom={delay}
      />
      <motion.path
        d="M62 48l13 10-15 6"
        stroke={stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={delay + 0.55}
      />
    </motion.svg>
  );
}

/** Small asterisk / star mark */
export function StarMark({ className = "", delay = 0, stroke = "#3D6B5D" }: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-hidden
    >
      {["M20 5v30", "M6 12l28 16", "M34 12L6 28"].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={stroke}
          strokeWidth="2.25"
          strokeLinecap="round"
          variants={draw}
          custom={delay + i * 0.12}
        />
      ))}
    </motion.svg>
  );
}

/** Sparse crosses, like blueprint registration marks */
export function CrossMark({ className = "", delay = 0, stroke = "#B7B1A5" }: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-hidden
    >
      <motion.path d="M12 3v18" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" variants={draw} custom={delay} />
      <motion.path d="M3 12h18" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" variants={draw} custom={delay + 0.2} />
    </motion.svg>
  );
}

/** Tiny sparse squiggle divider */
export function Squiggle({ className = "", delay = 0, stroke = "#B7B1A5" }: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 120 16"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      aria-hidden
    >
      <motion.path
        d="M3 9c6-7 12-7 18 0s12 7 18 0 12-7 18 0 12 7 18 0 12-7 18 0 12 7 18 0"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        custom={delay}
      />
    </motion.svg>
  );
}

/** Minimal system-diagram sketch for the hero: data -> model -> insight */
export function HeroDiagram({ className = "" }: { className?: string }) {
  const ink = "#1F1F1F";
  const green = "#3D6B5D";
  const blue = "#5B6C8F";
  return (
    <motion.svg
      viewBox="0 0 340 300"
      fill="none"
      className={className}
      initial="hidden"
      animate="visible"
      aria-hidden
    >
      {/* database cylinder */}
      <motion.ellipse cx="70" cy="46" rx="38" ry="13" stroke={ink} strokeWidth="2" variants={draw} custom={0.4} />
      <motion.path d="M32 46v40c0 7.5 17 13.5 38 13.5s38-6 38-13.5V46" stroke={ink} strokeWidth="2" strokeLinecap="round" variants={draw} custom={0.55} />
      <motion.text x="70" y="132" textAnchor="middle" fill={ink} fontFamily="Caveat, cursive" fontSize="21" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.1 } }}>
        raw data
      </motion.text>

      {/* arrow to model */}
      <motion.path d="M118 70c40 14 62 34 78 66" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" variants={draw} custom={0.9} />
      <motion.path d="M188 122l9 16-18-2" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={draw} custom={1.4} />

      {/* model box */}
      <motion.path
        d="M170 150h116c3 0 4 2 4 5l-2 52c0 3-2 5-5 5H172c-3 0-5-2-5-5l-1-52c0-3 1-5 4-5z"
        stroke={green}
        strokeWidth="2.25"
        variants={draw}
        custom={1.3}
      />
      <motion.text x="228" y="176" textAnchor="middle" fill={green} fontFamily="Caveat, cursive" fontSize="22" fontWeight="600" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2 } }}>
        ML model
      </motion.text>
      {/* little weights ticks inside */}
      <motion.path d="M186 192h84" stroke={green} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 6" variants={draw} custom={1.9} />

      {/* arrow to chart */}
      <motion.path d="M226 214c-14 26-42 42-84 46" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" variants={draw} custom={2.1} />
      <motion.path d="M156 252l-16 9 15 8" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" variants={draw} custom={2.6} />

      {/* forecast chart */}
      <motion.path d="M22 190v86h96" stroke={ink} strokeWidth="2" strokeLinecap="round" variants={draw} custom={2.3} />
      <motion.path d="M30 262c12-8 18-30 28-28 11 2 12 18 24 14 13-4 14-30 30-36" stroke={green} strokeWidth="2.5" strokeLinecap="round" variants={draw} custom={2.7} />
      <motion.circle cx="112" cy="212" r="3.25" fill={green} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 3.5, type: "spring" } }} />
      <motion.text x="128" y="208" fill={ink} fontFamily="Caveat, cursive" fontSize="20" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 3.6 } }}>
        forecast
      </motion.text>

      {/* accuracy annotation */}
      <motion.text x="300" y="120" textAnchor="middle" fill={blue} fontFamily="Caveat, cursive" fontSize="19" initial={{ opacity: 0, rotate: -4 }} animate={{ opacity: 1, transition: { delay: 2.4 } }}>
        ~80% acc.
      </motion.text>
    </motion.svg>
  );
}

/** Simple animated flow diagram used on project cards */
export function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <span className="sketch-border-soft bg-paper px-2.5 py-1 font-mono text-[10.5px] text-ink-soft whitespace-nowrap">
            {s}
          </span>
          {i < steps.length - 1 && (
            <svg viewBox="0 0 28 12" className="mx-0.5 h-3 w-6 shrink-0" fill="none" aria-hidden>
              <path d="M2 6h20m0 0l-5-4m5 4l-5 4" stroke="#B7B1A5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
