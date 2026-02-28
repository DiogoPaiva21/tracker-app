import { Link } from '@tanstack/react-router'
import { Film, Search, Bell } from 'lucide-react'
import { Button } from './ui/button'

export function NavBar() {
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
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-zinc-300 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </Button>
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
