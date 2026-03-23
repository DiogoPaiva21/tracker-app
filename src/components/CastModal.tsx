import { Link } from '@tanstack/react-router'
import { Users, X } from 'lucide-react'
import { useEffect } from 'react'
import type { MouseEvent } from 'react'

interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

interface CastModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  posterPath: string | null
  backdropPath: string | null
  cast: Array<CastMember>
}

export function CastModal({
  isOpen,
  onClose,
  title,
  posterPath,
  backdropPath,
  cast,
}: CastModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const PROFILE_BASE = 'https://image.tmdb.org/t/p/w185'
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
              <p className="text-zinc-400 font-medium">Full Cast</p>
            </div>
          </div>
        </div>

        {/* Cast List Section */}
        <div className="overflow-hidden p-2">
          <div className="overflow-y-auto px-6 my-2 space-y-2 custom-scrollbar max-h-100">
            {cast.map((person, idx) => (
              <Link
                key={`${person.id}-${idx}`}
                to="/person/$id"
                params={{ id: String(person.id) }}
                className="flex min-h-20 items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group border border-white/10"
              >
                {/* Profile Image */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
                  {person.profile_path ? (
                    <img
                      src={`${PROFILE_BASE}${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      <Users className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Name & Character */}
                <div className="flex flex-col justify-center">
                  <span className="text-zinc-200 font-medium text-base group-hover:text-white transition-colors">
                    {person.name}
                  </span>
                  <span className="text-zinc-500 text-sm">
                    {person.character}
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
