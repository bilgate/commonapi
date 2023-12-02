
const jwt = require('jsonwebtoken');

const secretKey = '8199f519-bab7-421f-85b2-49e6e0656770';

const generateToken = (userData) => {
  // Payload contains user data
  const payload = {
    userId: userData.id,
    username: userData.username,
    // You can include other relevant data as needed
  };

  // Sign the token with a secret key and set expiration time
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
};


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
  
    try {
      // Verify the token with the secret key
      const decoded = jwt.verify(token, secretKey);
  
      // Attach the decoded user information to the request object
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  
  module.exports={generateToken,verifyToken}