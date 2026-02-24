import { Play, Star } from 'lucide-react'
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
}

export function MediaCard({
  id,
  title,
  image,
  rating,
  year,
  type,
  className,
}: MediaCardProps) {
  return (
    <Link
      className={cn(
        'group relative flex flex-col gap-3 shrink-0 cursor-pointer',
        className,
      )}
      to="/movie/$id"
      params={{ id: id.toString() }}
    >
      <div className="relative aspect-[2/3] w-[180px] md:w-[220px] lg:w-[260px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:border-white/20">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px] bg-black/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg transform transition-transform duration-300 scale-90 group-hover:scale-100">
            <Play className="h-5 w-5 ml-1" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            variant="secondary"
            className="bg-black/50 backdrop-blur-md text-white border-white/10 px-2 py-0.5 text-[10px] md:text-xs"
          >
            {year}
          </Badge>
          {type && (
            <Badge
              variant="outline"
              className="bg-black/50 backdrop-blur-md text-zinc-300 border-white/10 px-2 py-0.5 text-[10px] md:text-xs uppercase tracking-wider"
            >
              {type}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-semibold text-white truncate text-sm md:text-base group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-zinc-400 text-xs md:text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          <span className="font-medium text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}
