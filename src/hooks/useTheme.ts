import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

/**
 * Custom hook for managing application theme (light/dark mode)
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { theme, toggleTheme } = useTheme();
 *
 * return (
 *   <button onClick={toggleTheme}>
 *     Switch to {theme === 'light' ? 'dark' : 'light'} mode
 *   </button>
 * );
 *
 * // With custom theme detection
 * const { theme, toggleTheme, isDark } = useTheme({
 *   defaultTheme: 'dark',
 *   enableSystemTheme: true
 * });
 *
 * return (
 *   <div className={isDark ? 'dark-theme' : 'light-theme'}>
 *     <h1>Current theme: {theme}</h1>
 *     <button onClick={toggleTheme}>Toggle theme</button>
 *   </div>
 * );
 * ```
 *
 * @param options - Theme configuration options
 * @param options.defaultTheme - Default theme to use ('light' | 'dark')
 * @param options.enableSystemTheme - Whether to detect and use system theme preference
 * @param options.storageKey - Key to use for storing theme preference in localStorage
 *
 * @returns Object containing theme state and control functions
 * @returns theme - Current theme ('light' | 'dark')
 * @returns toggleTheme - Function to toggle between themes
 * @returns isDark - Boolean indicating if current theme is dark
 * @returns setTheme - Function to directly set theme
 */
export function useTheme(
  options: {
    defaultTheme?: Theme
    enableSystemTheme?: boolean
    storageKey?: string
  } = {}
) {
  const { defaultTheme = 'light', enableSystemTheme = true, storageKey = 'app-theme' } = options

  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme) {
        return savedTheme
      }
    }

    // Check system preference if enabled
    if (enableSystemTheme && typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }

    return defaultTheme
  })

  // Update document class and CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Update CSS variables based on theme
    if (theme === 'dark') {
      root.style.setProperty('--background', '#111111')
      root.style.setProperty('--foreground', '#ffffff')
    } else {
      root.style.setProperty('--background', '#ffffff')
      root.style.setProperty('--foreground', '#111111')
    }

    // Save theme preference
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  // Listen for system theme changes if enabled
  useEffect(() => {
    if (!enableSystemTheme) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [enableSystemTheme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    setTheme,
  }
}
