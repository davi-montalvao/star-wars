import Link from "next/link"
import { Users, Globe, Film, SpaceIcon as Alien, Car, Rocket } from "lucide-react"

const categories = [
  { name: "People", icon: Users, path: "people" },
  { name: "Planets", icon: Globe, path: "planets" },
  { name: "Films", icon: Film, path: "films" },
  { name: "Species", icon: Alien, path: "species" },
  { name: "Vehicles", icon: Car, path: "vehicles" },
  { name: "Starships", icon: Rocket, path: "starships" },
]

export default function Home() {


  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-12">Star Wars</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.path} href={`/${category.path}`} className="group block">
            <div className="bg-gray-900/80 p-6 rounded-lg border-2 border-yellow-400/20 hover:border-yellow-400 transition-colors duration-300">
              <div className="flex items-center justify-center mb-4">
                <category.icon className="w-12 h-12 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-center text-yellow-400">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

