import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppProvider } from "@/providers/AppProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { Navigation } from "@/components/navbar/navigation/Navigation";

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Дизельные генераторы",
  description: "Мониторинг дизельных генераторов.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppProvider>
          {/* <header className="sticky top-0 z-[100]">
            <Navbar />
          </header> */}
          <main className="container mx-auto max-w-5xl min-h-screen flex-col items-center">
            {/* <div className="flex">
              <Navigation />
            </div> */}
            {children}
          </main>
          <footer></footer>
        </AppProvider>
      </body>
    </html>
  );
}
