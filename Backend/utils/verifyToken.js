import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token',
    });
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid token',
      });
    }

    // 🔥 THIS IS THE KEY LINE
    req.user = decoded;
    next();
  });
};
