import { getTrending } from '../client'
import type {
  HomeMediaItem,
  MdblistShowSummary,
  MdblistTrendingResponse,
} from '../types'

const getYear = (dateValue: string | null) => {
  if (!dateValue) return new Date().getFullYear()

  const year = Number.parseInt(dateValue.slice(0, 4), 10)
  return Number.isNaN(year) ? new Date().getFullYear() : year
}

const getImdbRating = (ratings: MdblistShowSummary['ratings']) => {
  const imdbRating = ratings?.find((rating) => rating.source === 'imdb')
  return imdbRating?.value ?? 0
}

const mapShowToHomeItem = (show: MdblistShowSummary): HomeMediaItem | null => {
  if (!show.poster) return null

  return {
    id: show.id.toString(),
    title: show.title,
    image: show.poster,
    rating: getImdbRating(show.ratings),
    year: getYear(show.release_date),
    type: 'show',
  }
}

export const getTrendingShows = async (): Promise<Array<HomeMediaItem>> => {
  const showResponse = await getTrending<MdblistTrendingResponse>('tv')

  return showResponse.shows
    .map(mapShowToHomeItem)
    .filter((item): item is HomeMediaItem => item !== null)
}
