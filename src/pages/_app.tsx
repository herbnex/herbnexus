import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { TooltipProvider } from "@herbnexus/ui";
import "@herbnexus/styles/globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </TooltipProvider>
  );
}
