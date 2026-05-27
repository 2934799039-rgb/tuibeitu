"use client";
import { useTranslations } from "next-intl";

const styles: Record<string, string> = {
  PROCESSING: "text-yellow-500/80 border-yellow-500/30 bg-yellow-500/5",
  COMPLETED: "text-green-500/80 border-green-500/30 bg-green-500/5",
  FAILED: "text-red-500/80 border-red-500/30 bg-red-500/5",
};

const i18nKey: Record<string, string> = {
  PROCESSING: "status_processing",
  COMPLETED: "status_completed",
  FAILED: "status_failed",
};

export function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("history");
  return (
    <span
      className={`text-[10px] px-2 py-0.5 border rounded-sm uppercase tracking-wider ${
        styles[status] || styles.PROCESSING
      }`}
    >
      {t(i18nKey[status] || "status_processing")}
    </span>
  );
}
