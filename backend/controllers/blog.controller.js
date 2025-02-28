import Blog from "../models/blog.model.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const posts = await Blog.find({ status: 'published' })
      .populate('author', 'username')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single blog post by slug
export const getBlogPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Blog.findOne({ slug, status: 'published' })
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new blog post (Admin/Staff only)
export const addBlogPost = async (req, res) => {
  try {
    const { title, content, summary, category, tags } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required"
      });
    }

    // Create image URL using relative path
    const imageUrl = `/uploads/blog/${imageFile.filename}`;
    console.log('Image URL:', imageUrl); // Add this for debugging

    const slug = generateSlug(title); // Generate slug from title

    // Check if slug already exists
    const existingPost = await Blog.findOne({ slug });
    if (existingPost) {
      // If slug exists, append a timestamp
      const timestamp = Date.now();
      slug = `${slug}-${timestamp}`;
    }

    const newPost = new Blog({
      title,
      content,
      summary,
      coverImage: imageUrl,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      author: req.user._id,
      slug // Add the slug
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      post: newPost
    });
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/blog', req.file.filename);
      await fs.unlink(filePath).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update blog post (Admin/Staff only)
export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, summary, category, tags, status } = req.body;
    const imageFile = req.file;

    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }

    let imageUrl = post.coverImage;
    if (imageFile) {
      const oldImagePath = path.join(__dirname, '..', post.coverImage);
      await fs.unlink(oldImagePath).catch(console.error);
      imageUrl = `/uploads/blog/${imageFile.filename}`;
    }

    // Generate new slug if title changed
    let slug = post.slug;
    if (title !== post.title) {
      slug = generateSlug(title);
      const existingPost = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existingPost) {
        const timestamp = Date.now();
        slug = `${slug}-${timestamp}`;
      }
    }

    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        summary,
        coverImage: imageUrl,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : post.tags,
        status: status || post.status,
        slug // Add the updated slug
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      post: updatedPost
    });
  } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/blog', req.file.filename);
      await fs.unlink(filePath).catch(console.error);
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete blog post (Admin/Staff only)
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found"
      });
    }

    const imagePath = path.join(__dirname, '..', post.coverImage);
    await fs.unlink(imagePath).catch(console.error);
    
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 