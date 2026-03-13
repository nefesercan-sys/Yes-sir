import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from '@/lib/mongodb';
import { createHash } from 'crypto';

// 🚨 BURASI KRİTİK: "export" ekledik ki diğer sayfalar bu ayarı bulabilsin!
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email & Şifre',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await getDb();
        const user = await db.collection('users').findOne({
          email: credentials.email.toLowerCase().trim(),
        });

        if (!user || !user.password) return null;

        const hash = createHash('sha256').update(credentials.password).digest('hex');
        if (user.password !== hash) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.ad,
          image: user.resim || null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const db = await getDb();
          await db.collection('users').updateOne(
            { email: user.email },
            {
              $set: {
                email: user.email,
                ad: user.name,
                resim: user.image,
                guncellendi: new Date(),
              },
              $setOnInsert: {
                tip: 'hizmet_alan',
                bakiye: 0,
                profilTamamlandi: false,
                olusturuldu: new Date(),
              },
            },
            { upsert: true }
          );
        } catch (e) {
          console.error('Google signIn DB hatası:', e);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: '/giris',
    error: '/giris',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
