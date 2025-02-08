const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user info to request object
        next();  // Allow access to the next middleware or route
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
