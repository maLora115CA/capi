import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Acompaña - Más que cuidado, compañía",
  description: "Servicio premium de compañía y apoyo humano para adultos mayores y personas con limitaciones físicas en Morelia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} antialiased selection:bg-brand-sage selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
