/**
 * Busca imagens para itens da SWAPI.
 * People: usa API akabab (starwars-api) - ver api.ts
 * Outras categorias: usa API Fandom/Wookieepedia via /api/fandom-image
 */

export type SwapiCategory = "planets" | "films" | "species" | "vehicles" | "starships"

// Mapeamento de nomes SWAPI -> títulos Wookieepedia (quando diferem)
const TITLE_MAP: Record<string, string> = {
  // Films
  "A New Hope": "Star Wars: Episode IV A New Hope",
  "The Empire Strikes Back": "Star Wars: Episode V The Empire Strikes Back",
  "Return of the Jedi": "Star Wars: Episode VI Return of the Jedi",
  "The Phantom Menace": "Star Wars: Episode I The Phantom Menace",
  "Attack of the Clones": "Star Wars: Episode II Attack of the Clones",
  "Revenge of the Sith": "Star Wars: Episode III Revenge of the Sith",
  "The Force Awakens": "Star Wars: Episode VII The Force Awakens",
  // Starships & Vehicles
  "Yoda's species": "Yoda's species",
  "TIE/LN starfighter": "TIE/LN starfighter",
  "TIE bomber": "TIE/sa bomber",
  "TIE Advanced x1": "TIE Advanced x1",
  "Storm IV Twin-Pod cloud car": "Storm IV Twin-Pod cloud car",
  "AT-AT": "AT-AT",
  "AT-ST": "AT-ST",
  "CR90 corvette": "CR90 corvette",
  "Sentinel-class landing craft": "Sentinel-class landing craft",
  "Death Star": "Death Star (space station)",
  "Millennium Falcon": "Millennium Falcon",
  "Y-wing": "Y-wing starfighter",
  "X-wing": "X-wing starfighter",
  "Rebel transport": "GR-75 medium transport",
}

export function getFandomPageTitle(name: string | undefined, category: string): string {
  if (!name) return ""
  return TITLE_MAP[name] || name
}

/**
 * Busca URL de imagem no Wookieepedia via nossa API.
 */
export async function fetchFandomImageUrl(title: string): Promise<string | null> {
  if (!title?.trim()) return null
  try {
    const res = await fetch(
      `/api/fandom-image?title=${encodeURIComponent(title)}`
    )
    const data = await res.json()
    const url = data?.imageUrl ?? null
    return url ? getProxiedImageUrl(url) : null
  } catch {
    return null
  }
}

/**
 * Usa proxy para imagens Wikia (evita bloqueio de hotlink).
 */
export function getProxiedImageUrl(url: string): string {
  if (
    url.includes("wikia.nocookie.net") ||
    url.includes("static.wikia") ||
    url.includes("vignette.wikia")
  ) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`
  }
  return url
}
