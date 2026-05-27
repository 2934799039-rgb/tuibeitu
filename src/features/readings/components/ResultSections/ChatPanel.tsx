"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface Message { role: "user" | "assistant"; content: string }

export function ChatPanel({ readingId, locale }: { readingId: string; locale: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [noCredits, setNoCredits] = useState(false);
  const [open, setOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const placeholder = isZh ? "问命师任何关于你命盘的问题..." : isJa ? "命式について質問してください..." : "Ask the master about your reading...";
  const title = isZh ? "命师解惑" : isJa ? "命師に質問" : "Ask the Master";
  const subtitle = isZh ? "基于你的命盘，畅聊解惑" : isJa ? "あなたの命式に基づいて質問できます" : "Chat about your reading";

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const q = input.trim();
    if (!q || thinking) return;
    setInput("");
    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);

    // Show continuous thinking animation
    setThinking(true);

    try {
      const res = await fetch(`/api/chat/${readingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history: messages.slice(-6) }),
      });
      const data = await res.json();
      if (data.error === "NO_CREDITS") { setNoCredits(true); setThinking(false); return; }
      if (data.error) throw new Error(data.error);
      if (typeof data.credits === "number") {
        setCredits(data.credits);
        window.dispatchEvent(new Event("credits-updated"));
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: isZh ? "命盘之气暂时紊乱，请稍后再问。" : isJa ? "命式の気が一時的に乱れています。後ほどお試しください。" : "The cosmic energies are momentarily unsettled. Please ask again shortly.",
      }]);
    }
    setThinking(false);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }} className="mb-16"
    >
      <div className="text-center mb-6">
        <button
          onClick={() => setOpen(!open)}
          className="relative px-10 py-4 text-gold-400 text-sm tracking-[0.25em] transition-all duration-500 hover:scale-105 group"
        >
          {/* Ornate border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 52" preserveAspectRatio="none">
            <rect x="2" y="2" width="196" height="48" rx="3" fill="none"
              stroke="rgba(184,137,30,0.35)" strokeWidth="1" />
            <rect x="6" y="6" width="188" height="40" rx="2" fill="none"
              stroke="rgba(184,137,30,0.2)" strokeWidth="0.5" />
            {/* Corner ornaments */}
            {[
              [8,8], [192,8], [8,44], [192,44],
            ].map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx},${cy})`}>
                <path d="M0,-6 Q6,-6 6,0 Q6,6 0,6" fill="none" stroke="rgba(184,137,30,0.4)" strokeWidth="0.8" />
                <path d="M-6,0 Q0,-6 6,0" fill="none" stroke="rgba(184,137,30,0.25)" strokeWidth="0.5" />
              </g>
            ))}
            {/* Top center cloud */}
            <g transform="translate(100, 4)" opacity="0.3">
              <path d="M-12,-1 Q-8,-5 -4,-2 Q0,-6 4,-2 Q8,-5 12,-1" fill="none" stroke="rgba(184,137,30,0.5)" strokeWidth="0.8" />
            </g>
            {/* Bottom center cloud */}
            <g transform="translate(100, 48)" opacity="0.3">
              <path d="M-12,1 Q-8,5 -4,2 Q0,6 4,2 Q8,5 12,1" fill="none" stroke="rgba(184,137,30,0.5)" strokeWidth="0.8" />
            </g>
          </svg>
          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-sm bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">
            {open ? (isZh ? "收起对话" : isJa ? "閉じる" : "Close Chat") : title}
          </span>
        </button>
        {!open && <p className="text-xs text-mystic-500 mt-2">{subtitle}</p>}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="mystic-card rounded-sm overflow-hidden"
          >
            {/* No credits paywall */}
            {noCredits && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="p-6 text-center"
              >
                <p className="text-sm text-gold-400 mb-2">
                  {isZh ? "古币不足" : isJa ? "古幣が不足しています" : "Insufficient Ancient Coins"}
                </p>
                <p className="text-xs text-mystic-400 mb-4">
                  {isZh ? "命师解惑需要消耗古币，请先充值" : isJa ? "命師への質問には古幣が必要です" : "Chatting with the master requires Ancient Coins. Please recharge."}
                </p>
                <Link href="/pricing"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-xs font-semibold tracking-widest uppercase rounded-sm hover:shadow-gold-lg transition-all duration-300">
                  {isZh ? "获取古币" : isJa ? "古幣を取得" : "Get Coins"}
                </Link>
              </motion.div>
            )}

            {/* Messages */}
            <div ref={chatContainerRef} className="h-[360px] overflow-y-auto p-4 space-y-4">
              {!noCredits && messages.length === 0 && (
                <p className="text-xs text-mystic-500 text-center py-8">{subtitle}</p>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-sm px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gold-700/20 border border-gold-600/20 text-gold-200"
                      : "bg-mystic-800/60 border border-gold-600/10 text-mystic-200"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-mystic-800/60 border border-gold-600/20 rounded-sm px-5 py-3 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-gold-400">
                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" opacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                    <span className="text-xs text-mystic-300 tracking-wider">
                      {isZh ? "查阅命卷中..." : isJa ? "命卷を調べています..." : "Consulting the charts..."}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gold-600/10 p-3 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={placeholder}
                disabled={thinking}
                className="flex-1 bg-mystic-900 border border-gold-600/20 rounded-sm px-4 py-2.5 text-mystic-100 text-sm focus:outline-none focus:border-gold-500/50 transition-colors disabled:opacity-40"
              />
              <button
                onClick={send}
                disabled={thinking || !input.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-wider rounded-sm hover:shadow-gold-lg transition-all duration-300 disabled:opacity-30"
              >
                {isZh ? "发送" : isJa ? "送信" : "Send"}
              </button>
            </div>

            <p className="text-[10px] text-mystic-500 text-center pb-3">
              {isZh ? "每问消耗 5 古币 · 命师基于你的命盘数据作答" : isJa ? "1質問につき5古幣 · 命師が命式データに基づいて回答します" : "5 coins per question · The master responds based on your chart data"}
              {typeof credits === "number" && (
                <span className="ml-2 text-gold-400">
                  {isZh ? `剩余: ${credits}` : isJa ? `残り: ${credits}` : `Left: ${credits}`}
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
