"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VolumetricStudio } from "@/components/ui/volumetric-studio";
import { useMediaQuery } from "@/lib/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface HeroSegment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}
export interface HeroCta {
  text: string;
  onClick?: () => void;
  href?: string;
}
export interface HeroStat {
  value: string;
  label: string;
}

export interface VolumetricHeroProps {
  kicker?: string;
  headline?: HeroSegment[];
  brandLine?: string;
  description?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  stats?: HeroStat[];
}

const defaultHeadline: HeroSegment[] = [
  { text: "Buy, sell &", className: "text-white" },
  {
    text: "finance",
    className: "italic text-[#FF4D5E]",
    style: { fontFamily: "'Instrument Serif', Georgia, serif" },
  },
  { text: "electric vehicles.", className: "text-white" },
];

/* The reveal timing is choreographed to land just after the studio lights
   finish their flicker-on sequence (~1.7s in). */
export function VolumetricHero({
  kicker = "Nepal's most trusted EV marketplace",
  headline,
  brandLine = "TapaikoBazar · Panipokhari, Kathmandu",
  description = "Electric vans, cars, scooters and bikes — handpicked, road-ready and financed in-house over five years.",
  primaryCta,
  secondaryCta,
  stats,
}: VolumetricHeroProps) {
  const primary = primaryCta ?? { text: "Book now" };
  // On phones the van is nearly full-width, so widen the studio's back wall
  // (thinner side walls) to keep the van inside the room instead of spilling
  // onto the side walls. Desktop keeps its deeper default room.
  const isMobile = useMediaQuery("(max-width: 767px)");
  const backWall: { tl: [number, number]; tr: [number, number]; br: [number, number]; bl: [number, number] } | undefined =
    isMobile ? { tl: [7, 7], tr: [93, 7], br: [93, 56], bl: [7, 56] } : undefined;

  // Headline content, shared by the mobile and desktop layouts ("Electric" in
  // the TapaikoBazar blue for a touch of brand colour).
  const headlineInner = (
    <>
      Buy, Sell
      <br />
      and{" "}
      <span className="bg-linear-to-b from-[#6a9bff] to-[#1e50c0] bg-clip-text text-transparent">
        Finance
      </span>
    </>
  );

  // Mobile keeps it to a single line — no <br /> — so it reads across in one
  // sweep, at a smaller size than the desktop rail.
  const headlineInnerMobile = (
    <>
      Buy, Sell and{" "}
      <span className="bg-linear-to-b from-[#6a9bff] to-[#1e50c0] bg-clip-text text-transparent">
        Finance
      </span>
    </>
  );

  // Single "Apply Finance" CTA, in the compact dark rectangular style of the
  // reference (uppercase, letter-spaced, thin border, small icon).
  const renderCtas = (mobile: boolean) => {
    const cta = secondaryCta ?? primary;
    const cls = `group inline-flex items-center gap-2.5 rounded-[4px] border border-white/25 bg-black/30 font-semibold uppercase text-white backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/10 ${
      mobile ? "px-6 py-3.5 text-xs tracking-[0.16em]" : "px-7 py-3.5 text-xs tracking-[0.16em] sm:text-[13px]"
    }`;
    const inner = (
      <>
        Apply Finance
        <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
      </>
    );
    return cta.href ? (
      <a href={cta.href} className={cls}>
        {inner}
      </a>
    ) : (
      <button type="button" onClick={cta.onClick} className={cls}>
        {inner}
      </button>
    );
  };

  // Layered contact shadows that ground the van (desktop layout).
  const vanShadows = (
    <>
      <div
        aria-hidden
        className="absolute bottom-[2%] left-1/2 h-[26%] w-[60%] -translate-x-1/2 rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(210,225,255,0.16), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[2%] left-1/2 h-[7%] w-[56%] -translate-x-1/2 rounded-[50%]"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.7), rgba(0,0,0,0.35) 45%, transparent 72%)", filter: "blur(14px)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[3.5%] left-1/2 h-[3%] w-[42%] -translate-x-1/2 rounded-[50%]"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.92), rgba(0,0,0,0.6) 40%, transparent 74%)", filter: "blur(7px)" }}
      />
    </>
  );

  return (
    <section className="relative h-[82vh] min-h-[560px] w-full bg-black md:h-screen md:min-h-[680px]">
      <VolumetricStudio className="h-full" backWall={backWall}>
        {/* Ghosted brand word, sitting behind the van like a nameplate. */}
        <div className="pointer-events-none absolute inset-x-0 top-[8%] z-0 flex justify-center overflow-hidden md:top-[10%]">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 1.5, ease: EASE }}
            className="select-none whitespace-nowrap text-[15vw] leading-none tracking-[0.1em] text-white/[0.06] md:text-[10vw] md:tracking-[0.12em]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            TAPAIKOBAZAR
          </motion.span>
        </div>

        {/* ===================== MOBILE (< md): vertical stack ===================== */}
        <div className="relative z-[2] flex h-full flex-col justify-end px-6 pb-[13vh] md:hidden">
          {/* Van/headline/CTA sit low in the room, the headline spaced clearly
              below the van (no overlap) with the CTA under it. */}
          <div className="flex flex-col items-center">
            {/* Van grounded by a soft contact shadow under the wheels. The old
                mirror reflection read as the van floating over glass, so it's
                gone — this is a real floor shadow instead. */}
            <div className="relative flex w-full max-w-[420px] flex-col items-center">
              <motion.img
                src="/assets/van-3d.png"
                alt="TapaikoBazar electric van under studio lights"
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
                className="relative z-[1] w-full object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.5)]"
              />
              <div
                aria-hidden
                className="relative z-0 -mt-[8%] h-[32px] w-[72%] rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.85), rgba(0,0,0,0.5) 40%, transparent 72%)",
                  filter: "blur(11px)",
                }}
              />
            </div>

            {/* Headline nested into that shadow, right beneath the van. */}
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.95, ease: EASE }}
              className="relative z-[2] mt-6 whitespace-nowrap text-center text-[1.75rem] leading-[1] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {headlineInnerMobile}
            </motion.h1>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.05, ease: EASE }}
              className="pointer-events-auto mt-4 flex justify-center"
            >
              {renderCtas(true)}
            </motion.div>
          </div>
        </div>

        {/* ===================== DESKTOP (md+): staged studio ===================== */}
        <div className="hidden md:block">
          {/* The van — centred, raised so its roofline sits up under the lights. */}
          <div className="absolute inset-x-0 bottom-[20%] top-[16%] z-[1] flex items-end justify-center">
            {vanShadows}
            <motion.img
              src="/assets/van-3d.png"
              alt="TapaikoBazar electric van under studio lights"
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
              className="relative w-[42%] min-w-[380px] max-w-[720px] object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.6)]"
              style={{ maxHeight: "62vh" }}
            />
          </div>

          {/* Left rail — editorial serif headline and the two CTAs. */}
          <div className="absolute left-10 top-1/2 z-[3] w-[42%] max-w-[360px] -translate-y-1/2 md:left-14">
            <motion.h1
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.7, ease: EASE }}
              className="text-5xl leading-[1.02] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)] md:text-[3.4rem]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {headlineInner}
            </motion.h1>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.05, ease: EASE }}
              className="pointer-events-auto mt-8 flex flex-col items-start gap-3"
            >
              {renderCtas(false)}
            </motion.div>
          </div>
        </div>
      </VolumetricStudio>
    </section>
  );
}

export default VolumetricHero;
