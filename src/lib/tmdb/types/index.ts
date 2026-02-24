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
