import { readFile } from "node:fs/promises";
import path from "node:path";

const allowed = new Set([
  "maya-evergreen-screen.pdf", "maya-evergreen-print.pdf",
  "maya-chfa-screen.pdf", "maya-chfa-print.pdf",
  "evergreen-1.png", "evergreen-2.png", "chfa-1.png",
]);

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW !== "true" || !allowed.has(name)) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const bytes = await readFile(path.join(process.cwd(), "output", "pdf", "maya", name));
    return new Response(bytes, {
      headers: {
        "Content-Type": name.endsWith(".pdf") ? "application/pdf" : "image/png",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
        "Content-Disposition": `inline; filename="${name}"`,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
