export interface NextEpisodesProps {
  nextEpisodes: {
    id: string
    show: string
    episode: string
    date: string
    image: string
  }[]
}

export function NextEpisodes({ nextEpisodes }: NextEpisodesProps) {
  return (
    <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Next Episodes
            </h2>
            <button className="text-sm font-medium border border-zinc-800 rounded-full px-4 py-1.5 hover:bg-zinc-800 transition-colors text-zinc-300">
              See All
            </button>
          </div>
          <div className="space-y-3">
            {nextEpisodes.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center gap-4 rounded-2xl bg-zinc-900/40 p-3 hover:bg-zinc-800/60 transition-all cursor-pointer border border-zinc-800/50 hover:border-zinc-700/50"
              >
                <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="mb-1 text-base font-semibold text-zinc-100 group-hover:text-white transition-colors truncate">
                    {item.show}
                  </h3>
                  <p className="text-sm text-zinc-400 truncate group-hover:text-zinc-300 transition-colors">
                    {item.episode}
                  </p>
                </div>
                <span className="self-center text-xs font-medium text-zinc-500 whitespace-nowrap bg-zinc-800/50 px-2 py-0.5 rounded-md">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </section>
  )
}