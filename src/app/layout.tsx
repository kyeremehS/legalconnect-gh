import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegalConnect",
  description: "Your trusted partner in legal solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.variable} antialiased`}>
        <head>
          <link rel="icon" href="/Coat_of_arms_of_Ghana.svg" />
        </head>
        <body className={outfit.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
