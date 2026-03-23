import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { MediaCard, MediaCardProps } from '@/components/media-card'

export interface MediaCarouselProps {
  title: string
  items: MediaCardProps[]
}

export function MediaCarousel({ title, items }: MediaCarouselProps) {
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
          <CarouselContent className='space-x-8'>
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[160px] md:basis-[180px] lg:basis-[200px]"
              >
                <MediaCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
