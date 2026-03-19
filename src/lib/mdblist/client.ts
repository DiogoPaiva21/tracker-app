const MDBLIST_BASE_URL = 'https://api.mdblist.com/'
const MDBLIST_USERNAME = 'snoak'
const MDBLIST_LIST_MOVIES = 'trending-movies'
const MDBLIST_LIST_TV = 'trakt-s-trending-shows'

const getMdblistApiKey = () => {
  const apiKey = process.env.MDBLIST_API_KEY
  if (!apiKey) {
    throw new Error('MDBLIST_API_KEY environment variable not set')
  }
  return apiKey
}

export const mdbRequest = async <T>(path: string): Promise<T> => {
  const apiKey = getMdblistApiKey()
  const url = new URL(`${MDBLIST_BASE_URL}${path}`)
  url.searchParams.set('apikey', apiKey)

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(
      `mdbRequest error: ${response.status} ${response.statusText}`,
    )
  }
  return (await response.json()) as T
}

export const getTrending = <T>(mediaType: 'movie' | 'tv') => {
  const list = mediaType === 'movie' ? MDBLIST_LIST_MOVIES : MDBLIST_LIST_TV
  return mdbRequest<T>(
    `lists/${MDBLIST_USERNAME}/${list}/items?limit=20&append_to_response=poster%2Cratings`,
  )
}

export const getMediaInfo = <T>(
  mediaProvider: string,
  mediaType: 'movie' | 'show',
  mediaId: string,
) => {
  return mdbRequest<T>(`${mediaProvider}/${mediaType}/${mediaId}`)
}
