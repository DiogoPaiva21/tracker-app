import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'
import { Calendar, ChevronDown, ListPlus, PenTool, Plus } from 'lucide-react'
import { CastModal } from '../components/CastModal'
import { ReviewModal } from '../components/ReviewModal'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../components/ui/carousel'
import { getTvWithSeasonDetails } from '../lib/tmdb/handlers/tv'
import { CastSection } from '@/components/cast-section'

const getTvByIdAndSeason = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string; seasonNumber?: number }) => data)
  .handler(async ({ data }) => {
    return getTvWithSeasonDetails(data.id, data.seasonNumber)
  })

export const Route = createFileRoute('/tv/$id')({
  loader: async ({ params }) => {
    return getTvByIdAndSeason({
      data: { id: params.id },
    })
  },
  component: TvDetails,
})

function TvDetails() {
  const tv = Route.useLoaderData()
  const { id } = Route.useParams()
  const [selectedRating, setSelectedRating] = useState(0)
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState(tv.selectedSeasonNumber)
  const [currentEpisodes, setCurrentEpisodes] = useState(tv.episodes)
  const [seasonEpisodesCache, setSeasonEpisodesCache] = useState<
    Record<number, typeof tv.episodes>
  >({ [tv.selectedSeasonNumber]: tv.episodes })
  const [isSeasonLoading, setIsSeasonLoading] = useState(false)

  useEffect(() => {
    setSelectedSeason(tv.selectedSeasonNumber)
    setCurrentEpisodes(tv.episodes)
    setSeasonEpisodesCache({ [tv.selectedSeasonNumber]: tv.episodes })
  }, [id, tv.selectedSeasonNumber, tv.episodes])

  useEffect(() => {
    if (selectedSeason === tv.selectedSeasonNumber) {
      setCurrentEpisodes(tv.episodes)
      setIsSeasonLoading(false)
      return
    }

    let isMounted = true
    setIsSeasonLoading(true)

    getTvByIdAndSeason({ data: { id, seasonNumber: selectedSeason } })
      .then((response) => {
        if (!isMounted) return
        setCurrentEpisodes(response.episodes)
        setSeasonEpisodesCache((prev) => ({
          ...prev,
          [selectedSeason]: response.episodes,
        }))
      })
      .catch(() => {
        if (!isMounted) return
        setCurrentEpisodes([])
      })
      .finally(() => {
        if (!isMounted) return
        setIsSeasonLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [
    id,
    selectedSeason,
    seasonEpisodesCache,
    tv.selectedSeasonNumber,
    tv.episodes,
  ])

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const LOGO_BASE_URL = `https://image.tmdb.org/t/p/w300`
  const logoUrl = tv.logo_path ? `${LOGO_BASE_URL}${tv.logo_path}` : null
  const backdropUrl = tv.backdrop_path
    ? `${IMAGE_BASE_URL}${tv.backdrop_path}`
    : ''
  const posterUrl = tv.poster_path ? `${IMAGE_BASE_URL}${tv.poster_path}` : ''

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans pb-24 bg-[#09090b]">
      {/* Full Page Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#09090b]/40 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b]/80 via-[#09090b]/40 to-transparent z-10" />
        <img
          src={backdropUrl}
          alt={tv.name}
          className="w-full h-full object-cover object-center mix-blend-screen opacity-50"
        />
      </div>

      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-16 md:pt-40 md:pb-8">
        {/* Content Overlay */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-end">
          {/* Poster */}
          <div className="w-48 md:w-64 shrink-0 z-30">
            <div className="relative w-full aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={posterUrl}
                alt={`${tv.name} Poster`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title & Info */}
          <div className="flex-1 space-y-6 text-center md:text-left z-30">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={tv.name}
                className="max-w-40 md:max-w-50 lg:max-w-68 h-auto object-contain drop-shadow-2xl"
              />
            ) : (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {tv.name}
              </h1>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4 py-1.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium">
                IMDb 9.5
              </div>
              <div className="px-4 py-1.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium">
                RT 96%
              </div>
              <div className="px-4 py-1.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium">
                LB 4.8
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Details Section */}
      <main className="relative z-20 w-full max-w-7xl mx-auto md:mt-8 px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Synopsis */}
          <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Synopsis</h2>
            <p className="text-zinc-300 leading-relaxed">{tv.overview}</p>
          </section>

          {/* Seasons Section */}
          <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="mb-6 relative w-max">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
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
              {isSeasonLoading ? (
                <div className="text-zinc-400 italic py-4">
                  Loading episodes...
                </div>
              ) : currentEpisodes.length > 0 ? (
                <Carousel
                  opts={{ align: 'start', dragFree: true }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {currentEpisodes.map((episode) => (
                      <CarouselItem
                        key={episode.id}
                        className="pl-4 basis-[75%] sm:basis-[220px] md:basis-[240px]"
                      >
                        <div className="flex flex-col border border-white/10 rounded-xl overflow-hidden transition-colors group relative bg-zinc-800/50 h-[120px]">
                          {episode.still_path ? (
                            <img
                              src={`${IMAGE_BASE_URL}${episode.still_path}`}
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

          {/* Cast */}
          <CastSection cast={tv.cast} setIsCastModalOpen={setIsCastModalOpen} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 flex justify-center gap-2 border-b border-white/10">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedRating(i)}
                  aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                  className="cursor-pointer transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className={`w-8 h-8 transition-colors ${
                      i <= selectedRating
                        ? 'fill-yellow-400 stroke-yellow-300 text-yellow-300'
                        : 'fill-transparent stroke-zinc-400 text-zinc-400 hover:stroke-yellow-300 hover:text-yellow-300'
                    }`}
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </button>
              ))}
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

          {/* Info Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <span>First Aired:</span>
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-white font-medium">
                {new Date(tv.first_air_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            <div>
              <div className="text-zinc-400 mb-2">Studios:</div>
              <div className="flex flex-col gap-1">
                {tv.production_companies.map((company) => (
                  <span key={company.id} className="text-white font-medium">
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <CastModal
        isOpen={isCastModalOpen}
        onClose={() => setIsCastModalOpen(false)}
        title={tv.name}
        posterPath={tv.poster_path}
        backdropPath={tv.backdrop_path}
        cast={tv.cast}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={tv.name}
        posterPath={tv.poster_path}
        backdropPath={tv.backdrop_path}
        currentRating={selectedRating}
        ratingDistribution={{
          1: 12,
          2: 28,
          3: 95,
          4: 234,
          5: 456,
        }}
      />
    </div>
  )
}
