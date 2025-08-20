"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Pagination from "@/components/Pagination"
import LoadingSpinner from "@/components/LoadingSpinner"

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
    <div className="max-w-6xl mx-auto">
      {/* Results Info */}
      <div className="text-center mb-8">
        <div className="glass-card p-4 inline-block">
          <p className="text-white/80">
            Showing page {page} of {totalPages} • {items.length} items
          </p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid gap-6 md:gap-8">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="glass-card p-6 md:p-8 slide-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Item Header */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                {item.name || item.title}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full" />
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(item)
                .filter(([key]) => !["created", "edited", "url"].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="group">
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-semibold text-white/60 uppercase tracking-wide">
                        {key.replace("_", " ")}
                      </span>
                      <span className="text-white/90 text-base group-hover:text-yellow-400 transition-colors duration-300">
                        {Array.isArray(value) ? (
                          <span className="inline-flex items-center space-x-2">
                            <span>{value.length}</span>
                            <span className="text-yellow-400">•</span>
                            <span className="text-sm text-white/60">items</span>
                          </span>
                        ) : (
                          typeof value === 'string' && value.includes('http') ? (
                            <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                              View Details
                            </span>
                          ) : (
                            value
                          )
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Hover Effect */}
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

