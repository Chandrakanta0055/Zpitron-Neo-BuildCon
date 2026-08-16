const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const Store = require('./data/store');

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine & Layouts Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'ziptron_default_secure_secret_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));

// Global View Helpers & App Locals
app.locals.currentYear = new Date().getFullYear();

// Global Template Variables Middleware (Dynamic Data Binding)
app.use((req, res, next) => {
    const settings = Store.getSettings();
    res.locals.currentYear = new Date().getFullYear();
    res.locals.currentPath = req.path;
    res.locals.adminUser = req.session ? req.session.admin : null;
    res.locals.company = {
        name: 'ZIPTRON NEO BUILDCON',
        cin: 'ABA-4283',
        tagline: settings.tagline || 'Build your Thinking',
        estDate: '29 January 2022',
        corporateOffice: settings.corporate_office || 'Ziptron House, Plot No. 952/3735, Stadium Lane, Nayapalli, Bhubaneswar, Odisha – 751012',
        headOffice: settings.head_office || 'Sector 3, H.E.C. Colony, Dhurwa, Ranchi, Jharkhand – 834004',
        phones: [settings.primary_phone || '+91 9337512111', settings.secondary_phone || '+91 7008757918'],
        primaryPhone: settings.primary_phone || '+91 9337512111',
        email: settings.email || 'info@ziptron.co.in',
        whatsapp: (settings.primary_phone || '919337512111').replace(/[^0-9]/g, ''),
        machineryFleet: settings.machinery_fleet || '400+',
        completedProjects: settings.completed_projects || '11+',
        ongoingProjects: settings.ongoing_projects || '6+',
        domain: 'https://ziptron.co.in'
    };
    next();
});

// Public Web Routes
app.use('/', require('./routes/public'));
app.use('/projects', require('./routes/projects'));
app.use('/contact', require('./routes/contact'));

// Admin Management Routes
app.use('/admin', require('./routes/admin/auth'));
app.use('/admin/dashboard', require('./routes/admin/dashboard'));
app.use('/admin/projects', require('./routes/admin/projects'));
app.use('/admin/team', require('./routes/admin/team'));
app.use('/admin/stats', require('./routes/admin/stats'));
app.use('/admin/leads', require('./routes/admin/leads'));

// 404 Handler
app.use((req, res) => {
    res.status(404).render('pages/404', {
        title: '404 - Page Not Found | ZIPTRON NEO BUILDCON',
        page: '404'
    });
});

// 500 Error Handler
app.use((err, req, res, next) => {
    console.error('Server Internal Error:', err);
    res.status(500).render('pages/500', {
        title: '500 - Server Error | ZIPTRON NEO BUILDCON',
        page: '500',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 ZIPTRON NEO BUILDCON Enterprise Server Live`);
    console.log(`🌐 Local URL:   http://localhost:${PORT}`);
    console.log(`🔐 Admin Panel: http://localhost:${PORT}/admin/login`);
    console.log(`🕒 Started at:  ${new Date().toLocaleString()}`);
    console.log(`====================================================`);
});

module.exports = app;
