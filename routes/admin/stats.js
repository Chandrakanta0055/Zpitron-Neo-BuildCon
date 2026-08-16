const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const Store = require('../../data/store');

// GET /admin/stats -> Live Stats & Corporate Settings Page
router.get('/', isAuthenticated, (req, res) => {
    const settings = Store.getSettings();
    res.render('admin/stats', {
        title: 'Live Stats & Settings | ZIPTRON Admin',
        page: 'stats',
        layout: 'layouts/admin',
        admin: req.session.admin,
        settings,
        success: req.query.success === '1'
    });
});

// POST /admin/stats -> Update Stats & Corporate Settings
router.post('/', isAuthenticated, (req, res) => {
    const {
        completed_projects,
        ongoing_projects,
        machinery_fleet,
        years_growth,
        tagline,
        primary_phone,
        secondary_phone,
        email,
        corporate_office,
        head_office
    } = req.body;

    Store.updateSettings({
        completed_projects,
        ongoing_projects,
        machinery_fleet,
        years_growth,
        tagline,
        primary_phone,
        secondary_phone,
        email,
        corporate_office,
        head_office
    });

    res.redirect('/admin/stats?success=1');
});

module.exports = router;
