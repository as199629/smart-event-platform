<template>
  <div class="container mx-auto px-4">
    <!-- Hero Section -->
    <section class="text-center py-16 bg-blue-600 text-white">
      <h1 class="text-4xl font-bold">智慧活動管理平台</h1>
      <p class="mt-4 text-lg">輕鬆管理您的活動，並分析數據趨勢</p>
      <NuxtLink
        to="/events"
        class="mt-6 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg shadow"
      >
        探索活動
      </NuxtLink>
    </section>

    <!-- 熱門活動 -->
    <section class="mt-10">
      <h2 class="text-2xl font-bold mb-4">🔥 熱門活動</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="event in hotEvents"
          :key="event.id"
          class="p-4 shadow rounded-lg bg-white"
        >
          <h3 class="text-lg font-semibold">{{ event.title }}</h3>
          <p class="text-gray-600">{{ event.date }}</p>
          <NuxtLink
            :to="`/events/${event.id}`"
            class="text-blue-500 mt-2 inline-block"
            >查看詳情</NuxtLink
          >
        </div>
      </div>
    </section>

    <!-- 最新活動 -->
    <section class="mt-10">
      <h2 class="text-2xl font-bold mb-4">📅 最新活動</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="event in latestEvents"
          :key="event.id"
          class="p-4 border rounded-lg"
        >
          <h3 class="text-lg font-semibold">{{ event.title }}</h3>
          <p class="text-gray-600">{{ event.date }}</p>
          <NuxtLink
            :to="`/events/${event.id}`"
            class="text-blue-500 mt-2 inline-block"
            >查看詳情</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const hotEvents = ref([
  { id: 1, title: "台北馬拉松", date: "2025-03-15" },
  { id: 2, title: "黑客松競賽", date: "2025-04-20" },
  { id: 3, title: "戶外音樂節", date: "2025-05-10" },
]);

const latestEvents = ref([
  { id: 4, title: "攝影大賽", date: "2025-03-25" },
  { id: 5, title: "瑜珈體驗營", date: "2025-04-05" },
]);
</script>
