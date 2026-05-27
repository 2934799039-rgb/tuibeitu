"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { AvatarImage, PickerAvatar, PICKER_STYLES } from "@/features/ui/components/Avatar";
import { useTranslations } from "next-intl";

export function UserMenu() {
  const { data: session, update } = useSession();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [avatarStyle, setAvatarStyle] = useState<string>("g1");
  const ref = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const email = user?.email || "user";

  useEffect(() => {
    if (user?.image && PICKER_STYLES.includes(user.image)) {
      setAvatarStyle(user.image);
    }
  }, [user?.image]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!user) {
    return (
      <Link href="/signin"
        className="text-xs tracking-[0.2em] text-mystic-300 hover:text-gold-400 transition-colors duration-300 uppercase">
        {t("signin")}
      </Link>
    );
  }

  async function handleAvatarSelect(pattern: string) {
    if (pattern === avatarStyle) return;
    setAvatarStyle(pattern);
    try {
      await fetch("/api/user/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: pattern }),
      });
      update();
    } catch {}
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center">
        <AvatarImage seed={avatarStyle} size={32} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-3 w-72 border border-gold-600/25 rounded-sm z-50 shadow-lg shadow-gold-950/20"
              style={{ background: "rgba(18,15,12,0.92)", backdropFilter: "blur(12px)" }}
            >
              {/* User info */}
              <div className="px-6 py-4 border-b border-gold-600/15">
                <p className="text-sm text-gold-300 font-medium truncate">{user.name || email}</p>
                <p className="text-[11px] text-mystic-400 truncate mt-0.5">{email}</p>
              </div>

              {/* Avatar picker toggle */}
              <button
                onClick={() => setPickerOpen(!pickerOpen)}
                className="w-full text-left px-6 py-3 text-sm text-mystic-200 hover:bg-gold-950/30 hover:text-gold-400 transition-colors flex items-center justify-between"
              >
                {t("changeAvatar")}
                <span className="text-xs text-mystic-500">{pickerOpen ? "▴" : "▾"}</span>
              </button>

              <AnimatePresence>
                {pickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 border-b border-gold-600/15 flex flex-row justify-between"
                  >
                    {PICKER_STYLES.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleAvatarSelect(p)}
                        className={`rounded-sm hover:bg-gold-950/40 transition-all duration-200 ${
                          avatarStyle === p ? "brightness-110 saturate-150 scale-105" : "brightness-75"
                        }`}
                      >
                        <PickerAvatar pattern={p} size={44} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/history" onClick={() => setOpen(false)}
                className="block px-6 py-3 text-sm text-mystic-200 hover:bg-gold-950/30 hover:text-gold-400 transition-colors">
                {t("history")}
              </Link>

              <div className="border-t border-gold-600/15">
                <button onClick={() => signOut()}
                  className="w-full text-left px-6 py-3 text-sm text-mystic-300 hover:bg-gold-950/30 hover:text-red-400 transition-colors">
                  {t("signout")}
                </button>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
