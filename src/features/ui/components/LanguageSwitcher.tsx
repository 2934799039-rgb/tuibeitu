"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const locales = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchTo(nextLocale: string) {
    if (nextLocale === locale) return;
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  const current = locales.find((l) => l.code === locale);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold tracking-wider text-mystic-300 hover:text-gold-400 border border-gold-600/20 rounded-sm hover:border-gold-600/40 transition-all duration-300"
      >
        {current?.label}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 border border-gold-600/20 rounded-sm z-50 min-w-[100px]"
          style={{ background: "rgba(18,15,12,0.92)", backdropFilter: "blur(12px)" }}
        >
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`block w-full text-left px-4 py-2 text-xs tracking-wider transition-colors duration-200 ${
                l.code === locale
                  ? "text-gold-400 bg-gold-950/20 cursor-default"
                  : "text-mystic-300 hover:text-gold-300 hover:bg-gold-950/10"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
