<template>
    <footer class="py-8 text-sm bg-white">
        <div class="container mx-auto">
            <div class="flex justify-center items-center gap-4 text-gray-600">
                <span>Taiwan Smart Event Platform</span>
                <span>·</span>
                <span>Eric © {{ currentYear }}</span>
                <span>·</span>
                <a
                    href="mailto:as199629@icloud.com"
                    class="hover:text-gray-900 transition-colors"
                >
                    Contact
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
