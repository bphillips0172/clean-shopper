import { useState } from 'react'

// The chosen theme lives on <html data-theme> and in localStorage. With no choice saved,
// the page follows the device setting (see the light-mode block in tokens.css).
function currentlyDark() {
  const chosen = document.documentElement.dataset.theme
  if (chosen) return chosen === 'dark'
  return !window.matchMedia('(prefers-color-scheme: light)').matches
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(currentlyDark)

  const toggle = () => {
    const theme = isDark ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage can be blocked; the switch still works for this visit.
    }
    setIsDark(!isDark)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-border-soft bg-transparent px-3 py-1 font-body text-sm font-medium text-fg transition-colors duration-fast ease-standard cursor-pointer hover:bg-surface-warm focus-visible:outline-none focus-visible:shadow-focus-ring"
    >
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
      Dark mode
    </button>
  )
}

export default ThemeToggle
