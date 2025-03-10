<template>
    <label class="inline-flex items-center cursor-pointer">
        <span class="mr-3 dark:text-gray-300 flex items-center justify-center">
            <Icon v-if="isDark" name="material-symbols:dark-mode-outline" />
            <Icon v-else name="material-symbols:sunny-outline" />
        </span>
        <input
            type="checkbox"
            :checked="isDark"
            class="sr-only peer"
            @change="toggleTheme"
        />
        <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
        />
    </label>
</template>

<script setup lang="ts">
    useHead({
        script: [
            {
                children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                                document.documentElement.setAttribute("data-theme", "dark")
                            } else {
                                document.documentElement.removeAttribute("data-theme")
                            }`,
            },
        ],
    })

    const { toggleTheme, isDark } = useTheme()
</script>
