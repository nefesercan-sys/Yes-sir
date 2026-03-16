"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * Authentication Provider
 * Bu bileşen, client-side tarafında 'useSession' kancasının (hook) 
 * çalışması için gerekli sarmalayıcıyı sağlar.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      // Sayfa geçişlerinde oturumu kontrol eder
      refetchInterval={0} 
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
