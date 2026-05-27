"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/features/ui/components/Logo";
import { SchoolIcon } from "@/features/ui/components/SchoolIcon";
import { schools } from "@/config/schools";

export default function HomePage() {
  const t = useTranslations();
  const schoolT = useTranslations("schools");

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center max-w-3xl w-full"
      >
        {/* Logo + Title */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <Logo size={88} className="text-gold-400 mx-auto" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-calligraphy gold-text mb-6 md:mb-8 tracking-[0.15em]">
          {t("hero.title")}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base md:text-xl text-mystic-300 mb-16 md:mb-20 tracking-[0.25em] leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* School cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto"
        >
          {schools.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 + i * 0.15 }}
            >
              <Link href={`/${school.id}` as any}>
                <div className="mystic-card rounded-sm p-8 md:p-10 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer text-center group">
                  <div className="mb-5 text-gold-400 group-hover:scale-110 transition-transform duration-500">
                    <SchoolIcon school={school.id} size={56} className="mx-auto" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gold-300 tracking-[0.15em] mb-3">
                    {schoolT(`${school.id}.name`)}
                  </h3>
                  <p className="text-sm text-mystic-400 leading-relaxed max-w-xs mx-auto">
                    {schoolT(`${school.id}.description`)}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gold-600/10">
                    <span className="text-[11px] text-mystic-500 tracking-[0.2em] uppercase group-hover:text-gold-500 transition-colors duration-300">
                      {school.id === "bazi" ? schoolT("enterBazi") : schoolT("enterDivination")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}
