import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azabache | Joyería y Arte Fantasy & Bookish",
  description: "🖤 Bookish Gifts, for readers 📔 and Dark Fantasy 🦇 - Joyería artesanal y arte gráfico con temática friki, gótica y fantasy. Creaciones únicas para almas mágicas.",
  keywords: "joyería friki, arte fantasy, Harry Potter, Señor de los Anillos, Studio Ghibli, anime, dark academia, witchy, gótico",
  authors: [{ name: "Azabache" }],
  openGraph: {
    title: "Azabache | Joyería y Arte Fantasy & Bookish",
    description: "Joyería artesanal y arte gráfico con temática friki, gótica y fantasy",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lora.variable} antialiased bg-[#FFF5FB]`}
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      >
        <Header />
        <main className="min-h-screen bg-[#FFF5FB]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
