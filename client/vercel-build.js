const fs = require('fs')
const path = require('path')

// Ensure the photos directory exists in dist
const photosDir = path.join(__dirname, 'dist', 'photos')
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true })
}

// Copy all files from public/photos to dist/photos
const publicPhotosDir = path.join(__dirname, 'public', 'photos')
if (fs.existsSync(publicPhotosDir)) {
  fs.cpSync(publicPhotosDir, photosDir, { recursive: true })
} 