// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       process.env.NEXT_PUBLIC_CLOUD_FRONT_URL,
//       'lh3.googleusercontent.com',
//       'k.kakaocdn.net',
//       'phinf.pstatic.net',
//     ],
//   },
//   // images: {
//   //   unoptimized: true,
//   // },
//   images: {
//     domains: ['localhost'],
// }

// };

// module.exports = nextConfig;/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'daqdg9bqn9ues.cloudfront.net',
      'lh3.googleusercontent.com',
      'k.kakaocdn.net',
      'phinf.pstatic.net',
      'localhost',
      'storage.ksmg.store',
      't1.kakaocdn.net', // ✅ 카카오 프로필 이미지 도메인 추가
    ],
  },
};

module.exports = nextConfig;
