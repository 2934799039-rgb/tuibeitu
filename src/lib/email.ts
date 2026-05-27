import { Resend } from "resend";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendWelcomeEmail(to: string, name: string, locale: string) {
  const resend = getResend();
  if (!resend) {
    console.log("RESEND_API_KEY not configured — skipping welcome email");
    return;
  }

  const templates: Record<string, { subject: string; html: string }> = {
    zh: {
      subject: "欢迎来到推背图 — 探索你的命运之旅",
      html: `
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;font-family:serif;background:#0a0808;color:#eddcc8;">
          <div style="text-align:center;margin-bottom:16px;">
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;">
              <rect x="8" y="6" width="32" height="36" rx="2" stroke="#d4a12c" stroke-width="1.6" fill="none" opacity="0.7"/>
              <line x1="13" y1="6" x2="13" y2="42" stroke="#d4a12c" stroke-width="1.4" opacity="0.8"/>
              <circle cx="10.5" cy="14" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="22" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="30" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="38" r="1" fill="#d4a12c" opacity="0.6"/>
              <rect x="16" y="10" width="22" height="28" rx="1" stroke="#d4a12c" stroke-width="0.6" fill="none" opacity="0.2"/>
              <path d="M24 16 A7 7 0 0 1 24 30 A3.5 3.5 0 0 0 24 23 A3.5 3.5 0 0 1 24 16Z" fill="#d4a12c" opacity="0.4"/>
              <circle cx="24" cy="19" r="1.4" fill="#d4a12c" opacity="0.6"/>
              <circle cx="24" cy="27" r="1.4" fill="#d4a12c" opacity="0.1" style="filter:invert(1)"/>
            </svg>
          </div>
          <h1 style="color:#d4a12c;text-align:center;font-size:28px;letter-spacing:4px;">推背图</h1>
          <p style="color:#8b7355;text-align:center;font-size:14px;letter-spacing:2px;">观天道 · 测人运 · 演万象</p>
          <hr style="border-color:rgba(184,137,30,0.2);margin:30px 0;">
          <p style="font-size:16px;">${name}，你好：</p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            感谢你注册推背图。这是一座数字命理馆，以古老的东方智慧为你揭示命运的纹理。
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            <strong style="color:#d4a12c;">生辰八字</strong> — 排出四柱命盘，看日主五行、十神格局。<br>
            <strong style="color:#d4a12c;">周易卦象</strong> — 掷币成卦，以六十四卦智慧解答疑惑。<br>
            <strong style="color:#d4a12c;">命师解惑</strong> — 基于命盘与命师一对一深度答疑。
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            账户赠送 <strong style="color:#d4a12c;">10枚古币</strong>，命师解惑可用。推演完全免费。
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            <a href="https://tuibeitubegin.com" style="color:#d4a12c;">https://tuibeitubegin.com</a>
          </p>
          <hr style="border-color:rgba(184,137,30,0.2);margin:30px 0;">
          <p style="color:#5a4a3a;font-size:11px;text-align:center;">推背图 · 古法今用，数理天成</p>
        </div>
      `,
    },
    en: {
      subject: "Welcome to TuiBeiTu — Explore Your Destiny",
      html: `
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;font-family:serif;background:#0a0808;color:#eddcc8;">
                    <div style="text-align:center;margin-bottom:16px;">
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;">
              <rect x="8" y="6" width="32" height="36" rx="2" stroke="#d4a12c" stroke-width="1.6" fill="none" opacity="0.7"/>
              <line x1="13" y1="6" x2="13" y2="42" stroke="#d4a12c" stroke-width="1.4" opacity="0.8"/>
              <circle cx="10.5" cy="14" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="22" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="30" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="38" r="1" fill="#d4a12c" opacity="0.6"/>
              <rect x="16" y="10" width="22" height="28" rx="1" stroke="#d4a12c" stroke-width="0.6" fill="none" opacity="0.2"/>
              <path d="M24 16 A7 7 0 0 1 24 30 A3.5 3.5 0 0 0 24 23 A3.5 3.5 0 0 1 24 16Z" fill="#d4a12c" opacity="0.4"/>
              <circle cx="24" cy="19" r="1.4" fill="#d4a12c" opacity="0.6"/>
              <circle cx="24" cy="27" r="1.4" fill="#d4a12c" opacity="0.1" style="filter:invert(1)"/>
            </svg>
          </div>

<h1 style="color:#d4a12c;text-align:center;font-size:28px;letter-spacing:4px;">TuiBeiTu</h1>
          <p style="color:#8b7355;text-align:center;font-size:14px;letter-spacing:2px;">Observe the Dao · Divine Destinies · Reveal All Phenomena</p>
          <hr style="border-color:rgba(184,137,30,0.2);margin:30px 0;">
          <p style="font-size:16px;">Hello ${name},</p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            Thank you for joining TuiBeiTu — a digital sanctuary where ancient Chinese metaphysics illuminates your destiny.
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            <strong style="color:#d4a12c;">Ba Zi</strong> — Four Pillars of Destiny chart reading.<br>
            <strong style="color:#d4a12c;">I Ching</strong> — Hexagram divination with the ancient oracle.<br>
            <strong style="color:#d4a12c;">Ask the Master</strong> — One-on-one destiny consultation.
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            Your account includes <strong style="color:#d4a12c;">10 Ancient Coins</strong> for the chat feature. Chart readings are free.
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            <a href="https://tuibeitubegin.com" style="color:#d4a12c;">https://tuibeitubegin.com</a>
          </p>
          <hr style="border-color:rgba(184,137,30,0.2);margin:30px 0;">
          <p style="color:#5a4a3a;font-size:11px;text-align:center;">TuiBeiTu · Ancient wisdom, digital precision</p>
        </div>
      `,
    },
    ja: {
      subject: "推背図へようこそ — 運命の旅を探索",
      html: `
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;font-family:serif;background:#0a0808;color:#eddcc8;">
                    <div style="text-align:center;margin-bottom:16px;">
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;">
              <rect x="8" y="6" width="32" height="36" rx="2" stroke="#d4a12c" stroke-width="1.6" fill="none" opacity="0.7"/>
              <line x1="13" y1="6" x2="13" y2="42" stroke="#d4a12c" stroke-width="1.4" opacity="0.8"/>
              <circle cx="10.5" cy="14" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="22" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="30" r="1" fill="#d4a12c" opacity="0.6"/>
              <circle cx="10.5" cy="38" r="1" fill="#d4a12c" opacity="0.6"/>
              <rect x="16" y="10" width="22" height="28" rx="1" stroke="#d4a12c" stroke-width="0.6" fill="none" opacity="0.2"/>
              <path d="M24 16 A7 7 0 0 1 24 30 A3.5 3.5 0 0 0 24 23 A3.5 3.5 0 0 1 24 16Z" fill="#d4a12c" opacity="0.4"/>
              <circle cx="24" cy="19" r="1.4" fill="#d4a12c" opacity="0.6"/>
              <circle cx="24" cy="27" r="1.4" fill="#d4a12c" opacity="0.1" style="filter:invert(1)"/>
            </svg>
          </div>

<h1 style="color:#d4a12c;text-align:center;font-size:28px;letter-spacing:4px;">推背図</h1>
          <p style="color:#8b7355;text-align:center;font-size:14px;letter-spacing:2px;">天道を観 · 人運を測り · 万象を演ず</p>
          <hr style="border-color:rgba(184,137,30,0.2);margin:30px 0;">
          <p style="font-size:16px;">${name}様</p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            推背図へようこそ。古代東洋の智慧があなたの運命を明らかにします。
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            <strong style="color:#d4a12c;">八字</strong> — 四柱推命チャート。<br>
            <strong style="color:#d4a12c;">易経</strong> — 六十四卦の神託。<br>
            <strong style="color:#d4a12c;">命師に質問</strong> — 個別の運命相談。
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            アカウントには <strong style="color:#d4a12c;">10枚の古幣</strong> が付与されています。
          </p>
          <p style="font-size:14px;line-height:2;color:#c0b098;">
            <a href="https://tuibeitubegin.com" style="color:#d4a12c;">https://tuibeitubegin.com</a>
          </p>
          <hr style="border-color:rgba(184,137,30,0.2);margin:30px 0;">
          <p style="color:#5a4a3a;font-size:11px;text-align:center;">推背図 · 古の智慧、デジタルの精髄</p>
        </div>
      `,
    },
  };

  const t = templates[locale] || templates.en;

  const fromName = locale === "zh" ? "推背图" : locale === "ja" ? "推背図" : "TuiBeiTu";
  const fromEmail = process.env.EMAIL_FROM || "noreply@tuibeitu.com";

  await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject: t.subject,
    html: t.html,
  });
}
