import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from '@/lib/mongodb';
import { createHash } from 'crypto';

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
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 📋 TÜM DOSYA LİSTESİ — ÖZET
```
hizmetara/
├── package.json                          ✅ (5. madde)
├── tsconfig.json                         ✅ (6. madde)
├── next.config.mjs                       ✅ (7. madde)
├── .env.local.example                    ✅ (8. madde)
├── lib/
│   ├── mongodb.ts                        ✅ (önceki mesajda)
│   ├── cloudinary.ts                     ✅ (önceki mesajda)
│   └── sektorler.ts                      ✅ (önceki mesajda)
├── app/
│   ├── layout.tsx                        ✅ (önceki mesajda)
│   ├── globals.css                       ✅ (önceki mesajda)
│   ├── page.tsx + AnaSayfaClient.tsx     ✅ (önceki mesajda)
│   ├── sitemap.ts                        ✅ (9. madde)
│   ├── robots.ts                         ✅ (10. madde)
│   ├── ilan-ver/page.tsx                 ✅ (önceki mesajda)
│   ├── ilan/[id]/page.tsx                ✅ (önceki mesajda)
│   ├── ilan/[id]/IlanDetayClient.tsx     ✅ (önceki mesajda)
│   ├── uye-ol/page.tsx                   ✅ (önceki mesajda)
│   ├── giris/page.tsx                    ✅ (önceki mesajda)
│   ├── otel-profil/page.tsx              ✅ (önceki mesajda)
│   ├── panel/page.tsx                    ✅ (önceki mesajda)
│   ├── components/
│   │   └── AuthProvider.tsx              ✅ (önceki mesajda)
│   └── api/
│       ├── auth/[...nextauth]/route.ts   ✅ (16. madde)
│       ├── kayit/route.ts                ✅ (13. madde)
│       ├── ilanlar/route.ts              ✅ (1. madde)
│       ├── ilanlar/[id]/route.ts         ✅ (2. madde)
│       ├── teklifler/route.ts            ✅ (3. madde)
│       ├── teklifler/[id]/route.ts       ✅ (4. madde)
│       ├── rezervasyonlar/route.ts       ✅ (11. madde)
│       ├── bildirimler/route.ts          ✅ (12. madde)
│       ├── otel-profil/route.ts          ✅ (14. madde)
│       └── upload/route.ts              ✅ (15. madde)
