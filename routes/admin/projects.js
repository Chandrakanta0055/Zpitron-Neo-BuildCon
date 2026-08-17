const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const isAuthenticated = require('../../middleware/auth');
const Store = require('../../data/store');

// Ensure upload directory exists
const UPLOAD_DIR = path.join(__dirname, '../../public/uploads/projects');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        let prefix = 'gallery_';
        if (file.fieldname === 'cover_image') prefix = 'cover_';
        if (file.fieldname === 'video_file') prefix = 'video_';
        const name = prefix + Date.now() + '_' + Math.round(Math.random() * 1E6) + ext;
        cb(null, name);
    }
});
const upload = multer({ 
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB max (supports video clips)
});

// Configure multi-field upload for cover photo + gallery photos + video file
const projectUploadFields = upload.fields([
    { name: 'cover_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 30 },
    { name: 'video_file', maxCount: 1 }
]);

// GET /admin/projects -> List All Projects
router.get('/', isAuthenticated, (req, res) => {
    const filterCategory = req.query.category || 'all';
    const filterStatus = req.query.status || 'all';
    
    let projects = Store.getProjects({ category: filterCategory, status: filterStatus });

    res.render('admin/projects', {
        title: 'Manage Projects & Portfolio | ZIPTRON Admin',
        page: 'projects',
        layout: 'layouts/admin',
        admin: req.session.admin,
        projects,
        filterCategory,
        filterStatus,
        totalCount: projects.length
    });
});

// GET /admin/projects/new -> Add New Project Form
router.get('/new', isAuthenticated, (req, res) => {
    res.render('admin/project-form', {
        title: 'Add New Project | ZIPTRON Admin',
        page: 'projects',
        layout: 'layouts/admin',
        admin: req.session.admin,
        project: null,
        isEdit: false
    });
});

// POST /admin/projects/new -> Save New Project
router.post('/new', isAuthenticated, projectUploadFields, async (req, res) => {
    const { title, category, status, location, built_up_area, unit_types, short_desc, video_url, is_featured } = req.body;

    let cover_image = '/images/projects/default.jpg';
    if (req.files && req.files.cover_image && req.files.cover_image.length > 0) {
        cover_image = '/uploads/projects/' + req.files.cover_image[0].filename;
    }

    let gallery_images = [];
    if (req.files && req.files.gallery_images && req.files.gallery_images.length > 0) {
        gallery_images = req.files.gallery_images.map(f => '/uploads/projects/' + f.filename);
    }

    let finalVideoUrl = (video_url || '').trim();
    if (req.files && req.files.video_file && req.files.video_file.length > 0) {
        finalVideoUrl = '/uploads/projects/' + req.files.video_file[0].filename;
    }

    await Store.createProject({
        title,
        category,
        status,
        location,
        built_up_area,
        unit_types,
        short_desc: short_desc || '',
        cover_image,
        gallery_images,
        video_url: finalVideoUrl,
        is_featured: is_featured === '1' || is_featured === 'true'
    });

    res.redirect('/admin/projects');
});

// GET /admin/projects/:id/edit -> Edit Project Form
router.get('/:id/edit', isAuthenticated, (req, res) => {
    const project = Store.getProjectById(req.params.id);
    if (!project) {
        return res.redirect('/admin/projects');
    }

    res.render('admin/project-form', {
        title: `Edit ${project.title} | ZIPTRON Admin`,
        page: 'projects',
        layout: 'layouts/admin',
        admin: req.session.admin,
        project,
        isEdit: true
    });
});

// POST /admin/projects/:id/edit -> Update Project
router.post('/:id/edit', isAuthenticated, projectUploadFields, async (req, res) => {
    const { title, category, status, location, built_up_area, unit_types, short_desc, video_url, is_featured } = req.body;
    const projectId = req.params.id;

    const updates = {
        title,
        category,
        status,
        location,
        built_up_area,
        unit_types,
        short_desc: short_desc || '',
        is_featured: is_featured === '1' || is_featured === 'true'
    };

    if (video_url !== undefined) {
        updates.video_url = video_url.trim();
    }

    if (req.files && req.files.cover_image && req.files.cover_image.length > 0) {
        updates.cover_image = '/uploads/projects/' + req.files.cover_image[0].filename;
    }

    if (req.files && req.files.gallery_images && req.files.gallery_images.length > 0) {
        updates.new_gallery_images = req.files.gallery_images.map(f => '/uploads/projects/' + f.filename);
    }

    if (req.files && req.files.video_file && req.files.video_file.length > 0) {
        updates.video_url = '/uploads/projects/' + req.files.video_file[0].filename;
    }

    await Store.updateProject(projectId, updates);
    res.redirect('/admin/projects/' + projectId + '/edit');
});

// POST /admin/projects/:id/delete-video -> Remove Project Video
router.post('/:id/delete-video', isAuthenticated, upload.none(), async (req, res) => {
    const projectId = req.params.id;
    await Store.deleteProjectVideo(projectId);
    if (req.xhr || req.headers.accept?.includes('json')) {
        return res.json({ success: true });
    }
    res.redirect('/admin/projects/' + projectId + '/edit');
});

// POST /admin/projects/:id/delete-photo -> Delete Single Gallery Photo
router.post('/:id/delete-photo', isAuthenticated, upload.none(), async (req, res) => {
    const projectId = req.params.id;
    const photoUrl = req.body.photoUrl || req.query.photoUrl;
    if (photoUrl) {
        await Store.deleteProjectPhoto(projectId, photoUrl);
    }
    if (req.xhr || req.headers.accept?.includes('json')) {
        return res.json({ success: true, photoUrl });
    }
    res.redirect('/admin/projects/' + projectId + '/edit');
});

// POST /admin/projects/:id/toggle -> Quick Toggle Status (Ongoing <-> Completed)
router.post('/:id/toggle', isAuthenticated, async (req, res) => {
    await Store.toggleProjectStatus(req.params.id);
    res.redirect('/admin/projects');
});

// POST /admin/projects/:id/delete -> Delete Project
router.post('/:id/delete', isAuthenticated, async (req, res) => {
    await Store.deleteProject(req.params.id);
    res.redirect('/admin/projects');
});

module.exports = router;
