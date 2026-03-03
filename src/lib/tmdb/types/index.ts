export interface TmdbPaginatedResponse<T> {
  page: number
  results: Array<T>
  total_pages: number
  total_results: number
}

export interface TmdbMovieSummary {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export interface TmdbTvSummary {
  id: number
  name: string
  poster_path: string | null
  vote_average: number
  first_air_date: string
}

export interface HomeMediaItem {
  id: string
  title: string
  image: string
  rating: number
  year: number
  type: 'movie' | 'show'
}

export interface HomePopularFeed {
  popularMovies: Array<HomeMediaItem>
  popularShows: Array<HomeMediaItem>
}

export interface TmdbMultiMovieResult {
  id: number
  media_type: 'movie'
  title: string
  release_date: string
  poster_path: string | null
}

export interface TmdbMultiTvResult {
  id: number
  media_type: 'tv'
  name: string
  first_air_date: string
  poster_path: string | null
}

export interface TmdbMultiPersonResult {
  id: number
  media_type: 'person'
  name: string
  profile_path: string | null
  known_for?: Array<{
    title?: string
    name?: string
  }>
}

export type TmdbMultiSearchResult =
  | TmdbMultiMovieResult
  | TmdbMultiTvResult
  | TmdbMultiPersonResult

export interface SearchMediaItem {
  id: string
  title: string
  mediaType: 'movie' | 'tv' | 'person'
  year: number | null
  image: string | null
  releaseDate: string | null
  extraInfo: string | null
}
