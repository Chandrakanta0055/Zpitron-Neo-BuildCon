const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname);
const DATA_FILE = path.join(DATA_DIR, 'ziptron.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Data Blueprint
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
        corporate_office: 'Ziptron House, Plot No. 952/3735, Stadium Lane, Nayapalli, Bhubaneswar, Odisha – 751012',
        head_office: 'Sector 3, H.E.C. Colony, Dhurwa, Ranchi, Jharkhand – 834004'
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
    leads: [
        {
            id: 1,
            name: 'Priyabrata Mohanty',
            phone: '+91 9861000000',
            email: 'priyabrata@example.com',
            service: 'Real Estate (3BHK Flat)',
            project_name: 'BRAMHANJHARILO APARTMENTS',
            message: 'Inquiring about 3BHK pricing and possession schedule for Bramhanjharilo complex.',
            status: 'new',
            created_at: new Date(Date.now() - 3600000 * 3).toISOString()
        }
    ],
    projects: [
        {
            id: 1,
            title: 'ZIPTRON PRARAMVYA',
            slug: 'ziptron-praramvya',
            category: 'real-estate',
            status: 'ongoing',
            location: 'Kalinga Nagar, Odisha',
            built_up_area: 'Commercial & Residential Mixed',
            unit_types: 'Retail Suites & Luxury Flats',
            short_desc: 'Flagship mixed-use development integrating corporate suites, commercial retail plazas, and luxury residences.',
            cover_image: '/images/projects/default.jpg',
            is_featured: true,
            sort_order: 1
        },
        {
            id: 2,
            title: 'BRAMHANJHARILO APARTMENTS',
            slug: 'bramhanjharilo',
            category: 'real-estate',
            status: 'ongoing',
            location: 'Bramhanjharilo, Odisha',
            built_up_area: '2595.97 SQFT',
            unit_types: 'S+3 3BHK Luxury Flats (1140 & 1240 SQFT)',
            short_desc: 'S+3 Luxury Residential complex with Jaquar fittings, Stilt parking, 24x7 security, and Terrace jogging track.',
            cover_image: '/images/projects/default.jpg',
            is_featured: true,
            sort_order: 2
        },
        {
            id: 3,
            title: 'PREMIUM DUPLEX VILLAS',
            slug: 'duplex-project',
            category: 'real-estate',
            status: 'ongoing',
            location: 'Odisha / Jharkhand',
            built_up_area: 'Independent Luxury Duplex',
            unit_types: 'Exclusive Residential Units',
            short_desc: 'Independent luxury duplex residences with private parking, modular kitchens, and private landscaped terraces.',
            cover_image: '/images/projects/default.jpg',
            is_featured: true,
            sort_order: 3
        },
        {
            id: 4,
            title: 'RESIDENTIAL TOWER (PHASE 2)',
            slug: 'residential-tower-phase-2',
            category: 'real-estate',
            status: 'ongoing',
            location: 'Bhubaneswar, Odisha',
            built_up_area: 'Gated Community High-Rise',
            unit_types: '2BHK & 3BHK Configurations',
            short_desc: 'Gated community development featuring modern clubhouse, landscaped green zones, and recreational facilities.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 4
        },
        {
            id: 5,
            title: 'COMMERCIAL CORPORATE PLAZA',
            slug: 'commercial-corporate-plaza',
            category: 'real-estate',
            status: 'ongoing',
            location: 'Nayapalli, Bhubaneswar',
            built_up_area: 'Multi-Level Corporate Center',
            unit_types: 'Retail & Business Suites',
            short_desc: 'Multi-level commercial complex with modern glass facade, central HVAC infrastructure, and underground parking.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 5
        },
        {
            id: 6,
            title: 'MINING EXTRACTION & TRANSPORT',
            slug: 'mining-extraction-transport',
            category: 'mining',
            status: 'ongoing',
            location: 'Jharkhand Mining Belt',
            built_up_area: '200+ Fleet Deployed',
            unit_types: 'Opencast Excavation & Haulage',
            short_desc: 'Active opencast mining overburden removal, controlled drilling & blasting, and heavy tipper fleet dispatch.',
            cover_image: '/images/projects/default.jpg',
            is_featured: true,
            sort_order: 6
        },
        {
            id: 7,
            title: 'Commercial Solar Power Plant EPC',
            slug: 'commercial-solar-epc',
            category: 'solar',
            status: 'completed',
            location: 'Eastern India',
            built_up_area: 'Turnkey Solar Array',
            unit_types: 'Multi-Megawatt Industrial EPC',
            short_desc: 'Turnkey engineering, procurement, and grid-connected execution of multi-megawatt industrial solar power plant.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 7
        },
        {
            id: 8,
            title: 'Industrial Rooftop Solar Array',
            slug: 'industrial-rooftop-solar',
            category: 'solar',
            status: 'completed',
            location: 'Odisha Industrial Area',
            built_up_area: 'High-Efficiency PV Setup',
            unit_types: 'Rooftop Solar Integration',
            short_desc: 'Complete rooftop PV installation with high-efficiency inverters, net-metering integration, and zero emissions.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 8
        },
        {
            id: 9,
            title: 'Mineral Logistics Corridor Dispatch',
            slug: 'mineral-logistics-corridor',
            category: 'mining',
            status: 'completed',
            location: 'Odisha-JH Corridors',
            built_up_area: '213+ Heavy Tippers',
            unit_types: 'Bulk Mineral Transport',
            short_desc: 'Continuous multi-million ton mineral haulage managed with our proprietary 213+ heavy tipper fleet.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 9
        },
        {
            id: 10,
            title: 'Opencast Overburden Removal (Phase-1)',
            slug: 'opencast-overburden-phase-1',
            category: 'mining',
            status: 'completed',
            location: 'Keonjhar Sector',
            built_up_area: 'Deep Excavation Site',
            unit_types: 'Bench Formation & Earthworks',
            short_desc: 'Complete deep excavation, bench formation, and haulage safely executed within statutory timeframes.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 10
        },
        {
            id: 11,
            title: 'Heavy Haul Road & Drainage',
            slug: 'heavy-haul-road-drainage',
            category: 'construction',
            status: 'completed',
            location: 'Industrial Corridor',
            built_up_area: 'Civil Earthworks & Culverts',
            unit_types: 'Heavy-Duty Industrial Road',
            short_desc: 'Heavy-duty road construction with concrete stormwater drainage channels and dust suppression.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 11
        },
        {
            id: 12,
            title: '250 TPH Stone Crushing Setup',
            slug: 'stone-crushing-screening-plant',
            category: 'construction',
            status: 'completed',
            location: 'Odisha Plant Site',
            built_up_area: '250 TPH Capacity',
            unit_types: 'Industrial Crushing Plant',
            short_desc: 'Installation and commissioning of Terex & Puzzolana 3-stage crushing and screening plant.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 12
        },
        {
            id: 13,
            title: 'Gated Residential Society (Phase 1)',
            slug: 'residential-society-phase-1',
            category: 'real-estate',
            status: 'completed',
            location: 'Bhubaneswar',
            built_up_area: 'Gated Apartments',
            unit_types: 'Residential Handover Complete',
            short_desc: 'Completed gated community apartments handed over with full amenities and 100% occupancy.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 13
        },
        {
            id: 14,
            title: 'Retail Plaza & Commercial Units',
            slug: 'retail-plaza-commercial-units',
            category: 'real-estate',
            status: 'completed',
            location: 'Nayapalli, Bhubaneswar',
            built_up_area: 'Commercial Storefronts',
            unit_types: 'Fully Operational Retail Hub',
            short_desc: 'Premium commercial retail development with modern storefronts and customer parking.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 14
        },
        {
            id: 15,
            title: 'Luxury Villa Enclave',
            slug: 'luxury-villa-enclave',
            category: 'real-estate',
            status: 'completed',
            location: 'Odisha',
            built_up_area: 'Private Villa Enclave',
            unit_types: 'Premium Villa Handover',
            short_desc: 'Independent gated villas with private landscaping, secure boundary walls, and dedicated security.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 15
        },
        {
            id: 16,
            title: 'Bramhanjharilo Civil Foundation',
            slug: 'bramhanjharilo-foundation',
            category: 'real-estate',
            status: 'completed',
            location: 'Bramhanjharilo',
            built_up_area: 'Site Infrastructure',
            unit_types: 'Stilt Foundation & Borewell',
            short_desc: 'Complete site development, boundary wall perimeter, stilt foundation, and deep borewell water setup.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 16
        },
        {
            id: 17,
            title: 'Controlled Drilling & Blasting Operations',
            slug: 'controlled-drilling-blasting',
            category: 'mining',
            status: 'completed',
            location: 'Mining Sector',
            built_up_area: 'DGMS Compliant',
            unit_types: 'Precision Blast Engineering',
            short_desc: 'Statutory-compliant precision drilling and blast design minimizing ground vibration and maximizing ore yield.',
            cover_image: '/images/projects/default.jpg',
            is_featured: false,
            sort_order: 17
        }
    ]
};

// Load data or initialize
function readData() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            writeData(INITIAL_DATA);
            return INITIAL_DATA;
        }
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(content);
    } catch (err) {
        console.error('Error reading JSON store:', err.message);
        return INITIAL_DATA;
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing JSON store:', err.message);
        return false;
    }
}

// Data Store API
const Store = {
    // Projects
    getProjects: (filter = {}) => {
        const data = readData();
        let list = [...data.projects];
        if (filter.category && filter.category !== 'all') {
            list = list.filter(p => p.category === filter.category);
        }
        if (filter.status && filter.status !== 'all') {
            list = list.filter(p => p.status === filter.status);
        }
        return list;
    },

    getProjectById: (id) => {
        const data = readData();
        return data.projects.find(p => p.id === parseInt(id, 10));
    },

    getProjectBySlug: (slug) => {
        const data = readData();
        return data.projects.find(p => p.slug === slug);
    },

    createProject: (project) => {
        const data = readData();
        const nextId = data.projects.length > 0 ? Math.max(...data.projects.map(p => p.id)) + 1 : 1;
        const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        const newProj = {
            id: nextId,
            title: project.title,
            slug: slug,
            category: project.category || 'real-estate',
            status: project.status || 'ongoing',
            location: project.location || 'Odisha',
            built_up_area: project.built_up_area || '',
            unit_types: project.unit_types || '',
            short_desc: project.short_desc || '',
            cover_image: project.cover_image || '/images/projects/default.jpg',
            gallery_images: Array.isArray(project.gallery_images) ? project.gallery_images : [],
            video_url: project.video_url || '',
            is_featured: project.is_featured === true || project.is_featured === '1',
            sort_order: data.projects.length + 1
        };

        data.projects.unshift(newProj);
        writeData(data);
        return newProj;
    },

    updateProject: (id, updates) => {
        const data = readData();
        const idx = data.projects.findIndex(p => p.id === parseInt(id, 10));
        if (idx !== -1) {
            const current = data.projects[idx];
            let gallery_images = current.gallery_images || [];
            
            if (updates.new_gallery_images && Array.isArray(updates.new_gallery_images)) {
                gallery_images = [...gallery_images, ...updates.new_gallery_images];
            } else if (updates.gallery_images && Array.isArray(updates.gallery_images)) {
                gallery_images = updates.gallery_images;
            }

            data.projects[idx] = {
                ...current,
                ...updates,
                gallery_images
            };
            delete data.projects[idx].new_gallery_images;
            writeData(data);
            return data.projects[idx];
        }
        return null;
    },

    deleteProjectVideo: (id) => {
        const data = readData();
        const idx = data.projects.findIndex(p => p.id === parseInt(id, 10));
        if (idx !== -1) {
            data.projects[idx].video_url = '';
            writeData(data);
            return true;
        }
        return false;
    },

    deleteProjectPhoto: (id, photoUrl) => {
        const data = readData();
        const idx = data.projects.findIndex(p => p.id === parseInt(id, 10));
        if (idx !== -1) {
            const current = data.projects[idx];
            if (current.gallery_images) {
                current.gallery_images = current.gallery_images.filter(img => img !== photoUrl);
                writeData(data);
                return true;
            }
        }
        return false;
    },

    toggleProjectStatus: (id) => {
        const data = readData();
        const idx = data.projects.findIndex(p => p.id === parseInt(id, 10));
        if (idx !== -1) {
            data.projects[idx].status = data.projects[idx].status === 'ongoing' ? 'completed' : 'ongoing';
            writeData(data);
            return data.projects[idx];
        }
        return null;
    },

    deleteProject: (id) => {
        const data = readData();
        const initialLen = data.projects.length;
        data.projects = data.projects.filter(p => p.id !== parseInt(id, 10));
        writeData(data);
        return data.projects.length < initialLen;
    },

    // Leads / Inquiries
    getLeads: () => {
        const data = readData();
        return data.leads || [];
    },

    addLead: (lead) => {
        const data = readData();
        if (!data.leads) data.leads = [];
        const nextId = data.leads.length > 0 ? Math.max(...data.leads.map(l => l.id)) + 1 : 1;
        
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

        data.leads.unshift(newLead);
        writeData(data);
        return newLead;
    },

    updateLeadStatus: (id, status) => {
        const data = readData();
        const idx = data.leads.findIndex(l => l.id === parseInt(id, 10));
        if (idx !== -1) {
            data.leads[idx].status = status;
            writeData(data);
            return data.leads[idx];
        }
        return null;
    },

    deleteLead: (id) => {
        const data = readData();
        const initialLen = data.leads.length;
        data.leads = data.leads.filter(l => l.id !== parseInt(id, 10));
        writeData(data);
        return data.leads.length < initialLen;
    },

    // Settings & Live Stats
    getSettings: () => {
        const data = readData();
        return data.settings || INITIAL_DATA.settings;
    },

    updateSettings: (newSettings) => {
        const data = readData();
        data.settings = { ...data.settings, ...newSettings };
        writeData(data);
        return data.settings;
    },

    // Admin Auth
    verifyAdmin: async (email, password) => {
        const data = readData();
        const user = data.admin_users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) return null;
        
        const isValid = await bcrypt.compare(password, user.password_hash);
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

// Initialize file on module load
readData();

module.exports = Store;
