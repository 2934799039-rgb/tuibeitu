"use client";

import { useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";

export function CreditsBadge() {
  const [credits, setCredits] = useState<number | null>(null);

  const fetchCredits = useCallback(() => {
    fetch("/api/user/credits")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchCredits();
    window.addEventListener("credits-updated", fetchCredits);
    return () => window.removeEventListener("credits-updated", fetchCredits);
  }, [fetchCredits]);

  if (credits === null) return null;

  return (
    <Link href="/pricing" className="flex items-center gap-1 text-xs text-gold-400/70 hover:text-gold-400 transition-colors ml-3">
      <span className="text-[10px]">🪙</span>
      <span>{credits}</span>
    </Link>
  );
}
