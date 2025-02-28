export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'staff') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin/Staff role required."
    });
  }
  next();
}; 