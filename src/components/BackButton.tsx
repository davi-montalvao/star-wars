"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 glass-card p-3 md:p-4 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-110 group
        /* Mobile optimization */
        text-sm md:text-base
        min-w-[48px] md:min-w-[auto]
        aspect-square md:aspect-auto
      "
    >
      <div className="flex items-center justify-center md:justify-start">
        <ChevronLeft className="h-5 w-5 md:mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="hidden md:inline font-medium">Back</span>
      </div>
    </button>
  )
}

