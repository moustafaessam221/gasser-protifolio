import AuthInitializer from "@/components/AuthInitializer";
import Footer from "@/components/layout/Footer";
import NavigationBar from "@/components/layout/NavigationBar";
import ReduxProvider from "@/components/ReduxProvider";
import type { Metadata } from "next";
import { Eczar, Work_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";

const eczar = Eczar({
  subsets: ["latin"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gasser Design",
  description: "This is the portfolio of Gasser Amr, a UI/UX Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-eczar ${eczar.className} ${workSans.className} antialiased overflow-x-hidden border-x-4 border-black`}
      >
        <ReduxProvider>
          <QueryProvider>
            <AuthInitializer />
            <NavigationBar />
            {children}
            <Footer />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
