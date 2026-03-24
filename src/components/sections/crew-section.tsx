import { preloadTmdbImages } from '@/lib/tmdb/images'

interface CrewMember {
  id: number
  name: string
  job: string
  profile_path: string | null
}

interface CrewSectionProps {
  crew: Array<CrewMember>
  setIsCrewModalOpen: (isOpen: boolean) => void
  posterPath?: string | null
  backdropPath?: string | null
  profilePaths?: Array<string | null | undefined>
}

export function CrewSection({
  crew,
  setIsCrewModalOpen,
  posterPath,
  backdropPath,
  profilePaths,
}: CrewSectionProps) {
  const preloadCrewModalImages = () => {
    preloadTmdbImages({
      posterPath,
      backdropPath,
      profilePaths: profilePaths ?? crew.map((person) => person.profile_path),
    })
  }

  return (
    <section className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Crew</h2>
        <button
          onClick={() => setIsCrewModalOpen(true)}
          onMouseEnter={preloadCrewModalImages}
          onFocus={preloadCrewModalImages}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {crew.map((person, idx) => (
          <div
            key={`${person.id}-${idx}`}
            className="flex items-center justify-between border-b border-white/5 pb-2"
          >
            <span className="text-zinc-200 font-medium">{person.name}</span>
            <span className="text-zinc-500 text-sm">{person.job}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
