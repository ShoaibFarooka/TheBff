import Header from "@/components/Header";
import "@/styles/globals.scss";
import type { Metadata } from "next";
// const inter = Inter({ subsets: ['latin'] })
import ContactButtonPopup from "@/components/ContactButtonPopup";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
// Create metadata base
export const metadata: Metadata = {
  title: "Be Fitness Frenzy",
  description:
    "Shadcn UI is a React UI library that helps developers build fast and beautiful web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo/logo-icon.png" />
      </head>

      <body
        className={
          "inter.className bg-gradient-to-r to-background from-gray-900 min-h-screen flex flex-col justify-between"
        }
      >
        {/* main. */}
        <div>
          <Header />
        </div>

        <main>
          {children}
          <ContactButtonPopup />
          <NextTopLoader color="#F2BD4D" />
        </main>

        <div>
          <Footer />
        </div>

      </body>
    </html>
  );
}
