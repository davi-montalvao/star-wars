"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="glass-card p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Algo deu errado</h2>
        <p className="text-white/70 mb-6">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <button
          onClick={reset}
          className="glass-card px-6 py-3 text-white hover:text-yellow-400 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
