import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheByteSlayer.com",
  description: "Im a software developer and reverse engineer. I make stuff.",
  keywords: "software, development, programming, web, hosting, reverse engineering, ByteSlayer, byteslayer, Bytee, bytee, thebyteslayer, TheByteSlayer",
  authors: [{ name: "TheByteSlayer" }],
  creator: "TheByteSlayer",
  publisher: "TheByteSlayer",
  robots: "index, follow",
  openGraph: {
    title: "TheByteSlayer.com",
    description: "Im a software developer and reverse engineer. I make stuff.",
    url: "https://thebyteslayer.com",
    siteName: "TheByteSlayer.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheByteSlayer.com",
    description: "Im a software developer and reverse engineer. I make stuff.",
  },
  metadataBase: new URL("https://thebyteslayer.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
