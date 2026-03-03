import { Star, Calendar } from 'lucide-react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

import { Link } from '@tanstack/react-router'

export interface MediaCardProps {
  id: string
  title: string
  image: string
  rating: number
  year: number
  type?: 'movie' | 'show'
  className?: string
  episode?: string
  releaseDate?: string
}

export function MediaCard({
  id,
  title,
  image,
  rating,
  year,
  type,
  className,
  episode,
  releaseDate,
}: MediaCardProps) {
  return (
    <Link
      className={cn(
        'group relative flex w-[160px] md:w-[180px] lg:w-[200px] flex-col gap-3 shrink-0 cursor-pointer',
        className,
      )}
      to={`/${type === 'movie' ? 'movie' : 'tv'}/$id` as any}
      params={{ id: id.toString() } as any}
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:border-white/20">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-black/50 backdrop-blur-md text-white border-white/10 px-2 py-0.5 text-[10px] md:text-xs"
          >
            {year}
          </Badge>
        </div>

        {/* Release Date Bottom Left Corner */}
        {releaseDate && (
          <div className="absolute bottom-0 left-0 rounded-tr-xl border-t border-r border-white/10 bg-black/60 backdrop-blur-md px-2 py-1 flex items-center gap-1.5 text-sm font-medium text-zinc-200">
            <Calendar className="h-3 w-3 text-white" />
            <span>{releaseDate}</span>
          </div>
        )}

        {/* Episode Right Bottom Corner */}
        {episode && (
          <div className="absolute bottom-0 right-0 rounded-tl-xl border-t border-l border-white/10 bg-black/60 backdrop-blur-md px-2 py-1 text-sm font-semibold text-zinc-200">
            {episode}
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="flex-1 min-w-0 font-semibold text-white truncate text-sm md:text-base group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="shrink-0 flex items-center gap-1.5 text-zinc-400 text-xs md:text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          <p className="font-medium text-white">{rating.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  )
}
