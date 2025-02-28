import Panel from "../models/panel.model.js";

// Get all panel members
export const getPanelMembers = async (req, res) => {
  try {
    const members = await Panel.find({ active: true }).sort('order');
    res.status(200).json({
      success: true,
      members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new panel member (Admin/Staff only)
export const addPanelMember = async (req, res) => {
  try {
    const { name, role, department, image, socialLinks } = req.body;

    // Validate required fields
    if (!name || !role || !department || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, role, department, and image are required fields"
      });
    }

    // Validate role
    const validRoles = ['President', 'Vice President', 'Senior Executive', 'Member'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    const newMember = new Panel({
      name,
      role,
      department,
      image,
      socialLinks: {
        twitter: socialLinks?.twitter || '',
        linkedin: socialLinks?.linkedin || ''
      },
      order: (await Panel.countDocuments()) + 1
    });

    await newMember.save();

    res.status(201).json({
      success: true,
      member: newMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update panel member (Admin/Staff only)
export const updatePanelMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, department, image, socialLinks, active, order } = req.body;

    // Validate required fields
    if (!name || !role || !department || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, role, department, and image are required fields"
      });
    }

    // Validate role
    const validRoles = ['President', 'Vice President', 'Senior Executive', 'Member'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    const updatedMember = await Panel.findByIdAndUpdate(
      id,
      {
        name,
        role,
        department,
        image,
        socialLinks: {
          twitter: socialLinks?.twitter || '',
          linkedin: socialLinks?.linkedin || ''
        },
        active,
        order
      },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: "Panel member not found"
      });
    }

    res.status(200).json({
      success: true,
      member: updatedMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete panel member (Admin/Staff only)
export const deletePanelMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedMember = await Panel.findByIdAndDelete(id);
    
    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Panel member not found"
      });
    }

    // Reorder remaining members
    const remainingMembers = await Panel.find().sort('order');
    for (let i = 0; i < remainingMembers.length; i++) {
      remainingMembers[i].order = i + 1;
      await remainingMembers[i].save();
    }

    res.status(200).json({
      success: true,
      message: "Panel member deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update panel order (Admin/Staff only)
export const updateOrder = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }
    
    for (const item of orders) {
      await Panel.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 