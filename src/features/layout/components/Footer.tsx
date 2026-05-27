import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/features/ui/components/Logo";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gold-600/10 bg-mystic-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <LogoMark size={24} className="text-gold-500" />
            <span className="text-sm font-calligraphy gold-text tracking-wider">
              推背图
            </span>
          </div>

          <p className="text-xs text-mystic-400 tracking-wider text-center">
            {t("copyright")}
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-xs text-mystic-400 hover:text-gold-400 transition-colors duration-200 tracking-wider"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/pricing"
              className="text-xs text-mystic-400 hover:text-gold-400 transition-colors duration-200 tracking-wider"
            >
              {t("terms")}
            </Link>
            <a
              href="mailto:contact@tuibeitu.com"
              className="text-xs text-mystic-400 hover:text-gold-400 transition-colors duration-200 tracking-wider"
            >
              {t("contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
