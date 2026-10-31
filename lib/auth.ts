import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { createHash, timingSafeEqual } from "crypto";
import { pencereSayaci, sayaciSifirla } from "@/lib/hiz-sayaci";

// E-posta başına giriş denemesi sınırı (MongoDB'de atomik sayaç; sunucusuz örnekler arası ortak).
const GIRIS_PENCERE_MS = 15 * 60 * 1000;
const GIRIS_MAX_DENEME = 10;
// Kullanıcı yokken de bcrypt çalıştırmak için sahte özet (zamanlama farkıyla hesap taramasını zorlaştırır); ilk kullanımda üretilir.
let sahteHash: Promise<string> | null = null;
const sahteHashAl = () => (sahteHash ??= bcrypt.hash("sahte-parola-zamanlama", 12));

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (typeof credentials?.email !== "string" || typeof credentials?.password !== "string") return null;
        if (!credentials.email || !credentials.password) return null;
        if (credentials.email.length > 254 || credentials.password.length > 200) return null;

        const email = credentials.email.toLowerCase().trim();
        const db = await getDb();

        // Deneme hakkı karşılaştırmadan ÖNCE atomik olarak harcanır; limit aşıldıysa doğru şifre bile kabul edilmez.
        const deneme = await pencereSayaci(db, `giris:${email}`, GIRIS_PENCERE_MS);
        if (deneme > GIRIS_MAX_DENEME) return null;

        const user = await db.collection("users").findOne({ email });

        if (!user || !user.password) {
          await bcrypt.compare(credentials.password, await sahteHashAl()).catch(() => false);
          return null;
        }

        const stored = String(user.password);
        let isPasswordCorrect = false;
        if (/^[0-9a-f]{64}$/i.test(stored)) {
          // ESKİ KAYIT: /api/kayit eskiden şifreyi SHA-256 ile saklıyordu (bcrypt ile uyuşmadığı için giriş yapılamıyordu).
          // Doğruysa girişe izin ver ve hash'i hemen bcrypt'e yükselt.
          const h = createHash("sha256").update(credentials.password).digest("hex");
          isPasswordCorrect = h.length === stored.length && timingSafeEqual(Buffer.from(h), Buffer.from(stored.toLowerCase()));
          if (isPasswordCorrect) {
            await db.collection("users").updateOne(
              { _id: user._id },
              { $set: { password: await bcrypt.hash(credentials.password, 12), guncellendi: new Date() } }
            );
          }
        } else {
          isPasswordCorrect = await bcrypt.compare(credentials.password, stored);
        }

        if (!isPasswordCorrect) return null;

        await sayaciSifirla(db, `giris:${email}`).catch(() => {}); // başarılı giriş sayacı sıfırlar

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.ad,
          role: user.role,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/giris" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;                  // ✅ id eklendi
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;   // ✅ id session'a taşındı
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
