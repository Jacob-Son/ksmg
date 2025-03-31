import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }: { token: any; account: any }) {
      if (!account) return token;
      const walletResult = await axios.post(
        process.env.WALLET_BASE_URL + "/auth/login-or-register",
        {
          provider: account.provider,
          accessToken: account.access_token,
        }
      );

      return {
        ...token,
        accessToken: walletResult.data.accessToken,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import NaverProvider from "next-auth/providers/naver";
// import KakaoProvider from "next-auth/providers/kakao";
// import GoogleProvider from "next-auth/providers/google";
// import axios from "axios";
// import { NextAuthOptions } from "next-auth";

// // ✅ axios 인스턴스 생성 (타임아웃 10초 설정)
// const axiosInstance = axios.create({
//   timeout: 10000, // 10초 (기본 3.5초보다 증가)
// });

// const authOptions: NextAuthOptions = {
//   providers: [
//     NaverProvider({
//       clientId: process.env.NAVER_CLIENT_ID!,
//       clientSecret: process.env.NAVER_CLIENT_SECRET!,
//     }),
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID!,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET!,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         url: "https://accounts.google.com/o/oauth2/auth",
//         params: {
//           prompt: "consent", // ✅ 매번 새 로그인 요청
//           access_type: "offline", // ✅ refresh token 허용
//           response_type: "code",
//         },
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,

//   // ✅ NextAuth 내부 fetch 타임아웃 증가 (10초)
//   fetchOptions: {
//     timeout: 10000, // 10초
//   },

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         console.log("🛠 OAuth 로그인 프로필 데이터:", profile);

//         try {
//           const walletResult = await axiosInstance.post(
//             process.env.WALLET_BASE_URL + "/auth/login-or-register",
//             {
//               provider: account.provider,
//               accessToken: account.access_token,
//             }
//           );

//           console.log("📌 API 응답:", walletResult.data);

//           return {
//             ...token,
//             accessToken: walletResult.data.accessToken,
//             role: walletResult.data.userInfo?.role || "ADMIN", // ✅ role 추가
//           };
//         } catch (error) {
//           console.error("🚨 Wallet API 요청 실패:", error);
//           throw new Error("OAuth 처리 중 오류 발생");
//         }
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.user.role = token.role; // ✅ session에 role 추가
//       console.log("✅ 세션 데이터:", session);
//       return session;
//     },
//   },

//   events: {
//     async signIn(message) {
//       console.log("📢 OAuth 로그인 시도:", message);
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   debug: true, // ✅ 디버깅 활성화

//   pages: {
//     error: "/auth/error", // 에러 발생 시 리디렉션 페이지 설정
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
