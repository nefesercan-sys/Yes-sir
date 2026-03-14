import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // sha256 yerine bcrypt geldi!

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

        // Kullanıcı yoksa veya şifresi kayıtlı değilse reddet
        if (!user || !user.password) return null;

        // 🚀 KRİTİK DÜZELTME: Bcrypt ile şifre kontrolü
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/giris" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
