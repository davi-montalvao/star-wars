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
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
