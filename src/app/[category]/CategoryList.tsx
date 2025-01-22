"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Pagination from "@/components/Pagination"
import LoadingSpinner from "@/components/LoadingSpinner"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Item {
  name?: string
  title?: string
  [key: string]: any
}

export default function CategoryList({
  category,
  page,
}: {
  category: string
  page: number
}) {
  const [items, setItems] = useState<Item[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://swapi.dev/api/${category}/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results)
        setTotalPages(Math.ceil(data.count / 10))
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      })
  }, [category, page])

  const handlePageChange = (newPage: number) => {
    router.push(`/${category}?page=${newPage}`)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        {items.map((item, index) => (
          <Card key={index} className="bg-gray-900/80 border-yellow-400/20 hover:border-yellow-400 transition-colors">
            <CardHeader>
              <CardTitle className="text-yellow-400">{item.name || item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              {Object.entries(item)
                .filter(([key]) => !["created", "edited", "url"].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-2">
                    <span className="font-bold capitalize">{key.replace("_", " ")}:</span>
                    <span className="md:col-span-2">{Array.isArray(value) ? value.length : value}</span>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

