import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadImages = async (imageUris, categoryId) => {
  console.log('Starting S3 upload process for multiple images...')

  if (!Array.isArray(imageUris)) {
    imageUris = [imageUris] // Handle single image case for backward compatibility
  }

  if (!categoryId) {
    throw new Error('categoryId is required')
  }

  try {
    const uploadPromises = imageUris.map(async (imageUri) => {
      // Get file from the object URL
      const response = await fetch(imageUri)
      const blob = await response.blob()

      // Get file extension from mime type
      const extension = blob.type.split('/')[1]
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(7)
      const filename = `${categoryId}/${timestamp}_${randomString}.${extension}`
      console.log('Generated filename:', filename)

      // Create the command
      const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET,
        Key: filename,
        ContentType: blob.type,
      })

      // Generate pre-signed URL
      console.log('Generating pre-signed URL...')
      const preSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
      console.log('Pre-signed URL generated')

      // Upload using pre-signed URL
      console.log('Uploading to S3...')
      const uploadResponse = await fetch(preSignedUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': blob.type,
        },
      })

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('Upload failed:', errorText)
        throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`)
      }

      console.log('Upload successful')
      const imageUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${filename}`
      console.log('Image URL:', imageUrl)

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(imageUri)

      return imageUrl
    })

    // Wait for all uploads to complete and return array of URLs
    const imageUrls = await Promise.all(uploadPromises)
    return imageUrls
  } catch (error) {
    console.error('Error uploading to S3:', error)
    if (error.response) {
      console.error('Error response:', await error.response.text())
    }
    throw error
  }
}
