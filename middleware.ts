export const config = {
  // Sadece bu yollarda middleware çalışsın
  matcher: ['/', '/(tr|en|de)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
