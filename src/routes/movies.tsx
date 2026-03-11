import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { MediaCardProps } from '@/components/media-card'
import { MediaCarousel } from '@/components/movies/media-carousel'
import { Watchlist } from '@/components/movies/watchlist'
import { NextMovies } from '@/components/movies/next-movies'
import { getTrendingMovies } from '@/lib/mdblist/handlers/movies'

const getPopularMoviesData = createServerFn({ method: 'GET' }).handler(
  async () => {
    return getTrendingMovies()
  },
)

export const Route = createFileRoute('/movies')({
  loader: async () => getPopularMoviesData(),
  component: MoviesPage,
})

const MOVIE_WATCHLIST = [
  {
    id: 'mw1',
    name: 'Dune: Part Two',
    image:
      'https://image.tmdb.org/t/p/original/7mkUu1F2hVUNgz24xO8HPx0D6mK.jpg',
  },
  {
    id: 'mw2',
    name: 'Poor Things',
    image:
      'https://image.tmdb.org/t/p/original/7HKpc11uQfxnw0Y8tRUYn1fsKqE.jpg',
  },
  {
    id: 'mw3',
    name: 'Civil War',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
  },
  {
    id: 'mw4',
    name: 'Challengers',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/H6vke7zGiuLsz4v4RPeReb9rsv.jpg',
  },
]

const LAST_WATCHED_BY_FRIENDS: Array<MediaCardProps> = [
  {
    id: 'lw1',
    title: 'Furiosa: A Mad Max Saga',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iADOJ8Zymht2JPMoy3R7xceZprc.jpg',
    rating: 7.8,
    year: 2024,
    type: 'movie',
  },
  {
    id: 'lw2',
    title: 'Inside Out 2',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    rating: 7.7,
    year: 2024,
    type: 'movie',
  },
  {
    id: 'lw3',
    title: 'Deadpool & Wolverine',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    rating: 7.8,
    year: 2024,
    type: 'movie',
  },
  {
    id: 'lw4',
    title: 'A Quiet Place: Day One',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/yrpPYKijwdMHTE36mNWfFEepScc.jpg',
    rating: 6.9,
    year: 2024,
    type: 'movie',
  },
  {
    id: 'lw5',
    title: 'Alien: Romulus',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/b33nnKl1GSFbao4l3fZj0B9jS9h.jpg',
    rating: 7.2,
    year: 2024,
    type: 'movie',
  },
]

const NEXT_MOVIES = [
  {
    id: 'nm1',
    name: 'Joker: Folie à Deux',
    releaseDate: 'October 4, 2024',
  },
  {
    id: 'nm2',
    name: 'Gladiator II',
    releaseDate: 'November 22, 2024',
  },
  {
    id: 'nm3',
    name: 'Wicked',
    releaseDate: 'November 22, 2024',
  },
  {
    id: 'nm4',
    name: 'Kraven the Hunter',
    releaseDate: 'December 13, 2024',
  },
  {
    id: 'nm5',
    name: 'Sonic the Hedgehog 3',
    releaseDate: 'December 20, 2024',
  },
]

function MoviesPage() {
  const popularMovies = Route.useLoaderData()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 pt-28">
      {/* Popular Movies */}
      <MediaCarousel title="Popular Movies" items={popularMovies} />

      {/* Movie Watchlist */}
      <Watchlist watchlist={MOVIE_WATCHLIST} />

      {/* Last Watched by Friends */}
      <MediaCarousel
        title="Last Watched by Friends"
        items={LAST_WATCHED_BY_FRIENDS}
      />

      {/* Next Movies */}
      <NextMovies title="Next Movies" movies={NEXT_MOVIES} />
    </div>
  )
}
