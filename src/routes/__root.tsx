import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { NavBar } from '@/components/nav-bar'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'CineTrack - Movies & TV Shows',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark bg-black text-white antialiased selection:bg-primary selection:text-primary-foreground"
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <NavBar />
        {/*
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#09090b]/30 z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b]/80 via-[#09090b]/40 to-transparent z-10" />
          <img
            src="https://image.tmdb.org/t/p/original/7mkUu1F2hVUNgz24xO8HPx0D6mK.jpg"
            className="w-full h-full object-cover object-center mix-blend-screen opacity-50"
          />
          </div>*/}
        <main className="min-h-screen pb-16">{children}</main>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
