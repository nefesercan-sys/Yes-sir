import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// Vercel'in tam olarak beklediği temiz yapı budur
export { handler as GET, handler as POST };
