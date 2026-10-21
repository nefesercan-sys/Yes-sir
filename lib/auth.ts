import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { createHash, timingSafeEqual } from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await getDb();
        const user = await db.collection("users").findOne({ 
          email: credentials.email.toLowerCase().trim() 
        });

        if (!user || !user.password) return null;

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
