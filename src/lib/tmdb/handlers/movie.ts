import { tmdbRequest } from '../client'

interface TmdbMovieCreditCast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

interface TmdbMovieCreditCrew {
  id: number
  name: string
  job: string
  profile_path: string | null
}

interface TmdbMovieCreditResponse {
  cast: Array<TmdbMovieCreditCast>
  crew: Array<TmdbMovieCreditCrew>
}

interface TmdbMovieResponse {
  id: number
  title: string
  overview: string
  runtime: number | null
  release_date: string
  backdrop_path: string | null
  poster_path: string | null
  production_companies: Array<{
    id: number
    name: string
  }>
  credits: TmdbMovieCreditResponse
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  runtime: number | null
  release_date: string
  backdrop_path: string | null
  poster_path: string | null
  production_companies: Array<{
    id: number
    name: string
  }>
  cast: Array<TmdbMovieCreditCast>
  crew: Array<TmdbMovieCreditCrew>
}

export const getMovieWithCredits = async (
  movieId: string | number,
): Promise<MovieDetails> => {
  const normalizedMovieId = String(movieId).trim()

  if (!normalizedMovieId) {
    throw new Error('Movie id is required.')
  }

  const response = await tmdbRequest<TmdbMovieResponse>(
    `/movie/${encodeURIComponent(normalizedMovieId)}?append_to_response=credits`,
  )

  return {
    id: response.id,
    title: response.title,
    overview: response.overview,
    runtime: response.runtime,
    release_date: response.release_date,
    backdrop_path: response.backdrop_path,
    poster_path: response.poster_path,
    production_companies: response.production_companies,
    cast: response.credits?.cast ?? [],
    crew: response.credits?.crew ?? [],
  }
}
