<template>
  <div class="p-5 bg-gray-900 min-h-screen text-gray-300">
    <!-- Hero Section -->
    <div
      class="text-center py-16 px-5 bg-gradient-to-br from-yellow-600 to-red-800 rounded-xl mb-10 shadow-lg transform hover:scale-105 transition-all duration-300"
    >
      <h1 class="text-6xl mb-5 font-serif animate-fade-in-down text-white">Our Art Collection</h1>
      <p class="text-xl animate-fade-in-up text-white">
        Discover Unique Artworks from Ryan's Collection
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

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div
        class="animate-spin h-12 w-12 mx-auto border-4 border-yellow-500 rounded-full border-t-transparent"
      ></div>
      <p class="mt-4 text-gray-400">Loading artworks...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
      <div
        v-for="artwork in filteredArtworks"
        :key="artwork.id"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      >
        <img :src="artwork.image_url" :alt="artwork.title" class="w-full h-[300px] object-cover" />
        <div class="p-5">
          <h3 class="text-xl font-semibold mb-2 text-yellow-400">{{ artwork.title }}</h3>
          <p class="text-gray-400 my-2">by {{ artwork.artist_name }}</p>
          <p class="font-bold text-yellow-500 my-2">${{ artwork.price }}</p>
          <p class="text-sm italic text-gray-500 mb-2">{{ artwork.medium }}</p>
          <p class="text-sm text-gray-500 mb-4">{{ artwork.dimensions }}</p>
          <p v-if="artwork.description" class="text-sm text-gray-400 mb-4 line-clamp-3">
            {{ artwork.description }}
          </p>
          <button
            v-if="artwork.status === 'available'"
            class="w-full py-3 px-4 bg-yellow-600 text-white rounded-lg transition-colors duration-300 hover:bg-yellow-700"
            @click="openBuyModal(artwork)"
          >
            Buy Now
          </button>
          <p
            v-else-if="artwork.status === 'sold'"
            class="w-full py-3 px-4 bg-gray-700 text-gray-400 rounded-lg text-center"
          >
            Sold
          </p>
        </div>
      </div>
    </div>

    <!-- Email Collection Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4 text-yellow-400">Enter Your Email</h2>
        <input
          type="email"
          v-model="userEmail"
          placeholder="your@email.com"
          class="w-full px-4 py-2 mb-4 border-2 border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:border-yellow-500"
        />
        <div class="flex gap-3">
          <button
            @click="handlePurchase"
            class="flex-1 py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Submit' }}
          </button>
          <button
            @click="closeModal"
            class="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
        <p v-if="submitError" class="mt-3 text-red-500 text-sm">{{ submitError }}</p>
        <p v-if="successMessage" class="mt-3 text-green-500 text-sm">{{ successMessage }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && !error && filteredArtworks.length === 0" class="text-center py-8">
      <p class="text-gray-400">No artworks found matching your search.</p>
    </div>

    <!-- Footer -->
    <footer class="mt-16 py-8 text-center text-gray-500">
      © {{ new Date().getFullYear() }} Art Collection. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const searchQuery = ref('')
const artworks = ref([])
const isLoading = ref(true)
const error = ref(null)

// Modal state
const showModal = ref(false)
const userEmail = ref('')
const selectedArtwork = ref(null)
const isSubmitting = ref(false)
const submitError = ref(null)
const successMessage = ref('')

const openBuyModal = (artwork) => {
  selectedArtwork.value = artwork
  showModal.value = true
  userEmail.value = ''
  submitError.value = null
  successMessage.value = ''
}

const closeModal = () => {
  showModal.value = false
  selectedArtwork.value = null
  userEmail.value = ''
  submitError.value = null
  successMessage.value = ''
}

const handlePurchase = async () => {
  if (!userEmail.value) {
    submitError.value = 'Please enter your email'
    return
  }

  try {
    isSubmitting.value = true
    submitError.value = null
    successMessage.value = ''

    const response = await fetch('http://localhost:8080/send-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_name: selectedArtwork.value.title,
        price: selectedArtwork.value.price,
        description: selectedArtwork.value.description || '',
        email: userEmail.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('Failed to send purchase details')
    }

    successMessage.value = data.message
    setTimeout(() => {
      closeModal()
    }, 2000) // Close modal after 2 seconds
  } catch (err) {
    console.error('Error sending purchase details:', err)
    submitError.value = 'Failed to process purchase. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const fetchArtworks = async () => {
  try {
    isLoading.value = true
    error.value = null

    const { data, error: err } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) throw err

    artworks.value = data
  } catch (err) {
    console.error('Error fetching artworks:', err)
    error.value = 'Failed to load artworks. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchArtworks()
})

const filteredArtworks = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return artworks.value.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(query) ||
      artwork.artist_name.toLowerCase().includes(query) ||
      artwork.medium.toLowerCase().includes(query) ||
      (artwork.description && artwork.description.toLowerCase().includes(query)),
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
