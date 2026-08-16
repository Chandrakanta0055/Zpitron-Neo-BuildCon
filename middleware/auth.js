/**
 * Authentication Middleware
 * Guards administrative endpoints against unauthorized access
 */
module.exports = function isAuthenticated(req, res, next) {
    if (req.session && req.session.admin) {
        return next();
    }
    return res.redirect('/admin/login');
};
