import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/nextjs/styles/globals.css";
import "@/nextjs/styles/themes.css";

import { siteConfig } from "@/config/site";
import { Provider as ReduxStoreProvider } from "@/nextjs/lib/redux/store";

import { TopLoading } from "@/nextjs/components/loading";
import { TailwindIndicator } from "@/nextjs/components/misc/tailwind-indicator";
import { Provider as ThemeProvider } from "@/nextjs/components/themes/provider";
import { Wrapper as ThemeWrapper } from "@/nextjs/components/themes/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxStoreProvider>
          <ThemeWrapper>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <>
                <TopLoading />
                {children}
                <TailwindIndicator />
              </>
            </ThemeProvider>
          </ThemeWrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
