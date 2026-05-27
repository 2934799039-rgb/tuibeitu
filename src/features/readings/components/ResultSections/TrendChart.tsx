"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

function ChartLoading() {
  const t = useTranslations("results");
  return (
    <div className="h-[300px] flex items-center justify-center text-mystic-400 text-sm">
      {t("loadingChart")}
    </div>
  );
}

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
  loading: () => <ChartLoading />,
});

export function TrendChart({ data, locale }: { data: any; locale: string }) {
  const t = useTranslations("results");

  if (!data?.fiveElements?.length) return null;

  const values = data.fiveElements.map((item: any) => item.value);
  const maxVal = Math.max(...values, 6);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item" as const,
      backgroundColor: "rgba(15,13,12,0.95)",
      borderColor: "rgba(184,137,30,0.3)",
      textStyle: { color: "#eddcc8", fontSize: 12 },
    },
    radar: {
      center: ["50%", "55%"],
      radius: "65%",
      indicator: data.fiveElements.map((item: any) => ({
        name: item.name,
        max: maxVal,
      })),
      axisName: { color: "#8b7355", fontSize: 11 },
      splitArea: {
        areaStyle: { color: ["rgba(184,137,30,0.02)", "rgba(15,13,12,0)"] },
      },
      splitLine: { lineStyle: { color: "rgba(184,137,30,0.1)" } },
      axisLine: { lineStyle: { color: "rgba(184,137,30,0.15)" } },
    },
    series: [
      {
        type: "radar" as const,
        symbol: "circle",
        symbolSize: 4,
        lineStyle: { color: "rgba(212,161,44,0.7)", width: 1.5 },
        areaStyle: { color: "rgba(184,137,30,0.12)" },
        itemStyle: { color: "#d4a12c" },
        data: [{ value: values, name: "" }],
      },
    ],
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-xl font-display gold-text mb-6 text-center tracking-widest">
        {t("trends")}
      </h2>
      <div className="mystic-card rounded-sm p-6">
        <ReactECharts option={option} style={{ height: 350 }} opts={{ renderer: "svg" }} />
      </div>
    </motion.section>
  );
}
