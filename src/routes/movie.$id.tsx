import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Calendar, Users, Plus, PenTool, ListPlus } from 'lucide-react'
import { CastModal } from '../components/CastModal'
import { ReviewModal } from '../components/ReviewModal'

export const Route = createFileRoute('/movie/$id')({
  component: MovieDetails,
})

// Hardcoded mock data from the prompt
const MOVIE_DATA = {
  adult: false,
  backdrop_path: '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
  belongs_to_collection: null,
  budget: 63000000,
  genres: [
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 35, name: 'Comedy' },
  ],
  homepage: 'http://www.foxmovies.com/movies/fight-club',
  id: 550,
  imdb_id: 'tt0137523',
  original_language: 'en',
  original_title: 'Fight Club',
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
  popularity: 61.416,
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  production_companies: [
    {
      id: 508,
      logo_path: '/7cxRWzi4LsVm4Utfpr1hfARNurT.png',
      name: 'Regency Enterprises',
      origin_country: 'US',
    },
    {
      id: 711,
      logo_path: '/tEiIH5QesdheJmDAqQwvtN60727.png',
      name: 'Fox 2000 Pictures',
      origin_country: 'US',
    },
    {
      id: 20555,
      logo_path: '/hD8yEGUBlHOcfHYbujp71vD8gZp.png',
      name: 'Taurus Film',
      origin_country: 'DE',
    },
    {
      id: 4700,
      logo_path: '/A32wmjrs9Psf4zw0uaixF0GXfxq.png',
      name: 'The Linson Company',
      origin_country: 'US',
    },
    {
      id: 25,
      logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
      name: '20th Century Fox',
      origin_country: 'US',
    },
  ],
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  release_date: '1999-10-15',
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
  ],
  status: 'Released',
  tagline: 'Mischief. Mayhem. Soap.',
  title: 'Fight Club',
  video: false,
  vote_average: 8.433,
  vote_count: 26280,
  cast: [
    {
      id: 287,
      name: 'Brad Pitt',
      character: 'Tyler Durden',
      profile_path: '/cckcYc2v0yh1tc9QjRelptcOBko.jpg',
    },
    {
      id: 819,
      name: 'Edward Norton',
      character: 'The Narrator',
      profile_path: '/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg',
    },
    {
      id: 1283,
      name: 'Helena Bonham Carter',
      character: 'Marla Singer',
      profile_path: '/mW1NolxQmPE16Zg6zuWyZlFgOwL.jpg',
    },
    {
      id: 7499,
      name: 'Meat Loaf',
      character: 'Robert "Bob" Paulson',
      profile_path: '/7gKLR1u46OB8WJ6m06LemFAY4OM.jpg',
    },
    {
      id: 7470,
      name: 'Jared Leto',
      character: 'Angel Face',
      profile_path: '/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg',
    },
    {
      id: 7470,
      name: 'Jared Leto',
      character: 'Angel Face',
      profile_path: '/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg',
    },
    {
      id: 7470,
      name: 'Jared Leto',
      character: 'Angel Face',
      profile_path: '/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg',
    },
  ],
  crew: [
    { id: 7467, name: 'David Fincher', job: 'Director' },
    { id: 7468, name: 'Chuck Palahniuk', job: 'Novel' },
    { id: 7469, name: 'Jim Uhls', job: 'Screenplay' },
    { id: 1303, name: 'Art Linson', job: 'Producer' },
    { id: 7763, name: 'Ceán Chaffin', job: 'Producer' },
    { id: 18865, name: 'Ross Grayson Bell', job: 'Producer' },
  ],
}

function MovieDetails() {
  const movie = MOVIE_DATA
  const [selectedRating, setSelectedRating] = useState(0)
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`
  const posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans pb-24 bg-[#09090b]">
      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-16 md:pt-40 md:pb-8">
        {/* Backdrop Image with soft gradient fade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-[#09090b]/50 to-transparent z-10" />
          <img
            src={backdropUrl}
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
                src={posterUrl}
                alt={`${movie.title} Poster`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title & Info */}
          <div className="flex-1 space-y-4 text-center md:text-left z-30">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {movie.title}
            </h1>

            <p className="text-lg text-zinc-300">{movie.runtime} mins</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
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
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {movie.cast.map((person) => (
                <div
                  key={person.id}
                  className="flex flex-col items-center gap-3 min-w-[80px]"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                    {person.profile_path ? (
                      <img
                        src={`${IMAGE_BASE_URL}${person.profile_path}`}
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
              ))}
            </div>
          </section>

          {/* Crew */}
          <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Crew</h2>
              <button className="text-sm text-zinc-400 hover:text-white transition-colors">
                See all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {movie.crew.map((person, idx) => (
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
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={movie.title}
        posterPath={movie.poster_path}
        backdropPath={movie.backdrop_path}
        currentRating={selectedRating}
      />
    </div>
  )
}
