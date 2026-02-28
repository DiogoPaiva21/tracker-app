import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export interface NextMovieItem {
  id: string
  name: string
  releaseDate: string
  image?: string
}

export interface NextMoviesProps {
  title?: string
  movies: NextMovieItem[]
}

export function NextMovies({ title = "Next Movies", movies }: NextMoviesProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <Carousel
          opts={{ align: 'start', dragFree: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {movies.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-[200px] sm:basis-[240px] md:basis-[280px]"
              >
                <div className="rounded-2xl border border-zinc-800 overflow-hidden relative h-[120px] bg-zinc-900 group cursor-pointer w-full flex flex-col justify-end p-4 hover:border-zinc-700 transition-colors">
                  {item.image && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-70 transition-opacity"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-base font-medium text-white truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {item.releaseDate}
                    </p>
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
