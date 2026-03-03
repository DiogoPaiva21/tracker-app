import { useEffect, type MouseEvent } from 'react'
import { Briefcase, X } from 'lucide-react'

interface CrewMember {
  id: number
  name: string
  job: string
  profile_path: string | null
}

interface CrewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  posterPath: string | null
  backdropPath: string | null
  crew: CrewMember[]
}

export function CrewModal({
  isOpen,
  onClose,
  title,
  posterPath,
  backdropPath,
  crew,
}: CrewModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const posterUrl = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : null
  const backdropUrl = backdropPath ? `${IMAGE_BASE_URL}${backdropPath}` : null

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
      <div className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-zinc-400 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full p-6 sm:p-8 shrink-0 overflow-hidden">
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

            <div className="pb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {title}
              </h2>
              <p className="text-zinc-400 font-medium">Full Crew</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden p-2">
          <div className="overflow-y-auto px-4 my-2 custom-scrollbar max-h-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crew.map((person, idx) => (
                <div
                  key={`${person.id}-${idx}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group border border-white/10"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
                    {person.profile_path ? (
                      <img
                        src={`${IMAGE_BASE_URL}${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        <Briefcase className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex flex-col">
                    <span className="text-zinc-200 font-medium text-base group-hover:text-white transition-colors truncate">
                      {person.name}
                    </span>
                    <span className="text-zinc-500 text-sm truncate">
                      {person.job}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
