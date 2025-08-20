import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import StarryBackground from "@/components/StarryBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Star Wars Universe Explorer",
  description: "Explore the vast Star Wars universe with our interactive database. Discover characters, planets, films, species, vehicles, and starships from a galaxy far, far away.",
  keywords: "Star Wars, characters, planets, films, species, vehicles, starships, database, explorer",
  authors: [{ name: "Star Wars Fan" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700`}>
        <StarryBackground />
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('/assets/background.jpg')`, 
          }}
        />
        <div className="relative z-10 min-h-screen">{children}</div>
        <footer className="relative z-20 text-center py-6 glass-card mx-4 mb-4 mt-8">
          <p className="text-white/80 text-sm">
            Copyright © 2025 | Made with love and persistence 🤍💪🏽
          </p>
        </footer>
      </body>
    </html>
  )
}
