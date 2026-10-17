import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wazzaaap AI — ogarniemy wizytę",
  description: "Asystent, który pomaga znaleźć wizytę i zaplanować dojazd.",
  applicationName: "Wazzaaap AI"
};

export const viewport: Viewport = {
  themeColor: "#0a090d",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
