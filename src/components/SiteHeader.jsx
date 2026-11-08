import { Link, NavLink } from 'react-router'
import ThemeToggle from './ThemeToggle.jsx'

const navLink = ({ isActive }) =>
  `rounded-md text-sm transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:shadow-focus-ring ${
    isActive ? 'font-medium text-fg' : 'text-muted hover:text-fg'
  }`

function SiteHeader({ savedCount = 0 }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-container-phone py-4 sm:px-container-tablet lg:px-container-desktop">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md font-display text-lg text-fg focus-visible:outline-none focus-visible:shadow-focus-ring"
        >
          <svg className="size-5" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
            <path
              d="M11 2C6.58 2 3 5.58 3 10c0 3.54 2.29 6.53 5.47 7.59L11 20l2.53-2.41C16.71 16.53 19 13.54 19 10c0-4.42-3.58-8-8-8z"
              opacity="0.2"
            />
            <path d="M11 4.5c-1.8 1.4-3.5 3.6-3.5 6 0 1.4.6 2.6 1.5 3.5C10 15 11 15.5 11 17c0-1.5 1-2 1.9-3 .9-.9 1.6-2.1 1.6-3.5 0-2.4-1.7-4.6-3.5-6z" />
          </svg>
          Clean Shopper
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Main">
            <ul className="flex items-center gap-5">
              <li>
                <NavLink to="/" end className={navLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/browse" className={navLink}>
                  Browse
                </NavLink>
              </li>
              <li>
                <NavLink to="/saved" className={navLink}>
                  Cart{savedCount > 0 && <span className="ml-1.5 inline-flex size-5 items-center justify-center rounded-pill bg-fg text-xs text-bg">{savedCount}</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
