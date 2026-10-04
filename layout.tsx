import type { Metadata } from "next";

// DÜZELTME: Bu dosya eskiden kök layout'un kopyasıydı ve kendi <html>/<body> etiketlerini
// render ediyordu. Kök layout zaten bunları verdiği için iç içe <html> oluşuyor, hydration
// hatası ve çift JSON-LD üretiyordu. Admin alanı arama motorlarına kapalı, sade layout.
export const metadata: Metadata = {
  title: { absolute: "Admin" },
  robots: { index: false, follow: false },
};

export default function AdminAiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
