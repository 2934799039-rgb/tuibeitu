"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function AdBanner() {
  const t = useTranslations("ad");
  const [ads, setAds] = useState<{ desktop: string | null; mobile: string | null }>({ desktop: null, mobile: null });

  useEffect(() => {
    fetch("/api/admin/ads").then(r => r.json()).then(setAds).catch(() => {});
  }, []);

  if (ads.desktop || ads.mobile) {
    return (
      <div className="w-full bg-mystic-900/60 border-b border-gold-600/10">
        <div className="max-w-4xl mx-auto py-3 flex justify-center">
          {ads.desktop && (
            <img src={ads.desktop} alt="Advertisement"
              className="hidden md:block max-w-full h-auto"
              style={{ maxWidth: 970, height: 90 }} />
          )}
          {ads.mobile && (
            <img src={ads.mobile} alt="Advertisement"
              className="block md:hidden max-w-full h-auto"
              style={{ maxWidth: 320, height: 50 }} />
          )}
        </div>
      </div>
    );
  }

  // No ad uploaded — show placeholder
  return (
    <div className="w-full bg-mystic-900/60 border-b border-gold-600/10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center">
        <div className="w-full border border-dashed border-gold-600/20 rounded-sm flex flex-col items-center justify-center py-4 md:py-5 cursor-default">
          <p className="text-sm md:text-base font-calligraphy text-gold-400/60 tracking-[0.3em]">
            {t("motto")}
          </p>
          <p className="text-[10px] text-mystic-600 mt-2 tracking-wider">
            {t("contact")}
          </p>
        </div>
      </div>
    </div>
  );
}
