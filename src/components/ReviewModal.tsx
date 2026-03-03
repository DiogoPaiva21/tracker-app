import { format } from 'date-fns'
import { useEffect, useState, type MouseEvent } from 'react'
import { X, Calendar as CalendarIcon, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface RatingDistribution {
  1: number
  2: number
  3: number
  4: number
  5: number
}

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  posterPath: string | null
  backdropPath: string | null
  currentRating?: number
  ratingDistribution?: RatingDistribution
}

export function ReviewModal({
  isOpen,
  onClose,
  title,
  posterPath,
  backdropPath,
  currentRating = 0,
  ratingDistribution,
}: ReviewModalProps) {
  const [rating, setRating] = useState(currentRating)
  const [reviewText, setReviewText] = useState('')
  const [watchDate, setWatchDate] = useState<Date>()
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setRating(currentRating)
      setReviewText('')
      setWatchDate(new Date())
      setHoverRating(0)
    }
  }, [isOpen, currentRating])

  if (!isOpen) return null

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const posterUrl = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : null
  const backdropUrl = backdropPath ? `${IMAGE_BASE_URL}${backdropPath}` : null

  // Handle click outside to close
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSave = () => {
    // Here you would typically save the review/log
    console.log({
      rating,
      reviewText,
      watchDate: watchDate ? watchDate.toISOString() : null,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-zinc-400 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Section */}
        <div className="relative w-full p-6 sm:p-8 shrink-0 overflow-hidden ">
          {backdropUrl ? (
            <>
              <img
                src={backdropUrl}
                alt={`${title} backdrop`}
                className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-900/10 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-zinc-900" />
          )}
          <div className="flex items-end gap-6 relative z-10">
            {/* Poster Image */}
            <div className="w-24 h-36 sm:w-28 sm:h-40 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                  <span className="text-xs uppercase font-medium">
                    No Image
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="pb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                I Watched...
              </h2>
              <p className="text-zinc-400 font-medium text-lg">{title}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-8">
          {/* Rating Section */}
          <div className="flex items-center justify-between bg-zinc-900/50 p-5 rounded-xl border border-white/5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 block">
                Your Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 -ml-1 focus:outline-hidden cursor-pointer"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-all ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] scale-110'
                          : 'fill-transparent text-zinc-600 hover:text-zinc-500'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {ratingDistribution ? (
              <div className="flex items-center gap-4">
                <div className="space-y-1.5 flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count =
                      ratingDistribution[star as keyof RatingDistribution]
                    const total = Object.values(ratingDistribution).reduce(
                      (a, b) => a + b,
                      0,
                    )
                    const percentage = total > 0 ? (count / total) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 w-3">
                          {star}
                        </span>
                        <Star className="w-3 h-3 fill-zinc-600 text-zinc-600" />
                        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-500 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="text-center pl-4 border-l border-white/10">
                  <span className="text-xs font-medium text-zinc-500 block mb-1">
                    Average
                  </span>
                  <div className="flex items-baseline gap-1">
                    {(() => {
                      const total = Object.values(ratingDistribution).reduce(
                        (a, b) => a + b,
                        0,
                      )
                      const weightedSum = Object.entries(
                        ratingDistribution,
                      ).reduce(
                        (sum, [star, count]) => sum + Number(star) * count,
                        0,
                      )
                      const average =
                        total > 0 ? (weightedSum / total).toFixed(1) : '0.0'
                      return (
                        <>
                          <span className="text-2xl font-bold text-white">
                            {average}
                          </span>
                          <span className="text-zinc-500 font-medium text-sm">
                            / 5
                          </span>
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-right space-y-1">
                <span className="text-sm font-medium text-zinc-500 block">
                  Current
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {rating > 0 ? rating : '-'}
                  </span>
                  <span className="text-zinc-500 font-medium">/ 5</span>
                </div>
              </div>
            )}
          </div>

          {/* Date Section */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="watch-date"
              className="text-sm font-medium text-zinc-400 flex items-center gap-2 whitespace-nowrap"
            >
              <CalendarIcon className="w-4 h-4" />
              Date Watched
            </label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  data-empty={!watchDate}
                  className="flex-1 justify-start text-left font-normal bg-zinc-900/50 border-white/10 text-white hover:bg-zinc-800/60"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span className={watchDate ? '' : 'text-zinc-500'}>
                    {watchDate ? format(watchDate, 'PPP') : 'Pick a date'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10">
                <Calendar
                  mode="single"
                  selected={watchDate}
                  onSelect={setWatchDate}
                  className="bg-transparent text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Review Section */}
          <div className="space-y-2">
            <label
              htmlFor="review"
              className="text-sm font-medium text-zinc-400 block"
            >
              Review{' '}
              <span className="text-zinc-600 font-normal">(Optional)</span>
            </label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you think?"
              className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-700 transition-all resize-none custom-scrollbar"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-zinc-950/50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Save Log
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `,
        }}
      />
    </div>
  )
}
