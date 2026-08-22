const express = require('express');
const router = express.Router();
const Store = require('../data/store');

// GET / -> Home Page
router.get('/', (req, res) => {
    const allProjects = Store.getProjects();
    const settings = Store.getSettings();
    const testimonials = Store.getTestimonials({ approvedOnly: true });
    
    const featuredProjects = allProjects.filter(p => p.is_featured);
    const ongoingCount = allProjects.filter(p => p.status === 'ongoing').length;
    const completedCount = allProjects.filter(p => p.status === 'completed').length;

    res.render('pages/home', {
        title: `ZIPTRON NEO BUILDCON — ${settings.tagline || 'Build your Thinking'} | Real Estate, Construction, Mining & Solar`,
        page: 'home',
        settings,
        featuredProjects: featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3),
        testimonials,
        ongoingCount,
        completedCount
    });
});

// POST /feedback -> Customer Feedback & Wishes Submission
router.post('/feedback', async (req, res) => {
    try {
        const { name, role_or_city, project_name, rating, message, honeypot } = req.body;
        
        // Anti-bot honeypot trap
        if (honeypot) {
            return res.json({ success: true });
        }

        if (!name || !name.trim() || !message || !message.trim()) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please provide both your name and feedback message.' 
            });
        }

        const numRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

        const review = await Store.addTestimonial({
            name: name.trim(),
            role_or_city: (role_or_city || '').trim() || 'Valued Client',
            project_name: (project_name || '').trim() || 'General Feedback',
            rating: numRating,
            message: message.trim(),
            is_approved: false // Stored as pending for Admin verification
        });

        res.json({
            success: true,
            message: 'Thank you for your valuable feedback and best wishes! Your review has been submitted successfully for verification.'
        });
    } catch (err) {
        console.error('Feedback submit error:', err);
        res.status(500).json({ 
            success: false, 
            error: 'Unable to submit feedback at this moment. Please try again.' 
        });
    }
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
