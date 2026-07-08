import type { Metadata } from "next";
import "./globals.css";

function getMetadataBase() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    return new URL(siteUrl || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "KASH STUDIOS | Freelance Web Developer",
  description:
    "Clean, mobile-friendly websites for small businesses, personal brands, landing pages, portfolios, and simple online stores.",
  keywords: [
    "freelance web developer",
    "small business website",
    "portfolio website",
    "landing page developer",
    "website redesign"
  ],
  authors: [{ name: "KASH STUDIOS" }],
  creator: "KASH STUDIOS",
  openGraph: {
    title: "KASH STUDIOS | Freelance Web Developer",
    description:
      "Clean, mobile-friendly websites for small businesses, personal brands, landing pages, portfolios, and simple online stores.",
    type: "website",
    images: [
      {
        url: "/portfolio/developer-workspace.png",
        width: 1200,
        height: 900,
        alt: "Professional web development workspace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "KASH STUDIOS | Freelance Web Developer",
    description:
      "Clean, mobile-friendly websites for small businesses, personal brands, landing pages, portfolios, and simple online stores.",
    images: ["/portfolio/developer-workspace.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
