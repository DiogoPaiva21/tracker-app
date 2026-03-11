import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Link } from '@tanstack/react-router'
import { Users } from 'lucide-react'

interface CastMember {
  id: number
  name: string
  profile_path: string | null
}

interface CastSectionProps {
  cast: CastMember[]
  setIsCastModalOpen: (isOpen: boolean) => void
}

export function CastSection({ cast, setIsCastModalOpen }: CastSectionProps) {
  return (
    <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Cast</h2>
        <button
          onClick={() => setIsCastModalOpen(true)}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          See all
        </button>
      </div>
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {cast.slice(0, 15).map((person) => (
              <CarouselItem
                key={person.id}
                className="pl-6 basis-[110px] sm:basis-[120px] md:basis-[130px]"
              >
                <Link to={`/person/${person.id}` as any} className="block">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                          <Users className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-center text-zinc-300 font-medium leading-tight">
                      {person.name}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
