export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const TMDB_IMAGE_SIZES = {
  profile: 'w185',
  poster: 'w154',
  backdrop: 'w1280',
  logo: 'w300',
  original: 'original',
} as const

type TmdbImageSize = (typeof TMDB_IMAGE_SIZES)[keyof typeof TMDB_IMAGE_SIZES]

interface PreloadTmdbImagesOptions {
  posterPath?: string | null
  backdropPath?: string | null
  profilePaths?: Array<string | null | undefined>
}

const preloadedImageUrls = new Set<string>()

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: TmdbImageSize,
) {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function preloadImage(url: string | null | undefined) {
  if (!url || typeof window === 'undefined') return
  if (preloadedImageUrls.has(url)) return

  const image = new Image()
  image.src = url
  preloadedImageUrls.add(url)
}

export function preloadTmdbImages({
  posterPath,
  backdropPath,
  profilePaths = [],
}: PreloadTmdbImagesOptions) {
  preloadImage(getTmdbImageUrl(posterPath, TMDB_IMAGE_SIZES.poster))
  preloadImage(getTmdbImageUrl(backdropPath, TMDB_IMAGE_SIZES.backdrop))

  profilePaths.slice(0, 6).forEach((profilePath) => {
    preloadImage(getTmdbImageUrl(profilePath, TMDB_IMAGE_SIZES.profile))
  })
}
