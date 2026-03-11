import { tmdbRequest } from '../client'

interface TmdbTvCreditCast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

interface TmdbTvCreditCrew {
  id: number
  name: string
  job: string
  profile_path: string | null
}

interface TmdbTvDetailsResponse {
  id: number
  name: string
  overview: string
  first_air_date: string
  backdrop_path: string | null
  poster_path: string | null
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
  }>
  episode_run_time: Array<number>
  seasons: Array<{
    air_date: string | null
    episode_count: number
    id: number
    name: string
    season_number: number
  }>
  aggregate_credits?: {
    cast?: Array<TmdbTvCreditCast>
    crew?: Array<TmdbTvCreditCrew>
  }
}

interface TmdbTvSeasonResponse {
  id: string
  season_number: number
  episodes: Array<{
    episode_number: number
    id: number
    name: string
    runtime: number | null
    still_path: string | null
  }>
}

export interface TvDetailsWithSeason {
  id: number
  name: string
  overview: string
  first_air_date: string
  backdrop_path: string | null
  poster_path: string | null
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
  }>
  episode_run_time: Array<number>
  seasons: Array<{
    air_date: string | null
    episode_count: number
    id: number
    name: string
    season_number: number
  }>
  selectedSeasonNumber: number
  episodes: Array<{
    episode_number: number
    id: number
    name: string
    runtime: number | null
    still_path: string | null
  }>
  cast: Array<TmdbTvCreditCast>
  crew: Array<TmdbTvCreditCrew>
}

const getFallbackSeasonNumber = (seasonNumbers: Array<number>) => {
  const firstNonSpecialSeason = seasonNumbers.find((season) => season > 0)
  return firstNonSpecialSeason ?? seasonNumbers[0] ?? 1
}

export const getTvWithSeasonDetails = async (
  seriesId: string | number,
  seasonNumber?: number,
): Promise<TvDetailsWithSeason> => {
  const normalizedSeriesId = String(seriesId).trim()

  if (!normalizedSeriesId) {
    throw new Error('TV series id is required.')
  }

  const tvResponse = await tmdbRequest<TmdbTvDetailsResponse>(
    `/tv/${encodeURIComponent(normalizedSeriesId)}?append_to_response=aggregate_credits`,
  )

  const nonSpecialSeasons = tvResponse.seasons.filter(
    (season) => season.season_number > 0,
  )
  const availableSeasonNumbers =
    nonSpecialSeasons.length > 0
      ? nonSpecialSeasons.map((season) => season.season_number)
      : tvResponse.seasons.map((season) => season.season_number)
  const fallbackSeasonNumber = getFallbackSeasonNumber(availableSeasonNumbers)
  const normalizedSeasonNumber =
    typeof seasonNumber === 'number' &&
    Number.isInteger(seasonNumber) &&
    availableSeasonNumbers.includes(seasonNumber)
      ? seasonNumber
      : fallbackSeasonNumber

  const seasonResponse = await tmdbRequest<TmdbTvSeasonResponse>(
    `/tv/${encodeURIComponent(normalizedSeriesId)}/season/${normalizedSeasonNumber}`,
  )

  return {
    id: tvResponse.id,
    name: tvResponse.name,
    overview: tvResponse.overview,
    first_air_date: tvResponse.first_air_date,
    backdrop_path: tvResponse.backdrop_path,
    poster_path: tvResponse.poster_path,
    production_companies: tvResponse.production_companies,
    episode_run_time: tvResponse.episode_run_time,
    seasons: nonSpecialSeasons,
    selectedSeasonNumber: seasonResponse.season_number,
    episodes: seasonResponse.episodes,
    cast: tvResponse.aggregate_credits?.cast ?? [],
    crew: tvResponse.aggregate_credits?.crew ?? [],
  }
}
