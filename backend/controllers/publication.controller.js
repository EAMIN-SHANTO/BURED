import Publication from '../models/publication.model.js';

// Get all publications
export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort('-publishedDate');
    res.status(200).json({
      success: true,
      publications
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new publication
export const createPublication = async (req, res) => {
  try {
    console.log('Creating publication:', req.body);
    console.log('File:', req.file);

    const { title, authors, description, link, publishedDate } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required"
      });
    }

    const publication = new Publication({
      title,
      authors,
      description,
      link,
      publishedDate: publishedDate || Date.now(),
      coverImage: `/uploads/publications/${req.file.filename}`
    });

    await publication.save();
    console.log('Publication saved:', publication);

    res.status(201).json({
      success: true,
      publication
    });
  } catch (error) {
    console.error('Error creating publication:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete publication
export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: "Publication not found"
      });
    }

    // Could add file deletion here if needed
    
    res.status(200).json({
      success: true,
      message: "Publication deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 