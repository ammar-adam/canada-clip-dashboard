import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { auth0 } from "@/lib/auth0";
import { Auth0Wrapper } from "@/components/Auth0Wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "CanadaClip Merchant Dashboard",
  description:
    "Track how many customers you're stealing from big brands via AI-powered App Clips.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">
        <Auth0Wrapper user={user}>{children}</Auth0Wrapper>
      </body>
    </html>
  );
}
