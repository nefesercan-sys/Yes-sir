import { permanentRedirect } from "next/navigation";

// /ilan listesi yoktur; ilan listesi /ilanlar adresindedir.
export default function IlanIndex() {
  permanentRedirect("/ilanlar");
}
