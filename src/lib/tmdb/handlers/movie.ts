import { tmdbRequest } from '../client'
import { getMediaInfo } from '@/lib/mdblist'

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

interface TmdbMovieImagesArray {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  width: number
  vote_average: number
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
  images: {
    id: number
    backdrops: Array<TmdbMovieImagesArray>
    posters: Array<TmdbMovieImagesArray>
    logos: Array<TmdbMovieImagesArray>
  }
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
  logo_path: string | null
  logo_aspect_ratio: number | null
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

export interface RatingsMDBList {
  source: string
  value: number | null
  score: number | null
  votes: number | null
  url: string | null
}

export interface MovieMDBlist {
  ratings: Array<RatingsMDBList>
}

export const getMovieWithCredits = async (
  movieId: string | number,
): Promise<MovieDetails> => {
  const normalizedMovieId = String(movieId).trim()

  if (!normalizedMovieId) {
    throw new Error('Movie id is required.')
  }

  const response = await tmdbRequest<TmdbMovieResponse>(
    `/movie/${encodeURIComponent(normalizedMovieId)}?append_to_response=credits,images`,
  )

  const rating = await getMediaInfo<MovieMDBlist>(
    'tmdb',
    'movie',
    normalizedMovieId,
  )

  // Get logo with highest vote_average and that the iso_639_1 is equal to "en"
  const sortedLogos = [...response.images.logos].sort(
    (a, b) => b.vote_average - a.vote_average,
  )
  const englishLogos = sortedLogos.filter((logo) => logo.iso_639_1 === 'en')

  const selectedLogo =
    englishLogos.length > 0 ? englishLogos[0] : (sortedLogos[0] ?? null)

  // Get letterboxd rating from mdblist
  const letterboxdRating =
    rating.ratings.find((r) => r.source === 'letterboxd')?.value ?? null

  // Get imdb rating from mdblist
  const imdbRating =
    rating.ratings.find((r) => r.source === 'imdb')?.value ?? null

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
    logo_path: selectedLogo.file_path,
    logo_aspect_ratio: selectedLogo.aspect_ratio,
    production_companies: response.production_companies,
    cast: response.credits.cast,
    crew: response.credits.crew,
    ratings: {
      imdb: imdbRating,
      letterboxd: letterboxdRating,
    },
  }
}
