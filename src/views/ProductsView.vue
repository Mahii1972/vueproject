<template>
  <div class="p-10">
    <h1 class="text-center mb-10 text-2xl text-gray-800">Our Art Collection</h1>

    <div class="flex justify-center mb-8">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search artworks..."
        class="w-full max-w-lg px-5 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-indigo-500"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
      <div
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1"
      >
        <img :src="product.image" :alt="product.title" class="w-full h-[300px] object-cover" />
        <div class="p-5">
          <h3 class="text-xl text-gray-800 m-0">{{ product.title }}</h3>
          <p class="text-gray-500 my-2">by {{ product.artist }}</p>
          <p class="font-bold text-indigo-500 my-2">{{ product.price }}</p>
          <button
            class="w-full py-3 px-4 bg-indigo-500 text-white rounded-lg transition-colors duration-300 hover:bg-indigo-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const products = [
  {
    title: 'Sunset Dreams',
    artist: 'Emma Johnson',
    price: '$450',
    image: 'https://picsum.photos/300/400?random=4',
  },
  {
    title: 'Ocean Waves',
    artist: 'Michael Chen',
    price: '$680',
    image: 'https://picsum.photos/300/400?random=5',
  },
  {
    title: 'Mountain Serenity',
    artist: 'Sarah Williams',
    price: '$750',
    image: 'https://picsum.photos/300/400?random=6',
  },
  {
    title: 'City Lights',
    artist: 'David Miller',
    price: '$890',
    image: 'https://picsum.photos/300/400?random=7',
  },
  {
    title: 'Forest Mystery',
    artist: 'Lisa Anderson',
    price: '$560',
    image: 'https://picsum.photos/300/400?random=8',
  },
  {
    title: 'Desert Dawn',
    artist: 'James Wilson',
    price: '$640',
    image: 'https://picsum.photos/300/400?random=9',
  },
]

const filteredProducts = computed(() => {
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<style scoped></style>
