const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const Store = require('../../data/store');

// GET /admin/dashboard -> Executive Admin Overview
router.get('/', isAuthenticated, (req, res) => {
    const projects = Store.getProjects();
    const leads = Store.getLeads();
    const settings = Store.getSettings();

    const ongoingCount = projects.filter(p => p.status === 'ongoing').length;
    const completedCount = projects.filter(p => p.status === 'completed').length;
    const newLeadsCount = leads.filter(l => l.status === 'new').length;

    res.render('admin/dashboard', {
        title: 'Executive Admin Dashboard | ZIPTRON NEO BUILDCON',
        page: 'dashboard',
        layout: 'layouts/admin',
        admin: req.session.admin,
        stats: {
            totalProjects: projects.length,
            ongoingProjects: ongoingCount,
            completedProjects: completedCount,
            totalLeads: leads.length,
            newLeads: newLeadsCount,
            machineryFleet: settings.machinery_fleet || '400+'
        },
        recentLeads: leads.slice(0, 5),
        recentProjects: projects.slice(0, 5)
    });
});

module.exports = router;
