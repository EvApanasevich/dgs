import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/providers/AppProvider'
import { Navbar } from '@/components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Дизельные генераторы',
   description: 'Мониторинг дизельных генераторов.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

   return (
      <html lang="en">
         <body className={inter.className}>
            <AppProvider>
               <header>
                  <Navbar />
               </header>
               <main className="container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
                  {children}
               </main>
               <footer>
               </footer>
            </AppProvider>
         </body>
      </html>
   )
}
