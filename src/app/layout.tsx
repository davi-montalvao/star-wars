import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Star Wars",
  description: "Explore the Star Wars universe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black`}>
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/assets/background.jpg')`, 
          }}
        />
        <div className="relative z-10 mb-20" >{children}</div>
        <div className="fixed bottom-0 left-0 right-0 text-center py-5 bg-black z-50 text-white">
          Copyright © 2025 | Made with love and persistence 🤍💪🏽
        </div>
      </body>
    </html>
  )
}
