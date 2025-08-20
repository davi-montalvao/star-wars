"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="glass-card px-4 py-2 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
      >
        <div className="flex items-center space-x-2">
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Previous</span>
        </div>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`glass-card px-3 py-2 min-w-[40px] transition-all duration-300 hover:scale-105 ${
              currentPage === page
                ? 'text-yellow-400 border-yellow-400/50'
                : 'text-white hover:text-yellow-400'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Page Info */}
      <div className="glass-card px-4 py-2 text-white/80 text-sm">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="glass-card px-4 py-2 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
      >
        <div className="flex items-center space-x-2">
          <span>Next</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </button>
    </div>
  )
}
