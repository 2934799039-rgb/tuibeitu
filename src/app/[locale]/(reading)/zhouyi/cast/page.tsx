"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

function coinFlip() {
  return Math.random() < 0.5 ? 0 : 1; // 0 = heads (Yang), 1 = tails (Yin)
}

interface ThrowResult {
  heads: number; // 0-3 heads
  line: "yang" | "yin" | "moving_yang" | "moving_yin";
  lineValue: number;
}

function interpretThrow(coins: number[]): ThrowResult {
  const heads = coins.filter((c) => c === 0).length;
  if (heads === 3) return { heads, line: "moving_yang", lineValue: 9 };
  if (heads === 0) return { heads, line: "moving_yin", lineValue: 6 };
  if (heads === 2) return { heads, line: "yin", lineValue: 8 };
  return { heads, line: "yang", lineValue: 7 };
}

export default function CastPage() {
  const t = useTranslations("zhouyi");
  const ct = useTranslations("common");
  const router = useRouter();
  const locale = useLocale();

  const [phase, setPhase] = useState<"question" | "casting" | "complete">("question");
  const [question, setQuestion] = useState("");
  const [throws, setThrows] = useState<ThrowResult[]>([]);
  const [currentThrow, setCurrentThrow] = useState<number[] | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  function playCoinSound() {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(2000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
    } catch {}
  }

  function playResultSound() {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3);
    } catch {}
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const totalThrows = 6;
  const currentIndex = throws.length;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [question]);

  function startCasting() {
    if (!question.trim()) return;
    setPhase("casting");
  }

  async function doThrow() {
    if (isFlipping || currentIndex >= totalThrows) return;
    setIsFlipping(true);
    setShowResult(false);
    playCoinSound();

    // Animate coin flipping for ~1.5s
    const flipInterval = setInterval(() => {
      setCurrentThrow([coinFlip(), coinFlip(), coinFlip()]);
    }, 120);

    await new Promise((r) => setTimeout(r, 1500));
    clearInterval(flipInterval);

    const final = [coinFlip(), coinFlip(), coinFlip()];
    setCurrentThrow(final);
    const result = interpretThrow(final);

    setThrows((prev) => [...prev, result]);
    setIsFlipping(false);
    setShowResult(true);
    playResultSound();

    // If all 6 throws done, complete
    if (currentIndex + 1 >= totalThrows) {
      setTimeout(() => setPhase("complete"), 1500);
    }
  }

  async function completeReading() {
    if (revealing) return;
    setRevealing(true);
    let hexIdx = 0;
    throws.forEach((t, i) => {
      if (t.lineValue % 2 === 1) hexIdx |= (1 << i);
    });

    try {
      const saved = localStorage.getItem("tuibeitu_form_zhouyi");
      const savedData = saved ? JSON.parse(saved) : {};
      savedData.question = question;
      localStorage.setItem("tuibeitu_form_zhouyi", JSON.stringify(savedData));

      const res = await fetch("/api/readings/zhouyi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: "zhouyi", inputData: { question: question.trim(), hexagramIndex: hexIdx }, locale }),
      });

      if (!res.ok) throw new Error("Failed");
      const { readingId } = await res.json();
      router.push(`/zhouyi/${readingId}`);
    } catch {
      setRevealing(false);
    }
  }

  const lineLabels: Record<string, string> = {
    yang: t("lineYang"),
    yin: t("lineYin"),
    moving_yang: t("lineMovingYang"),
    moving_yin: t("lineMovingYin"),
  };

  // Question phase — ritualistic preparation
  if (phase === "question") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-lg text-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-10"
          >
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-gold-400">
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const y = 8 + i * 6;
                  const yang = [0, 2, 4].includes(i);
                  return yang
                    ? <line key={i} x1="10" y1={y} x2="38" y2={y} opacity={0.8 - i * 0.06} />
                    : <g key={i} opacity={0.8 - i * 0.06}><line x1="10" y1={y} x2="20" y2={y}/><line x1="28" y1={y} x2="38" y2={y}/></g>;
                })}
              </g>
            </svg>
          </motion.div>

          <h1 className="text-2xl font-calligraphy gold-text mb-3 tracking-[0.3em]">
            {t("sincereQuestion")}
          </h1>

          <div className="space-y-3 mb-10">
            <p className="text-xs text-mystic-400 tracking-wider">{t("prelude1")}</p>
            <p className="text-xs text-mystic-500 tracking-wider">{t("prelude2")}</p>
          </div>

          <div className="mystic-card rounded-sm p-8 mb-6">
            <p className="text-xs text-mystic-500 tracking-wider mb-4">
              {t("writeQuestion")}
            </p>
            <div className="relative w-full min-h-[72px] max-h-[200px] overflow-y-auto bg-mystic-900/50 border border-gold-600/5 rounded-sm px-4 py-4 flex items-center justify-center focus-within:border-gold-500/30 transition-colors">
              {!question.trim() && (
                <span className="absolute inset-0 flex items-center justify-center text-mystic-700 text-base pointer-events-none opacity-40 select-none">
                  {t("questionPlaceholder")}
                </span>
              )}
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setQuestion((e.currentTarget as HTMLDivElement).innerText)}
                className="relative z-10 w-full text-center text-mystic-100 text-base focus:outline-none cursor-text min-h-[1.5em] break-words"
                autoFocus
              />
            </div>
          </div>

          <button
            onClick={startCasting}
            disabled={!question.trim()}
            className="px-10 py-4 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-[0.3em] uppercase rounded-sm border-2 border-gold-400/60 hover:shadow-gold-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t("startCasting")}
          </button>
        </motion.div>
      </div>
    );
  }

  // Casting phase
  if (phase === "casting") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-sm w-full">

          {/* Hexagram building */}
          <div className="mystic-card rounded-sm p-6 mb-6">
            <div className="space-y-3 flex flex-col items-center">
              {Array.from({ length: 6 }).map((_, i) => {
                const t = throws[5 - i];
                const isActive = i === 5 - currentIndex;
                return (
                  <div key={i} className="flex items-center gap-4 h-8 justify-center">
                    <span className="text-[10px] text-mystic-500 w-5 text-right shrink-0">
                      {6 - i}
                    </span>
                    <div className="w-[120px] flex-shrink-0 flex items-center justify-center">
                      {t ? (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <svg width="120" height="8" viewBox="0 0 120 8">
                            {t.line === "yang" || t.line === "moving_yang" ? (
                              <rect x="0" y="1" width="120" height="6" rx="3" fill="#d4a12c" opacity="0.85" />
                            ) : (
                              <>
                                <rect x="0" y="1" width="50" height="6" rx="3" fill="#8b7355" opacity="0.5" />
                                <rect x="70" y="1" width="50" height="6" rx="3" fill="#8b7355" opacity="0.5" />
                              </>
                            )}
                          </svg>
                        </motion.div>
                      ) : (
                        <div className={`text-xs transition-colors duration-300 ${isActive ? "text-gold-400 text-base" : "text-mystic-700"}`}>
                          {isActive ? "✦" : "—"}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-gold-400 w-4 text-center shrink-0">
                      {t && (t.line === "moving_yang" || t.line === "moving_yin") ? "○" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question reminder */}
          <p className="text-xs text-mystic-500 text-center mb-4 truncate px-4">
            &ldquo;{question}&rdquo;
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentIndex ? "bg-gold-400" : i === currentIndex && isFlipping ? "bg-gold-400 animate-pulse" : "bg-mystic-700"
              }`} />
            ))}
          </div>

          {/* Coins — Chinese style */}
          <div className="flex gap-5 justify-center mb-6">
            {[0, 1, 2].map((i) => {
              const coin = currentThrow?.[i];
              const isYang = coin === 0;
              const isFlippingNow = isFlipping;
              const size = 56;
              const c = size / 2;
              const r = c - 2;
              const hole = 9;

              return (
                <motion.div
                  key={`${i}-${currentIndex}-${coin}`}
                  animate={isFlippingNow ? { rotateY: [0, 360, 720, 1080] } : showResult ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: isFlippingNow ? 0.1 : 0.3, repeat: isFlippingNow ? Infinity : 0 }}
                  className="shrink-0"
                >
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={
                    coin === undefined ? "opacity-30" : isYang ? "drop-shadow-[0_0_8px_rgba(184,137,30,0.3)]" : "opacity-70"
                  }>
                    {/* Outer circle */}
                    <circle cx={c} cy={c} r={r}
                      fill={isYang ? "rgba(184,137,30,0.15)" : "rgba(100,80,60,0.2)"}
                      stroke={isYang ? "#d4a12c" : "#6b5a3e"}
                      strokeWidth="1.5" />
                    {/* Inner rim */}
                    <circle cx={c} cy={c} r={r - 4}
                      fill="none"
                      stroke={isYang ? "rgba(212,161,44,0.3)" : "rgba(107,90,62,0.2)"}
                      strokeWidth="0.8" />
                    {/* Square hole */}
                    <rect x={c - hole} y={c - hole} width={hole * 2} height={hole * 2} rx="1"
                      fill="rgba(10,8,8,0.6)"
                      stroke={isYang ? "rgba(212,161,44,0.4)" : "rgba(107,90,62,0.3)"}
                      strokeWidth="0.8" />
                    {/* Face/Yang mark */}
                    {coin !== undefined && (
                      <text x={c} y={c + 0.5} textAnchor="middle" dominantBaseline="central"
                        fill={isYang ? "#d4a12c" : "#8b7355"} fontSize="10" fontWeight="600"
                        style={{ fontFamily: "serif" }}>
                        {isYang ? "陽" : "陰"}
                      </text>
                    )}
                    {coin === undefined && (
                      <text x={c} y={c + 0.5} textAnchor="middle" dominantBaseline="central"
                        fill="#5a4a3a" fontSize="10">?</text>
                    )}
                  </svg>
                </motion.div>
              );
            })}
          </div>

          {/* Result label */}
          <div className="h-6 mb-6 text-center">
            <AnimatePresence mode="wait">
              {showResult && currentThrow && (
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm text-gold-400 tracking-wider"
                >
                  {lineLabels[throws[currentIndex - 1]?.line] || ""}
                  {throws[currentIndex - 1]?.heads === 3 && t("yangExtreme")}
                  {throws[currentIndex - 1]?.heads === 0 && t("yinExtreme")}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Throw button */}
          {currentIndex < totalThrows ? (
            <button
              onClick={doThrow}
              disabled={isFlipping}
              className="w-full py-3 border-2 border-gold-500/50 text-gold-400 text-sm tracking-[0.2em] rounded-sm hover:bg-gold-950/30 hover:border-gold-400 transition-all duration-300 disabled:opacity-30"
            >
              {isFlipping ? t("casting") : `${t("throwLabel")} ${currentIndex + 1}`}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-base text-gold-400 tracking-widest mb-2">{t("hexagramComplete")}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Complete phase — polished reveal
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1, bounce: 0.4 }}
        className="text-center max-w-sm w-full"
      >
        {/* Large hexagram circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
          className="mb-6"
        >
          <svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <circle cx="70" cy="70" r="66" fill="none" stroke="#d4a12c" strokeWidth="1.5" opacity="0.4" />
            <circle cx="70" cy="70" r="62" fill="rgba(184,137,30,0.05)" />
            <circle cx="70" cy="70" r="55" fill="none" stroke="#d4a12c" strokeWidth="0.5" opacity="0.2" />
            <text x="70" y="70" textAnchor="middle" dominantBaseline="central" fill="#d4a12c" fontSize="58" fontFamily="serif">
              {String.fromCodePoint(0x4DC0 + (throws.reduce((acc, t, i) => acc | ((t.lineValue % 2 === 1 ? 1 : 0) << i), 0) % 64))}
            </text>
          </svg>
        </motion.div>

        <h2 className="text-xl font-calligraphy gold-text mb-6 tracking-[0.3em]">
          {t("hexagramFormed")}
        </h2>

        {/* Final hexagram — card with bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mystic-card rounded-sm p-6 mb-8"
        >
          <div className="flex flex-col items-center space-y-2.5">
            {throws.slice().reverse().map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-mystic-500 w-4 text-right">{6 - i}</span>
                <svg width="120" height="10" viewBox="0 0 120 10">
                  {t.line === "yang" || t.line === "moving_yang" ? (
                    <rect x="0" y="2" width="120" height="6" rx="3" fill="#d4a12c" opacity="0.85" />
                  ) : (
                    <>
                      <rect x="0" y="2" width="50" height="6" rx="3" fill="#8b7355" opacity="0.45" />
                      <rect x="70" y="2" width="50" height="6" rx="3" fill="#8b7355" opacity="0.45" />
                    </>
                  )}
                </svg>
                {t.line === "moving_yang" || t.line === "moving_yin" ? (
                  <span className="text-[10px] text-gold-400 w-4 text-center">○</span>
                ) : (
                  <span className="w-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <button
          onClick={completeReading}
          disabled={revealing}
          className="w-full py-4 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-[0.3em] uppercase rounded-sm border-2 border-gold-400/60 hover:shadow-gold-lg transition-all duration-300 disabled:opacity-80"
        >
          {revealing ? (
            <span className="inline-flex items-center justify-center gap-3">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="tracking-[0.2em]">{t("revealing")}</span>
            </span>
          ) : (
            t("revealReading")
          )}
        </button>
      </motion.div>
    </div>
  );
}
