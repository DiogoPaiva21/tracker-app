import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { CastModal } from '../components/modals/CastModal'
import { CrewModal } from '../components/modals/CrewModal'
import { ReviewModal } from '../components/modals/ReviewModal'
import { getMovieWithCredits } from '../lib/tmdb/handlers/movie'
import { CastSection } from '@/components/sections/cast-section'
import { CrewSection } from '@/components/sections/crew-section'
import { sortCrew } from '@/lib/movies/mutils'
import { ActionsSection } from '@/components/sections/actions-section'
import { InfoSection } from '@/components/sections/info-section'

const getMovieById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return getMovieWithCredits(data.id)
  })

export const Route = createFileRoute('/movie/$id')({
  loader: async ({ params }) => getMovieById({ data: { id: params.id } }),
  component: MovieDetails,
})

function MovieDetails() {
  const movie = Route.useLoaderData()
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const LOGO_BASE_URL = `https://image.tmdb.org/t/p/w300`
  const POSTER_BASE_URL = `https://image.tmdb.org/t/p/w342`
  const logoUrl = movie.logo_path ? `${LOGO_BASE_URL}${movie.logo_path}` : null
  const logoAspectRatio = movie.logo_aspect_ratio ?? null
  const shouldConstrainLogoByHeight =
    logoAspectRatio !== null && logoAspectRatio < 2.5
  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : null
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : null
  const director = movie.crew.find((person) => person.job === 'Director')
  const orderedCrew = sortCrew(
    movie.crew.filter((person) => person.job !== 'Director'),
  )
  const visibleCrew = orderedCrew.slice(0, 10)
  const formatRating = (rating: number | null, max: number) => {
    if (rating === null) return 'N/A'
    return `${rating.toFixed(1)}/${max}`
  }

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans pb-24 bg-[#09090b]">
      {/* Full Page Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#09090b]/30 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b]/80 via-[#09090b]/40 to-transparent z-10" />
        <img
          src={backdropUrl || ''}
          alt={movie.title}
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
                src={posterUrl || ''}
                alt={`${movie.title} Poster`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title & Info */}
          <div className="flex-1 space-y-4 text-center md:text-left z-30">
            <div className="flex flex-row items-baseline">
              {logoUrl ? (
                <div className="flex items-center">
                  <img
                    src={logoUrl}
                    alt={movie.title}
                    className={
                      shouldConstrainLogoByHeight
                        ? 'w-auto max-h-16 md:max-h-20 lg:max-h-36 object-contain drop-shadow-2xl'
                        : 'max-w-40 md:max-w-50 lg:max-w-68 h-auto object-contain drop-shadow-2xl'
                    }
                  />
                </div>
              ) : (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  {movie.title}
                </h1>
              )}
              {director && (
                <Link
                  to={`/person/${director.id}` as any}
                  className="text-white/60 text-4xl font-bold tracking-tight ml-6 hover:underline hover:text-white/70"
                >
                  by {director.name}
                </Link>
              )}
            </div>

            <p className="text-lg ml-1 text-zinc-300">{movie.runtime} mins</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4  rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <img src="/imdb.svg" alt="IMDB" className="w-10 h-10" />
                {formatRating(movie.ratings.imdb, 10)}
              </div>
              <div className="px-4  rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <img src="/tmdb.svg" alt="TMDB" className="w-8 h-8" />
                {formatRating(movie.vote_average, 10)}
              </div>
              <div className="px-4  rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
                <img
                  src="/letterboxd.svg"
                  alt="Letterboxd"
                  className="w-7 h-7 rounded-full"
                />
                {formatRating(movie.ratings.letterboxd, 5)}
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
            <p className="text-zinc-300 leading-relaxed">{movie.overview}</p>
          </section>

          {/* Cast */}
          <CastSection
            cast={movie.cast}
            setIsCastModalOpen={setIsCastModalOpen}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            profilePaths={movie.cast.map((person) => person.profile_path)}
          />

          {/* Crew */}
          <CrewSection
            crew={visibleCrew}
            setIsCrewModalOpen={setIsCrewModalOpen}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            profilePaths={orderedCrew.map((person) => person.profile_path)}
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
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
          />

          {/* Info Card */}
          <InfoSection
            release_date={movie.release_date}
            production_companies={movie.production_companies}
          />
        </div>
      </main>

      <CastModal
        isOpen={isCastModalOpen}
        onClose={() => setIsCastModalOpen(false)}
        title={movie.title}
        posterPath={movie.poster_path}
        backdropPath={movie.backdrop_path}
        cast={movie.cast}
      />
      <CrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        title={movie.title}
        posterPath={movie.poster_path}
        backdropPath={movie.backdrop_path}
        crew={orderedCrew}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={movie.title}
        posterPath={movie.poster_path}
        backdropPath={movie.backdrop_path}
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
