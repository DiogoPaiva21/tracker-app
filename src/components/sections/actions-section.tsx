import { ListPlus, PenTool, Plus, Star } from 'lucide-react'

interface ActionsSectionProps {
  setIsReviewModalOpen: (value: boolean) => void
  setSelectedRating: (value: number) => void
  hoveredRating: number
  selectedRating: number
  setHoveredRating: (value: number) => void
}

export function ActionsSection({
  setIsReviewModalOpen,
  setSelectedRating,
  hoveredRating,
  selectedRating,
  setHoveredRating,
}: ActionsSectionProps) {
  return (
    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden">
      <div
        className="p-6 flex justify-center gap-2 border-b border-white/10"
        onMouseLeave={() => setHoveredRating(0)}
      >
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= (hoveredRating || selectedRating)
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedRating(i)}
              onMouseEnter={() => setHoveredRating(i)}
              aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
              className="cursor-pointer transition-colors"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  filled
                    ? 'fill-yellow-300 stroke-yellow-300'
                    : 'fill-transparent stroke-zinc-400 hover:stroke-yellow-300'
                }`}
              />
            </button>
          )
        })}
      </div>
      <div className="flex flex-col">
        <button className="w-full py-4 px-6 flex items-center justify-center gap-2 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/10 font-medium">
          <Plus className="w-5 h-5" />
          Add to Watchlist
        </button>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="w-full py-4 px-6 flex items-center justify-center gap-2 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/10 font-medium cursor-pointer"
        >
          <PenTool className="w-5 h-5" />
          Review or Log
        </button>
        <button className="w-full py-4 px-6 flex items-center justify-center gap-2 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors font-medium">
          <ListPlus className="w-5 h-5" />
          Add to List
        </button>
      </div>
    </div>
  )
}
