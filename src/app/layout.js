import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PortfolioShell } from "@/components/shell/portfolio-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Heng Jun Yong | Fujianmian",
    template: "%s | Fujianmian",
  },
  description: "Personal portfolio of Heng Jun Yong.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
