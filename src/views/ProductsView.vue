<template>
  <div class="p-5 bg-gray-900 min-h-screen text-gray-300">
    <!-- Hero Section -->
    <div
      class="text-center py-16 px-5 bg-gradient-to-br from-yellow-600 to-red-800 rounded-xl mb-10 shadow-lg transform hover:scale-105 transition-all duration-300"
    >
      <h1 class="text-6xl mb-5 font-serif animate-fade-in-down text-white">Our Art Collection</h1>
      <p class="text-xl animate-fade-in-up text-white">
        Discover Unique Artworks from Apoorva's Collection
      </p>
    </div>

    <!-- Search Bar -->
    <div class="flex justify-center mb-8">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search artworks..."
        class="w-full max-w-lg px-5 py-3 border-2 border-gray-700 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-yellow-500 bg-gray-800 text-white"
      />
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
      <div
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      >
        <img :src="product.image" :alt="product.title" class="w-full h-[300px] object-cover" />
        <div class="p-5">
          <h3 class="text-xl font-semibold mb-2 text-yellow-400">{{ product.title }}</h3>
          <p class="text-gray-400 my-2">by {{ product.artist }}</p>
          <p class="font-bold text-yellow-500 my-2">{{ product.price }}</p>
          <p class="text-sm italic text-gray-500 mb-4">{{ product.type }}</p>
          <button
            class="w-full py-3 px-4 bg-yellow-600 text-white rounded-lg transition-colors duration-300 hover:bg-yellow-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="mt-16 py-8 text-center text-gray-500">
      © {{ new Date().getFullYear() }} Art Collection. All Rights Reserved.
    </footer>
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
    image: 'https://picsum.photos/300/400?random=1',
    type: 'Oil Painting',
  },
  {
    title: 'Ocean Waves',
    artist: 'Michael Chen',
    price: '$680',
    image: 'https://picsum.photos/300/400?random=2',
    type: 'Watercolor',
  },
  {
    title: 'Mountain Serenity',
    artist: 'Sarah Williams',
    price: '$750',
    image: 'https://picsum.photos/300/400?random=3',
    type: 'Acrylic Painting',
  },
  {
    title: 'City Lights',
    artist: 'David Miller',
    price: '$890',
    image: 'https://picsum.photos/300/400?random=4',
    type: 'Digital Art',
  },
  {
    title: 'Forest Mystery',
    artist: 'Lisa Anderson',
    price: '$560',
    image: 'https://picsum.photos/300/400?random=5',
    type: 'Mixed Media',
  },
  {
    title: 'Desert Dawn',
    artist: 'James Wilson',
    price: '$640',
    image: 'https://picsum.photos/300/400?random=6',
    type: 'Pastel Drawing',
  },
  {
    title: 'Abstract Harmony',
    artist: 'Sophie Lee',
    price: '$720',
    image: 'https://picsum.photos/300/400?random=7',
    type: 'Abstract Painting',
  },
  {
    title: 'Floral Elegance',
    artist: 'Emily Carter',
    price: '$550',
    image: 'https://picsum.photos/300/400?random=8',
    type: 'Watercolor',
  },
  {
    title: 'Urban Rhythm',
    artist: 'Alex Thompson',
    price: '$830',
    image: 'https://picsum.photos/300/400?random=9',
    type: 'Street Art',
  },
]

const filteredProducts = computed(() => {
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}
</style>
