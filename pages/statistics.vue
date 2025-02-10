<template>
    <div class="relative w-full h-screen bg-gray-900">
        <!-- Three.js Canvas for Meteor Shower Background -->
        <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>

        <!-- Text Content -->
        <div
            class="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10"
        >
            <h1 class="text-4xl font-bold drop-shadow-lg">🎲 Lottery System</h1>
            <p class="text-lg mt-4">Select the participants for your event</p>

            <!-- Lottery Controls -->
            <div class="mt-8 space-x-4">
                <button
                    class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    @click="startLottery"
                >
                    Start Lottery
                </button>
                <button
                    class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
                    @click="clearLottery"
                >
                    Clear Lottery
                </button>
            </div>

            <!-- Display Lottery Results -->
            <div v-if="winner" class="mt-6 text-xl font-semibold">
                <p class="text-lg">🎉 Winner: {{ winner }}</p>
            </div>

            <!-- Participants List -->
            <div class="mt-8">
                <h2 class="text-2xl font-semibold">Participants</h2>
                <ul class="text-lg mt-4">
                    <li
                        v-for="(participant, index) in participants"
                        :key="index"
                    >
                        {{ participant }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import * as THREE from 'three'

    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const participants = ref<string[]>([
        'Alice',
        'Bob',
        'Charlie',
        'Dave',
        'Eve',
    ])
    const winner = ref<string | null>(null)

    // Function to start the lottery
    const startLottery = () => {
        const randomIndex = Math.floor(
            Math.random() * participants.value.length
        )
        winner.value = participants.value[randomIndex]
    }

    // Function to clear the winner
    const clearLottery = () => {
        winner.value = null
    }

    onMounted(() => {
        if (!canvasRef.value) return

        // Set up the scene and camera
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value })
        renderer.setSize(window.innerWidth, window.innerHeight)

        // Create the meteor shower effect
        const meteorGeometry = new THREE.SphereGeometry(0.2, 16, 16) // Small spheres to represent meteors
        const meteorMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 }) // Yellow meteor color
        const meteors: THREE.Mesh[] = []

        // Generate multiple meteors with random positions and speeds
        for (let i = 0; i < 100; i++) {
            const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial)
            meteor.position.set(
                Math.random() * 200 - 100, // Random X position
                Math.random() * 200 - 100, // Random Y position
                Math.random() * 200 - 100 // Random Z position
            )
            meteors.push(meteor)
            scene.add(meteor)
        }

        // Set background color
        scene.background = new THREE.Color(0x0a0a0a) // Dark background for a better meteor effect

        // Add ambient light to softly illuminate objects
        const ambientLight = new THREE.AmbientLight(0x404040, 1.5) // Soft ambient light
        scene.add(ambientLight)

        // Add point light to create a focal lighting effect
        const pointLight = new THREE.PointLight(0xffffff, 2, 100)
        pointLight.position.set(10, 10, 10)
        scene.add(pointLight)

        // Set camera position
        camera.position.z = 50

        // Animate meteors to fall down (meteor shower effect)
        function animate() {
            requestAnimationFrame(animate)

            // Move meteors to simulate falling
            meteors.forEach(meteor => {
                meteor.position.z -= 1 // Move meteor towards the camera
                if (meteor.position.z < -50) {
                    // Reset meteor position to simulate continuous shower
                    meteor.position.z = Math.random() * 200 + 100
                    meteor.position.x = Math.random() * 200 - 100
                    meteor.position.y = Math.random() * 200 - 100
                }
            })

            renderer.render(scene, camera)
        }

        animate()

        // Adjust on window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    })
</script>
