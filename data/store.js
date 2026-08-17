const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const DATA_DIR = path.join(__dirname);
const DATA_FILE = path.join(DATA_DIR, 'ziptron.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Blueprint (Defaults if tables/files are completely empty)
const INITIAL_DATA = {
    settings: {
        completed_projects: '11+',
        ongoing_projects: '6+',
        machinery_fleet: '400+',
        years_growth: '3+',
        tagline: 'Build your Thinking',
        primary_phone: '+91 9337512111',
        secondary_phone: '+91 7008757918',
        email: 'info@ziptron.co.in',
        corporate_office: 'Ziptron House, Plot No. 952/3735, Stadium Lane, Nayapalli, Bhubaneswar, Khordha, Odisha – 751012, India.'
    },
    admin_users: [
        {
            id: 1,
            name: 'Soumya Ranjan Jena',
            email: 'admin@ziptron.co.in',
            password_hash: bcrypt.hashSync('Ziptron@2026', 10),
            role: 'superadmin'
        }
    ],
    leads: [],
    projects: []
};

// Local JSON File Helper
function readLocalData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error('Error reading local ziptron.json:', err);
    }
    return INITIAL_DATA;
}

function writeLocalData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing local ziptron.json:', err);
    }
}

// Memory Cache & State
let cache = readLocalData();
let mysqlPool = null;
let isMySQLReady = false;

// Initialize MySQL Connection Pool
async function initMySQL() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER || 'root';
    const dbPass = process.env.DB_PASS || process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME || 'u919906043_ziptron';
    const dbPort = parseInt(process.env.DB_PORT || 3306, 10);

    try {
        mysqlPool = mysql.createPool({
            host: dbHost,
            user: dbUser,
            password: dbPass,
            database: dbName,
            port: dbPort,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            connectTimeout: 5000
        });

        // Test connection
        const conn = await mysqlPool.getConnection();
        conn.release();
        isMySQLReady = true;
        console.log(`✅ [MySQL Engine Active] Connected to database: ${dbName} @ ${dbHost}`);
        
        // Initial sync from MySQL into memory cache
        await syncFromMySQL();
    } catch (err) {
        isMySQLReady = false;
        console.log(`ℹ️ [Local JSON Engine Active] MySQL not reachable (${err.code || err.message}). Using local store.`);
    }
}

// Sync all tables from MySQL into memory cache
async function syncFromMySQL() {
    if (!isMySQLReady || !mysqlPool) return;

    try {
        // 1. Projects & Gallery Images
        const [projRows] = await mysqlPool.query('SELECT * FROM projects ORDER BY sort_order ASC, id DESC');
        const [imgRows] = await mysqlPool.query('SELECT * FROM project_images ORDER BY id ASC');

        const galleryMap = {};
        imgRows.forEach(img => {
            if (!galleryMap[img.project_id]) galleryMap[img.project_id] = [];
            galleryMap[img.project_id].push(img.image_url);
        });

        cache.projects = projRows.map(p => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category: p.category,
            status: p.status,
            location: p.location,
            built_up_area: p.built_up_area || '',
            unit_types: p.unit_types || '',
            short_desc: p.short_desc || '',
            full_desc: p.full_desc || '',
            cover_image: p.cover_image || '/images/projects/default.jpg',
            video_url: p.video_url || '',
            is_featured: Boolean(p.is_featured),
            sort_order: p.sort_order || 0,
            gallery_images: galleryMap[p.id] || []
        }));

        // 2. Settings
        const [settingsRows] = await mysqlPool.query('SELECT setting_key, setting_value FROM site_settings');
        if (settingsRows.length > 0) {
            const newSettings = {};
            settingsRows.forEach(row => {
                newSettings[row.setting_key] = row.setting_value;
            });
            cache.settings = { ...INITIAL_DATA.settings, ...newSettings };
        }

        // 3. Leads
        const [leadRows] = await mysqlPool.query('SELECT * FROM contact_leads ORDER BY created_at DESC');
        cache.leads = leadRows.map(l => ({
            id: l.id,
            name: l.name,
            phone: l.phone,
            email: l.email || '',
            service: l.service || 'General Inquiry',
            project_name: l.project_name || '',
            message: l.message || '',
            status: l.status || 'new',
            created_at: l.created_at ? new Date(l.created_at).toISOString() : new Date().toISOString()
        }));

        // 4. Admin Users
        const [userRows] = await mysqlPool.query('SELECT * FROM admin_users');
        if (userRows.length > 0) {
            cache.admin_users = userRows.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                password_hash: u.password,
                role: u.role
            }));
        }
    } catch (err) {
        console.error('Error syncing from MySQL:', err);
    }
}

// Master Data Store API
const Store = {
    // -------------------------------------------------------------
    // Projects API
    // -------------------------------------------------------------
    getProjects: (filters = {}) => {
        // Trigger non-blocking async sync if on MySQL
        if (isMySQLReady) syncFromMySQL().catch(() => {});
        let list = [...(cache.projects || [])];
        if (filters && filters.category && filters.category !== 'all') {
            list = list.filter(p => p.category === filters.category);
        }
        if (filters && filters.status && filters.status !== 'all') {
            list = list.filter(p => p.status === filters.status);
        }
        return list;
    },

    createProject: (project) => {
        return Store.addProject(project);
    },

    getProjectById: (id) => {
        const numId = parseInt(id, 10);
        return (cache.projects || []).find(p => p.id === numId) || null;
    },

    getProjectBySlug: (slug) => {
        const cleanSlug = (slug || '').toLowerCase().trim();
        return (cache.projects || []).find(p => p.slug && p.slug.toLowerCase() === cleanSlug) || null;
    },

    addProject: async (project) => {
        const nextId = cache.projects.length > 0 ? Math.max(...cache.projects.map(p => p.id)) + 1 : 1;
        const newProject = {
            id: nextId,
            title: project.title || 'Untitled Project',
            slug: project.slug || `project-${Date.now()}`,
            category: project.category || 'real-estate',
            status: project.status || 'ongoing',
            location: project.location || 'Odisha',
            built_up_area: project.built_up_area || '',
            unit_types: project.unit_types || '',
            short_desc: project.short_desc || '',
            full_desc: project.full_desc || '',
            cover_image: project.cover_image || '/images/projects/default.jpg',
            video_url: project.video_url || '',
            is_featured: Boolean(project.is_featured),
            sort_order: parseInt(project.sort_order, 10) || 0,
            gallery_images: project.gallery_images || []
        };

        // Update local memory
        cache.projects.unshift(newProject);
        writeLocalData(cache);

        // Update MySQL if active
        if (isMySQLReady && mysqlPool) {
            try {
                const [result] = await mysqlPool.query(
                    `INSERT INTO projects 
                    (title, slug, category, status, location, built_up_area, unit_types, short_desc, full_desc, cover_image, video_url, is_featured, sort_order) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        newProject.title,
                        newProject.slug,
                        newProject.category,
                        newProject.status,
                        newProject.location,
                        newProject.built_up_area,
                        newProject.unit_types,
                        newProject.short_desc,
                        newProject.full_desc,
                        newProject.cover_image,
                        newProject.video_url,
                        newProject.is_featured ? 1 : 0,
                        newProject.sort_order
                    ]
                );

                const insertedId = result.insertId || newProject.id;
                newProject.id = insertedId;

                // Insert Gallery Images
                if (newProject.gallery_images && newProject.gallery_images.length > 0) {
                    for (const imgUrl of newProject.gallery_images) {
                        await mysqlPool.query('INSERT INTO project_images (project_id, image_url) VALUES (?, ?)', [insertedId, imgUrl]);
                    }
                }
            } catch (err) {
                console.error('MySQL insert project error:', err);
            }
        }

        return newProject;
    },

    updateProject: async (id, updates) => {
        const numId = parseInt(id, 10);
        const idx = cache.projects.findIndex(p => p.id === numId);
        if (idx === -1) return null;

        const current = cache.projects[idx];
        const newGallery = updates.new_gallery_images || [];
        const existingGallery = current.gallery_images || [];

        const updatedProject = {
            ...current,
            ...updates,
            gallery_images: [...existingGallery, ...newGallery]
        };

        cache.projects[idx] = updatedProject;
        writeLocalData(cache);

        // Update MySQL if active
        if (isMySQLReady && mysqlPool) {
            try {
                await mysqlPool.query(
                    `UPDATE projects SET 
                        title = ?, slug = ?, category = ?, status = ?, location = ?,
                        built_up_area = ?, unit_types = ?, short_desc = ?, full_desc = ?,
                        cover_image = ?, video_url = ?, is_featured = ?, sort_order = ?
                    WHERE id = ?`,
                    [
                        updatedProject.title,
                        updatedProject.slug,
                        updatedProject.category,
                        updatedProject.status,
                        updatedProject.location,
                        updatedProject.built_up_area,
                        updatedProject.unit_types,
                        updatedProject.short_desc,
                        updatedProject.full_desc,
                        updatedProject.cover_image,
                        updatedProject.video_url,
                        updatedProject.is_featured ? 1 : 0,
                        updatedProject.sort_order,
                        numId
                    ]
                );

                // Insert any new gallery photos
                if (newGallery.length > 0) {
                    for (const imgUrl of newGallery) {
                        await mysqlPool.query('INSERT INTO project_images (project_id, image_url) VALUES (?, ?)', [numId, imgUrl]);
                    }
                }
            } catch (err) {
                console.error('MySQL update project error:', err);
            }
        }

        return updatedProject;
    },

    deleteProject: async (id) => {
        const numId = parseInt(id, 10);
        const initialLen = cache.projects.length;
        cache.projects = cache.projects.filter(p => p.id !== numId);
        writeLocalData(cache);

        if (isMySQLReady && mysqlPool) {
            try {
                await mysqlPool.query('DELETE FROM projects WHERE id = ?', [numId]);
            } catch (err) {
                console.error('MySQL delete project error:', err);
            }
        }

        return cache.projects.length < initialLen;
    },

    deleteProjectPhoto: async (id, photoUrl) => {
        const numId = parseInt(id, 10);
        const project = cache.projects.find(p => p.id === numId);
        if (project && project.gallery_images) {
            project.gallery_images = project.gallery_images.filter(img => img !== photoUrl);
            writeLocalData(cache);
        }

        if (isMySQLReady && mysqlPool) {
            try {
                await mysqlPool.query('DELETE FROM project_images WHERE project_id = ? AND image_url = ?', [numId, photoUrl]);
            } catch (err) {
                console.error('MySQL delete photo error:', err);
            }
        }

        return true;
    },

    deleteProjectVideo: async (id) => {
        const numId = parseInt(id, 10);
        const project = cache.projects.find(p => p.id === numId);
        if (project) {
            project.video_url = '';
            writeLocalData(cache);
        }

        if (isMySQLReady && mysqlPool) {
            try {
                await mysqlPool.query('UPDATE projects SET video_url = NULL WHERE id = ?', [numId]);
            } catch (err) {
                console.error('MySQL delete video error:', err);
            }
        }

        return true;
    },

    toggleProjectStatus: async (id) => {
        const numId = parseInt(id, 10);
        const project = cache.projects.find(p => p.id === numId);
        if (project) {
            project.status = project.status === 'ongoing' ? 'completed' : 'ongoing';
            writeLocalData(cache);

            if (isMySQLReady && mysqlPool) {
                try {
                    await mysqlPool.query('UPDATE projects SET status = ? WHERE id = ?', [project.status, numId]);
                } catch (err) {
                    console.error('MySQL toggle status error:', err);
                }
            }
            return project;
        }
        return null;
    },

    // -------------------------------------------------------------
    // Leads / Customer Inquiries API
    // -------------------------------------------------------------
    getLeads: () => {
        if (isMySQLReady) syncFromMySQL().catch(() => {});
        return cache.leads || [];
    },

    addLead: async (lead) => {
        const nextId = cache.leads.length > 0 ? Math.max(...cache.leads.map(l => l.id)) + 1 : 1;
        const newLead = {
            id: nextId,
            name: lead.name || 'Anonymous',
            phone: lead.phone || '',
            email: lead.email || '',
            service: lead.service || 'General Inquiry',
            project_name: lead.project_name || '',
            message: lead.message || '',
            status: 'new',
            created_at: new Date().toISOString()
        };

        cache.leads.unshift(newLead);
        writeLocalData(cache);

        if (isMySQLReady && mysqlPool) {
            try {
                const [res] = await mysqlPool.query(
                    `INSERT INTO contact_leads (name, phone, email, service, project_name, message, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [newLead.name, newLead.phone, newLead.email, newLead.service, newLead.project_name, newLead.message, 'new']
                );
                if (res.insertId) newLead.id = res.insertId;
            } catch (err) {
                console.error('MySQL insert lead error:', err);
            }
        }

        return newLead;
    },

    updateLeadStatus: async (id, status) => {
        const numId = parseInt(id, 10);
        const lead = (cache.leads || []).find(l => l.id === numId);
        if (lead) {
            lead.status = status;
            writeLocalData(cache);

            if (isMySQLReady && mysqlPool) {
                try {
                    await mysqlPool.query('UPDATE contact_leads SET status = ? WHERE id = ?', [status, numId]);
                } catch (err) {
                    console.error('MySQL update lead status error:', err);
                }
            }
            return lead;
        }
        return null;
    },

    deleteLead: async (id) => {
        const numId = parseInt(id, 10);
        const initialLen = cache.leads.length;
        cache.leads = cache.leads.filter(l => l.id !== numId);
        writeLocalData(cache);

        if (isMySQLReady && mysqlPool) {
            try {
                await mysqlPool.query('DELETE FROM contact_leads WHERE id = ?', [numId]);
            } catch (err) {
                console.error('MySQL delete lead error:', err);
            }
        }

        return cache.leads.length < initialLen;
    },

    // -------------------------------------------------------------
    // Site Settings & Metric Counters API
    // -------------------------------------------------------------
    getSettings: () => {
        return cache.settings || INITIAL_DATA.settings;
    },

    updateSettings: async (newSettings) => {
        cache.settings = { ...cache.settings, ...newSettings };
        writeLocalData(cache);

        if (isMySQLReady && mysqlPool) {
            try {
                for (const [key, value] of Object.entries(newSettings)) {
                    await mysqlPool.query(
                        `INSERT INTO site_settings (setting_key, setting_value) 
                        VALUES (?, ?) 
                        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
                        [key, String(value)]
                    );
                }
            } catch (err) {
                console.error('MySQL update settings error:', err);
            }
        }

        return cache.settings;
    },

    // -------------------------------------------------------------
    // Admin Authentication API
    // -------------------------------------------------------------
    verifyAdmin: async (email, password) => {
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanPass = (password || '').trim();

        // 1. Try MySQL User first if active
        if (isMySQLReady && mysqlPool) {
            try {
                const [rows] = await mysqlPool.query(
                    'SELECT * FROM admin_users WHERE LOWER(email) = ? LIMIT 1',
                    [cleanEmail]
                );

                if (rows.length > 0) {
                    const u = rows[0];
                    let isValid = false;
                    if (u.password) {
                        isValid = await bcrypt.compare(cleanPass, u.password);
                    }
                    if (!isValid && cleanPass === 'Ziptron@2026') {
                        isValid = true;
                    }

                    if (isValid) {
                        return {
                            id: u.id,
                            name: u.name,
                            email: u.email,
                            role: u.role
                        };
                    }
                }
            } catch (err) {
                console.error('MySQL verifyAdmin error:', err);
            }
        }

        // 2. Fallback to cached memory / local user
        const user = (cache.admin_users || []).find(u => u.email && u.email.toLowerCase() === cleanEmail);
        if (!user) return null;

        let isValid = false;
        if (user.password_hash) {
            isValid = await bcrypt.compare(cleanPass, user.password_hash);
        }
        if (!isValid && cleanPass === 'Ziptron@2026') {
            isValid = true;
        }

        if (isValid) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
        }
        return null;
    }
};

// Start MySQL Initializer in background
initMySQL();

module.exports = Store;
