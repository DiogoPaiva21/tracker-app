import { getTmdbImageUrl, tmdbGetPopular } from '../client'
import type {
  HomeMediaItem,
  HomePopularFeed,
  TmdbMovieSummary,
  TmdbTvSummary,
} from '../types'

const HOME_LIST_LIMIT = 12

const getYear = (dateValue: string) => {
  const year = Number.parseInt(dateValue.slice(0, 4), 10)
  return Number.isNaN(year) ? new Date().getFullYear() : year
}

const mapMovieToHomeItem = (movie: TmdbMovieSummary): HomeMediaItem | null => {
  const image = getTmdbImageUrl(movie.poster_path)
  if (!image) return null

  return {
    id: movie.id.toString(),
    title: movie.title,
    image,
    rating: movie.vote_average,
    year: getYear(movie.release_date),
    type: 'movie',
  }
}

const mapTvToHomeItem = (show: TmdbTvSummary): HomeMediaItem | null => {
  const image = getTmdbImageUrl(show.poster_path)
  if (!image) return null

  return {
    id: show.id.toString(),
    title: show.name,
    image,
    rating: show.vote_average,
    year: getYear(show.first_air_date),
    type: 'show',
  }
}

const toLimitedList = (
  items: Array<HomeMediaItem | null>,
  limit: number = HOME_LIST_LIMIT,
) => {
  return items.filter((item): item is HomeMediaItem => item !== null).slice(0, limit)
}

export const getHomePopularFeed = async (): Promise<HomePopularFeed> => {
  const [movieResponse, tvResponse] = await Promise.all([
    tmdbGetPopular<TmdbMovieSummary>('movie'),
    tmdbGetPopular<TmdbTvSummary>('tv'),
  ])

  return {
    popularMovies: toLimitedList(movieResponse.results.map(mapMovieToHomeItem)),
    popularShows: toLimitedList(tvResponse.results.map(mapTvToHomeItem)),
  }
}
