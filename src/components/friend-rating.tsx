import { Star, MessageCircle, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FriendRatingProps {
  id: string
  user: {
    name: string
    avatar: string
  }
  media: {
    title: string
    image: string
    year: number
  }
  rating: number
  review?: string
  timeAgo: string
  className?: string
}

export function FriendRating({
  user,
  media,
  rating,
  review,
  timeAgo,
  className,
}: FriendRatingProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col md:flex-row gap-4 p-5 rounded-2xl border border-white/5 bg-linear-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden transition-all hover:bg-white/[0.05] hover:border-white/10 group cursor-pointer',
        className,
      )}
    >
      {/* Decorative background element */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Media Poster thumbnail */}
      <div className="relative shrink-0 w-20 h-28 md:w-24 md:h-36 rounded-lg overflow-hidden border border-white/10 shadow-lg">
        <img
          src={media.image}
          alt={media.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 py-1">
        {/* User Info & Rating header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {user.name}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                {timeAgo}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-500">{rating}</span>
          </div>
        </div>

        {/* Media Title */}
        <h4 className="text-lg font-semibold text-white mb-2 leading-tight flex items-baseline gap-2">
          <span className="truncate">{media.title}</span>
          <span className="text-xs font-normal text-zinc-500 shrink-0">
            ({media.year})
          </span>
        </h4>

        {/* Review snippet */}
        {review ? (
          <div className="relative mt-auto">
            <Quote className="absolute -left-1 -top-1 w-4 h-4 text-white/10 rotate-180" />
            <p className="text-sm text-zinc-400 line-clamp-2 pl-4 italic">
              "{review}"
            </p>
          </div>
        ) : (
          <div className="mt-auto flex items-center gap-2 text-xs text-zinc-600">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>No written review</span>
          </div>
        )}
      </div>
    </div>
  )
}
