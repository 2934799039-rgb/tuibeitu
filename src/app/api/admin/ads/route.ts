import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "ads.json");

async function readConfig() {
  try {
    const data = await readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { desktop: null, mobile: null };
  }
}

async function writeConfig(config: any) {
  await mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export async function GET() {
  const config = await readConfig();
  return NextResponse.json(config);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const desktop = formData.get("desktop") as File | null;
  const mobile = formData.get("mobile") as File | null;

  const config = await readConfig();

  const adsDir = path.join(process.cwd(), "public", "ads");
  await mkdir(adsDir, { recursive: true });

  if (desktop && desktop.size > 0) {
    const buf = Buffer.from(await desktop.arrayBuffer());
    await writeFile(path.join(adsDir, "desktop.jpg"), buf);
    config.desktop = "/ads/desktop.jpg";
  }

  if (mobile && mobile.size > 0) {
    const buf = Buffer.from(await mobile.arrayBuffer());
    await writeFile(path.join(adsDir, "mobile.jpg"), buf);
    config.mobile = "/ads/mobile.jpg";
  }

  await writeConfig(config);
  return NextResponse.json({ ok: true, config });
}

export async function DELETE() {
  await writeConfig({ desktop: null, mobile: null });
  return NextResponse.json({ ok: true });
}
