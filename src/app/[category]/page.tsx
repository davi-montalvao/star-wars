import { Suspense } from "react"
import { notFound } from "next/navigation"
import CategoryList from "./CategoryList"
import Loading from "../loading"
import BackButton from "../../components/BackButton"
import ScrollToTop from "../../components/ScrollToTop"

const validCategories = ["people", "planets", "films", "species", "vehicles", "starships"]

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { page?: string }
}) {
  const { category } = await params 
  const { page= "1" } = await searchParams

  if (!validCategories.includes(category)) {
    notFound()
  }

  return (
    <div className="min-h-screen p-8">
      <BackButton />
      <ScrollToTop />
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-12 capitalize">Star Wars {category}</h1>
      <Suspense fallback={<Loading />}>
        <CategoryList category={category} page={Number.parseInt(page)} />
      </Suspense>
    
    </div>
  )
}
