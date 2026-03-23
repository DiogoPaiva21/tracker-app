import { getTmdbImageUrl, tmdbRequest } from '../client'
import type { SearchMediaItem, TmdbMultiSearchResult } from '../types'

const SEARCH_RESULT_LIMIT = 8

const getYear = (dateValue?: string) => {
  if (!dateValue) return null
  const year = Number.parseInt(dateValue.slice(0, 4), 10)
  return Number.isNaN(year) ? null : year
}

const mapMultiResultToItem = (
  item: TmdbMultiSearchResult,
): SearchMediaItem | null => {
  if (item.media_type === 'movie') {
    return {
      id: item.id.toString(),
      title: item.title,
      mediaType: 'movie',
      year: getYear(item.release_date),
      image: getTmdbImageUrl(item.poster_path),
      releaseDate: item.release_date || null,
      extraInfo: 'Director: -',
    }
  }

  if (item.media_type === 'tv') {
    return {
      id: item.id.toString(),
      title: item.name,
      mediaType: 'tv',
      year: getYear(item.first_air_date),
      image: getTmdbImageUrl(item.poster_path),
      releaseDate: item.first_air_date || null,
      extraInfo: 'Number of Seasons: -',
    }
  }

  if (item.media_type === 'person') {
    const knownForTitle =
      item.known_for?.find((knownItem) => knownItem.title || knownItem.name)?.title ??
      item.known_for?.find((knownItem) => knownItem.title || knownItem.name)?.name ??
      null

    return {
      id: item.id.toString(),
      title: item.name,
      mediaType: 'person',
      year: null,
      image: getTmdbImageUrl(item.profile_path),
      releaseDate: null,
      extraInfo: knownForTitle ? `Known for: ${knownForTitle}` : 'Known for: -',
    }
  }

  return null
}

export const searchTmdbMulti = async (query: string): Promise<SearchMediaItem[]> => {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return []

  const response = await tmdbRequest<{
    results: Array<TmdbMultiSearchResult>
  }>(`/search/multi?query=${encodeURIComponent(trimmedQuery)}&include_adult=false`)

  return response.results
    .map(mapMultiResultToItem)
    .filter((result): result is SearchMediaItem => result !== null)
    .slice(0, SEARCH_RESULT_LIMIT)
}
