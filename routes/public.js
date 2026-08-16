const express = require('express');
const router = express.Router();
const Store = require('../data/store');

// GET / -> Home Page
router.get('/', (req, res) => {
    const allProjects = Store.getProjects();
    const settings = Store.getSettings();
    
    const featuredProjects = allProjects.filter(p => p.is_featured);
    const ongoingCount = allProjects.filter(p => p.status === 'ongoing').length;
    const completedCount = allProjects.filter(p => p.status === 'completed').length;

    res.render('pages/home', {
        title: `ZIPTRON NEO BUILDCON — ${settings.tagline || 'Build your Thinking'} | Real Estate, Construction, Mining & Solar`,
        page: 'home',
        settings,
        featuredProjects: featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3),
        ongoingCount,
        completedCount
    });
});

// GET /about -> About Us Page
router.get('/about', (req, res) => {
    const settings = Store.getSettings();
    res.render('pages/about', {
        title: 'About Us | ZIPTRON NEO BUILDCON — Company Profile, Heritage & Leadership',
        page: 'about',
        settings
    });
});

// GET /team -> Team & Leadership Page
router.get('/team', (req, res) => {
    res.render('pages/team', {
        title: 'Leadership & Technical Team | ZIPTRON NEO BUILDCON',
        page: 'team'
    });
});

module.exports = router;
