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
