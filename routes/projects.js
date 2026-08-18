const express = require('express');
const router = express.Router();
const Store = require('../data/store');

// GET /projects -> Projects Portfolio Page
router.get('/', (req, res) => {
    const allProjects = Store.getProjects();

    const sectors = [
        {
            key: 'real-estate',
            title: 'Real Estate Developments',
            icon: 'fa-building',
            emoji: '🏠',
            description: 'Luxury residences, premium duplex villas, gated communities, and commercial plazas across Odisha.',
            accentColor: 'amber'
        },
        {
            key: 'construction',
            title: 'Civil Construction & RCC Works',
            icon: 'fa-trowel-bricks',
            emoji: '🏗️',
            description: 'Industrial civil earthworks, concrete haul roads, crushing plants, and heavy engineering.',
            accentColor: 'emerald'
        },
        {
            key: 'mining',
            title: 'Mining & Transporting Logistics',
            icon: 'fa-truck-monster',
            emoji: '🪏🚚',
            description: 'Opencast overburden excavation, mineral transport, and 213+ heavy tipper fleet dispatch.',
            accentColor: 'amber'
        },
        {
            key: 'solar',
            title: 'Solar Energy EPC Solutions',
            icon: 'fa-solar-panel',
            emoji: '☀️',
            description: 'Turnkey utility solar plants, industrial rooftop PV arrays, and grid-connected infrastructure.',
            accentColor: 'sky'
        }
    ];

    const totalOngoing = allProjects.filter(p => p.status === 'ongoing').length;
    const totalCompleted = allProjects.filter(p => p.status === 'completed').length;
    const totalUpcoming = allProjects.filter(p => p.status === 'upcoming').length;

    res.render('pages/projects', {
        title: 'Projects Portfolio | ZIPTRON NEO BUILDCON — Real Estate, Construction, Mining & Solar',
        page: 'projects',
        allProjects,
        sectors,
        totalOngoing,
        totalCompleted,
        totalUpcoming,
        totalProjects: allProjects.length
    });
});

// GET /projects/:slug -> Dynamic Project Detail Page
router.get('/:slug', (req, res) => {
    const slug = req.params.slug;
    const project = Store.getProjectBySlug(slug);

    if (!project) {
        // Fallback for Bramhanjharilo or legacy slugs if not exact match
        const all = Store.getProjects();
        const found = all.find(p => p.slug.includes(slug) || slug.includes(p.slug));
        if (found) {
            return res.render('pages/project-detail', {
                title: `${found.title} | ZIPTRON NEO BUILDCON`,
                page: 'projects',
                project: found
            });
        }
        return res.redirect('/projects');
    }

    res.render('pages/project-detail', {
        title: `${project.title} | ZIPTRON NEO BUILDCON`,
        page: 'projects',
        project
    });
});

module.exports = router;
