export const authMiddleware = (req, res, next) => {
    // Example logic for authentication
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Here you would typically verify the token
    next();
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Example logic for role authorization
        const userRole = req.user.role; // Assuming req.user is set after authentication
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}; 