"use client"

import { useState, useEffect } from "react"
import { fetchSectionData } from "@/lib/api"

interface Item {
  name: string
  [key: string]: any
}

export default function CategorySection({ title, endpoint }: { title: string; endpoint: string }) {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    
    fetchSectionData(endpoint)
      .then((data) => {
        setItems(data.results?.slice(0, 5) || [])
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setError("Falha ao carregar dados")
        setIsLoading(false)
      })
  }, [endpoint])

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-4 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-2xl font-bold text-red-400 mb-4">{title}</h3>
        <p className="text-white/60 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
      <h3 className="text-2xl font-bold text-yellow-400 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-white/80 hover:text-yellow-400 transition-colors duration-300">
            {item.name}
            {item.title && ` - ${item.title}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

