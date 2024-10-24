import ContactButtonPopup from "@/components/ContactButtonPopup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.scss";
import { TRPCReactProvider } from "@/trpc/react";
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

// Create metadata base
export const metadata: Metadata = {
  title: "Be Fitness Frenzy",
  description:
    "Shadcn UI is a React UI library that helps developers build fast and beautiful web applications.",
};

// Client component to handle pathname-dependent rendering
import dynamic from 'next/dynamic';

const ClientWrapper = dynamic(() => import('@/components/ClientWrapper'), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo/logo-icon.png" />
      </head>

      <body
        className="inter.className bg-gradient-to-r to-background from-gray-900 min-h-screen flex flex-col justify-between text-primary-foreground"
      >
        <TRPCReactProvider>
          <ClientWrapper>
            <Header />
            <main className="">
              {children}
              <ContactButtonPopup />
              <NextTopLoader color="#F2BD4D" />
            </main>
            <Footer />
          </ClientWrapper>
        </TRPCReactProvider>

        <GoogleTagManager gtmId="G-45ZWLCE7NH" />
      </body>
    </html>
  );
}