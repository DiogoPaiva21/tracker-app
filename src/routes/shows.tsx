import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { MediaCardProps } from '@/components/media-card'
import { MediaCarousel } from '@/components/movies/media-carousel'
import { CurrentlyWatching } from '@/components/shows/currently-watching'
import { getTrendingShows } from '@/lib/mdblist/handlers/shows'

const getPopularShowsData = createServerFn({ method: 'GET' }).handler(
  async () => {
    return getTrendingShows()
  },
)

export const Route = createFileRoute('/shows')({
  loader: async () => getPopularShowsData(),
  component: ShowsPage,
})

const CURRENTLY_WATCHING = [
  {
    id: 'cw1',
    name: 'Shōgun',
    episode: 'S1 E3 · Tomorrow is Tomorrow',
    progress: 45,
    image:
      'https://image.tmdb.org/t/p/original/7mkUu1F2hVUNgz24xO8HPx0D6mK.jpg',
  },
  {
    id: 'cw2',
    name: '3 Body Problem',
    episode: 'S1 E1 · Countdown',
    progress: 10,
    image:
      'https://image.tmdb.org/t/p/original/6iNWfGVCEfASDdlNb05TP5nG0ll.jpg',
  },
  {
    id: 'cw3',
    name: 'Fallout',
    episode: 'S1 E8 · The Beginning',
    progress: 80,
    image:
      'https://image.tmdb.org/t/p/original/8zbAoryWbtH0DKdev8abFAjdufy.jpg',
  },
  {
    id: 'cw4',
    name: 'Dune: Part Two',
    episode: 'Part Two',
    progress: 15,
    image:
      'https://image.tmdb.org/t/p/original/7mkUu1F2hVUNgz24xO8HPx0D6mK.jpg',
  },
]

const NEW_EPISODES: Array<MediaCardProps> = [
  {
    id: 'ne1',
    title: "X-Men '97",
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/k8yARbD9iYn2nRX2HvsopfKDN2r.jpg',
    rating: 8.7,
    year: 2024,
    type: 'show',
    episode: 'S01 E05',
    releaseDate: 'Today',
  },
  {
    id: 'ne2',
    title: 'Tokyo Vice',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/g5WwAIfQ0H0yqg0j6xVb1r7M0p3.jpg',
    rating: 8.2,
    year: 2022,
    type: 'show',
    episode: 'S02 E10',
    releaseDate: 'Yesterday',
  },
  {
    id: 'ne3',
    title: 'Invincible',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/dMOzdp1Nq3n9B4f2U8eX0uW6jGZ.jpg',
    rating: 8.7,
    year: 2021,
    type: 'show',
    episode: 'S02 E08',
    releaseDate: '2 days ago',
  },
  {
    id: 'ne4',
    title: 'The Boys',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/stTEycfG9928HYGEISBFaG1ngjM.jpg',
    rating: 8.4,
    year: 2019,
    type: 'show',
    episode: 'S04 E03',
    releaseDate: 'Oct 24',
  },
  {
    id: 'ne5',
    title: 'House of the Dragon',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/z2yhl2wMACENh8x167b2zG5H485.jpg',
    rating: 8.4,
    year: 2022,
    type: 'show',
    episode: 'S02 E01',
    releaseDate: 'Jun 16',
  },
]

function ShowsPage() {
  const popularShows = Route.useLoaderData()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 pt-28">
      {/* Popular Shows */}
      <MediaCarousel title="Popular Shows" items={popularShows} />

      {/* Currently Watching */}
      <CurrentlyWatching currentlyWatching={CURRENTLY_WATCHING} />

      {/* Next Episodes */}
      <MediaCarousel title="Next Episodes" items={NEW_EPISODES} />
    </div>
  )
}
