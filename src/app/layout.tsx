import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PointerMotionProvider } from "@/components/providers/PointerMotionProvider";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "C S Job | Full Stack .NET Engineer",
  description: "Building Scalable & Secure Systems | Angular & Cloud-Ready APIs | Exploring AI, GenAI & LLMs | Aspiring Tech Leader",
  keywords: ["Full Stack", ".NET", "Angular", "Cybersecurity", "AI", "Cloud"],
  openGraph: {
    title: "C S Job | Full Stack .NET Engineer",
    description: "Building Scalable & Secure Systems | Angular & Cloud-Ready APIs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#0A0A0F] text-[#E8E8ED] antialiased custom-cursor font-sans">
        <SmoothScrollProvider>
          <PointerMotionProvider>
            <CursorSpotlight />
            <CustomCursor />
            {children}
          </PointerMotionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
