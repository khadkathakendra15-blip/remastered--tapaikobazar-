import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------- WordsPullUp ---------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
  /** Animate on mount instead of waiting to scroll into view (for above-the-fold use). */
  immediate?: boolean;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style, immediate = false }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isInView = immediate || inView;
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export interface Segment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Animate on mount instead of waiting to scroll into view (for above-the-fold use). */
  immediate?: boolean;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
  delay = 0,
  immediate = false,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isInView = immediate || inView;

  const words: { word: string; className?: string; style?: React.CSSProperties }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className, style: seg.style });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 24, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: delay + i * 0.09, ease: EASE }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em", ...w.style }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroCta {
  text: string;
  onClick?: () => void;
  href?: string;
}

export interface PrismaHeroProps {
  /** Small chip above the island. */
  kicker?: string;
  /** Editorial headline, rendered as animated word segments. */
  headline?: Segment[];
  /** Brand / locator line under the headline. */
  brandLine?: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  stats?: HeroStat[];
  blockSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  showScrollCue?: boolean;

  /* Back-compat props (used by the standalone demo). */
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showAsterisk?: boolean;
  showNav?: boolean;
  navItems?: string[];
}

const defaultHeadline: Segment[] = [
  { text: "Buy, sell &", className: "text-[#E1E0CC]" },
  {
    text: "finance",
    className: "italic text-[#FF4D5E]",
    style: { fontFamily: "'Instrument Serif', Georgia, serif" },
  },
  { text: "electric vehicles.", className: "text-[#E1E0CC]" },
];

const defaultStats: HeroStat[] = [
  { value: "5-yr", label: "In-house finance" },
  { value: "3-day", label: "Paperwork, most files" },
  { value: "300+", label: "Vehicles delivered" },
];

const PrismaHero: React.FC<PrismaHeroProps> = ({
  kicker = "Nepal's most trusted EV marketplace",
  headline,
  brandLine = "TapaikoBazar · Panipokhari, Kathmandu",
  description = "Electric vans, cars, scooters and bikes — handpicked, road-ready and financed in-house. Come see them float off the lot at Panipokhari.",
  primaryCta,
  secondaryCta,
  stats = defaultStats,
  blockSrc = "/assets/block.png",
  videoSrc = "/assets/clean_sky.mp4",
  posterSrc = "/assets/clean_sky.jpg",
  showScrollCue = true,

  // back-compat
  title,
  buttonText,
  onButtonClick,
}) => {
  const reduceMotion = useReducedMotion();

  const resolvedHeadline = headline ?? defaultHeadline;
  const primary: HeroCta =
    primaryCta ?? { text: buttonText ?? "Explore vehicles", onClick: onButtonClick };
  const brand = title ? `${title} · Panipokhari, Kathmandu` : brandLine;

  // A slow vertical drift plus a gentle tilt so the island reads as actively
  // floating through the sky rather than pinned to an invisible shelf.
  const floatAnim = reduceMotion
    ? { y: 0, rotate: -3, opacity: 1, scale: 1 }
    : { y: [-8, 8, -8], rotate: [-4.2, -2.4, -4.2], opacity: 1, scale: 1 };

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0b1a2b]">
      {/* Background sunset sky */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
      />

      {/* Vignette for edge depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, transparent 45%, rgba(6,14,26,0.55) 100%)",
        }}
      />
      {/* Top scrim so the fixed header stays legible */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/55 to-transparent" />
      {/* Bottom scrim for the headline block */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
      {/* Noise */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />

      {/* Levitating island (block.png) — staged like a cinematic landscape that
          fills the frame: a broad landmass high in the sky, its earthy base
          dissolved into a bank of backlit sunset cloud, with the headline
          reading in front of it for real depth. */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {/* Big backlit cloud bank on the right — the sunlit sky the ridge sits in */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75, x: reduceMotion ? 0 : [10, -10, 10] }}
          transition={{
            opacity: { duration: 1.8, delay: 0.2, ease: EASE },
            x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -right-[8%] top-[2%] z-0 h-[78%] w-[72%] rounded-[50%] blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,222,186,0.6), rgba(255,196,150,0.22) 52%, transparent 76%)" }}
        />

        <div className="absolute left-1/2 top-[6%] -translate-x-1/2 sm:left-[58%] sm:top-[-2%]">
          <div className="relative w-[122vw] max-w-[560px] sm:w-[82vw] sm:max-w-[880px] lg:max-w-[1020px]">
            {/* Depth cloud low-left — pushes the far side of the world back */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6, x: reduceMotion ? 0 : [-8, 8, -8] }}
              transition={{
                opacity: { duration: 1.6, delay: 0.3, ease: EASE },
                x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -left-[10%] top-[34%] z-0 h-[46%] w-[62%] rounded-[50%] blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(210,222,238,0.4), transparent 72%)" }}
            />

            {/* Warm backlight halo (sun behind the ridge, upper-right) */}
            <div
              aria-hidden
              className="absolute -top-[4%] right-[6%] z-[5] h-[62%] w-[58%] rounded-full blur-3xl mix-blend-screen"
              style={{ background: "radial-gradient(circle, rgba(255,190,120,0.55), transparent 68%)" }}
            />

            {/* The island itself — tilted, base faded, backlit-rim / shadow-side drop-shadows */}
            <motion.img
              src={blockSrc}
              alt="A Nepali island floating in the sky, carrying a TapaikoBazar van"
              initial={{ y: 28, opacity: 0, scale: 0.94, rotate: -4 }}
              animate={floatAnim}
              transition={{
                y: reduceMotion
                  ? { duration: 1 }
                  : { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotate: reduceMotion
                  ? { duration: 1 }
                  : { duration: 9, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1.3, delay: 0.2, ease: EASE },
                scale: { duration: 1.3, delay: 0.2, ease: EASE },
              }}
              className="relative z-10 w-full object-contain"
              style={{
                maskImage:
                  "linear-gradient(to bottom, #000 50%, rgba(0,0,0,0.6) 72%, rgba(0,0,0,0.15) 88%, transparent 99%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 50%, rgba(0,0,0,0.6) 72%, rgba(0,0,0,0.15) 88%, transparent 99%)",
                filter:
                  "drop-shadow(12px 8px 6px rgba(255,182,112,0.5)) drop-shadow(0 10px 4px rgba(255,214,160,0.34)) drop-shadow(-16px 10px 12px rgba(4,10,26,0.5)) drop-shadow(0 48px 66px rgba(0,0,0,0.6))",
              }}
            />

            {/* Foreground clouds burying the earthy base */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: reduceMotion ? 0.82 : [0.72, 0.94, 0.72], x: reduceMotion ? 0 : [-18, 14, -18] }}
              transition={{
                opacity: { duration: reduceMotion ? 1 : 9, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" },
                x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-[10%] left-1/2 z-30 h-[26%] w-[96%] -translate-x-1/2 rounded-[50%] blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 50%, rgba(255,238,218,0.92), rgba(255,214,172,0.4) 55%, transparent 78%)",
              }}
            />
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: reduceMotion ? 0.88 : [0.8, 1, 0.8], x: reduceMotion ? 0 : [16, -14, 16] }}
              transition={{
                opacity: { duration: reduceMotion ? 1 : 11, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" },
                x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-[0%] left-1/2 z-30 h-[30%] w-[124%] -translate-x-1/2 rounded-[50%] blur-3xl"
              style={{
                background:
                  "radial-gradient(55% 100% at 50% 45%, rgba(255,226,200,0.9), rgba(250,182,142,0.35) 60%, transparent 80%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 flex h-full flex-col justify-between px-5 pb-8 pt-24 sm:px-8 md:px-12 md:pb-10">
        {/* Kicker */}
        {kicker && (
          <div className="flex justify-center">
            <motion.span
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#E1E0CC] backdrop-blur-md sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D5E]" />
              {kicker}
            </motion.span>
          </div>
        )}

        {/* Bottom block */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
          {/* Headline + brand line */}
          <div className="col-span-12 lg:col-span-6">
            <h1
              className="text-[13vw] font-semibold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <WordsPullUpMultiStyle segments={resolvedHeadline} delay={0.35} immediate />
            </h1>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#E1E0CC]/70 sm:text-sm"
            >
              <MapPin className="h-4 w-4 text-[#FF4D5E]" />
              {brand}
            </motion.p>
          </div>

          {/* Description + CTAs */}
          <div className="col-span-12 flex flex-col gap-5 lg:col-span-5 lg:col-start-8 lg:pb-2">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="max-w-md text-sm leading-relaxed text-[#E1E0CC]/85 sm:text-base"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={primary.onClick}
                className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-black shadow-lg transition-all hover:gap-3 hover:bg-white sm:text-base"
              >
                {primary.text}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                </span>
              </button>

              {secondaryCta && (
                secondaryCta.href ? (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-[#E1E0CC] transition-colors hover:border-white/70 hover:bg-white/10 sm:text-base"
                  >
                    {secondaryCta.text}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={secondaryCta.onClick}
                    className="inline-flex items-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-[#E1E0CC] transition-colors hover:border-white/70 hover:bg-white/10 sm:text-base"
                  >
                    {secondaryCta.text}
                  </button>
                )
              )}
            </motion.div>

            {/* Trust stats */}
            {stats && stats.length > 0 && (
              <motion.dl
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
                className="mt-1 hidden flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-4 sm:flex"
              >
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="text-lg font-semibold text-[#E1E0CC] sm:text-xl">{s.value}</dt>
                    <dd className="text-[11px] uppercase tracking-[0.12em] text-[#E1E0CC]/60 sm:text-xs">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {showScrollCue && (
        <motion.button
          type="button"
          onClick={primary.onClick}
          aria-label="Scroll to vehicles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-[#E1E0CC]/70 transition-colors hover:text-[#E1E0CC] md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      )}
    </section>
  );
};

export { PrismaHero };
