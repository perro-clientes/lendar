const URL_VERCEL = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? (URL_VERCEL ? `https://${URL_VERCEL}` : "http://localhost:3000");
