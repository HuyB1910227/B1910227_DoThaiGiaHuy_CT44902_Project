const checkAdminRole = (req, res, next) => {
    console.log("ckeck admin role work");
    if (req.user.isAdmin != 1) {
        return res.status(403).json({ message: 'Unauthorized access.' });
    }
    next();
}

module.exports = checkAdminRole;