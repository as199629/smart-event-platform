export default function useTheme() {
    const isDark = useState<boolean | null>('theme', () => null)

    onMounted(() => {
        // Initialize theme on mount
        setInitialTheme()
    })

    const toggleTheme = () => {
        isDark.value = !isDark.value
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
        setTheme(isDark.value) // Pass the current theme state
    }

    // Set theme based on the provided value, defaulting to localStorage
    function setTheme(theme?: boolean) {
        const themeValue =
            theme !== undefined
                ? theme
                : localStorage.getItem('theme') === 'dark'

        if (themeValue) {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    }

    // Set initial theme on load
    function setInitialTheme() {
        const storedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches

        // Determine the initial theme based on localStorage or user preference
        const initialTheme =
            storedTheme === 'dark' || (!storedTheme && prefersDark)

        isDark.value = initialTheme
        setTheme(initialTheme) // Set the theme based on the initial value
    }

    return {
        isDark,
        toggleTheme,
        setTheme,
    }
}
