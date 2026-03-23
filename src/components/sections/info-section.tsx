import { Calendar } from 'lucide-react'

interface InfoSectionProps {
  release_date: string
  production_companies: Array<{ id: number; name: string }>
}

export function InfoSection({
  release_date,
  production_companies,
}: InfoSectionProps) {
  return (
    <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-zinc-400 mb-1">
          <span>Release:</span>
          <Calendar className="w-4 h-4" />
        </div>
        <div className="text-white font-medium">
          {new Date(release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      <div>
        <div className="text-zinc-400 mb-2">Studios:</div>
        <div className="flex flex-col gap-1">
          {production_companies.map((company) => (
            <span key={company.id} className="text-white font-medium">
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
