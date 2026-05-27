"use client";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gold-600/20 border-t-gold-500 rounded-full animate-spin" />
        <span className="text-xs text-mystic-400 tracking-widest uppercase">{t("loading")}</span>
      </div>
    </div>
  );
}
