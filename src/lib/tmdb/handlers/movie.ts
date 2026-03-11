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
  imdb_id: string | null
  overview: string
  vote_average: number
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
  imdb_id: string | null
  overview: string
  vote_average: number
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
  ratings: {
    imdb: number | null
    letterboxd: number | null
  }
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
    imdb_id: response.imdb_id,
    overview: response.overview,
    vote_average: response.vote_average,
    runtime: response.runtime,
    release_date: response.release_date,
    backdrop_path: response.backdrop_path,
    poster_path: response.poster_path,
    production_companies: response.production_companies,
    cast: response.credits.cast,
    crew: response.credits.crew,
    ratings: {
      imdb: null,
      letterboxd: null,
    },
  }
}
