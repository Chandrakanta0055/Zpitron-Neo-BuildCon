const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const Store = require('../../data/store');

// GET /admin/reviews -> List all reviews & feedback
router.get('/', isAuthenticated, (req, res) => {
    const filter = req.query.filter || 'all';
    let testimonials = Store.getTestimonials({ approvedOnly: false });

    if (filter === 'approved') {
        testimonials = testimonials.filter(t => t.is_approved);
    } else if (filter === 'pending') {
        testimonials = testimonials.filter(t => !t.is_approved);
    }

    const allList = Store.getTestimonials({ approvedOnly: false });
    const approvedCount = allList.filter(t => t.is_approved).length;
    const pendingCount = allList.filter(t => !t.is_approved).length;

    res.render('admin/reviews', {
        title: 'Customer Feedback & Wishes | ZIPTRON Admin',
        page: 'reviews',
        layout: 'layouts/admin',
        admin: req.session.admin,
        testimonials,
        filter,
        approvedCount,
        pendingCount,
        totalCount: allList.length
    });
});

// POST /admin/reviews/new -> Admin adds verified testimonial manually
router.post('/new', isAuthenticated, async (req, res) => {
    try {
        const { name, role_or_city, project_name, rating, message, is_approved } = req.body;
        if (!name || !message) {
            return res.redirect('/admin/reviews?error=missing_fields');
        }

        await Store.addTestimonial({
            name: name.trim(),
            role_or_city: (role_or_city || '').trim() || 'Valued Client',
            project_name: (project_name || '').trim() || 'General Feedback',
            rating: Math.min(5, Math.max(1, parseInt(rating, 10) || 5)),
            message: message.trim(),
            is_approved: is_approved === 'on' || is_approved === true || is_approved === 'true'
        });

        res.redirect('/admin/reviews?success=created');
    } catch (err) {
        console.error('Admin create review error:', err);
        res.redirect('/admin/reviews?error=failed');
    }
});

// POST /admin/reviews/:id/toggle -> 1-click toggle approve/hide status
router.post('/:id/toggle', isAuthenticated, async (req, res) => {
    try {
        const review = await Store.toggleTestimonialApproval(req.params.id);
        if (req.xhr || req.headers.accept?.includes('json')) {
            return res.json({ success: true, is_approved: review ? review.is_approved : false });
        }
        res.redirect('/admin/reviews?success=updated');
    } catch (err) {
        console.error('Admin toggle review error:', err);
        res.redirect('/admin/reviews?error=failed');
    }
});

// POST /admin/reviews/:id/delete -> Delete feedback
router.post('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        await Store.deleteTestimonial(req.params.id);
        res.redirect('/admin/reviews?success=deleted');
    } catch (err) {
        console.error('Admin delete review error:', err);
        res.redirect('/admin/reviews?error=failed');
    }
});

module.exports = router;
