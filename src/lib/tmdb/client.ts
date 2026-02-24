import type { TmdbPaginatedResponse } from './types'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const DEFAULT_POSTER_SIZE = 'w600_and_h900_bestv2'

const getTmdbApiKey = () => {
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey) {
    throw new Error(
      'Missing TMDB API key. Set TMDB_API_KEY in your environment variables.',
    )
  }

  return apiKey
}

export const getTmdbImageUrl = (
  path: string | null,
  size: string = DEFAULT_POSTER_SIZE,
) => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const tmdbRequest = async <T>(path: string): Promise<T> => {
  const apiKey = getTmdbApiKey()
  const url = new URL(`${TMDB_BASE_URL}${path}`)
  url.searchParams.set('api_key', apiKey)

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}) for "${path}"`)
  }

  return (await response.json()) as T
}

export const tmdbGetPopular = <T>(mediaType: 'movie' | 'tv') => {
  return tmdbRequest<TmdbPaginatedResponse<T>>(`/${mediaType}/popular`)
}
