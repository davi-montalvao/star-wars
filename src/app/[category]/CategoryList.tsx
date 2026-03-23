"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Pagination from "@/components/Pagination"
import LoadingSpinner from "@/components/LoadingSpinner"
import { fetchCategoryData, extractPeopleIdFromUrl, getCharacterImageUrl } from "@/lib/api"
import { getFandomPageTitle, fetchFandomImageUrl } from "@/lib/swapi-images"

function ItemImageWithFallback({
  src,
  alt,
  onError,
}: {
  src: string
  alt: string
  onError: () => void
}) {
  return (
    <div className="flex justify-center lg:justify-end lg:ml-4 order-first lg:order-last">
      <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg overflow-hidden ring-2 ring-yellow-400/30 shadow-lg">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 192px, 224px"
          unoptimized
          onError={onError}
        />
      </div>
    </div>
  )
}

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
  const [error, setError] = useState<string | null>(null)
  const [itemImages, setItemImages] = useState<Record<number, string>>({})
  const router = useRouter()

  const categoriesWithImages: string[] = ["people", "planets", "films", "species", "vehicles", "starships"]

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    setItemImages({})
    
    fetchCategoryData(category, page)
      .then((data) => {
        setItems(data.results || [])
        setTotalPages(Math.ceil((data.count || 0) / 10))
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setError("Falha ao carregar dados. Tente novamente em alguns instantes.")
        setIsLoading(false)
      })
  }, [category, page])

  // Busca imagens para todas as categorias
  useEffect(() => {
    if (!categoriesWithImages.includes(category) || items.length === 0) return

    const loadImages = async () => {
      const images: Record<number, string> = {}

      if (category === "people") {
        await Promise.all(
          items.map(async (item, index) => {
            const id = extractPeopleIdFromUrl(item.url)
            if (id) {
              const imgUrl = await getCharacterImageUrl(id)
              if (imgUrl) images[index] = imgUrl
            }
          })
        )
      } else {
        await Promise.all(
          items.map(async (item, index) => {
            const name = item.name || item.title
            const title = getFandomPageTitle(name, category)
            const imgUrl = await fetchFandomImageUrl(title)
            if (imgUrl) images[index] = imgUrl
          })
        )
      }
      setItemImages(images)
    }
    loadImages()
  }, [category, items])

  const handlePageChange = (newPage: number) => {
    router.push(`/${category}?page=${newPage}`)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-red-400 mb-4">
            Erro ao Carregar Dados
          </h3>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="glass-card px-6 py-3 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-105"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-8">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Nenhum Item Encontrado
          </h3>
          <p className="text-white/70">
            Não foi possível encontrar itens para esta categoria no momento.
          </p>
        </div>
      </div>
    )
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
            <div
              className={
                categoriesWithImages.includes(category) && itemImages[index]
                  ? "grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-start"
                  : ""
              }
            >
              {/* Conteúdo (esquerda) */}
              <div>
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
              </div>

              {/* Imagem (direita) - para todas as categorias com suporte */}
              {categoriesWithImages.includes(category) && itemImages[index] && (
                <ItemImageWithFallback
                  src={itemImages[index]}
                  alt={item.name || item.title || "Item"}
                  onError={() => {
                    setItemImages((prev) => {
                      const next = { ...prev }
                      delete next[index]
                      return next
                    })
                  }}
                />
              )}
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
