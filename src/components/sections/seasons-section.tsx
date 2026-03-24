import { createServerFn } from '@tanstack/react-start'
import { ChevronDown, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { getTvSeasonDetails } from '../../lib/tmdb/handlers/tv'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import type { ChangeEvent } from 'react'
import type { TvDetailsWithSeason } from '../../lib/tmdb/handlers/tv'

const getTvSeasonById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string; seasonNumber: number }) => data)
  .handler(({ data }) => getTvSeasonDetails(data.id, data.seasonNumber))

interface SeasonsSectionProps {
  tv: TvDetailsWithSeason
  tvId: string
}

const STILL_BASE_URL = 'https://image.tmdb.org/t/p/w300'

export function SeasonsSection({ tv, tvId }: SeasonsSectionProps) {
  const [selectedSeason, setSelectedSeason] = useState(tv.selectedSeasonNumber)
  const [seasonEpisodesCache, setSeasonEpisodesCache] = useState<
    Partial<Record<number, typeof tv.episodes>>
  >({ [tv.selectedSeasonNumber]: tv.episodes })

  const latestSeasonRequestRef = useRef(0)
  const lastEpisodesRef = useRef<typeof tv.episodes>(tv.episodes)

  const currentEpisodes =
    seasonEpisodesCache[selectedSeason] ??
    (selectedSeason === tv.selectedSeasonNumber ? tv.episodes : [])

  if (currentEpisodes.length > 0) {
    lastEpisodesRef.current = currentEpisodes
  }

  const displayedEpisodes =
    currentEpisodes.length > 0 ? currentEpisodes : lastEpisodesRef.current

  const handleSeasonChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const seasonNumber = Number(e.target.value)
    setSelectedSeason(seasonNumber)

    if (seasonNumber === tv.selectedSeasonNumber) {
      return
    }

    const cachedEpisodes = seasonEpisodesCache[seasonNumber]

    if (cachedEpisodes) {
      return
    }

    const requestId = ++latestSeasonRequestRef.current

    try {
      const response = await getTvSeasonById({
        data: { id: tvId, seasonNumber },
      })

      if (latestSeasonRequestRef.current !== requestId) return

      setSeasonEpisodesCache((prev) => ({
        ...prev,
        [seasonNumber]: response.episodes,
      }))
    } catch {
      if (latestSeasonRequestRef.current !== requestId) return

      setSeasonEpisodesCache((prev) => ({
        ...prev,
        [seasonNumber]: [],
      }))
    }
  }

  return (
    <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="mb-6 relative w-max">
        <select
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="appearance-none bg-zinc-800/80 border border-white/10 rounded-xl px-5 py-2.5 pr-12 text-white font-medium hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
        >
          {tv.seasons.map((season) => (
            <option key={season.id} value={season.season_number}>
              Season {season.season_number}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
      </div>

      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        {displayedEpisodes.length > 0 ? (
          <Carousel
            opts={{ align: 'start', dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {displayedEpisodes.map((episode) => (
                <CarouselItem
                  key={episode.id}
                  className="pl-4 basis-[75%] sm:basis-55 md:basis-60"
                >
                  <div className="flex flex-col border border-white/10 rounded-xl overflow-hidden transition-colors group relative bg-zinc-800/50 h-[120px]">
                    {episode.still_path ? (
                      <img
                        src={`${STILL_BASE_URL}${episode.still_path}`}
                        alt={episode.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    {episode.still_path ? (
                      <>
                        <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
                      </>
                    ) : null}
                    <div className="p-4 flex-1 flex flex-col justify-between h-full relative z-10">
                      <div>
                        <div className="text-xs text-zinc-400 font-medium mb-1">
                          Episode {episode.episode_number}
                        </div>
                        <h3 className="text-sm text-white font-semibold line-clamp-2 leading-tight">
                          {episode.name}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-zinc-500 font-medium">
                          {episode.runtime}m
                        </span>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-white text-zinc-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="text-zinc-500 italic py-4">
            No episodes available for this season.
          </div>
        )}
      </div>
    </section>
  )
}
