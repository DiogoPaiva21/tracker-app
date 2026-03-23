import { getTrending } from '../client'
import type {
  HomeMediaItem,
  MdblistMovieSummary,
  MdblistTrendingResponse,
} from '../types'

const getYear = (dateValue: string | null) => {
  if (!dateValue) return new Date().getFullYear()

  const year = Number.parseInt(dateValue.slice(0, 4), 10)
  return Number.isNaN(year) ? new Date().getFullYear() : year
}

const getImdbRating = (ratings: MdblistMovieSummary['ratings']) => {
  const imdbRating = ratings?.find((rating) => rating.source === 'imdb')
  return imdbRating?.value ?? 0
}

const mapMovieToHomeItem = (
  movie: MdblistMovieSummary,
): HomeMediaItem | null => {
  if (!movie.poster) return null

  return {
    id: movie.id.toString(),
    title: movie.title,
    image: movie.poster,
    rating: getImdbRating(movie.ratings),
    year: getYear(movie.release_date),
    type: 'movie',
  }
}

export const getTrendingMovies = async (): Promise<Array<HomeMediaItem>> => {
  const movieResponse = await getTrending<MdblistTrendingResponse>('movie')

  return movieResponse.movies
    .map(mapMovieToHomeItem)
    .filter((item): item is HomeMediaItem => item !== null)
}
