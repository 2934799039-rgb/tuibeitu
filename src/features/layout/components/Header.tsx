"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/features/ui/components/LanguageSwitcher";
import { LogoMark } from "@/features/ui/components/Logo";
import { CreditsBadge } from "@/features/ui/components/CreditsBadge";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/history", label: t("history") },
    { href: "/pricing", label: t("pricing") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-mystic-950/80 backdrop-blur-md border-b border-gold-600/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <LogoMark size={28} className="text-gold-400" />
          <span className="text-lg font-calligraphy gold-text tracking-wider hidden sm:block">推背图</span>
        </Link>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-xs tracking-[0.2em] text-mystic-300 hover:text-gold-400 transition-colors duration-300 uppercase">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <CreditsBadge />
          <UserMenu />

          <button
            className="md:hidden text-mystic-300 hover:text-gold-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gold-600/10 bg-mystic-900/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-mystic-300 hover:text-gold-400 transition-colors duration-200 uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
