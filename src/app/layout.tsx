import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "@/components/ui/theme/theme-provider"; // Fixed typo

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
  const content = (
    <html lang="en" className={`${outfit.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Coat_of_arms_of_Ghana.svg" />
      </head>
      <body className={outfit.variable} suppressHydrationWarning>
        {/* <ThemeProvider */}
          {/* attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange */}
        {/* > */}
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );

  return <ClerkProvider>{content}</ClerkProvider>;
}