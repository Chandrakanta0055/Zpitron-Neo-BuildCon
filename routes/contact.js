const express = require('express');
const router = express.Router();
const Store = require('../data/store');

// GET /contact -> Contact Us Page
router.get('/', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us | ZIPTRON NEO BUILDCON — Bhubaneswar & Ranchi Offices',
        page: 'contact',
        success: req.query.success === '1'
    });
});

// POST /contact/submit -> Contact Form Submission & Lead Persistence
router.post('/submit', (req, res) => {
    const { name, email, phone, service, message, project_name } = req.body;
    
    // Persist Lead in Database / Store
    const newLead = Store.addLead({
        name: name || 'Valued Client',
        phone: phone || '',
        email: email || '',
        service: service || 'General Inquiry',
        project_name: project_name || '',
        message: message || ''
    });

    console.log(`📥 New Lead Received: ${newLead.name} (${newLead.phone}) - [${newLead.service}]`);

    // Check if AJAX / JSON request
    const isJson = req.xhr || 
                   (req.headers.accept && req.headers.accept.includes('application/json')) || 
                   (req.headers['content-type'] && req.headers['content-type'].includes('application/json'));

    if (isJson) {
        return res.json({
            success: true,
            message: `Thank you, ${name || 'valued client'}! Your inquiry has been registered in our system. Our corporate desk will contact you shortly.`
        });
    }

    res.redirect('/contact?success=1');
});

module.exports = router;
