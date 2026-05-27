"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { schools, type SchoolId } from "@/config/schools";
import { SchoolIcon } from "@/features/ui/components/SchoolIcon";

export function SchoolGrid() {
  const t = useTranslations("schools");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {schools.map((school, index) => (
        <motion.div
          key={school.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Link href={`/${school.id}` as any}>
            <SchoolCardInner school={school} t={t} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function SchoolCardInner({
  school,
  t,
}: {
  school: { id: SchoolId; premium: boolean };
  t: (key: string) => string;
}) {
  const ct = useTranslations("common");
  return (
    <div className="mystic-card rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
      <div className="mb-4 text-gold-400">
        <SchoolIcon school={school.id} size={44} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-gold-400 tracking-wider uppercase">
          {t(`${school.id}.name`)}
        </h3>
        {school.premium && (
          <span className="text-[10px] px-1.5 py-0.5 bg-gold-950/40 text-gold-500 border border-gold-600/20 rounded-sm uppercase tracking-wider">
            {ct("premium")}
          </span>
        )}
      </div>
      <p className="text-xs text-mystic-400 leading-relaxed flex-1">
        {t(`${school.id}.description`)}
      </p>
    </div>
  );
}
