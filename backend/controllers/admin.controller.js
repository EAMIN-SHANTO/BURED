import User from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { role, position } = req.body;
    
    // Only admin can change roles
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admin can change user roles"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role, position },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    // Only admin can delete users
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete users"
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get current panel
export const getCurrentPanel = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Panel management coming soon"
  });
};

// Update panel
export const updatePanel = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Panel update coming soon"
  });
};

// Get about content
export const getAboutContent = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "About content coming soon"
  });
};

// Update about content
export const updateAboutContent = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "About content update coming soon"
  });
};

// Get all photos
export const getAllPhotos = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gallery management coming soon"
  });
};

// Upload photo
export const uploadPhoto = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Photo upload coming soon"
  });
};

// Delete photo
export const deletePhoto = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Photo delete coming soon"
  });
};

// Get all posts
export const getAllPosts = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog management coming soon"
  });
};

// Create post
export const createPost = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog post creation coming soon"
  });
};

// Update post
export const updatePost = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog post update coming soon"
  });
};

// Delete post
export const deletePost = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog post delete coming soon"
  });
}; 