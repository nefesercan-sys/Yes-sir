import { redirect } from "next/navigation";

// Şifre sıfırlama tek akıştır: /sifre-sifirla (e-posta adımı + token ile yeni şifre adımı).
export default function SifremiUnuttum() {
  redirect("/sifre-sifirla");
}
