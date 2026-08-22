const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const isAuthenticated = require('../../middleware/auth');
const Store = require('../../data/store');

// Ensure hero uploads directory exists
const HERO_UPLOAD_DIR = path.join(__dirname, '../../public/uploads/hero');
if (!fs.existsSync(HERO_UPLOAD_DIR)) {
    fs.mkdirSync(HERO_UPLOAD_DIR, { recursive: true });
}

// Multer storage for Hero background image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, HERO_UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = 'hero_bg_' + Date.now() + '_' + Math.round(Math.random() * 1E6) + ext;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB max
});

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

// POST /admin/stats -> Update Stats & Corporate Settings (including Hero Background)
router.post('/', isAuthenticated, upload.single('hero_background_image'), async (req, res) => {
    try {
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
            head_office,
            reset_hero_bg
        } = req.body;

        const updatedData = {
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
        };

        // If a new hero background was uploaded
        if (req.file) {
            updatedData.hero_background_image = '/uploads/hero/' + req.file.filename;
        } else if (reset_hero_bg === '1') {
            updatedData.hero_background_image = '/images/hero/hero_bg.jpg';
        }

        await Store.updateSettings(updatedData);

        res.redirect('/admin/stats?success=1');
    } catch (err) {
        console.error('Update stats error:', err);
        res.redirect('/admin/stats?error=1');
    }
});

module.exports = router;

