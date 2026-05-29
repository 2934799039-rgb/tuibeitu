"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "@/features/ui/components/Logo";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const RATE = 1.99 / 20;

function T(locale: string) {
  const t = (zh: string, en: string, ja: string) => locale === "zh" ? zh : locale === "ja" ? ja : en;
  return {
    coin: t("古币", "Coins", "古幣"),
    chats: t("次命师解惑", "chats", "回の質問"),
    buy: t("购买", "Buy", "購入"),
    success: t("支付成功！古币稍后到账，如未到账请稍等片刻。", "Payment successful! Coins will arrive shortly.", "支払い完了！まもなく着金します。"),
    subtitle: t("$1.99 = 20 古币 · 约 2.5 元/问", "$1.99 = 20 coins · ~$0.50/question", "$1.99 = 20古幣 · 約2.5元/質問"),
    note: t('古币专用于"命师解惑"功能（5古币/问），推演命盘完全免费', 'Coins are for "Ask the Master" (5 coins/question). Chart readings are free.', '古幣は「命師に質問」専用（5古幣/質問）。命盤推演は無料。'),
    customTitle: t("自定义金额", "Custom Amount", "カスタム金額"),
    customPlaceholder: t("输入美元金额", "Enter USD amount", "USD金額を入力"),
    approx: (c: number) => t(`≈ ${c} 古币`, `≈ ${c} coins`, `≈ ${c}古幣`),
  };
}

const packages = [
  { coins: 20, price: 1.99, popular: false },
  { coins: 80, price: 5.99, popular: false },
  { coins: 250, price: 14.99, popular: false },
];

export default function PricingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const _ = T(locale);
  const success = searchParams.get("success");

  async function checkout(coins: number) {
    if (loading) return;
    setLoading(String(coins));
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coins, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPayMsg(data.error || t("pricing.payUnavailable"));
        setLoading(null);
      }
    } catch {
      setPayMsg(t("pricing.networkError"));
      setLoading(null);
    }
  }

  const [payMsg, setPayMsg] = useState("");
  const [capturing, setCapturing] = useState(false);
  const customCoins = customAmount ? Math.floor(Number(customAmount) / RATE) : 0;

  // Capture PayPal order on return
  useEffect(() => {
    const token = searchParams.get("token");
    if (success === "true" && token && !capturing) {
      setCapturing(true);
      fetch("/api/capture-paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: token }),
      }).then(r => r.json()).then(d => {
        if (d.success) {
          setPayMsg(d.credits
            ? `充值成功！获得 ${d.coins} 古币，当前余额 ${d.credits} 古币`
            : _.success);
          window.dispatchEvent(new Event("credits-updated"));
        } else {
          setPayMsg(d.error || "支付未完成，请稍后查看");
        }
      }).catch(() => {
        setPayMsg("验证失败，请刷新重试");
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-2xl w-full text-center">
        <LogoMark size={48} className="text-gold-400 mx-auto mb-6" />
        <h1 className="text-3xl font-calligraphy gold-text mb-2 tracking-widest">
          {t("nav.pricing")}
        </h1>
        <p className="text-sm text-mystic-400 mb-8 tracking-wider">{_.subtitle}</p>

        {(capturing || (success === "true" && payMsg)) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-sm border border-gold-500/30 bg-gold-950/20"
          >
            {capturing && !payMsg ? (
              <p className="text-sm text-gold-400 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {locale === "zh" ? "验证支付中..." : locale === "ja" ? "支払い確認中..." : "Verifying payment..."}
              </p>
            ) : (
              <p className="text-sm text-gold-400">{payMsg}</p>
            )}
          </motion.div>
        )}

        {payMsg && !success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-sm border border-red-500/30 bg-red-950/10"
          >
            <p className="text-sm text-red-400">{payMsg}</p>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => checkout(pkg.coins)}
              className={`mystic-card rounded-sm flex-1 flex flex-col items-center justify-center cursor-pointer hover:border-gold-400 transition-all duration-300 p-8 ${
                pkg.popular ? "border border-gold-500/30" : ""
              }`}
            >
              <p className="text-5xl font-calligraphy gold-text leading-none">{pkg.coins}</p>
              <p className="text-xs text-mystic-400 mt-2">{_.coin}</p>
              <div className="w-8 h-px bg-gold-600/20 my-3" />
              <p className="text-sm text-mystic-200 font-medium">${pkg.price}</p>
              <p className="text-[11px] text-mystic-400 mt-1 mb-4">
                {Math.floor(pkg.coins / 5)} {_.chats}
              </p>
              {loading === String(pkg.coins) ? (
                <span className="text-xs text-gold-400 animate-pulse">···</span>
              ) : (
                <span className="text-xs text-gold-400 font-semibold tracking-widest uppercase">{_.buy}</span>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-mystic-500 mb-6 tracking-wider">{_.note}</p>

        <div className="mystic-card rounded-sm p-6 max-w-sm mx-auto">
          <p className="text-xs text-mystic-400 tracking-wider mb-3">{_.customTitle}</p>
          <div className="flex gap-2 items-center">
            <span className="text-mystic-400">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder={_.customPlaceholder}
              min="2"
              step="1"
              className="flex-1 bg-mystic-900 border border-gold-600/20 rounded-sm px-4 py-2.5 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-center"
            />
          </div>
          {customCoins > 0 && (
            <p className="text-xs text-gold-400 mt-3">{_.approx(customCoins)}</p>
          )}
          {customCoins > 0 && (
            <button onClick={() => checkout(customCoins)} disabled={loading === String(customCoins)}
              className="mt-4 w-full py-2 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-xs font-semibold tracking-widest uppercase rounded-sm hover:shadow-gold-lg transition-all duration-300 disabled:opacity-50">
              {loading === String(customCoins) ? "..." : `$${customAmount}`}
            </button>
          )}
        </div>

        <Link href="/" className="inline-block mt-8 text-xs text-mystic-400 hover:text-gold-400 transition-colors">
          {t("common.back")}
        </Link>
      </div>
    </div>
  );
}
