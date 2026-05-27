"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/features/ui/components/Logo";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <LogoMark size={64} className="text-gold-400 mx-auto mb-4 opacity-50" />
        <span className="text-2xl font-calligraphy gold-text mb-4 block">404</span>
        <p className="text-sm text-mystic-400 mb-8 tracking-widest">{t("pageVoid")}</p>
        <Link href="/" className="px-6 py-3 border border-gold-600/30 text-gold-400 text-sm tracking-widest uppercase rounded-sm hover:border-gold-400 transition-colors inline-block">
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
