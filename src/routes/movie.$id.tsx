import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Calendar, Users, Plus, PenTool, ListPlus } from 'lucide-react'
import { CastModal } from '../components/CastModal'
import { CrewModal } from '../components/CrewModal'
import { ReviewModal } from '../components/ReviewModal'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../components/ui/carousel'
import { getMovieWithCredits } from '../lib/tmdb/handlers/movie'

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
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : null
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null
  const getCrewImportance = (job: string) => {
    const normalizedJob = job.toLowerCase()

    if (normalizedJob.includes('producer')) return 0
    if (
      normalizedJob.includes('writer') ||
      normalizedJob.includes('screenplay') ||
      normalizedJob.includes('story')
    )
      return 1
    if (normalizedJob.includes('director of photography')) return 2
    if (normalizedJob.includes('editor')) return 3
    if (
      normalizedJob.includes('music') ||
      normalizedJob.includes('composer') ||
      normalizedJob.includes('sound')
    )
      return 4
    if (
      normalizedJob.includes('production design') ||
      normalizedJob.includes('art direction')
    )
      return 5
    if (normalizedJob.includes('costume') || normalizedJob.includes('makeup'))
      return 6
    if (normalizedJob.includes('casting')) return 7
    if (
      normalizedJob.includes('visual effects') ||
      normalizedJob.includes('vfx')
    )
      return 8
    return 9
  }
  const director = movie.crew.find((person) => person.job === 'Director')
  const orderedCrew = movie.crew
    .filter((person) => person.job !== 'Director')
    .sort((a, b) => {
      const importanceCompare =
        getCrewImportance(a.job) - getCrewImportance(b.job)
      if (importanceCompare !== 0) return importanceCompare

      const jobCompare = a.job.localeCompare(b.job)
      if (jobCompare !== 0) return jobCompare

      return a.name.localeCompare(b.name)
    })
  const visibleCrew = orderedCrew.slice(0, 10)

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans pb-24 bg-[#09090b]">
      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-16 md:pt-40 md:pb-8">
        {/* Backdrop Image with soft gradient fade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-[#09090b]/50 to-transparent z-10" />
          <img
            src={backdropUrl || ''}
            alt={movie.title}
            className="w-full h-[80vh] object-cover object-top mix-blend-screen opacity-50"
          />
        </div>

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {movie.title}{' '}
              {director ? (
                <Link
                  to={`/person/${director.id}` as any}
                  className="text-white/30 text-3xl hover:underline hover:text-white/50"
                >
                  by {director.name}
                </Link>
              ) : (
                ''
              )}
            </h1>

            <p className="text-lg ml-1 text-zinc-300">{movie.runtime} mins</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4 py-1.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium">
                IMDb 8.8
              </div>
              <div className="px-4 py-1.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium">
                RT 79%
              </div>
              <div className="px-4 py-1.5 rounded-md border border-white/20 bg-black/40 backdrop-blur-sm text-sm font-medium">
                LB 4.3
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
              <Carousel
                opts={{ align: 'start', dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-6">
                  {movie.cast.slice(0, 15).map((person) => (
                    <CarouselItem
                      key={person.id}
                      className="pl-6 basis-[110px] sm:basis-[120px] md:basis-[130px]"
                    >
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          {/* Crew */}
          <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Crew</h2>
              <button
                onClick={() => setIsCrewModalOpen(true)}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {visibleCrew.map((person, idx) => (
                <div
                  key={`${person.id}-${idx}`}
                  className="flex items-center justify-between border-b border-white/5 pb-2"
                >
                  <span className="text-zinc-200 font-medium">
                    {person.name}
                  </span>
                  <span className="text-zinc-500 text-sm">{person.job}</span>
                </div>
              ))}
            </div>
          </section>
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
                <span>Release:</span>
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-white font-medium">
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            <div>
              <div className="text-zinc-400 mb-2">Studios:</div>
              <div className="flex flex-col gap-1">
                {movie.production_companies.map((company) => (
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
