import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do App - Bruna Borges",
  description: "This is  a To Do App  test with Login and Register pages for a Full Stack position",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className='bg-gray-800 min-h-screen'
      >
        <main className="w-full max-w-3xl px-4">
          <section className="bg-slate-200 mx-auto p-6 min-h-[580px] rounded-xl flex flex-col justify-center">
            {children}
          </section>

        </main>
      </body>
    </html>
  );
}
