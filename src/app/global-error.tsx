"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">Algo deu errado</h1>
          <p className="text-white/70 mb-6">
            Ocorreu um erro inesperado. Tente recarregar a página.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}
