import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Film, Search, Bell, X } from 'lucide-react'
import { Button } from './ui/button'

export function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLFormElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSearchOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery('')
    }
  }, [isSearchOpen])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedQuery = searchQuery.trim()
    if (!trimmedQuery) return

    setIsSearchOpen(false)
    navigate({
      to: '/search',
      search: { q: trimmedQuery },
    })
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="flex items-center justify-between w-full max-w-7xl px-4 py-3 mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white transition-opacity hover:opacity-80"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
              <Film className="w-4 h-4" />
            </div>
            <span className="font-semibold tracking-tight">CineTrack</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-zinc-300 hover:text-white"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-zinc-300 hover:text-white"
            >
              <Link to="/movies">Movies</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-zinc-300 hover:text-white"
            >
              <Link to="/shows">Shows</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSearchOpen ? (
            <form
              ref={searchRef}
              className="relative flex items-center"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                placeholder="Search movies, shows..."
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-56 h-9 px-3 pr-10 rounded-full bg-zinc-900/80 border border-white/15 text-sm text-white placeholder:text-zinc-400 outline-none focus:border-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 h-7 w-7 rounded-full text-zinc-300 hover:text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-300 hover:text-white"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-zinc-300 hover:text-white relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </Button>

          <div className="w-px h-6 bg-white/10 mx-1"></div>

          <button className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-white/20">
            <img
              src="https://i.pravatar.cc/150?u=user"
              alt="User"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </nav>
    </div>
  )
}
