import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SwapHubs Admin",
  robots: { index: false, follow: false },
};

export default function AdminAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
