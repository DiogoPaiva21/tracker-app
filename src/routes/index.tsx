import { createFileRoute } from '@tanstack/react-router'
import { Plus, Star } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const CURRENTLY_WATCHING = [
  {
    id: '1',
    name: 'Severance',
    episode: "S2 E5 · Trojan's Horse",
    progress: 65,
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pDc2HxMhgMOiMFKZSuJgObXdNXz.jpg',
  },
  {
    id: '2',
    name: 'Shōgun',
    episode: 'S1 E8 · The Abyss of Life',
    progress: 40,
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7O4iVfOMQmdCSZ0zBOMHn02HkU5.jpg',
  },
  {
    id: '3',
    name: 'The Last of Us',
    episode: 'S2 E2 · Scars',
    progress: 80,
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
  },
]

const MOVIE_WATCHLIST = [
  {
    id: '1',
    name: 'Dune: Part Two',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1pdfLvkbY9ohJlCjQH2IGpd3bZA.jpg',
  },
  {
    id: '2',
    name: 'Poor Things',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
  },
  {
    id: '3',
    name: 'The Batman',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg',
  },
]

const NEW_EPISODES = [
  {
    id: '1',
    show: 'Severance',
    episode: 'S2 E6',
    title: 'Attila',
    released: 'Today',
    image:
      'https://image.tmdb.org/t/p/w200/pDc2HxMhgMOiMFKZSuJgObXdNXz.jpg',
  },
  {
    id: '2',
    show: 'Shōgun',
    episode: 'S1 E9',
    title: 'Crimson Sky',
    released: 'Yesterday',
    image:
      'https://image.tmdb.org/t/p/w200/7O4iVfOMQmdCSZ0zBOMHn02HkU5.jpg',
  },
  {
    id: '3',
    show: 'The Last of Us',
    episode: 'S2 E3',
    title: 'The Path',
    released: '2 days ago',
    image:
      'https://image.tmdb.org/t/p/w200/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
  },
]

const RECENT_ACTIVITY = [
  {
    id: '1',
    user: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex' },
    action: 'rated',
    media: 'Dune: Part Two',
    rating: 9.5,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    user: {
      name: 'Sarah Miller',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    action: 'added to watchlist',
    media: 'Sinners',
    rating: null,
    timeAgo: '5h ago',
  },
  {
    id: '3',
    user: { name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=david' },
    action: 'finished watching',
    media: 'Shōgun',
    rating: null,
    timeAgo: '1d ago',
  },
  {
    id: '4',
    user: { name: 'Maya Patel', avatar: 'https://i.pravatar.cc/150?u=maya' },
    action: 'rated',
    media: 'Poor Things',
    rating: 8.0,
    timeAgo: '2d ago',
  },
]

function HomePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-14">
      {/* Currently Watching */}
      <section>
        <h2 className="text-[22px] font-semibold text-white/90 tracking-tight mb-5 italic">
          Currently Watching
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRENTLY_WATCHING.map((show, i) => (
            <div
              key={show.id}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-white/8 bg-zinc-900 cursor-pointer transition-all duration-300 hover:border-white/15 hover:shadow-2xl hover:shadow-white/4"
            >
              <img
                src={show.image}
                alt={show.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

              {i === 0 && (
                <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2.5">
                <h3 className="text-[15px] font-semibold text-white leading-tight">
                  {show.name}
                </h3>
                <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all"
                    style={{ width: `${show.progress}%` }}
                  />
                </div>
                <p className="text-[11px] text-zinc-400 tracking-wide">
                  {show.episode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movie Watchlist */}
      <section>
        <h2 className="text-[22px] font-semibold text-white/90 tracking-tight mb-5 italic">
          Movie Watchlist
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {MOVIE_WATCHLIST.map((movie) => (
            <div
              key={movie.id}
              className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-white/8 bg-zinc-900 cursor-pointer transition-all duration-300 hover:border-white/15 hover:shadow-2xl hover:shadow-white/4"
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-[15px] font-semibold text-white leading-tight">
                  {movie.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Episodes + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-start">
        {/* New Episodes */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[22px] font-semibold text-white/90 tracking-tight italic">
              New Episodes
            </h2>
            <button className="text-[13px] text-zinc-500 hover:text-white border border-white/10 rounded-lg px-3.5 py-1.5 transition-colors hover:border-white/20 hover:bg-white/3">
              See All
            </button>
          </div>

          <div className="space-y-2">
            {NEW_EPISODES.map((ep) => (
              <div
                key={ep.id}
                className="group flex items-center gap-4 p-3 rounded-xl border border-white/6 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={ep.image}
                    alt={ep.show}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {ep.show}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {ep.episode} · {ep.title}
                  </p>
                </div>
                <span className="text-[11px] text-zinc-600 shrink-0">
                  {ep.released}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-[22px] font-semibold text-white/90 tracking-tight mb-5 italic">
            Recent Activity
          </h2>
          <div className="rounded-2xl border border-white/6 bg-white/2 p-5 space-y-5">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={activity.id}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 mt-0.5">
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-zinc-400 leading-relaxed">
                      <span className="font-medium text-white">
                        {activity.user.name}
                      </span>{' '}
                      {activity.action}{' '}
                      <span className="font-medium text-white">
                        {activity.media}
                      </span>
                      {activity.rating && (
                        <span className="inline-flex items-center gap-0.5 ml-1.5 text-yellow-500 text-xs font-medium">
                          <Star className="w-3 h-3 fill-yellow-500" />
                          {activity.rating}
                        </span>
                      )}
                    </p>
                    <span className="text-[11px] text-zinc-600 mt-1 block">
                      {activity.timeAgo}
                    </span>
                  </div>
                </div>
                {i < RECENT_ACTIVITY.length - 1 && (
                  <div className="border-b border-white/4 mt-4" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
