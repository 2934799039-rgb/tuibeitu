# 推背图 (TuiBeiTu) — AI-Powered Chinese Metaphysics Platform

A Next.js 16 application blending traditional Chinese divination arts with AI-generated readings. Dark/gold mystical aesthetic targeting a global audience.

## Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5, TailwindCSS 4
- **i18n:** next-intl 4 — always-prefixed routing (`/en`, `/zh`, `/ja`), default English
- **Auth:** Auth.js v5 (JWT, Prisma adapter, credentials + Google)
- **Database:** PostgreSQL + Prisma 7 (`prisma.config.ts` for URL, `accelerateUrl` in constructor)
- **AI:** DeepSeek API via OpenAI-compatible SDK
- **Animation:** Framer Motion + GSAP
- **Charts:** ECharts (client-only via `next/dynamic`)

## Key Commands
```bash
npm run dev     # Start dev server
npm run build   # Production build
npx prisma generate  # Regenerate Prisma client after schema changes
```

## Project Structure
```
src/
├── app/[locale]/          # All pages (en/zh/ja)
│   ├── (auth)/            # signin, signup
│   ├── (reading)/         # [school] form, [school]/[id] results, generating
│   ├── (dashboard)/       # history (auth-protected)
│   └── api/               # readings, results, auth
├── middleware.ts           # next-intl middleware
├── i18n/                   # routing.ts, request.ts, navigation.ts
├── features/
│   ├── ui/                # Button, Card, LanguageSwitcher
│   ├── layout/            # Header, Footer, BaguaBackground
│   ├── readings/          # SchoolGrid, InputForms, ResultSections
│   ├── auth/              # SignInForm, SignUpForm
│   └── subscription/      # PricingCard, PremiumGate
├── lib/
│   ├── prisma.ts          # Singleton PrismaClient
│   ├── auth.ts/.config.ts # Auth.js v5 config
│   ├── ai/                # client.ts, prompts/
│   └── calculators/       # bazi.ts (uses lunar-javascript)
├── config/                # schools.ts, site.ts, pricing.ts
└── types/                 # Type declarations
messages/                  # en.json, zh.json, ja.json
prisma/                    # schema.prisma
```

## Architecture Notes
- **Reading flow:** POST `/api/readings/[school]` → async processing (calculator → AI) → client polls GET `/api/results/[id]` → navigate to result page
- **Freemium:** 1 free reading per school, premium for unlimited
- **i18n:** Use `useTranslations()` for UI strings. AI prompts include language instructions.
- **Result page** is SSR with static shell, client charts loaded via `next/dynamic`.
- **Prisma 7:** URL in `prisma.config.ts`, not in schema. Client uses `accelerateUrl`.
- **Placeholder AI key** in build — real key needed at runtime.
