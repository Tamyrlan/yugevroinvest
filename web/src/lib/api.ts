import { GOOGLE_SCRIPT_URL } from "@/data/site";

export const validPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

export async function sendToSheet(payload: Record<string, unknown>) {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("GOOGLE_SCRIPT_URL не задан:", payload);
    return true;
  }
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
