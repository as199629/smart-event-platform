<template>
    <div class="container mx-auto px-4 py-10">
        <h1 class="text-3xl font-bold mb-6 text-center">�� 報名統計</h1>

        <!-- Add registration status overview -->
        <div class="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">📋 目前報名狀況</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="border rounded-lg p-4 bg-blue-50">
                    <p class="text-sm text-gray-600">報名進度</p>
                    <p class="text-2xl font-bold text-blue-600">
                        {{
                            Math.round(
                                (lotteryStore.participants.length / 100) * 100
                            )
                        }}%
                    </p>
                </div>
                <div class="border rounded-lg p-4 bg-green-50">
                    <p class="text-sm text-gray-600">剩餘名額</p>
                    <p class="text-2xl font-bold text-green-600">
                        {{ 100 - lotteryStore.participants.length }}
                    </p>
                </div>
                <div class="border rounded-lg p-4 bg-purple-50">
                    <p class="text-sm text-gray-600">報名截止</p>
                    <p class="text-2xl font-bold text-purple-600">7 天</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 參加人數 -->
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
                <h2 class="text-xl font-semibold">🎟️ 總報名人數</h2>
                <p class="text-4xl font-bold text-blue-500">
                    {{ lotteryStore.participants.length }}
                </p>
            </div>

            <!-- 報名數據圖 -->
            <div class="bg-white shadow-lg rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-3">📈 報名趨勢</h2>
                <BarChart :data="chartData" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
    } from 'chart.js'

    import { Bar } from 'vue-chartjs'
    import { useLotteryStore } from '~/stores/useLotteryStore'

    // 註冊 Chart.js 插件
    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    )

    const lotteryStore = useLotteryStore()

    // 設定報名趨勢圖表數據
    const chartData = computed(() => ({
        labels: lotteryStore.participants,
        datasets: [
            {
                label: '報名人數',
                data: lotteryStore.participants.map(
                    () => Math.floor(Math.random() * 50) + 10
                ),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    }))

    const BarChart = Bar
</script>

<style scoped>
    .container {
        max-width: 800px;
    }
</style>
