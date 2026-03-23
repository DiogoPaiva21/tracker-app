import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useRef, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { CastModal } from '../components/modals/CastModal'
import { ReviewModal } from '../components/modals/ReviewModal'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../components/ui/carousel'
import {
  getTvSeasonDetails,
  getTvWithSeasonDetails,
} from '../lib/tmdb/handlers/tv'
import type { ChangeEvent } from 'react'
import { CastSection } from '@/components/sections/cast-section'
import { InfoSection } from '@/components/sections/info-section'
import { ActionsSection } from '@/components/sections/actions-section'

const getTvByIdAndSeason = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string; seasonNumber?: number }) => data)
  .handler(({ data }) => getTvWithSeasonDetails(data.id, data.seasonNumber))

const getTvSeasonById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string; seasonNumber: number }) => data)
  .handler(({ data }) => getTvSeasonDetails(data.id, data.seasonNumber))

export const Route = createFileRoute('/tv/$id')({
  loader: ({ params }) =>
    getTvByIdAndSeason({
      data: { id: params.id },
    }),
  component: TvDetails,
})

function TvDetails() {
  const tv = Route.useLoaderData()
  const { id } = Route.useParams()
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
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
        data: { id, seasonNumber },
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

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const LOGO_BASE_URL = `https://image.tmdb.org/t/p/w300`
  const STILL_BASE_URL = `https://image.tmdb.org/t/p/w300`
  const logoUrl = tv.logo_path ? `${LOGO_BASE_URL}${tv.logo_path}` : null
  const logoAspectRatio = tv.logo_aspect_ratio ?? null
  const shouldConstrainLogoByHeight =
    logoAspectRatio !== null && logoAspectRatio < 2.5
  const backdropUrl = tv.backdrop_path
    ? `${IMAGE_BASE_URL}${tv.backdrop_path}`
    : ''
  const posterUrl = tv.poster_path ? `${IMAGE_BASE_URL}${tv.poster_path}` : ''
  const formatRating = (
    rating: number | null,
    max: number,
    precision: number = 1,
  ) => {
    if (rating === null) return 'N/A'
    return `${rating.toFixed(precision)}/${max}`
  }
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
              <div className="flex items-center">
                <img
                  src={logoUrl}
                  alt={tv.name}
                  className={
                    shouldConstrainLogoByHeight
                      ? 'w-auto max-h-16 md:max-h-20 lg:max-h-24 object-contain drop-shadow-2xl'
                      : 'max-w-40 md:max-w-50 lg:max-w-68 h-auto object-contain drop-shadow-2xl'
                  }
                />
              </div>
            ) : (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {tv.name}
              </h1>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4  rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <img src="/imdb.svg" alt="IMDB" className="w-10 h-10" />
                {formatRating(tv.ratings.imdb, 10)}
              </div>
              <div className="px-4  rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <img src="/tmdb.svg" alt="TMDB" className="w-8 h-8" />
                {formatRating(tv.vote_average, 10)}
              </div>
              <div className="px-4  rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <img
                  src="/tomatoes.svg"
                  alt="Rotten Tomatoes"
                  className="w-7 h-7 rounded-full"
                />
                {formatRating(tv.ratings.tomatoes, 100, 0)}
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
                <>
                  <Carousel
                    opts={{ align: 'start', dragFree: true }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {displayedEpisodes.map((episode) => (
                        <CarouselItem
                          key={episode.id}
                          className="pl-4 basis-[75%] sm:basis-[220px] md:basis-[240px]"
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
                </>
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
          <ActionsSection
            setIsReviewModalOpen={setIsReviewModalOpen}
            setSelectedRating={setSelectedRating}
            hoveredRating={hoveredRating}
            selectedRating={selectedRating}
            setHoveredRating={setHoveredRating}
          />

          {/* Info Card */}
          <InfoSection
            release_date={tv.first_air_date}
            production_companies={tv.production_companies}
          />
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
