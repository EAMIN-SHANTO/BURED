import Certificate from '../models/certificate.model.js';

// Create a new certificate
export const createCertificate = async (req, res) => {
  try {
    const { memberName, studentId, clubDepartment, certificateTitle, issueDate } = req.body;
    
    // Generate a unique certificate ID
    const prefix = clubDepartment.substring(0, 3).toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    const certificateId = `${prefix}-${year}-${random}`;
    
    // Check if certificate ID already exists
    const existingCertificate = await Certificate.findOne({ certificateId });
    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: 'Certificate ID already exists'
      });
    }
    
    // Create verification URL
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const verificationUrl = `${baseUrl}/verify-certificate/${certificateId}`;
    
    // Create new certificate
    const certificate = new Certificate({
      certificateId,
      memberName,
      studentId,
      clubDepartment,
      certificateTitle,
      issueDate,
      issuedBy: req.user.username,
      issuerId: req.user._id,
      verificationUrl
    });
    
    await certificate.save();
    
    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      certificate
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create certificate'
    });
  }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      certificates
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates'
    });
  }
};

// Get certificate by ID
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      certificate
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate'
    });
  }
};

// Update certificate
export const updateCertificate = async (req, res) => {
  try {
    const { memberName, studentId, clubDepartment, certificateTitle, issueDate } = req.body;
    
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    certificate.memberName = memberName || certificate.memberName;
    certificate.studentId = studentId || certificate.studentId;
    certificate.clubDepartment = clubDepartment || certificate.clubDepartment;
    certificate.certificateTitle = certificateTitle || certificate.certificateTitle;
    certificate.issueDate = issueDate || certificate.issueDate;
    
    await certificate.save();
    
    res.status(200).json({
      success: true,
      message: 'Certificate updated successfully',
      certificate
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update certificate'
    });
  }
};

// Delete certificate
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    await Certificate.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete certificate'
    });
  }
};

// Verify certificate
export const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      certificate: {
        certificateId: certificate.certificateId,
        memberName: certificate.memberName,
        studentId: certificate.studentId,
        clubDepartment: certificate.clubDepartment,
        certificateTitle: certificate.certificateTitle,
        issueDate: certificate.issueDate,
        issuedBy: certificate.issuedBy,
        issueDate: certificate.issueDate
      }
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate'
    });
  }
};

// Generate certificate PDF
export const generateCertificatePDF = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    // For now, just return the certificate data
    // In the future, you could integrate a PDF generation library like PDFKit
    res.status(200).json({
      success: true,
      message: 'PDF generation feature will be implemented in the future',
      certificate
    });
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate certificate PDF'
    });
  }
}; 