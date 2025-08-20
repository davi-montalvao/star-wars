"use client"

import Link from "next/link"
import { Users, Globe, Film, SpaceIcon as Alien, Car, Rocket } from "lucide-react"
import { useEffect, useState } from "react"

const categories = [
  { 
    name: "People", 
    icon: Users, 
    path: "people",
    description: "Discover characters from across the galaxy",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    name: "Planets", 
    icon: Globe, 
    path: "planets",
    description: "Explore worlds beyond imagination",
    color: "from-green-500 to-emerald-500"
  },
  { 
    name: "Films", 
    icon: Film, 
    path: "films",
    description: "Journey through epic cinematic adventures",
    color: "from-purple-500 to-pink-500"
  },
  { 
    name: "Species", 
    icon: Alien, 
    path: "species",
    description: "Meet diverse alien lifeforms",
    color: "from-orange-500 to-red-500"
  },
  { 
    name: "Vehicles", 
    icon: Car, 
    path: "vehicles",
    description: "Ride legendary ground vehicles",
    color: "from-yellow-500 to-amber-500"
  },
  { 
    name: "Starships", 
    icon: Rocket, 
    path: "starships",
    description: "Pilot iconic spacecraft",
    color: "from-indigo-500 to-blue-500"
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen p-4 md:p-8 relative z-10">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16">
        <div className="floating">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text mb-4">
            Star Wars
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Explore the vast universe of Star Wars. Discover characters, planets, films, and more from a galaxy far, far away.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.path} 
              href={`/${category.path}`} 
              className="group block slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="glass-card p-6 md:p-8 h-full flex flex-col justify-center items-center text-center group-hover:scale-105 transition-all duration-500 ease-out">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${category.color} p-1 group-hover:glow-effect transition-all duration-300`}>
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                      <category.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {category.name}
                </h2>

                {/* Description */}
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {category.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 md:mt-20">
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Explore?
          </h3>
          <p className="text-white/70 mb-6">
            Choose a category above to begin your journey through the Star Wars universe. 
            Each section contains detailed information about characters, locations, and objects from the saga.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </main>
  )
}

