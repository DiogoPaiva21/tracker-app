import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { searchTmdbMulti } from '@/lib/tmdb/handlers/search'
import type { SearchMediaItem } from '@/lib/tmdb'

const searchMedia = createServerFn({ method: 'POST' })
  .inputValidator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    return searchTmdbMulti(data.query)
  })

type SearchRouteParams = {
  q?: string
}

type SearchPageLoaderData = {
  query: string
  results: Array<SearchMediaItem>
}

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>): SearchRouteParams => {
    return {
      q: typeof search.q === 'string' ? search.q : '',
    }
  },
  loaderDeps: ({ search }) => ({
    query: search.q?.trim() ?? '',
  }),
  loader: async ({ deps }): Promise<SearchPageLoaderData> => {
    if (!deps.query) {
      return {
        query: '',
        results: [],
      }
    }

    const results = await searchMedia({
      data: { query: deps.query },
    })

    return {
      query: deps.query,
      results,
    }
  },
  component: SearchPage,
})

const formatDate = (value: string | null) => {
  if (!value) return '-'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getResultHref = (result: SearchMediaItem) => {
  if (result.mediaType === 'movie') return `/movie/${result.id}`
  if (result.mediaType === 'tv') return `/tv/${result.id}`
  if (result.mediaType === 'person') return `/person/${result.id}`
  return null
}

function SearchPage() {
  const { query, results } = Route.useLoaderData()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 text-white">
      <div className="space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Search Results for{' '}
          <span className="text-zinc-400">"{query || '-'}"</span>
        </h1>

        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
          {results.length === 0 ? (
            <div className="px-6 py-12 text-center text-zinc-400">
              No results found. Try another title.
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {results.map((result) => {
                const href = getResultHref(result)

                return (
                  <li
                    key={`${result.mediaType}-${result.id}`}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <div className="grid grid-cols-[4rem_1fr] md:grid-cols-[4rem_1fr_10rem] gap-4 items-center px-6 py-4">
                      <div className="h-16 w-12 rounded-lg border border-white/10 overflow-hidden bg-zinc-800 shrink-0">
                        {result.image ? (
                          <img
                            src={result.image}
                            alt={result.title}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        {href ? (
                          <a
                            href={href}
                            className="text-lg font-medium text-white hover:text-zinc-300 transition-colors block truncate"
                          >
                            {result.title}
                          </a>
                        ) : (
                          <p className="text-lg font-medium text-white truncate">
                            {result.title}
                          </p>
                        )}

                        {result.mediaType === 'movie' ? (
                          <p className="text-sm text-zinc-400 mt-1 truncate">
                            {result.extraInfo ?? 'Director: -'}
                          </p>
                        ) : result.mediaType === 'tv' ? (
                          <p className="text-sm text-zinc-400 mt-1 truncate">
                            Release Date: {formatDate(result.releaseDate)}
                          </p>
                        ) : (
                          <p className="text-sm text-zinc-400 mt-1 truncate">
                            {result.extraInfo ?? 'Known for: -'}
                          </p>
                        )}
                      </div>

                      <div className="hidden md:block text-sm text-zinc-400">
                        {result.year ?? '-'}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
