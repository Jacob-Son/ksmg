import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const authOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 100000, // ✅ 100초로 타임아웃 증가
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      if (!account) return token;
      const walletResult = await axios.post(
        process.env.WALLET_BASE_URL + '/auth/login-or-register',
        {
          provider: account.provider,
          accessToken: account.access_token,
        },
      );
      console.log("🔹 OAuth 로그인 성공:", walletResult.data);


      return {
        ...token,
        accessToken: walletResult.data.accessToken,
      };
    },
  },
};

export default NextAuth(authOptions);
