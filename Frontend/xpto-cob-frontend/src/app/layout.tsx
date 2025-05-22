
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`m-0`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  );
}
