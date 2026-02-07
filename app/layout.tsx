import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Will You Be My Valentine? 💝',
  description: 'A cute and interactive valentine proposal website',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-muted-foreground bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm">
          <div className="flex justify-center items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>for Surbhi by Durgesh
          </div>
        </footer>
      </body>
    </html>
  )
}
