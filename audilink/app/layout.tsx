import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AudiLink Studio · Create with every voice",
  description:
    "A precise audio workspace for audiobooks, expressive speech, voices, sound effects, and transcription.",
  applicationName: "AudiLink Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
