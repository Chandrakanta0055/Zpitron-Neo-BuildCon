const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');

// GET /admin/team
router.get('/', isAuthenticated, (req, res) => {
    res.render('admin/team/index', {
        title: 'Manage Team & Leadership | ZIPTRON Admin',
        layout: 'layouts/admin',
        page: 'team',
        admin: req.session.admin
    });
});

module.exports = router;
