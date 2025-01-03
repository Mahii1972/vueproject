<template>
  <div class="container mx-auto p-4 md:p-8">
    <!-- Toast container -->
    <div class="toast toast-top toast-end">
      <div v-if="toast.show" :class="['alert', `alert-${toast.type}`]">
        <span>{{ toast.message }}</span>
      </div>
    </div>

    <h1 class="text-3xl font-bold text-center mb-8">Upload Your Artwork</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Image Upload Area -->
      <div
        class="w-full md:w-1/2 border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{ 'bg-blue-50': isDragging }"
      >
        <div v-if="!imagePreview" class="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p class="mt-2 text-gray-500 text-center">
            Drag and drop your artwork here or
            <span class="text-blue-500 underline" @click="selectFile">browse</span>
          </p>
        </div>
        <div v-else class="w-full">
          <img :src="imagePreview" alt="Uploaded Artwork" class="w-full rounded-lg shadow-md" />
          <button
            @click="removeImage"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Remove
          </button>
        </div>
        <input
          type="file"
          ref="fileInput"
          @change="onFileSelected"
          class="hidden"
          accept="image/*"
        />
      </div>

      <!-- Form -->
      <div class="w-full md:w-1/2">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              v-model="title"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.title }"
              required
            />
            <p v-if="errors.title" class="mt-2 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <!-- Price -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price (USD)</label>
            <input
              type="number"
              id="price"
              v-model.number="price"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.price }"
              required
            />
            <p v-if="errors.price" class="mt-2 text-sm text-red-600">{{ errors.price }}</p>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              v-model="description"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <!-- Artist Name -->
          <div>
            <label for="artist" class="block text-sm font-medium text-gray-700">Artist Name</label>
            <input
              type="text"
              id="artist"
              v-model="artistName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Medium -->
          <div>
            <label for="medium" class="block text-sm font-medium text-gray-700">Medium</label>
            <input
              type="text"
              id="medium"
              v-model="medium"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Dimensions -->
          <div>
            <label for="dimensions" class="block text-sm font-medium text-gray-700"
              >Dimensions</label
            >
            <input
              type="text"
              id="dimensions"
              v-model="dimensions"
              placeholder="e.g., 24x36 inches"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              v-model="category"
              class="select select-bordered w-full mt-1"
              :disabled="isLoadingCategories"
            >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
            <!-- Loading state -->
            <div v-if="isLoadingCategories" class="mt-2 text-sm text-gray-500">
              Loading categories...
            </div>
            <!-- Error state -->
            <div v-if="categoryError" class="mt-2 text-sm text-red-500">
              {{ categoryError }}
            </div>
          </div>

          <!-- Status -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700">Status</span>
            </label>
            <div class="flex gap-4">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  class="radio radio-primary"
                  value="available"
                  v-model="status"
                  checked
                />
                <span class="label-text ml-2">Available</span>
              </label>
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  class="radio radio-primary"
                  value="sold"
                  v-model="status"
                />
                <span class="label-text ml-2">Sold</span>
              </label>
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  class="radio radio-primary"
                  value="hidden"
                  v-model="status"
                />
                <span class="label-text ml-2">Hidden</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isLoading"
          >
            <template v-if="!isLoading">Submit Artwork</template>
            <template v-else>
              <div class="flex items-center">
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span class="ml-2">Processing...</span>
              </div>
            </template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { uploadImages } from '@/lib/s3upload'

const fileInput = ref(null)
const imagePreview = ref(null)
const selectedFile = ref(null)
const isDragging = ref(false)
const title = ref('')
const price = ref(null)
const description = ref('')
const artistName = ref('')
const medium = ref('')
const dimensions = ref('')
const category = ref('')
const status = ref(true) // Default to published
const isLoading = ref(false)
const errors = ref({})
const categories = ref([])
const isLoadingCategories = ref(false)
const categoryError = ref(null)
const toast = ref({
  show: false,
  message: '',
  type: 'info', // Can be info, success, warning, or error
})

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

const selectFile = () => {
  fileInput.value.click()
}

const onFileSelected = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

const handleFile = (file) => {
  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file.', 'error')
    return
  }

  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  imagePreview.value = null
  selectedFile.value = null
  fileInput.value.value = null
}

const fetchCategories = async () => {
  try {
    isLoadingCategories.value = true
    categoryError.value = null

    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) throw error

    categories.value = data
  } catch (error) {
    console.error('Error fetching categories:', error)
    categoryError.value = 'Failed to load categories. Please try again later.'
  } finally {
    isLoadingCategories.value = false
  }
}

// Fetch categories when component mounts
onMounted(() => {
  fetchCategories()
})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!title.value.trim()) {
    errors.value.title = 'Title is required.'
    isValid = false
  }

  if (price.value === null || price.value < 0) {
    errors.value.price = 'Price must be a positive number.'
    isValid = false
  }

  return isValid
}

const showToast = (message, type = 'info') => {
  toast.value = {
    show: true,
    message,
    type,
  }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const handleSubmit = async () => {
  if (!validateForm()) return
  if (!selectedFile.value) {
    showToast('Please select an image to upload', 'warning')
    return
  }
  if (!category.value) {
    showToast('Please select a category', 'warning')
    return
  }

  isLoading.value = true

  try {
    // Create object URL from the file
    const imageUrl = URL.createObjectURL(selectedFile.value)
    // Upload image to S3
    const imageUrls = await uploadImages(imageUrl, category.value)
    console.log('S3 Upload successful. Image URL:', imageUrls[0])

    // Prepare artwork data for Supabase
    const artworkData = {
      title: title.value,
      description: description.value,
      price: price.value,
      image_url: imageUrls[0],
      category_id: category.value,
      artist_name: artistName.value,
      medium: medium.value,
      dimensions: dimensions.value,
      status: status.value ? 'available' : 'hidden',
    }

    // Insert artwork data into Supabase
    const { data, error } = await supabase.from('artworks').insert(artworkData).select().single()

    if (error) {
      throw error
    }

    console.log('Artwork saved to database:', data)
    showToast('Artwork submitted successfully!', 'success')
    // Reset form fields
    resetForm()
  } catch (error) {
    console.error('Error submitting artwork:', error)
    showToast('Failed to submit artwork. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  title.value = ''
  price.value = null
  description.value = ''
  artistName.value = ''
  medium.value = ''
  dimensions.value = ''
  category.value = ''
  status.value = true
  imagePreview.value = null
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = null
  }
}
</script>

<style scoped>
/* Tailwind CSS Classes */
.toggle-checkbox:checked {
  right: 0;
  border-color: rgb(74 222 128);
}
.toggle-checkbox:checked + .toggle-label {
  background-color: rgb(74 222 128);
}

/* Regular CSS (Optional, for non-Tailwind styles) */
.toggle-checkbox {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px; /* Fully rounded */
  background-color: white;
  border-width: 4px;
  appearance: none;
  cursor: pointer;
  position: absolute; /* For positioning inside the relative container */
  top: 0;
  left: 0;
  transition: all 0.2s ease-in-out;
}

.toggle-label {
  display: block;
  overflow: hidden;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: #e2e8f0; /* Gray-300 */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

/* Animation for the loading spinner (if not using Tailwind's animate-spin) */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
