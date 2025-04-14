const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || 
                 req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Add userId to request object
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;