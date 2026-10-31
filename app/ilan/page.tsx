import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { robots: { index: false, follow: true } };

// /ilan listesi yoktur; ilan listesi /ilanlar adresindedir.
export default function IlanIndex() {
  permanentRedirect("/ilanlar");
}
