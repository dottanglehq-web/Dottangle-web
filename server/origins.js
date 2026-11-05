// Explicit business origins; never allow every vercel.app tenant or reflect request headers.
const businessOrigins = ['https://dottangle.vercel.app', 'https://dottangel.vercel.app'];
function normalizeOrigin(value) {
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.origin : null;
  } catch { return null; }
}
export function isAllowedOrigin(origin, env = process.env) {
  if (!origin) return true; // Non-browser clients still undergo validation and rate limiting.
  const requested = normalizeOrigin(origin);
  if (!requested) return false;
  const configured = [
    ...businessOrigins, env.SITE_ORIGIN,
    ...(env.ALLOWED_ORIGINS || '').split(','),
    ...['VERCEL_URL','VERCEL_PROJECT_PRODUCTION_URL'].map(key => env[key] ? `https://${env[key]}` : '')
  ];
  return configured.some(value => value && normalizeOrigin(value) === requested);
}
