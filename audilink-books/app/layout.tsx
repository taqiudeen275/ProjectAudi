import type { Metadata, Viewport } from "next";
import { productSurfaces } from "@audilink/ui";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: productSurfaces.books.name,
  title: {
    default: "AudiLink Books — Stories deserve to be heard",
    template: "%s · AudiLink Books",
  },
  description:
    "Discover cinematic audiobooks and serials, build your listening library, and follow every story wherever it leads.",
  keywords: [
    "audiobooks",
    "audio serials",
    "full cast stories",
    "AudiLink Books",
  ],
  category: "entertainment",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#100d0c",
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
