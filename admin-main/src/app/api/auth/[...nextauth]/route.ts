import NextAuth, { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

// ✅ NextAuth 설정 객체
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signIn", // ✅ 로그인 페이지 명시적 지정
    error: "/auth/error", // ✅ 로그인 에러 시 이동할 페이지
  },

  callbacks: {
    async session({ session, token }) {
      console.log("Session callback:", session);
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },

    async jwt({ token, account }) {
      console.log("JWT callback:", token);
      if (!account) return token;

      try {
        const walletResult = await axios.post(
          `${process.env.WALLET_BASE_URL}/auth/login-or-register`,
          {
            provider: account.provider,
            accessToken: account.access_token,
          }
        );

        console.log("Wallet login result:", walletResult.data);
        return {
          ...token,
          accessToken: walletResult.data.accessToken,
        };
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("Redirecting after login to:", url);
      return "/admin"; // ✅ 로그인 후 이동할 페이지
    },
  },
};

// ✅ NextAuth 핸들러 설정
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
