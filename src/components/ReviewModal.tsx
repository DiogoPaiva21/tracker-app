import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, Star, X } from 'lucide-react'
import type { MouseEvent } from 'react'
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

  const POSTER_BASE = 'https://image.tmdb.org/t/p/w154'
  const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280'
  const posterUrl = posterPath ? `${POSTER_BASE}${posterPath}` : null
  const backdropUrl = backdropPath ? `${BACKDROP_BASE}${backdropPath}` : null

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

  const getAverage = () => {
    if (!ratingDistribution) return '0.0'
    const total = Object.values(ratingDistribution).reduce((a, b) => a + b, 0)
    const weightedSum = Object.entries(ratingDistribution).reduce(
      (sum, [star, count]) => sum + Number(star) * count,
      0,
    )
    return total > 0 ? (weightedSum / total).toFixed(1) : '0.0'
  }
  const average = getAverage()

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
        <div className="relative w-full p-6 sm:px-8 sm:pt-6 sm:pb-4 shrink-0 overflow-hidden ">
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
          <div className="flex items-end gap-4 relative z-10">
            {/* Poster Image */}
            <div className="w-24 h-auto sm:w-32 sm:h-auto shrink-0 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
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
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {title}
              </h2>
              <p className="text-zinc-400 font-medium">Review or Log</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="overflow-y-auto custom-scrollbar px-6 sm:px-8 sm:py-2 space-y-4">
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
              <div className="flex items-end gap-3">
                <Star className="w-3 h-3 fill-zinc-500 text-zinc-500" />
                {/* Vertical Bar Chart */}
                {(() => {
                  const maxCount = Math.max(
                    ...Object.values(ratingDistribution),
                  )
                  return (
                    <div className="flex items-end gap-1 h-12">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const count =
                          ratingDistribution[star as keyof RatingDistribution]
                        const heightPercent =
                          maxCount > 0 ? (count / maxCount) * 100 : 0
                        return (
                          <div
                            key={star}
                            className="relative w-4 h-full rounded-none overflow-hidden"
                          >
                            <div
                              className="absolute bottom-0 left-0 right-0 bg-zinc-500 rounded-none transition-all duration-500"
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}

                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-zinc-400 leading-none mb-2">
                    {average}
                  </span>
                  <div className="flex gap-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-zinc-500 text-zinc-500"
                      />
                    ))}
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
              className="text-sm font-medium text-zinc-400 flex items-center whitespace-nowrap"
            >
              Watched On
            </label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  data-empty={!watchDate}
                  className="flex-1 justify-start text-left font-normal bg-zinc-900/50 border-white/10 text-white hover:bg-zinc-800/60"
                >
                  <CalendarIcon className="h-4 w-4" />
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
        <div className="px-8 py-4 border-t border-white/10 bg-zinc-950/50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-zinc-400/30 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
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
