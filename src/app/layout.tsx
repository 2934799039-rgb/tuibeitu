import type { Metadata } from "next";
import { Inter, Crimson_Text, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const crimson = Crimson_Text({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-calligraphy",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TuiBeiTu — Chinese Astrology & Fortune Telling",
  description:
    "Discover your destiny through ancient Chinese metaphysics. Free Ba Zi calculator, I Ching readings, and in-depth fortune analysis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimson.variable} ${maShanZheng.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-mystic-100">
        {children}
      </body>
    </html>
  );
}
