import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const referer = req.headers.get('referer') || '';
  const url = req.nextUrl;
  const isUE = referer.includes('experience.adobe.com') || url.searchParams.has('aue');

  const res = NextResponse.next();
  if (isUE) {
    res.cookies.set('aue', '1', { path: '/', sameSite: 'lax' });
  }
  return res;
}

export const config = { matcher: '/:path*' };