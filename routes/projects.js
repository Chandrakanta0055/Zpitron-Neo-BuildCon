const express = require('express');
const router = express.Router();
const Store = require('../data/store');

// GET /projects -> Projects Portfolio Page
router.get('/', (req, res) => {
    const allProjects = Store.getProjects();
    const ongoingProjects = allProjects.filter(p => p.status === 'ongoing');
    const completedProjects = allProjects.filter(p => p.status === 'completed');

    res.render('pages/projects', {
        title: 'Projects Portfolio | ZIPTRON NEO BUILDCON — Real Estate, Mining & Infrastructure',
        page: 'projects',
        ongoingProjects,
        completedProjects,
        totalOngoing: ongoingProjects.length,
        totalCompleted: completedProjects.length
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
