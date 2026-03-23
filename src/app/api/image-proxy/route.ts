import { NextRequest, NextResponse } from "next/server"

const ALLOWED_ORIGINS = [
  "https://static.wikia.nocookie.net",
  "https://vignette.wikia.nocookie.net",
]

/**
 * Proxy de imagens para evitar bloqueio de hotlink do Wikia/Fandom.
 * GET /api/image-proxy?url=https://...
 */
export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url")
  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  try {
    const url = new URL(imageUrl)
    const isAllowed = ALLOWED_ORIGINS.some(
      (origin) => url.origin === origin || url.href.startsWith(origin)
    )
    if (!isAllowed) {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 })
    }

    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": "StarWarsExplorer/1.0",
      },
    })

    if (!res.ok) {
      return new NextResponse(null, { status: res.status })
    }

    const blob = await res.blob()
    const contentType = res.headers.get("content-type") || "image/jpeg"

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    console.error("Image proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}
