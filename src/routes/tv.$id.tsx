import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { CastModal } from '../components/modals/CastModal'
import { ReviewModal } from '../components/modals/ReviewModal'
import { getTvWithSeasonDetails } from '../lib/tmdb/handlers/tv'
import { CastSection } from '@/components/sections/cast-section'
import { InfoSection } from '@/components/sections/info-section'
import { ActionsSection } from '@/components/sections/actions-section'
import { SeasonsSection } from '@/components/sections/seasons-section'

const getTvByIdAndSeason = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string; seasonNumber?: number }) => data)
  .handler(({ data }) => getTvWithSeasonDetails(data.id, data.seasonNumber))

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

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const LOGO_BASE_URL = `https://image.tmdb.org/t/p/w300`

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
          <SeasonsSection tv={tv} tvId={id} />

          {/* Cast */}
          <CastSection
            cast={tv.cast}
            setIsCastModalOpen={setIsCastModalOpen}
            posterPath={tv.poster_path}
            backdropPath={tv.backdrop_path}
            profilePaths={tv.cast.map((person) => person.profile_path)}
          />
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
            posterPath={tv.poster_path}
            backdropPath={tv.backdrop_path}
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
