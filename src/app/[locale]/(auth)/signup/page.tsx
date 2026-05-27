"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { LogoMark } from "@/features/ui/components/Logo";

export default function SignUpPage() {
  const t = useTranslations("auth");
  const ct = useTranslations("common");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, locale }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || t("registrationFailed"));
          return;
        }

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(t("signinAfterSignupFailed"));
        } else {
          router.push("/");
          router.refresh();
        }
      } catch {
        setError(t("genericError"));
      }
    });
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <LogoMark size={48} className="text-gold-400 mx-auto" />
          <h1 className="text-2xl font-calligraphy gold-text mt-4">
            {t("signupTitle")}
          </h1>
        </div>

        <div className="mystic-card rounded-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                {t("name")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-4 py-3 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-4 py-3 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-mystic-400 tracking-widest uppercase mb-2">
                {t("password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-mystic-900 border border-gold-600/20 rounded-sm px-4 py-3 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-seal-light text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-widest uppercase rounded-sm hover:shadow-gold-lg transition-all duration-300 disabled:opacity-50"
            >
              {isPending ? "..." : t("signupButton")}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-mystic-400">
            {t("haveAccount")}{" "}
            <Link href="/signin" className="text-gold-400 hover:text-gold-300">
              {t("signinLink")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
