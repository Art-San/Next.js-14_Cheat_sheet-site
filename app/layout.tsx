import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavigationMenuDemo } from '@/components/NavigationMenuDemo'
import ReactQueryProvider from '@/utils/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abstract - konspekt',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NavigationMenuDemo />
          <div className=" flex flex-col items-center mt-20 mx-auto w-[90%] md:w-[80%] lg:w-[70%] xl:w-[1140px]">
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
