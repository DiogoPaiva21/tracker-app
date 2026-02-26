import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Activity, Plus } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getHomePopularFeed } from '@/lib/tmdb/handlers/home'

const getHomePopularData = createServerFn({ method: 'GET' }).handler(
  async () => {
    return getHomePopularFeed()
  },
)

export const Route = createFileRoute('/')({
  loader: async () => getHomePopularData(),
  component: App,
})

const CURRENTLY_WATCHING = [
  {
    id: 'cw1',
    name: 'Shōgun',
    episode: 'S1 E3 · Tomorrow is Tomorrow',
    progress: 45,
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7O4iVfOMQmdCSZ0zBOMHn02HkU5.jpg'
  },
  {
    id: 'cw2',
    name: '3 Body Problem',
    episode: 'S1 E1 · Countdown',
    progress: 10,
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ykZ7hlShkdRcUhtTWiwJWJTlwBE.jpg'
  },
  {
    id: 'cw3',
    name: 'Fallout',
    episode: 'S1 E8 · The Beginning',
    progress: 80,
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8m2SgxsE5s58Z01yS7rT3XhEDpY.jpg'
  },
  {
    id: 'cw4',
    name: 'Dune: Part Two',
    episode: 'Part Two',
    progress: 15,
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1pdfLvkbY9ohJlCjQH2IGpd3bZA.jpg'
  }
]

const MOVIE_WATCHLIST = [
  {
    id: 'mw1',
    name: 'Dune: Part Two',
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1pdfLvkbY9ohJlCjQH2IGpd3bZA.jpg'
  },
  {
    id: 'mw2',
    name: 'Poor Things',
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg'
  },
  {
    id: 'mw3',
    name: 'Civil War',
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg'
  },
  {
    id: 'mw4',
    name: 'Challengers',
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/H6vke7zGiuLsz4v4RPeReb9rsv.jpg'
  }
]

const NEW_EPISODES = [
  {
    id: 'ne1',
    show: 'X-Men \'97',
    episode: 'S1 E5 · Remember It',
    date: 'Today'
  },
  {
    id: 'ne2',
    show: 'Tokyo Vice',
    episode: 'S2 E10 · Endgame',
    date: 'Yesterday'
  },
  {
    id: 'ne3',
    show: 'Invincible',
    episode: 'S2 E8 · I Thought You Were Stronger',
    date: '2 days ago'
  }
]

function App() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Currently Watching */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">Currently Watching</h2>
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {CURRENTLY_WATCHING.map((item) => (
                <CarouselItem key={item.id} className="pl-4 basis-[85%] sm:basis-[340px] md:basis-[400px]">
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 relative overflow-hidden flex items-end h-[160px] group cursor-pointer w-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                    
                    <div className="relative z-10 w-full flex justify-between items-end gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-white mb-3 truncate">{item.name}</h3>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }} />
                        </div>
                        <p className="text-xs text-zinc-400 truncate">{item.episode}</p>
                      </div>
                      <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 backdrop-blur-sm">
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Movie Watchlist */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">Movie Watchlist</h2>
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {MOVIE_WATCHLIST.map((item) => (
                <CarouselItem key={item.id} className="pl-4 basis-[70%] sm:basis-[280px] md:basis-[320px]">
                  <div className="rounded-2xl border border-zinc-800 overflow-hidden relative h-[140px] group cursor-pointer w-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent opacity-90" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-medium text-white truncate">{item.name}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Bottom Section: New Episodes & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* New Episodes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">New Episodes</h2>
            <button className="text-sm font-medium border border-zinc-800 rounded-full px-4 py-1.5 hover:bg-zinc-800 transition-colors text-zinc-300">
              See All
            </button>
          </div>
          <div className="space-y-3">
            {NEW_EPISODES.map((item) => (
              <div key={item.id} className="border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-900/50 cursor-pointer transition-colors group">
                <div>
                  <h3 className="text-zinc-200 font-medium group-hover:text-white transition-colors">{item.show}</h3>
                  <p className="text-sm text-zinc-500">{item.episode}</p>
                </div>
                <span className="text-xs text-zinc-600 font-medium whitespace-nowrap ml-4">{item.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">Recent Activity</h2>
          <div className="border border-zinc-800 rounded-2xl h-[240px] p-6 flex flex-col items-center justify-center text-zinc-500 space-y-3 bg-zinc-900/20">
            <Activity className="w-8 h-8 opacity-40" />
            <p className="text-sm text-center max-w-[200px]">Your recent watching activity will appear here.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
