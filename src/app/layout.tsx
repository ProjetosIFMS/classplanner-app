import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/footer";
import localFont from "next/font/local";
import { getSession } from "@/lib/getSession";
import { AuthProvider } from "./_components/auth/AuthContext";
import { Header } from "./_components/header";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="pt">
      <body
        className={`${poppins.className} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider referentialAccessToken={session}>
          {!!session && <Header />}
          <main className="flex flex-grow bg-zinc-100 items-center justify-center min-h-full">
            {children}
          </main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
