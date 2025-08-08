import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const nonce = crypto.randomUUID();

  const isProd = process.env.NODE_ENV === 'production';

  const parts = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
    !isProd ? "connect-src 'self' ws:" : null,
  ].filter(Boolean) as string[];

  // propagate nonce to the app via request headers and set response headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-nonce', nonce);
  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // pass nonce to app via header
  res.headers.set('x-nonce', nonce);

  // response headers (must be on the response) — CSP is set statically via next.config.ts

  res.headers.set('Referrer-Policy', 'no-referrer');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  res.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  res.headers.set('Cross-Origin-Resource-Policy', 'same-site');

  if (isProd) {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    // tighten as needed:
    res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  }

  return res;
}

// run on everything except static assets and auto files
export const config = {
  matcher: ['/:path*'],
};


