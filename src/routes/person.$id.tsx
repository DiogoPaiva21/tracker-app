import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { getPersonDetails } from '../lib/tmdb/handlers/person'
import { TmdbPersonCredit } from '../lib/tmdb/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const getPersonById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return getPersonDetails(data.id)
  })

export const Route = createFileRoute('/person/$id')({
  loader: async ({ params }) => getPersonById({ data: { id: params.id } }),
  component: PersonDetails,
})

function PersonDetails() {
  const person = Route.useLoaderData()
  const [isBioModalOpen, setIsBioModalOpen] = useState(false)
  const [manualDepartment, setManualDepartment] = useState<string | null>(null)

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w342'
  const profileUrl = person.profile_path
    ? `${IMAGE_BASE_URL}${person.profile_path}`
    : null

  // Group credits by department
  const creditsByDepartment: Record<string, TmdbPersonCredit[]> = {}

  // Add Acting (Cast) department
  if (person.combined_credits.cast && person.combined_credits.cast.length > 0) {
    creditsByDepartment['Acting'] = person.combined_credits.cast.map((c) => ({
      ...c,
      department: 'Acting',
      job: 'Actor',
    }))
  }

  // Add Crew departments
  if (person.combined_credits.crew) {
    person.combined_credits.crew.forEach((credit) => {
      const department = credit.department || 'Crew'
      if (!creditsByDepartment[department]) {
        creditsByDepartment[department] = []
      }
      creditsByDepartment[department].push(credit)
    })
  }

  // Sort each department by popularity (highest first)
  Object.keys(creditsByDepartment).forEach((department) => {
    // Remove duplicates based on ID and Job/Character
    const uniqueCredits = Array.from(
      new Map(
        creditsByDepartment[department].map((c) => [
          `${c.id}-${c.job || c.character || ''}`,
          c,
        ]),
      ).values(),
    )

    creditsByDepartment[department] = uniqueCredits.sort((a, b) => {
      const popularityA = Number(a.popularity || 0)
      const popularityB = Number(b.popularity || 0)
      return popularityB - popularityA
    })
  })

  // Order departments (put 'Directing' or known_for_department first, then others)
  const departments = Object.keys(creditsByDepartment).sort((a, b) => {
    if (a === person.known_for_department) return -1
    if (b === person.known_for_department) return 1
    return a.localeCompare(b)
  })

  const selectedDepartment =
    manualDepartment && departments.includes(manualDepartment)
      ? manualDepartment
      : departments[0] || ''

  const truncateLength = 250
  const isLongBio = person.biography && person.biography.length > truncateLength
  const displayBio = isLongBio
    ? person.biography.slice(0, truncateLength) + '...'
    : person.biography

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans pb-24 bg-[#09090b]">
      {/* Bio Modal */}
      {isBioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
              <h2 className="text-2xl font-semibold">Biography</h2>
              <button
                onClick={() => setIsBioModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto">
              <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {person.biography}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-20 w-full max-w-7xl mx-auto pt-32 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-2/3 max-w-[300px] mx-auto md:mx-0">
            {profileUrl ? (
              <img
                src={profileUrl}
                alt={person.name}
                className="w-full h-full object-cover bg-zinc-800"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                No Image
              </div>
            )}
          </div>

          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <strong className="block text-zinc-400 font-medium">
                    Known For
                  </strong>
                  <span>{person.known_for_department}</span>
                </div>
                <div>
                  <strong className="block text-zinc-400 font-medium">
                    Born
                  </strong>
                  <span>
                    {person.birthday
                      ? new Date(person.birthday).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : '-'}
                  </span>
                </div>
                {person.deathday && (
                  <div>
                    <strong className="block text-zinc-400 font-medium">
                      Died
                    </strong>
                    <span>
                      {new Date(person.deathday).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {person.place_of_birth && (
                  <div>
                    <strong className="block text-zinc-400 font-medium">
                      Place of Birth
                    </strong>
                    <span>{person.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Biography Summary in Sidebar */}
            {person.biography && (
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-semibold mb-4">Biography</h3>
                <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap mb-4">
                  {displayBio}
                </div>
                {isLongBio && (
                  <button
                    onClick={() => setIsBioModalOpen(true)}
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors flex items-center gap-1"
                  >
                    Show All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Title & Credits */}
        <div className="md:col-span-8 lg:col-span-9 space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {person.name}
            </h1>
            <Select
              value={selectedDepartment}
              onValueChange={(value) => setManualDepartment(value)}
            >
              <SelectTrigger
                id="department-select"
                className="bg-zinc-900 border-white/20 text-white min-w-48 cursor-pointer"
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border border-white/20 text-white">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept} ({creditsByDepartment[dept].length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {departments.length > 0 && (
            <div className="space-y-6">
              {selectedDepartment &&
                creditsByDepartment[selectedDepartment] && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {creditsByDepartment[selectedDepartment].map(
                      (credit, idx) => {
                        const title =
                          credit.title ||
                          credit.name ||
                          credit.original_title ||
                          credit.original_name
                        const role = credit.character || credit.job
                        const type = credit.media_type
                        const posterUrl = credit.poster_path
                          ? `${POSTER_BASE_URL}${credit.poster_path}`
                          : null

                        return (
                          <Link
                            key={`${credit.id}-${role}-${idx}`}
                            to={`/${type}/${credit.id}` as any}
                            className="group flex flex-col bg-zinc-900/40 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                          >
                            <div className="aspect-2/3 w-full bg-zinc-800 relative overflow-hidden">
                              {posterUrl ? (
                                <img
                                  src={posterUrl}
                                  alt={title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-zinc-500 bg-zinc-800/80">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mb-2 opacity-50"
                                  >
                                    <rect
                                      x="2"
                                      y="2"
                                      width="20"
                                      height="20"
                                      rx="2.18"
                                      ry="2.18"
                                    ></rect>
                                    <line x1="7" y1="2" x2="7" y2="22"></line>
                                    <line x1="17" y1="2" x2="17" y2="22"></line>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <line x1="2" y1="7" x2="7" y2="7"></line>
                                    <line x1="2" y1="17" x2="7" y2="17"></line>
                                    <line
                                      x1="17"
                                      y1="17"
                                      x2="22"
                                      y2="17"
                                    ></line>
                                    <line x1="17" y1="7" x2="22" y2="7"></line>
                                  </svg>
                                  <span className="text-xs font-medium px-2">
                                    {title}
                                  </span>
                                </div>
                              )}
                              <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-white/90">
                                {type}
                              </div>
                            </div>
                          </Link>
                        )
                      },
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
