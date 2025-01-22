"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Item {
  name: string
  [key: string]: any
}

export default function CategorySection({ title, endpoint }: { title: string; endpoint: string }) {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetch(`https://swapi.dev/api/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setItems(data.results.slice(0, 5)))
      .catch((error) => console.error("Error fetching data:", error))
  }, [endpoint])

  return (
    <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-yellow-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm">
              {item.name}
              {item.title && ` - ${item.title}`}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

