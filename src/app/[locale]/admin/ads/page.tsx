"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AdminAdsPage() {
  const t = useTranslations("common");
  const [config, setConfig] = useState<{ desktop: string | null; mobile: string | null }>({ desktop: null, mobile: null });
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/ads").then(r => r.json()).then(setConfig);
  }, []);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/ads", { method: "POST", body: fd });
    const data = await res.json();
    if (data.ok) {
      setConfig(data.config);
      setMsg("上传成功！刷新首页查看效果");
    } else {
      setMsg("上传失败");
    }
    setUploading(false);
  }

  async function handleDelete() {
    await fetch("/api/admin/ads", { method: "DELETE" });
    setConfig({ desktop: null, mobile: null });
    setMsg("已清除广告图");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24">
      <h1 className="text-2xl font-calligraphy gold-text mb-8 text-center">广告位管理</h1>

      <div className="mystic-card rounded-sm p-6 mb-6">
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-mystic-400 tracking-wider mb-2">桌面端广告图 (970x90)</label>
            <input type="file" name="desktop" accept="image/*"
              className="w-full text-xs text-mystic-300 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border file:border-gold-600/30 file:bg-mystic-800 file:text-gold-400 file:text-xs file:cursor-pointer" />
          </div>
          <div>
            <label className="block text-xs text-mystic-400 tracking-wider mb-2">移动端广告图 (320x50)</label>
            <input type="file" name="mobile" accept="image/*"
              className="w-full text-xs text-mystic-300 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border file:border-gold-600/30 file:bg-mystic-800 file:text-gold-400 file:text-xs file:cursor-pointer" />
          </div>
          <button type="submit" disabled={uploading}
            className="w-full py-3 bg-gradient-to-r from-gold-700 to-gold-500 text-mystic-950 text-sm font-semibold tracking-wider rounded-sm hover:shadow-gold-lg disabled:opacity-50">
            {uploading ? "上传中..." : "上传广告图"}
          </button>
        </form>
        {msg && <p className="text-xs text-gold-400 mt-3 text-center">{msg}</p>}
      </div>

      {/* Preview */}
      {(config.desktop || config.mobile) && (
        <div className="mystic-card rounded-sm p-6">
          <h2 className="text-sm text-gold-400 mb-4 text-center tracking-wider">当前广告</h2>
          {config.desktop && (
            <div className="mb-4">
              <p className="text-[10px] text-mystic-400 mb-1">桌面端</p>
              <img src={config.desktop} alt="Desktop ad" className="w-full border border-gold-600/20 rounded-sm" />
            </div>
          )}
          {config.mobile && (
            <div className="mb-4">
              <p className="text-[10px] text-mystic-400 mb-1">移动端</p>
              <img src={config.mobile} alt="Mobile ad" className="max-w-[320px] border border-gold-600/20 rounded-sm" />
            </div>
          )}
          <button onClick={handleDelete}
            className="w-full py-2 border border-red-500/30 text-red-400 text-xs tracking-wider rounded-sm hover:bg-red-950/20 transition-colors mt-2">
            清除广告图
          </button>
        </div>
      )}
    </div>
  );
}
