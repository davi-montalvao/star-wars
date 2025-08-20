export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
      {/* Animated Star Wars Logo */}
      <div className="relative mb-8">
        <div className="w-32 h-32 md:w-40 md:h-40 relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 animate-spin" style={{ animationDuration: '3s' }} />

          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border-4 border-yellow-400/50 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />

          {/* Center */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
            <div className="text-2xl md:text-4xl font-bold text-white">★</div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
          Loading...
        </h3>
        <p className="text-white/70 text-lg">
          Searching the galaxy far, far away
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  );
}
