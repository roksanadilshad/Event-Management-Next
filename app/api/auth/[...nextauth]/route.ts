// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || "",
//       clientSecret: process.env.GOOGLE_SECRET || ""
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email) return null;
//         // Demo: Accept any email/password
//         return { id: credentials.email, name: credentials.email, email: credentials.email };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   pages: { signIn: "/login" },
//   secret: process.env.NEXTAUTH_SECRET
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
