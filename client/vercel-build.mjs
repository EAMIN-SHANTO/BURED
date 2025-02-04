import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function copyPhotos() {
  try {
    // Ensure the photos directory exists in dist
    const photosDir = join(__dirname, 'dist', 'photos')
    await fs.mkdir(photosDir, { recursive: true })

    // Copy all files from public/photos to dist/photos
    const publicPhotosDir = join(__dirname, 'public', 'photos')
    try {
      await fs.access(publicPhotosDir)
      await fs.cp(publicPhotosDir, photosDir, { recursive: true })
      console.log('Successfully copied photos directory')
    } catch (error) {
      console.error('Error accessing public/photos directory:', error)
    }
  } catch (error) {
    console.error('Error in copyPhotos:', error)
  }
}

copyPhotos() 