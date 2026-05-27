import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/features/layout/components/Header";
import { Footer } from "@/features/layout/components/Footer";
import { StarryBackground } from "@/features/layout/components/StarryBackground";
import { AdBanner } from "@/features/layout/components/AdBanner";
import { SessionWrapper } from "@/features/auth/components/SessionWrapper";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.seo.homeTitle,
    description: messages.seo.homeDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        zh: `${siteConfig.url}/zh`,
        ja: `${siteConfig.url}/ja`,
      },
    },
    openGraph: {
      title: messages.seo.homeTitle,
      description: messages.seo.homeDescription,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      locale: locale === "zh" ? "zh_CN" : locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.seo.homeTitle,
      description: messages.seo.homeDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh" | "ja")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <SessionWrapper>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <StarryBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
        <Header locale={locale} />
        <div className="mt-16"><AdBanner /></div>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
    </SessionWrapper>
  );
}
