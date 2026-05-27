"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { LogoMark } from "@/features/ui/components/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <LogoMark size={64} className="text-gold-400 mx-auto mb-6 opacity-40" />
        <h2 className="text-xl font-display gold-text mb-4">{t("error")}</h2>
        <p className="text-sm text-mystic-400 mb-8">{t("cosmicError")}</p>
        <button onClick={() => reset()}
          className="px-6 py-3 border border-gold-600/30 text-gold-400 text-sm tracking-widest uppercase rounded-sm hover:border-gold-400 transition-colors">
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
