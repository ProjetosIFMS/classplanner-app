import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/footer";
import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "300",
    },
  ],
});
export const metadata: Metadata = {
  title: "Class Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${poppins.className} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow bg-zinc-100 items-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
