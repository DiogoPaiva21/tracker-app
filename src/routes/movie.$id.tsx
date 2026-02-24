import { createFileRoute } from '@tanstack/react-router'
import {
  Play,
  ArrowLeft,
  Ticket,
  Calendar,
  Clock,
  DollarSign,
  Activity,
  Star,
  Info,
  Building,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

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
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function MovieDetails() {
  const movie = MOVIE_DATA

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'
  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`
  const posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans pb-24">
      {/* Dynamic Background Orbs matching the homepage */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Backdrop Image with soft gradient fade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-[#09090b]/50 to-transparent z-10" />
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-[80vh] object-cover object-top mix-blend-screen"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-end">
          {/* Poster */}
          <div className="w-56 md:w-72 shrink-0 group perspective-1000 z-30">
            <div className="relative w-full aspect-2/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={posterUrl}
                alt={`${movie.title} Poster`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title & Info */}
          <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left z-30">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-zinc-200 bg-white/5 backdrop-blur-md"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-xl">
              {movie.title}
            </h1>

            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-linear-to-r from-zinc-200 to-zinc-500 max-w-2xl font-medium">
              "{movie.tagline}"
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-black" />
                Play Trailer
              </button>

              <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-zinc-500">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Details Section */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Overview & Production */}
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Synopsis
              </h2>
            </div>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
              {movie.overview}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Production
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {movie.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center gap-4 hover:bg-white/10 transition-all duration-300"
                >
                  {company.logo_path ? (
                    <div className="h-10 flex items-center justify-center">
                      <img
                        src={`${IMAGE_BASE_URL}${company.logo_path}`}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain brightness-0 invert opacity-70"
                      />
                    </div>
                  ) : (
                    <div className="h-10 flex items-center text-sm text-zinc-600 font-medium text-center">
                      NO LOGO
                    </div>
                  )}
                  <span className="text-sm text-center text-zinc-400 font-medium">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Stats Card */}
        <div className="lg:col-span-4">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl sticky top-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">
                Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-3 font-medium">
                  <Clock className="w-5 h-5 text-zinc-500" /> Runtime
                </span>
                <span className="text-white font-medium">
                  {movie.runtime} min
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-3 font-medium">
                  <Calendar className="w-5 h-5 text-zinc-500" /> Release
                </span>
                <span className="text-white font-medium">
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-3 font-medium">
                  <Ticket className="w-5 h-5 text-zinc-500" /> Budget
                </span>
                <span className="text-white font-medium">
                  {formatCurrency(movie.budget)}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-3 font-medium">
                  <DollarSign className="w-5 h-5 text-zinc-500" /> Revenue
                </span>
                <span className="text-white font-medium">
                  {formatCurrency(movie.revenue)}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <span className="text-xs text-zinc-600 font-mono tracking-widest uppercase">
                ID: {movie.imdb_id}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
