"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function GeneratingContent() {
  const t = useTranslations("generating");
  const router = useRouter();
  const searchParams = useSearchParams();
  const readingId = searchParams.get("readingId");
  const school = searchParams.get("school") || "bazi";

  const [step, setStep] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!readingId) return;

    const totalSteps = school === "bazi" ? 6 : 7;
    const totalDuration = totalSteps * 900;

    for (let i = 1; i <= totalSteps; i++) {
      setTimeout(() => setStep(i), i * 900);
    }

    timerRef.current = setTimeout(() => {
      router.push(`/${school}/${readingId}`);
    }, totalDuration + 600);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [readingId, school, router]);

  if (!readingId) return null;

  if (school === "bazi") return <BaziAnimation step={step} />;
  return <ZhouyiAnimation step={step} />;
}

function BaziAnimation({ step }: { step: number }) {
  const t = useTranslations("generating");

  const pillars = [
    { label: t("pillarYear"), delay: 1 },
    { label: t("pillarMonth"), delay: 2 },
    { label: t("pillarDay"), delay: 3 },
    { label: t("pillarHour"), delay: 4 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: step >= 1 ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="origin-top w-full max-w-sm"
      >
        <div className="mystic-card rounded-sm p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-800/60 via-gold-500/40 to-gold-800/60" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-800/60 via-gold-500/40 to-gold-800/60" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-center mb-8 pt-4"
          >
            <h2 className="text-lg font-calligraphy gold-text tracking-[0.3em]">
              {t("title")}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: step >= pillar.delay ? 1 : 0,
                  x: step >= pillar.delay ? 0 : -20,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center gap-4"
              >
                <span className="text-xs text-mystic-400 tracking-[0.2em] w-10">
                  {pillar.label}
                </span>
                <div className="flex-1 h-px bg-gold-600/20" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step >= pillar.delay ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gold-400 font-calligraphy tracking-wider w-20 text-center"
                >
                  {step >= pillar.delay ? "···" : ""}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? [0, 0.3, 0] : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gold-500/10 pointer-events-none"
          />
        </div>
      </motion.div>

      <motion.div key={step} initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }} className="mt-8 h-6">
        <p className="text-xs text-mystic-400 tracking-wider text-center">
          {step === 0 && t("messages.0")}
          {step >= 1 && step <= 5 && t(`baziStep${step - 1}` as any)}
          {step >= 6 && t(`baziStep5` as any)}
        </p>
      </motion.div>
    </div>
  );
}

function ZhouyiAnimation({ step }: { step: number }) {
  const t = useTranslations("generating");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="space-y-2 mb-10">
        {Array.from({ length: 6 }).map((_, i) => {
          const lineNum = 6 - i;
          const visible = step >= lineNum;
          const isYang = lineNum % 2 === 1;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: visible ? 1 : 0.15,
                scaleX: visible ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center gap-4"
            >
              <span className="text-[10px] text-mystic-500 w-6 text-right">
                {visible ? (lineNum === 6 ? t("lineTop") : lineNum === 1 ? t("lineFirst") : String(lineNum)) : "·"}
              </span>
              <div className="text-2xl tracking-[0.5em] text-gold-400">
                {isYang ? "━━━━━" : "━━   ━━"}
              </div>
            </motion.div>
          );
        })}
      </div>

      {step >= 7 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: 1 }}
          className="absolute w-64 h-64 rounded-full bg-gold-500/5 pointer-events-none"
        />
      )}

      <motion.div key={step} initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }} className="h-6">
        <p className="text-xs text-mystic-400 tracking-wider text-center">
          {step === 0 && t("messages.0")}
          {step >= 1 && step <= 6 && t(`zhouyiStep${step - 1}` as any)}
          {step >= 7 && t("zhouyiStep6" as any)}
        </p>
      </motion.div>
    </div>
  );
}

export default function GeneratingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#d4a12c" strokeWidth="1.5" opacity="0.15" />
          <circle cx="12" cy="12" r="10" stroke="#d4a12c" strokeWidth="1.5" strokeDasharray="8 56" strokeLinecap="round" />
        </svg>
        <p className="text-xs text-mystic-500 tracking-[0.3em] uppercase animate-pulse">···</p>
      </div>
    }>
      <GeneratingContent />
    </Suspense>
  );
}
