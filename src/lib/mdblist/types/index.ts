export interface MdblistIds {
  trakt?: number | null
  slug?: string | null
  imdb?: string | null
  tmdb?: number | null
  tvdb?: number | null
}

export interface MdblistRating {
  score: number | null
  value: number | null
  votes: number | null
  source: string
}

export interface MdblistMovieSummary {
  id: number
  ids: MdblistIds
  rank: number
  adult: number
  title: string
  poster: string | null
  status: string | null
  country: string | null
  imdb_id: string | null
  runtime: number | null
  tvdb_id: number | null
  language: string | null
  mediatype: 'movie'
  release_date: string | null
  release_year: number | null
  spoken_language: string | null
  ratings: Array<MdblistRating> | null
}

export interface MdblistShowSummary {
  id: number
  ids: MdblistIds
  rank: number
  adult: number
  title: string
  poster: string | null
  status: string | null
  country: string | null
  imdb_id: string | null
  runtime: number | null
  tvdb_id: number | null
  language: string | null
  mediatype: 'show' | 'tv'
  release_date: string | null
  release_year: number | null
  spoken_language: string | null
  ratings: Array<MdblistRating> | null
}

export interface MdblistTrendingResponse {
  movies: Array<MdblistMovieSummary>
  shows: Array<MdblistShowSummary>
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
