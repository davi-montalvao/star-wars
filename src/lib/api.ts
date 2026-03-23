// Configuração da API SWAPI
export const SWAPI_CONFIG = {
  // URLs da API com fallbacks
  BASE_URLS: [
    'http://swapi.dev/api',
    'https://swapi.dev/api',
    'https://swapi.py4e.com/api', // Mirror alternativo
  ],
  
  // Timeout para requisições
  TIMEOUT: 10000,
  
  // Número máximo de tentativas
  MAX_RETRIES: 3,
}

// Função para fazer requisições com fallback
export async function fetchWithFallback(endpoint: string, options: RequestInit = {}) {
  let lastError: Error | null = null
  
  for (const baseUrl of SWAPI_CONFIG.BASE_URLS) {
    try {
      const url = `${baseUrl}/${endpoint}`
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), SWAPI_CONFIG.TIMEOUT)
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      lastError = error as Error
      console.warn(`Failed to fetch from ${baseUrl}:`, error)
      continue
    }
  }
  
  throw lastError || new Error('All API endpoints failed')
}

// Função específica para buscar dados de uma categoria
export async function fetchCategoryData(category: string, page: number = 1) {
  return fetchWithFallback(`${category}/?page=${page}`)
}

// Função para buscar dados de uma seção
export async function fetchSectionData(endpoint: string) {
  return fetchWithFallback(endpoint)
}

// Cache para imagens de personagens (akabab starwars-api)
let characterImagesCache: Record<number, string> | null = null

// Extrai o ID da URL da SWAPI (ex: https://swapi.dev/api/people/1/ -> 1)
export function extractPeopleIdFromUrl(url: string | undefined): number | null {
  if (!url || typeof url !== 'string') return null
  const match = url.match(/people\/(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

// Extrai o ID da URL da SWAPI para qualquer categoria
export function extractIdFromUrl(url: string | undefined, category: string): number | null {
  if (!url || typeof url !== 'string') return null
  const pattern = new RegExp(`${category}/(\\d+)`)
  const match = url.match(pattern)
  return match ? parseInt(match[1], 10) : null
}

// Busca a URL da imagem de um personagem pelo ID (akabab API)
export async function getCharacterImageUrl(peopleId: number): Promise<string | null> {
  try {
    if (!characterImagesCache) {
      const data = await fetch('https://akabab.github.io/starwars-api/api/all.json').then((r) => r.json())
      characterImagesCache = Object.fromEntries(
        (data as { id: number; image: string }[]).map((c) => [c.id, c.image])
      )
    }
    const url = characterImagesCache[peopleId] ?? null
    if (!url) return null
    // Usa proxy para imagens Wikia (evita bloqueio de hotlink)
    if (url.includes('wikia.nocookie.net')) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`
    }
    return url
  } catch {
    return null
  }
}
