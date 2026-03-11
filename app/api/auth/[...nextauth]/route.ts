import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from '@/lib/mongodb';
import { createHash } from 'crypto';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(cred) {
        if (!cred?.email || !cred?.password) return null;
        const db = await getDb();
        const user = await db.collection('users').findOne({ email: cred.email.toLowerCase() });
        if (!user) return null;
        const hash = createHash('sha256').update(cred.password).digest('hex');
        if (user.password !== hash) return null;
        return { id: user._id.toString(), email: user.email, name: user.ad, image: user.resim };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const db = await getDb();
        await db.collection('users').updateOne(
          { email: user.email },
          { $set: { email: user.email, ad: user.name, resim: user.image, guncellendi: new Date() }, $setOnInsert: { olusturuldu: new Date(), tip: 'hizmet_alan', bakiye: 0 } },
          { upsert: true }
        );
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) (session.user as any).id = token.sub;
      return session;
    },
  },
  pages: { signIn: '/giris', error: '/giris' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
