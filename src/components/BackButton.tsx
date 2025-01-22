"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50 border-yellow-400 text-yellow-400 hover:bg-yellow-400/20 md:top-8 md:left-8
        /* Mobile optimization */
        text-sm md:text-base
        p-2 md:p-4
        min-w-[40px] md:min-w-[auto]
        aspect-square md:aspect-auto
      "
    >
      <ChevronLeft className="h-4 w-4 md:mr-2" />
      <span className="hidden md:inline">Back</span>
    </Button>
  )
}

