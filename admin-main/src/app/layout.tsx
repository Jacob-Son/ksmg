import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/common/Layout";
import "./globals.css";
import Provider from "@/components/common/Provider";
import CommonModal from "@/components/common/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ebook Admin",
  description: "Ebook Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <Provider>
          <CommonModal />
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
