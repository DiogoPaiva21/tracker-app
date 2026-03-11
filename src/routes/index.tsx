import { createFileRoute } from '@tanstack/react-router'
import { CurrentlyWatching } from '@/components/shows/currently-watching'
import { Watchlist } from '@/components/movies/watchlist'
import { NextEpisodes } from '@/components/homepage/next-episodes'
import { RecentActivity } from '@/components/homepage/recent-activity'

export const Route = createFileRoute('/')({
  component: App,
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

const MOVIE_WATCHLIST = [
  {
    id: 'mw1',
    name: 'Dune: Part Two',
    image:
      'https://image.tmdb.org/t/p/original/7mkUu1F2hVUNgz24xO8HPx0D6mK.jpg',
  },
  {
    id: 'mw2',
    name: 'Poor Things',
    image:
      'https://image.tmdb.org/t/p/original/7HKpc11uQfxnw0Y8tRUYn1fsKqE.jpg',
  },
  {
    id: 'mw3',
    name: 'Civil War',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
  },
  {
    id: 'mw4',
    name: 'Challengers',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/H6vke7zGiuLsz4v4RPeReb9rsv.jpg',
  },
]

const NEXT_EPISODES = [
  {
    id: 'ne1',
    show: "X-Men '97",
    episode: 'S1 E5 · Remember It',
    date: 'Today',
    image:
      'https://image.tmdb.org/t/p/original/k8yARbD9iYn2nRX2HvsopfKDN2r.jpg',
  },
  {
    id: 'ne2',
    show: 'Tokyo Vice',
    episode: 'S2 E10 · Endgame',
    date: 'Tomorrow',
    image:
      'https://image.tmdb.org/t/p/original/6iNWfGVCEfASDdlNb05TP5nG0ll.jpg',
  },
  {
    id: 'ne3',
    show: 'Invincible',
    episode: 'S2 E8 · I Thought You Were Stronger',
    date: 'In 2 days',
    image:
      'https://image.tmdb.org/t/p/original/8zbAoryWbtH0DKdev8abFAjdufy.jpg',
  },
]

function App() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 pt-28">
      {/* Currently Watching */}
      <CurrentlyWatching currentlyWatching={CURRENTLY_WATCHING} />

      {/* Movie Watchlist */}
      <Watchlist watchlist={MOVIE_WATCHLIST} />

      {/* Bottom Section: New Episodes & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">
        {/* Next Episodes */}
        <NextEpisodes nextEpisodes={NEXT_EPISODES} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  )
}
