import { NextResponse } from "next/server";

const PROMO_MAX = 300;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic in-memory per-IP rate limiting.
// TODO: this resets on serverless cold starts and isn't shared across instances —
// swap for a durable store (e.g. Upstash/Redis) before relying on it in production.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

type ApplyBody = {
  name?: string;
  email?: string;
  channelUrl?: string;
  promoPlan?: string;
  agree?: boolean;
  company?: string; // honeypot
  ref?: string | null;
};

export async function POST(req: Request) {
  let body: ApplyBody;
  try {
    body = (await req.json()) as ApplyBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a filled `company` field means a bot. Pretend success, persist nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const channelUrl = (body.channelUrl ?? "").trim();
  const promoPlan = (body.promoPlan ?? "").trim();

  if (!name) return invalid("Name is required.");
  if (!email || !EMAIL_RE.test(email)) return invalid("A valid email is required.");
  if (!channelUrl) return invalid("An audience link is required.");
  if (!promoPlan) return invalid("Tell us how you'll promote Token360.");
  if (promoPlan.length > PROMO_MAX) return invalid(`Promotion plan must be ${PROMO_MAX} characters or fewer.`);
  if (body.agree !== true) return invalid("You must agree to the Partner Program Terms.");

  const application = {
    name,
    email,
    channelUrl,
    promoPlan,
    ref: body.ref ?? null,
    submittedAt: new Date().toISOString(),
  };

  // TODO: persist `application` to a `partner_applications` record once a datastore exists.
  // No DB/ORM is wired up in this repo yet, so we log server-side for now.
  console.log("[partners/apply] application received:", application);

  return NextResponse.json({ ok: true });
}

function invalid(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}
