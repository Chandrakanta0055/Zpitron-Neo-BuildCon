const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/auth');
const Store = require('../../data/store');

// GET /admin/leads -> Inquiry Inbox
router.get('/', isAuthenticated, (req, res) => {
    const leads = Store.getLeads();
    const filterStatus = req.query.status || 'all';
    
    let filtered = [...leads];
    if (filterStatus !== 'all') {
        filtered = filtered.filter(l => l.status === filterStatus);
    }

    res.render('admin/leads', {
        title: 'Client Inquiry Inbox | ZIPTRON Admin',
        page: 'leads',
        layout: 'layouts/admin',
        admin: req.session.admin,
        leads: filtered,
        filterStatus,
        totalCount: leads.length,
        newCount: leads.filter(l => l.status === 'new').length,
        contactedCount: leads.filter(l => l.status === 'contacted').length,
        closedCount: leads.filter(l => l.status === 'closed').length
    });
});

// POST /admin/leads/:id/status -> Update Inquiry Status
router.post('/:id/status', isAuthenticated, async (req, res) => {
    const { status } = req.body;
    const leadId = req.params.id;
    await Store.updateLeadStatus(leadId, status);
    res.redirect('/admin/leads');
});

// POST /admin/leads/:id/delete -> Delete Inquiry
router.post('/:id/delete', isAuthenticated, async (req, res) => {
    const leadId = req.params.id;
    await Store.deleteLead(leadId);
    res.redirect('/admin/leads');
});

module.exports = router;
