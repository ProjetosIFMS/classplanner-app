import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/footer";
import localFont from "next/font/local";
import { getSession } from "@/lib/getSession";
import { AuthProvider } from "./_components/auth/AuthContext";
import { SidebarProvider, SidebarTrigger } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { isServerMobile } from "@/utils/isMobile";

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
  const isMobile = await isServerMobile();
  return (
    <html lang="pt">
      <body
        className={`${poppins.className} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider referentialAccessToken={session}>
          <SidebarProvider defaultOpen={false}>
            {!!session && <AppSidebar />}

            <main className="flex-grow lg:py-24 bg-zinc-100 items-center">
              {!!session && isMobile ? <SidebarTrigger /> : null}
              {children}
            </main>
          </SidebarProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
