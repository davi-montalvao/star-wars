export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-24 h-24 mb-4">
        <img
          src="/assets/soldier.jpg"
          alt="Loading..."
          className="w-full h-full object-contain animate-bounce rounded-full"
        />
      </div>
      <p className="text-yellow-400 text-2xl font-bold animate-pulse">Loading...</p>
    </div>
  );
}
