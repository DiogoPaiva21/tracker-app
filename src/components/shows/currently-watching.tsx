import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from '@/components/ui/carousel'
import { Plus } from "lucide-react"

export interface CurrentlyWatchingProps {
  currentlyWatching: {
    id: string
    name: string
    episode: string
    progress: number
    image: string
  }[]
}

export function CurrentlyWatching({ currentlyWatching }: CurrentlyWatchingProps) {
  return (
    <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
          Currently Watching
        </h2>
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <Carousel
            opts={{ align: 'start', dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {currentlyWatching.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-[85%] sm:basis-[340px] md:basis-[400px]"
                >
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 relative overflow-hidden flex items-end h-[200px] group cursor-pointer w-full">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-70 transition-opacity"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                    <div className="relative z-10 w-full flex justify-between items-end gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-white mb-1 truncate">
                          {item.name}
                        </h3>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-zinc-400 truncate">
                          {item.episode}
                        </p>
                      </div>
                      <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0 backdrop-blur-sm self-center">
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
  )
}