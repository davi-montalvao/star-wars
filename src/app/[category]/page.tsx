import { Suspense } from "react"

import CategoryList from "./CategoryList"
import Loading from "../loading"
import BackButton from "../../components/BackButton"
import ScrollToTop from "../../components/ScrollToTop"

interface PageProps {
  params: any;
  searchParams: any;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params 
  const { page = "1" } = await searchParams

  return (
    <div className="min-h-screen p-4 md:p-8 relative z-10">
      <BackButton />
      <ScrollToTop />
      
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <div className="slide-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 capitalize">
            Star Wars {category}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Explore the vast collection of {category.toLowerCase()} from the Star Wars universe
          </p>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<Loading />}>
        <CategoryList category={category} page={Number.parseInt(page)} />
      </Suspense>
    </div>
  )
}
