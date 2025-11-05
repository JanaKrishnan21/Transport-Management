export const permit = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      // if no token and roles include student/driver, allow access
      if (roles.includes('student') || roles.includes('driver')) {
        return next();
      }
      return res.status(401).json({ error: 'No token provided' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
