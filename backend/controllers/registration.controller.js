import Registration from '../models/registration.model.js';

// Submit registration request
export const submitRegistration = async (req, res) => {
  try {
    const { name, email, semester } = req.body;
    console.log('Received registration:', { name, email, semester }); // Debug log

    const registration = new Registration({
      name,
      email,
      semester
    });

    await registration.save();
    console.log('Registration saved:', registration); // Debug log

    res.status(201).json({
      success: true,
      message: "Registration request submitted successfully"
    });
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all registration requests (Admin/Staff only)
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort('-createdAt');
    
    console.log('Fetched registrations:', registrations.length); // Debug log

    res.status(200).json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error('Fetch registrations error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark registration as read (Admin/Staff only)
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Marking registration as read:', id); // Debug log

    const registration = await Registration.findByIdAndUpdate(
      id,
      { status: 'read' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration request not found"
      });
    }

    res.status(200).json({
      success: true,
      registration
    });
  } catch (error) {
    console.error('Mark as read error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 