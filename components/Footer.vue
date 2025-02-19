<template>
    <footer class="py-8 text-sm bg-white">
        <div class="container mx-auto">
            <div
                class="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600"
            >
                <span>
                    {{ $t('web-title') }}
                </span>
                <span>·</span>
                <span>{{ $t('copyright') }} © {{ currentYear }} Eric</span>
                <span>·</span>
                <a
                    href="mailto:as199629@icloud.com"
                    class="hover:text-gray-900 transition-colors"
                >
                    {{ $t('contact') }}
                </a>
                <span>·</span>
                <span>All Rights Reserved</span>
                <span>·</span>
                <span>&#174;</span>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    const currentYear = new Date().getFullYear()
</script>

<style scoped>
    @media (max-width: 640px) {
        .container {
            padding: 0 20px;
        }
        .flex {
            flex-direction: column;
            text-align: center;
        }
    }
</style>
