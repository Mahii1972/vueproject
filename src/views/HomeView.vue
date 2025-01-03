<template>
  <div class="p-5 bg-gray-900 min-h-screen text-gray-300">
    <!-- Hero Section -->
    <div
      class="text-center py-16 px-5 bg-gradient-to-br from-yellow-600 to-red-800 rounded-xl mb-10 shadow-lg transform hover:scale-105 transition-all duration-300"
    >
      <h1 class="text-6xl mb-5 font-serif animate-fade-in-down text-white">Ryan Art Works</h1>
      <p class="text-xl animate-fade-in-up text-white">
        Where Tradition Meets Artistry: Exquisite Hand-drawn and Tanjore Paintings
      </p>
    </div>

    <!-- About Us Section -->
    <div class="mt-10 max-w-4xl mx-auto">
      <h2 class="text-center mb-8 text-3xl font-serif text-yellow-500">
        Discover the World of Ryan Art Works
      </h2>
      <p class="text-lg mb-6 animate-fade-in">
        Welcome to Ryan Art Works, a treasure trove of handcrafted beauty. We specialize in two
        distinct yet equally captivating art forms:
        <span class="font-bold">vibrant hand-drawn paintings</span> (using fineliners and other
        mediums) and the <span class="font-bold">opulent art of Tanjore painting</span>. Our artists
        pour their hearts and souls into each creation, ensuring that every piece is a unique
        masterpiece. We are passionate about preserving and promoting these traditional art forms
        while infusing them with a contemporary flair.
      </p>
    </div>

    <!-- Featured Artworks Section -->
    <div class="mt-16">
      <h2 class="text-center mb-8 text-3xl font-serif text-yellow-500">Featured Artworks</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
        <div
          v-for="(artwork, index) in featuredArtworks"
          :key="index"
          class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <img :src="artwork.image" :alt="artwork.title" class="w-full h-[300px] object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2 text-yellow-400">
              {{ artwork.title }}
            </h3>
            <p class="text-gray-400">
              {{ artwork.description }}
            </p>
            <p v-if="artwork.type" class="mt-2 text-sm italic text-gray-500">
              {{ artwork.type }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div
      class="mt-16 py-10 px-6 bg-gradient-to-r from-yellow-700 to-red-600 rounded-xl text-center"
    >
      <h3 class="text-3xl font-serif text-white mb-4">Bring Home a Piece of Art</h3>
      <p class="text-lg text-white mb-6">
        Explore our gallery and find the perfect artwork to adorn your walls or to gift to a loved
        one. Each purchase supports our artists and helps keep these traditional art forms alive.
      </p>
      <button
        @click="navigateToProducts"
        class="bg-white text-red-700 hover:bg-yellow-200 py-3 px-8 rounded-lg font-semibold transition-all duration-300"
      >
        Explore Gallery
      </button>
    </div>

    <!-- Footer (Optional) -->
    <footer class="mt-16 py-8 text-center text-gray-500">
      © {{ new Date().getFullYear() }} Ryan Art Works. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const featuredArtworks = [
  {
    title: 'Divine Krishna',
    description: 'A mesmerizing Tanjore painting depicting Lord Krishna in all his glory.',
    image: 'https://picsum.photos/300/400?random=1',
    type: 'Tanjore Painting',
  },
  {
    title: "Lakshmi's Blessing",
    description:
      'Goddess Lakshmi portrayed in the traditional Tanjore style, symbolizing prosperity.',
    image: 'https://picsum.photos/300/400?random=2',
    type: 'Tanjore Painting',
  },
  {
    title: "Ganesha's Grace",
    description: 'Lord Ganesha brought to life with intricate details and radiant colors.',
    image: 'https://picsum.photos/300/400?random=3',
    type: 'Tanjore Painting',
  },
  {
    title: 'Vibrant Bloom',
    description: 'A stunning floral composition brought to life with detailed fineliner work.',
    image: 'https://picsum.photos/300/400?random=4',
    type: 'Fineliner Art',
  },
  {
    title: 'Cityscape Serenity',
    description:
      'A captivating cityscape captured with intricate fineliner details, showcasing architectural beauty.',
    image: 'https://picsum.photos/300/400?random=5',
    type: 'Fineliner Art',
  },
  {
    title: 'Mystical Mandala',
    description:
      'A mesmerizing mandala design created with precise fineliner strokes, perfect for meditation and mindfulness.',
    image: 'https://picsum.photos/300/400?random=6',
    type: 'Fineliner Art',
  },
]

const navigateToProducts = () => {
  router.push('/products')
}
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-out;
}
</style>
