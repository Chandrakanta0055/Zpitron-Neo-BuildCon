const express = require('express');
const router = express.Router();
const Store = require('../../data/store');

// GET /admin/login -> Admin Login Page
router.get('/login', (req, res) => {
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', {
        title: 'Admin Portal Login | ZIPTRON NEO BUILDCON',
        error: req.query.error === '1',
        layout: false
    });
});

// POST /admin/login -> Process Login Submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminUser = await Store.verifyAdmin(email, password);

        if (adminUser) {
            req.session.admin = {
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                role: adminUser.role
            };
            return res.redirect('/admin/dashboard');
        }

        return res.redirect('/admin/login?error=1');
    } catch (err) {
        console.error('Admin login error:', err);
        return res.redirect('/admin/login?error=1');
    }
});

// GET /admin/logout -> Destroy Session & Logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.redirect('/admin/login');
        });
    } else {
        res.redirect('/admin/login');
    }
});

module.exports = router;
