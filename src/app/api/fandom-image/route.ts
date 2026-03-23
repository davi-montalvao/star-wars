import { NextRequest, NextResponse } from "next/server"

/**
 * Busca URL de imagem no Wookieepedia via MediaWiki API.
 * GET /api/fandom-image?title=Human
 */
export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title")
  if (!title?.trim()) {
    return NextResponse.json({ error: "Missing title" }, { status: 400 })
  }

  try {
    const encodedTitle = encodeURIComponent(title.trim())
    const url = `https://starwars.fandom.com/api.php?action=query&titles=${encodedTitle}&prop=pageimages&pithumbsize=500&format=json&origin=*`

    const res = await fetch(url, { next: { revalidate: 86400 } }) // cache 24h
    const data = await res.json()

    const pages = data?.query?.pages
    if (!pages) {
      return NextResponse.json({ imageUrl: null })
    }

    const page = Object.values(pages)[0] as { thumbnail?: { source: string }; missing?: string }
    if (!page || page.missing || !page.thumbnail?.source) {
      return NextResponse.json({ imageUrl: null })
    }

    return NextResponse.json({ imageUrl: page.thumbnail.source })
  } catch (error) {
    console.error("Fandom image fetch error:", error)
    return NextResponse.json({ imageUrl: null })
  }
}
