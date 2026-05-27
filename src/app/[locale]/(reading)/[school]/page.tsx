"use client";

import { use, useState, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SchoolIcon } from "@/features/ui/components/SchoolIcon";
import { schools } from "@/config/schools";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ school: string; locale: string }>;
};

const SCHOOL_FIELDS: Record<string, { type: "bazi" | "question" }> = {
  bazi: { type: "bazi" },
  zhouyi: { type: "question" },
};

export default function ReadingInputPage({ params }: Props) {
  const { school, locale } = use(params);

  if (!schools.find((s) => s.id === school)) {
    notFound();
  }

  const t = useTranslations();
  const schoolT = useTranslations("schools");
  const baziT = useTranslations("bazi");
  const formT = useTranslations("form");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState(currentYear - 30);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);
  const [birthHour, setBirthHour] = useState("12");
  const [birthMinute, setBirthMinute] = useState("0");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [question, setQuestion] = useState("");

  // Clamp birthDay when year/month changes (e.g. Feb 29 → Feb 28 in non-leap year)
  const maxDay = new Date(birthYear, birthMonth, 0).getDate();
  useEffect(() => {
    if (birthDay > maxDay) setBirthDay(maxDay);
  }, [birthYear, birthMonth, birthDay, maxDay]);

  // Load saved form data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`tuibeitu_form_${school}`);
      if (!saved) return;
      const data = JSON.parse(saved);
      if (data.birthYear) setBirthYear(data.birthYear);
      if (data.birthMonth) setBirthMonth(data.birthMonth);
      if (data.birthDay) setBirthDay(data.birthDay);
      if (data.birthHour) setBirthHour(data.birthHour);
      if (data.birthMinute) setBirthMinute(data.birthMinute);
      if (data.gender) setGender(data.gender);
      if (data.question) setQuestion(data.question);
    } catch { /* ignore */ }
  }, [school]);

  const schoolName = schoolT(`${school}.name`);
  const schoolDesc = schoolT(`${school}.description`);
  const fieldConfig = SCHOOL_FIELDS[school] || { type: "bazi" };

  function saveFormData(inputData: Record<string, unknown>) {
    try {
      const toSave: Record<string, unknown> = { ...inputData };
      if (fieldConfig.type === "bazi") {
        toSave.birthYear = birthYear;
        toSave.birthMonth = birthMonth;
        toSave.birthDay = birthDay;
        toSave.birthHour = birthHour;
        toSave.birthMinute = birthMinute;
        toSave.gender = gender;
      } else {
        toSave.question = question;
      }
      localStorage.setItem(`tuibeitu_form_${school}`, JSON.stringify(toSave));
    } catch { /* ignore */ }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let inputData: Record<string, unknown> = {};

    if (fieldConfig.type === "bazi") {
      inputData = {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        hour: parseInt(birthHour),
        minute: parseInt(birthMinute),
        gender,
      };
    } else {
      if (!question.trim()) {
        setError(formT("enterQuestion"));
        return;
      }
      inputData = { question: question.trim() };
    }

    saveFormData(inputData);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/readings/${school}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ school, inputData, locale }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || formT("createFailed"));
          return;
        }

        const { readingId } = await res.json();
        router.push(`/generating?readingId=${readingId}&school=${school}`);
      } catch {
        setError(formT("networkError"));
      }
    });
  }

  // Zhouyi: ritual gateway
  if (school === "zhouyi") {
    const zhouyiT = useTranslations("zhouyi");
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }} className="w-full max-w-lg text-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <SchoolIcon school="zhouyi" size={64} className="text-gold-400 mx-auto" />
          </motion.div>
          <div className="mb-6" />
          <h1 className="text-3xl font-calligraphy gold-text mb-4 tracking-[0.3em]">{schoolName}</h1>
          <p className="text-sm text-mystic-400 mb-4">{schoolDesc}</p>
          <div className="space-y-3 mb-10">
            <p className="text-xs text-mystic-500 tracking-wider">{zhouyiT("prelude1")}</p>
            <p className="text-xs text-mystic-600 tracking-wider">{zhouyiT("prelude2")}</p>
          </div>
          <Link href="/zhouyi/cast"
            className="inline-block px-10 py-4 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-[0.3em] uppercase rounded-sm border-2 border-gold-400/60 hover:shadow-gold-lg transition-all duration-300">
            {zhouyiT("enterDivination") || "Enter Divination"}
          </Link>
          <div className="mt-8">
            <Link href="/" className="text-xs text-mystic-500 hover:text-mystic-400 transition-colors">
              {t("common.back")}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-mystic-400 hover:text-gold-400 transition-colors mb-8 tracking-widest uppercase"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("common.back")}
        </Link>

        <div className="text-center mb-8">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <SchoolIcon school={school as any} size={56} className="text-gold-400 mx-auto" />
          </motion.div>
          <h1 className="text-2xl font-calligraphy gold-text mt-4 mb-2 tracking-widest">
            {schoolName}
          </h1>
          <p className="text-sm text-mystic-400">{schoolDesc}</p>
        </div>

        <div className="mystic-card rounded-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {fieldConfig.type === "bazi" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                      {baziT("gender")}
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female")}
                      className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-3 py-2 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      <option value="male">{baziT("male")}</option>
                      <option value="female">{baziT("female")}</option>
                    </select>
                  </div>
                </div>

                {/* Year / Month / Day dropdowns */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">{formT("year")}</label>
                    <select
                      value={birthYear}
                      onChange={(e) => {
                        const y = Number(e.target.value);
                        setBirthYear(y);
                        const maxD = new Date(y, birthMonth, 0).getDate();
                        if (birthDay > maxD) setBirthDay(maxD);
                      }}
                      className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-2 py-2 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      {Array.from({ length: 100 }, (_, i) => currentYear - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">{formT("month")}</label>
                    <select
                      value={birthMonth}
                      onChange={(e) => {
                        const m = Number(e.target.value);
                        setBirthMonth(m);
                        const maxDay = new Date(birthYear, m, 0).getDate();
                        if (birthDay > maxDay) setBirthDay(maxDay);
                      }}
                      className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-2 py-2 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{String(m).padStart(2, "0")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">{formT("day")}</label>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(Number(e.target.value))}
                      className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-2 py-2 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      {Array.from(
                        { length: new Date(birthYear, birthMonth, 0).getDate() },
                        (_, i) => i + 1
                      ).map((d) => (
                        <option key={d} value={d}>{String(d).padStart(2, "0")}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                      {baziT("hour")}
                    </label>
                    <select
                      value={birthHour}
                      onChange={(e) => setBirthHour(e.target.value)}
                      className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-3 py-2 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i.toString().padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                      {baziT("shiChen")}
                    </label>
                    <select
                      value={birthMinute}
                      onChange={(e) => setBirthMinute(e.target.value)}
                      className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-3 py-2 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      {[0, 15, 30, 45].map((m) => (
                        <option key={m} value={m}>
                          {m.toString().padStart(2, "0")} min
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {fieldConfig.type === "question" && (
              <div>
                <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                  {formT("yourQuestion")}
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  rows={4}
                  placeholder={formT("questionPlaceholder")}
                  className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-4 py-3 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                />
              </div>
            )}


            {error && (
              <p className="text-seal-light text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-widest uppercase rounded-sm hover:shadow-gold-lg transition-all duration-300 disabled:opacity-50 mt-2"
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-mystic-950/30 border-t-mystic-950 rounded-full animate-spin" />
                  {t("common.loading")}
                </span>
              ) : (
                baziT("submit")
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
