import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from '@/components/ui/carousel'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '../ui/select'

export interface WatchlistProps {
  watchlist: {
    id: string
    name: string
    image: string
  }[]
}
export function Watchlist({ watchlist }: WatchlistProps) {
  return (
    <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Movie Watchlist
          </h2>
          <Select defaultValue="Recent Added">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Popular">Popular</SelectItem>
              <SelectItem value="Top Rated">Top Rated</SelectItem>
              <SelectItem value="Recent Added">Recent Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <Carousel
            opts={{ align: 'start', dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {watchlist.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-[70%] sm:basis-[280px] md:basis-[320px]"
                >
                  <div className="rounded-2xl border border-zinc-800 overflow-hidden relative h-[150px] group cursor-pointer w-full">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-80 transition-opacity"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-medium text-white truncate">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
  )
}