import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Activity, ArrowRight, Flame, Users } from 'lucide-react'
import { FriendRating } from '@/components/friend-rating'
import { MediaCard } from '@/components/media-card'
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

const FRIEND_RATINGS = [
  {
    id: 'r1',
    user: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=alex' },
    media: {
      title: 'Dune: Part Two',
      year: 2024,
      image:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1pdfLvkbY9ohJlCjQH2IGpd3bZA.jpg',
    },
    rating: 10,
    review:
      'A masterpiece of modern cinema. Denis Villeneuve has created something truly awe-inspiring. The sound design alone is worth the price of admission.',
    timeAgo: '2 hours ago',
  },
  {
    id: 'r2',
    user: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    media: {
      title: 'Shōgun',
      year: 2024,
      image:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7O4iVfOMQmdCSZ0zBOMHn02HkU5.jpg',
    },
    rating: 9,
    review:
      'Incredible attention to detail. Every frame looks like a painting. Cosmo Jarvis and Hiroyuki Sanada are phenomenal.',
    timeAgo: '5 hours ago',
  },
  {
    id: 'r3',
    user: { name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=david' },
    media: {
      title: 'Poor Things',
      year: 2023,
      image:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    },
    rating: 8,
    review:
      'Wildly inventive and utterly bizarre in the best way possible. Emma Stone gives the performance of a lifetime.',
    timeAgo: '1 day ago',
  },
]

function App() {
  const { popularMovies, popularShows } = Route.useLoaderData()

  return (
    <div className="w-full max-w-7xl mx-auto px-2 space-y-24">
      {/* Hero Header */}
      <section className="relative pt-6 pb-6">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
      </section>

      {/* Popular Movies Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Flame className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Popular Movies
            </h2>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors group">
            See all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <Carousel
            opts={{ align: 'start', dragFree: true }}
            className="w-full pb-8"
          >
            <CarouselContent className="-ml-4">
              {popularMovies.map((movie) => (
                <CarouselItem key={movie.id} className="basis-auto pl-4">
                  <MediaCard {...movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Friends Activity Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Friends' Activity
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FRIEND_RATINGS.map((rating) => (
            <FriendRating key={rating.id} {...rating} />
          ))}
        </div>
      </section>

      {/* Popular Shows Section */}
      <section className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Popular TV Shows
            </h2>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors group">
            See all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <Carousel
            opts={{ align: 'start', dragFree: true }}
            className="w-full pb-8"
          >
            <CarouselContent className="-ml-4">
              {popularShows.map((show) => (
                <CarouselItem key={show.id} className="basis-auto pl-4">
                  <MediaCard {...show} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute top-0 right-0 bottom-8 w-24 bg-linear-to-l from-black to-transparent pointer-events-none hidden md:block" />
        </div>
      </section>
    </div>
  )
}
