import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import type { UserReading } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/features/ui/components/Logo";
import { SchoolIcon } from "@/features/ui/components/SchoolIcon";
import { schools } from "@/config/schools";
import { ENUM_TO_SCHOOL } from "@/app/api/readings/[school]/route";
import { StatusBadge } from "./StatusBadge";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HistoryPage({ params }: Props) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    return redirect({ href: "/signin", locale });
  }

  const userId = (session.user as any).id as string;
  const t = await getTranslations("history");
  const ct = await getTranslations("common");
  const schoolT = await getTranslations("schools");

  const readings = await prisma.userReading.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-3xl md:text-5xl font-calligraphy gold-text mb-2 text-center">
        {t("title")}
      </h1>
      <p className="text-center text-mystic-400 text-xs tracking-widest uppercase mb-12">
        {t("readingCount").replace("{count}", String(readings.length))}
      </p>

      {readings.length === 0 ? (
        <div className="text-center py-16">
          <LogoMark size={60} className="text-gold-400 mx-auto mb-6" />
          <p className="text-mystic-400 mb-8">{t("empty")}</p>
          <Link
            href="/bazi"
            className="px-8 py-3 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-widest uppercase rounded-sm hover:shadow-gold-lg transition-all duration-300 inline-block"
          >
            {t("viewReading")}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {readings.map((reading: UserReading) => {
            const schoolId = ENUM_TO_SCHOOL[reading.schoolType] || reading.schoolType.toLowerCase();
            const schoolIconId = schools.find((s) => s.id === schoolId)?.id;

            return (
              <Link
                key={reading.id}
                href={
                  reading.status === "COMPLETED"
                    ? (`/${schoolId}/${reading.id}` as any)
                    : "#"
                }
                className="block mystic-card rounded-sm p-5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {schoolIconId && (
                      <SchoolIcon
                        school={schoolIconId}
                        size={36}
                        className="text-gold-400 flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-gold-400 tracking-wider">
                        {schoolT(`${schoolId}.name`)}
                      </h3>
                      <p className="text-xs text-mystic-400 mt-1">
                        {new Date(reading.createdAt).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={reading.status} />
                    {reading.status === "COMPLETED" && (
                      <svg
                        className="w-4 h-4 text-mystic-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
