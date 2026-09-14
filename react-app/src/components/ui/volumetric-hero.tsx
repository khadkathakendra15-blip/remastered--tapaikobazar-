"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VolumetricStudio } from "@/components/ui/volumetric-studio";

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

  // Headline content, shared by the mobile and desktop layouts ("Electric" in
  // the TapaikoBazar blue for a touch of brand colour).
  const headlineInner = (
    <>
      The Ultimate
      <br />
      <span className="bg-linear-to-b from-[#6a9bff] to-[#1e50c0] bg-clip-text text-transparent">
        Electric
      </span>{" "}
      Van.
    </>
  );

  // The two CTAs, rendered as full-width pills on mobile and fixed-width on desktop.
  const renderCtas = (mobile: boolean) => {
    const shape = mobile
      ? "w-full rounded-full py-4 pl-6 pr-5 text-base"
      : "w-[220px] rounded-md py-3 pl-5 pr-4 text-sm sm:text-base";
    return (
      <>
        <button
          type="button"
          onClick={primary.onClick}
          className={`group inline-flex items-center justify-between ${shape} bg-[#FF4D5E] font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(255,77,94,0.35)] transition-colors hover:bg-[#ff3348]`}
        >
          {primary.text || "Book now"}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
        {secondaryCta &&
          (secondaryCta.href ? (
            <a
              href={secondaryCta.href}
              className={`inline-flex items-center justify-between ${shape} border border-white/25 font-semibold tracking-wide text-white transition-colors hover:border-white/60 hover:bg-white/10`}
            >
              {secondaryCta.text || "Apply finance"}
              <ArrowRight className="h-5 w-5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={secondaryCta.onClick}
              className={`inline-flex items-center justify-between ${shape} border border-white/25 font-semibold tracking-wide text-white transition-colors hover:border-white/60 hover:bg-white/10`}
            >
              {secondaryCta.text || "Apply finance"}
              <ArrowRight className="h-5 w-5" />
            </button>
          ))}
      </>
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
    <section className="relative h-screen min-h-[680px] w-full bg-black">
      <VolumetricStudio className="h-full">
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
        <div className="relative z-[2] flex h-full flex-col px-6 pb-6 pt-[30vh] md:hidden">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.7, ease: EASE }}
            className="text-[3.3rem] leading-[0.98] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {headlineInner}
          </motion.h1>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2.0, ease: EASE }}
            className="pointer-events-auto mt-7 flex flex-col gap-3"
          >
            {renderCtas(true)}
          </motion.div>

          {/* Van at the bottom, large, with a floor reflection. */}
          <div className="relative mt-auto -mx-6 flex flex-col items-center">
            <motion.img
              src="/assets/van-3d.png"
              alt="TapaikoBazar electric van under studio lights"
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
              className="w-[112%] max-w-none object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.6)]"
            />
            <img
              aria-hidden
              src="/assets/van-3d.png"
              alt=""
              className="-mt-[2%] w-[112%] max-w-none -scale-y-100 object-contain opacity-[0.18]"
              style={{
                maskImage: "linear-gradient(to bottom, black, transparent 55%)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent 55%)",
              }}
            />
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
