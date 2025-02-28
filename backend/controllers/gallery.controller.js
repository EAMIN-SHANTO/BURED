import Gallery from "../models/gallery.model.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all gallery items
export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find({ active: true }).sort('order');
    res.status(200).json({
      success: true,
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new gallery item (Admin/Staff only)
export const addGalleryItem = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    // Create image URL using relative path from public perspective
    const imageUrl = `/uploads/gallery/${imageFile.filename}`;

    const newItem = new Gallery({
      title,
      description,
      image: imageUrl,
      category,
      order: (await Gallery.countDocuments()) + 1
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      item: newItem
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/gallery', req.file.filename);
      await fs.unlink(filePath).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update gallery item (Admin/Staff only)
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, active } = req.body;
    const imageFile = req.file;

    const item = await Gallery.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found"
      });
    }

    let imageUrl = item.image;
    if (imageFile) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, '..', item.image);
      await fs.unlink(oldImagePath).catch(console.error);
      
      // Set new image URL
      imageUrl = `/uploads/gallery/${imageFile.filename}`;
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: imageUrl,
        category,
        active
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      item: updatedItem
    });
  } catch (error) {
    // Delete uploaded file if there's an error
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/gallery', req.file.filename);
      await fs.unlink(filePath).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete gallery item (Admin/Staff only)
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const item = await Gallery.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found"
      });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '..', item.image);
    await fs.unlink(imagePath).catch(console.error);
    
    await Gallery.findByIdAndDelete(id);

    // Reorder remaining items
    const remainingItems = await Gallery.find().sort('order');
    for (let i = 0; i < remainingItems.length; i++) {
      remainingItems[i].order = i + 1;
      await remainingItems[i].save();
    }

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 