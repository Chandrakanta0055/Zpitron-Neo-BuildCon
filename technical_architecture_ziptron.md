# ⚙️ ZIPTRON NEO BUILDCON — FULL TECHNICAL ARCHITECTURE DOCUMENT

**Project:** ziptron.co.in Corporate Website  
**Stack:** Node.js + Express.js + EJS + MySQL + Hostinger  
**Prepared:** August 14, 2026  

---

## 📁 1. PROJECT FOLDER STRUCTURE

```
ziptron-website/
│
├── server.js                        ← Main entry point (starts Express server)
├── package.json                     ← Dependencies & scripts
├── .env                             ← Environment variables (DB, JWT secret, PORT)
├── .gitignore                       ← Ignore node_modules, .env, uploads
│
├── config/
│   └── db.js                        ← MySQL connection pool setup
│
├── middleware/
│   ├── auth.js                      ← JWT / Session admin authentication guard
│   └── upload.js                    ← Multer file upload configuration
│
├── routes/
│   ├── public.js                    ← Routes: Home, About, Projects, Team, Contact
│   ├── projects.js                  ← Public project listing & detail routes
│   ├── contact.js                   ← Contact form POST route
│   └── admin/
│       ├── auth.js                  ← Admin login / logout routes
│       ├── dashboard.js             ← Admin dashboard overview
│       ├── projects.js              ← Admin CRUD routes for projects
│       ├── team.js                  ← Admin team member management
│       ├── stats.js                 ← Admin homepage stat counter management
│       └── leads.js                 ← Admin inquiry / lead management
│
├── controllers/
│   ├── publicController.js          ← Logic for public page rendering
│   ├── projectController.js         ← Logic for project listing & filtering
│   ├── contactController.js         ← Logic for form submission handling
│   └── admin/
│       ├── authController.js        ← Admin login / logout logic
│       ├── projectController.js     ← Admin CRUD for projects
│       ├── teamController.js        ← Admin CRUD for team members
│       ├── statsController.js       ← Admin stat counter updates
│       └── leadController.js        ← Admin lead management logic
│
├── views/  (EJS Templates — Server-Side Rendered HTML)
│   ├── layouts/
│   │   ├── main.ejs                 ← Main public layout (navbar + footer)
│   │   └── admin.ejs                ← Admin layout (sidebar + topbar)
│   ├── partials/
│   │   ├── navbar.ejs               ← Site navigation bar
│   │   ├── footer.ejs               ← Site footer
│   │   └── whatsapp.ejs            ← Floating WhatsApp button
│   ├── pages/
│   │   ├── home.ejs                 ← Home page
│   │   ├── about.ejs                ← About Us page
│   │   ├── projects.ejs             ← Projects listing page
│   │   ├── project-detail.ejs       ← Single project detail page
│   │   ├── team.ejs                 ← Team page
│   │   └── contact.ejs             ← Contact Us page
│   └── admin/
│       ├── login.ejs                ← Admin login page
│       ├── dashboard.ejs            ← Admin overview dashboard
│       ├── projects/
│       │   ├── index.ejs            ← All projects list
│       │   ├── add.ejs              ← Add new project form
│       │   └── edit.ejs             ← Edit project form
│       ├── team/
│       │   ├── index.ejs            ← Team list
│       │   └── edit.ejs             ← Edit team member
│       ├── stats.ejs                ← Homepage stats editor
│       └── leads.ejs                ← Inquiry inbox
│
└── public/  (Static Assets)
    ├── css/
    │   ├── style.css                ← Main stylesheet
    │   ├── animations.css           ← Scroll & micro-animation styles
    │   └── admin.css                ← Admin dashboard styles
    ├── js/
    │   ├── main.js                  ← Navbar scroll, counter animations, filters
    │   ├── projects.js              ← Project category & status filter logic
    │   └── admin.js                 ← Admin panel JS interactions
    ├── images/
    │   ├── logo/                    ← Company logo files
    │   ├── hero/                    ← Hero banner images
    │   └── icons/                   ← Service icons & UI icons
    └── uploads/
        ├── projects/                ← Admin-uploaded project photos
        └── team/                    ← Admin-uploaded team member photos
```

---

## 🎨 2. FRONTEND — PAGE-BY-PAGE DESIGN & CONTENT SPECIFICATIONS

### 🌈 Global Design System

> 🏆 **PREMIUM UI MANDATE:** The ZIPTRON NEO BUILDCON website must deliver a **world-class, premium corporate experience**. Every page, section, card, and button must feel polished, modern, and high-end — comparable to top global construction & real estate brands. **Flat, generic, or basic UI is strictly not acceptable.**

| Property | Value |
|---|---|
| **UI Standard** | **Premium / Enterprise-Grade** (Dark Glassmorphism Corporate) |
| **Official Logo** | 3D Metallic Gold Geometric 'Z' Emblem + Metallic Gold ZIPTRON Typography |
| **Primary Color** | `#0D1B2A` (Deep Dark Navy) / `#000000` (Solid Black) |
| **Accent Color** | `#F5A623` / `#D4AF37` (Metallic Gold) |
| **Secondary Accent** | `#1E3A5F` (Dark Steel Blue) |
| **Gradient Accent** | `linear-gradient(135deg, #F5A623, #FFD700, #FF6B35)` (Gold to Orange) |
| **Glass Card BG** | `rgba(255,255,255,0.05)` + `backdrop-filter: blur(16px)` |
| **Text Primary** | `#FFFFFF` / `#F0F0F0` |
| **Text Secondary** | `#A0AEC0` (Light Grey) |
| **Background** | `#0D1B2A` (Dark theme) |
| **Card Background** | `rgba(22, 34, 53, 0.8)` (Glassmorphism dark card) |
| **Heading Font** | `Outfit` (Google Fonts) — Bold 700/800 |
| **Body Font** | `Inter` (Google Fonts) — Regular 400 / Medium 500 |
| **Border Radius** | `16px` (Cards) / `8px` (Buttons) / `50px` (Pill badges) |
| **Box Shadow** | `0 8px 40px rgba(0,0,0,0.5)` |
| **Gold Border Glow** | `border: 1px solid rgba(245,166,35,0.25)` |

---

### 🏠 PAGE 1: HOME (`/`)

#### Section 1 — Navbar (Fixed, Transparent on top / Solid on scroll)
```
[LOGO]   Home   About Us   Projects   Team   Contact Us   [📞 Call Now button]
```
* Logo left aligned, nav links centered, CTA button right.
* On scroll → Background becomes `#0D1B2A` with box-shadow.

#### Section 2 — Hero Banner (Full Screen, 100vh)
* **Background:** Fullscreen image slider (3 rotating mining/real estate images)
* **Overlay:** Dark gradient (`rgba(13,27,42,0.75)`)
* **Headline:** `Building Tomorrow, Today` (Outfit Bold, 64px)
* **Sub-headline:** `Ziptron Neo Buildcon — Real Estate | Construction | Mining & Transporting | Solar`
* **CTA Buttons:**
  * Primary: `Explore Our Projects` → `/projects`
  * Secondary: `Contact Us` → `/contact`
* **Scroll indicator:** Animated down arrow

#### Section 3 — About Snippet
* **Heading:** `Who We Are`
* **Text:** Brief 3-line company intro (Est. Jan 2022 | Bhubaneswar & Ranchi | Multi-sector)
* **3 Highlight Badges:** `Dual Headquarters` | `700+ Machinery Assets` | `17+ Projects`
* **CTA:** `Read Our Full Story →` → `/about`

#### Section 4 — Core Business Sectors (5 Animated Cards)
| # | Icon | Sector | Short Description |
|---|---|---|---|
| 1 | 🏠 | Real Estate | Premium residential & commercial developments |
| 2 | 🏗️ | Construction | RCC structures, haul roads, civil engineering |
| 3 | ⛏️ | Mining & Transporting | Opencast & underground mining + 200+ tipper fleet |
| 4 | ☀️ | Solar Energy | Turnkey solar EPC solutions |
| 5 | ⚙️ | Steel Engineering | Fabrication, piping, conveyors, supply |
* Each card has hover lift animation + amber underline on hover.

#### Section 5 — Live Stats Counter
| Stat | Value |
|---|---|
| 🏗️ Projects Completed | **11+** |
| 🔵 Ongoing Projects | **6** |
| 🚜 Heavy Machinery & Fleet | **700+** |
| 📅 Years in Business | **3+** |
| 🗺️ Operational States | **2** (Odisha & Jharkhand) |
* Numbers animate (count up) when section enters viewport.

#### Section 6 — Featured Projects (3 Cards)
* Grid of 3 latest/featured projects from database.
* Each card: Cover photo, Project Name, Category tag, Status badge (🟢/🔵/🟡), `View Details →` link.

#### Section 7 — Why Choose ZIPTRON (4 Feature Blocks)
1. ✅ **Trusted Leadership** — Founder-led, transparent management.
2. 🔒 **Full Compliance** — Mining regulatory, HSEQ-certified operations.
3. 🚜 **Own Fleet** — No third-party dependency with 700+ own machinery.
4. 🌍 **Pan East India Reach** — Operations across Odisha & Jharkhand.

#### Section 8 — CTA Banner
* **Text:** `Have a project in mind? Let's build it together.`
* **Button:** `Get In Touch →` → `/contact`
* Background: Amber gradient overlay on a dark construction image.

#### Section 9 — Footer
```
[LOGO]                    Quick Links          Contact
ZIPTRON NEO BUILDCON      Home                 Ziptron House, Bhubaneswar
© 2026                    About Us             Ranchi Head Office
                          Projects             +91 9337512111
                          Team                 info@ziptron.co.in
                          Contact Us
                          [WhatsApp] [Email]
```

---

### 📖 PAGE 2: ABOUT US (`/about`)

#### Section 1 — Page Hero Banner
* **Title:** `About ZIPTRON NEO BUILDCON`
* **Subtitle:** `Multi-Industry Infrastructure Leaders — Est. 2022`
* Background: Dark navy with animated gold particles or subtle grid texture.

#### Section 2 — Our Story
* **Heading:** `Our Corporate Journey`
* **Content:** Incorporated 29 Jan 2022 in Bhubaneswar, Odisha (CIN: ABA-4283). Dual HQ — Corporate Office Bhubaneswar + Head Office Ranchi, Jharkhand. Describes combined management experience.

#### Section 3 — Mission & Values (Side by Side Cards)
* **Mission:** Deliver quality, client satisfaction, cost-efficient, on-time project completion.
* **Values Table:**
  * 🏆 Excellence
  * 🤝 Trust
  * 🫶 Respect
  * 💪 Empowerment
  * 📋 Accountability

#### Section 4 — Our Leadership (Full Profile Cards)
* **Soumya Ranjan Jena** — Designated Partner & Founder | Photo | Bio | Phone
* **Bishal Ghosh** — Designated Partner & Co-founder | Photo | Bio

#### Section 5 — Compliance & Standards (3 Columns)
* 👷 **Health & Safety:** PPE mandates, hazard reporting, mental health policy.
* ⛏️ **Mining Compliance:** Regulatory-compliant operations, frequent site inspections.
* 🏗️ **Engineering Compliance:** Certified architects, engineers, quality controllers on every project.

#### Section 6 — Social Responsibility
* **Text:** Local employment, youth training, women empowerment, eco-friendly fly ash construction materials, solar energy initiative.

---

### 🏗️ PAGE 3: PROJECTS (`/projects`)

#### Section 1 — Page Hero
* **Title:** `Our Projects`
* **Subtitle:** `11 Completed | 6 Ongoing | Real Estate, Construction, Mining & Solar`

#### Section 2 — Filter Bar (Sticky)
```
[All] [Real Estate] [Construction] [Mining & Transporting] [Solar]
[All Status] [🟡 Upcoming] [🔵 Ongoing] [🟢 Completed]
```
* JavaScript instant filter (no page reload) based on data attributes.

#### Section 3 — Projects Grid
* 3-column responsive grid on desktop, 1-column on mobile.
* Each project card:
  ```
  [Cover Photo]
  [Category Badge]   [Status Badge]
  Project Name
  📍 Location
  [View Details →]
  ```

#### Section 4 — Single Project Detail Page (`/projects/:id`)
* **Layout:** Hero image → Gallery Grid → Project Info Table → Description → Inquiry CTA
* **Info Table:**
  * Project Name | Category | Location | Status | Start Date | End Date
* **Gallery:** Lightbox-enabled photo grid
* **CTA:** `Enquire About This Project` → leads to contact form with project pre-filled.

---

### 👥 PAGE 4: TEAM (`/team`)

#### Section 1 — Page Hero
* **Title:** `Meet Our Leadership`
* **Subtitle:** `Experienced founders and multi-disciplinary professionals driving Ziptron's growth.`

#### Section 2 — Founders Showcase (Large Cards)
* **Card Layout:** Professional photo (circular), Name (Outfit Bold 28px), Designation, Bio (3-4 lines), Contact info (if provided by client).
* **Founder 1:** Soumya Ranjan Jena — Designated Partner & Founder
* **Founder 2:** Bishal Ghosh — Designated Partner & Co-founder

#### Section 3 — Our Professional Team Grid
* Smaller cards for Engineers, Safety Officers, Architects, QC/QA, Surveyors.
* Photos and roles displayed in a clean grid.

---

### 📞 PAGE 5: CONTACT US (`/contact`)

#### Section 1 — Page Hero
* **Title:** `Get In Touch`
* **Subtitle:** `Reach us at our offices in Bhubaneswar or Ranchi — We'd love to hear about your project.`

#### Section 2 — Contact Layout (Two Columns)
**Left — Contact Info:**
```
🏢 Corporate Office (Bhubaneswar)
   Ziptron House, 952/3735 Stadium Lane,
   Nayapalli, Bhubaneswar, Odisha – 751012

🏢 Head Office (Ranchi)
   Sector 3, H.E.C. Colony, Dhurwa,
   Ranchi, Jharkhand – 834004

📞 +91 9337512111 / +91 7008757918
📧 info@ziptron.co.in
```

**Right — Contact Form:**
```
Name*          [___________________]
Email*         [___________________]
Phone*         [___________________]
Service        [Dropdown: Real Estate / Construction / Mining / Solar / Other]
Message*       [________________________]
               [                        ]
               [ Send Message 🚀 ]
```

#### Section 3 — Google Maps Embed
* Interactive embedded map showing Ziptron House, Nayapalli, Bhubaneswar.

#### Section 4 — Floating WhatsApp Button (All Pages)
* Fixed bottom-right position, WhatsApp green color, subtle bounce animation.
* On click → `https://wa.me/919337512111`

---

## ✨ 3. PREMIUM UI & ANIMATION SPECIFICATIONS

> 🏆 **Standard:** The website must feel **alive, dynamic, and premium** at every interaction. All animations must be smooth (60fps), purposeful, and consistent across all pages.

---

### 🎨 A. Visual Design Standards (Premium UI)

| UI Element | Premium Specification |
|---|---|
| **Cards** | Glassmorphism style — dark semi-transparent background + blur backdrop + gold border glow |
| **Buttons** | Gradient fill (`#F5A623 → #FF6B35`) with glowing box-shadow on hover + smooth scale transform |
| **Section Backgrounds** | Alternating — dark navy `#0D1B2A` + slightly lighter `#111D2B` + optional subtle grain texture |
| **Hero Section** | Full-screen with dark overlay, cinematic text reveal animation, animated scroll indicator |
| **Typography** | Large bold headings (64px+ hero, 42px section titles) with gradient text on key words |
| **Images** | Zoom-on-hover effect for project cards, parallax depth on hero banner |
| **Badges & Tags** | Pill-shaped with amber/blue/green glow borders matching project status |
| **Navbar** | Transparent on top → solid glass blur on scroll, smooth transition |
| **Dividers** | Thin amber gradient lines (`1px solid rgba(245,166,35,0.4)`) between sections |
| **Form Inputs** | Dark glass style with amber focus border glow (`box-shadow: 0 0 0 3px rgba(245,166,35,0.3)`) |

---

### 🎬 B. Page Load & Entry Animations

| Element | Animation | Trigger |
|---|---|---|
| **Loading Screen** | Full-screen dark loader with Ziptron logo pulse animation + progress bar | On every page load |
| **Navbar** | Slide down from top with fade-in | On page load (0.3s delay) |
| **Hero Headline** | Word-by-word reveal (clip-path animation) left to right | On page load |
| **Hero Subtext** | Fade up + opacity (0 → 1) | 0.5s after headline |
| **Hero CTA Buttons** | Scale in from 0.8 → 1.0 + fade | 0.8s after headline |
| **Hero Image Slider** | Smooth crossfade between slides (every 5 seconds) | Auto-loop |

---

### 🖱️ C. Scroll-Triggered Animations (AOS / Intersection Observer)

> All sections animate in as the user scrolls down. Nothing appears static.

| Section / Element | Animation Type | Direction |
|---|---|---|
| Section headings | Fade Up | Bottom → Top |
| Service sector cards | Staggered fade-in | Bottom → Top (0.1s delay each card) |
| Stats counter numbers | Count-up animation (0 → final value) | On scroll into view |
| Project cards grid | Staggered slide-in | Left, Right, alternating |
| About section content | Slide from left | Left → Right |
| About section image | Slide from right | Right → Left |
| Team member cards | Fade + scale-up | Bottom → Top (staggered) |
| Why Choose Us blocks | Flip-in card reveal | Y-axis flip |
| Compliance badges | Pop-in scale animation | Center outward |

---

### 🎯 D. Micro-Interactions & Hover Effects

| Element | Hover / Interaction Effect |
|---|---|
| **Navbar links** | Amber underline slides in from left on hover |
| **CTA Buttons** | Glow intensifies + subtle scale(1.05) + amber shimmer sweep |
| **Service Cards** | Lift up (`translateY(-8px)`) + amber border glow intensifies + icon rotates 10° |
| **Project Cards** | Cover image zoom (scale 1.08) + dark overlay fades in + View Details button slides up |
| **Team Cards** | Smooth border glow transition + name underline slides in |
| **Footer links** | Amber color transition on hover |
| **WhatsApp button** | Pulse ring animation (continuous) + bounce on hover |
| **Stats numbers** | Shimmer/glow effect on hover |
| **Form Send button** | Particle burst effect on click + loading spinner while submitting |

---

### 🌊 E. Parallax & Depth Effects

| Section | Effect |
|---|---|
| **Hero Banner** | Background image scrolls at 0.5x speed (CSS parallax) creating depth |
| **CTA Banner section** | Background image subtle parallax on scroll |
| **About Us page hero** | Parallax depth on large background image |
| **Section separators** | Diagonal CSS clip-path cuts between sections (instead of flat horizontal dividers) |

---

### ✨ F. Special Visual Effects

| Effect | Implementation | Location |
|---|---|---|
| **Ambient particle field** | Lightweight JS canvas particles (subtle, slow-moving golden dots) | Hero section background |
| **Gradient text** | CSS `background-clip: text` with amber gradient | Key headings ("ZIPTRON", section titles) |
| **Glowing amber underlines** | CSS `::after` pseudo-element with amber gradient + width animation | Section sub-headings |
| **Number ticker** | Smooth JS counter (easeOutCubic) animating from 0 to final value | Stats section |
| **Image lightbox** | Smooth dark overlay lightbox for project gallery photos | Project detail page |
| **Smooth page scroll** | CSS `scroll-behavior: smooth` + custom JS scroll easing | Entire site |
| **Active nav highlight** | Current page link highlighted with amber color + bold weight | Navbar |

---

### 📦 G. Animation Libraries & Tools

| Library | Purpose | CDN / npm |
|---|---|---|
| **AOS.js** (Animate On Scroll) | Scroll-triggered section animations | CDN (lightweight, 13kb) |
| **CountUp.js** | Smooth number counter animation for stats | npm |
| **Swiper.js** | Premium hero image slider & project gallery carousel | CDN |
| **Custom CSS Animations** | Micro-interactions, hover effects, loading screen, particle field | Vanilla CSS + JS |

---

### 📱 H. Mobile Premium Experience

* Hamburger menu opens with smooth slide-in drawer animation (from right).
* All hover effects converted to `tap` feedback on mobile (scale pulse on touch).
* Images use `loading="lazy"` for fast mobile performance.
* Touch-swipe enabled on project gallery carousel (Swiper.js).
* WhatsApp button remains accessible (bottom-right fixed) on all mobile screens.

---

## ⚙️ 4. BACKEND ARCHITECTURE — NODE.JS + EXPRESS.JS

### server.js — Entry Point
```javascript
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Public Routes
app.use('/', require('./routes/public'));
app.use('/projects', require('./routes/projects'));
app.use('/contact', require('./routes/contact'));

// Admin Routes (Protected)
app.use('/admin', require('./routes/admin/auth'));
app.use('/admin/dashboard', require('./routes/admin/dashboard'));
app.use('/admin/projects', require('./routes/admin/projects'));
app.use('/admin/team', require('./routes/admin/team'));
app.use('/admin/stats', require('./routes/admin/stats'));
app.use('/admin/leads', require('./routes/admin/leads'));

app.listen(process.env.PORT || 3000);
```

### Public Route Endpoints
| Method | URL | Action |
|---|---|---|
| GET | `/` | Render Home page with stats & featured projects |
| GET | `/about` | Render About Us page |
| GET | `/projects` | Render Projects page (with filter support) |
| GET | `/projects/:id` | Render Single Project Detail page |
| GET | `/team` | Render Team page |
| GET | `/contact` | Render Contact page |
| POST | `/contact/submit` | Handle contact form → save to DB |

### Admin Route Endpoints
| Method | URL | Action |
|---|---|---|
| GET | `/admin` | Redirect to login |
| GET | `/admin/login` | Render Admin login page |
| POST | `/admin/login` | Authenticate admin, create session |
| GET | `/admin/logout` | Destroy session, redirect to login |
| GET | `/admin/dashboard` | Render dashboard overview |
| GET | `/admin/projects` | List all projects |
| GET | `/admin/projects/add` | Render add project form |
| POST | `/admin/projects/add` | Save new project to DB + upload images |
| GET | `/admin/projects/edit/:id` | Render edit form |
| POST | `/admin/projects/edit/:id` | Update project in DB |
| POST | `/admin/projects/status/:id` | Update project status only |
| POST | `/admin/projects/delete/:id` | Delete project from DB |
| GET | `/admin/leads` | List all contact form inquiries |
| POST | `/admin/leads/status/:id` | Update lead status |
| GET | `/admin/stats` | Render stats editor |
| POST | `/admin/stats` | Update homepage counters |
| GET | `/admin/team` | List team members |
| POST | `/admin/team/edit/:id` | Update team member info |

---

## 🗄️ 5. DATABASE ARCHITECTURE — MySQL

### Database Name: `ziptron_db`

---

### Table 1: `admin_users` — Admin Login Credentials
```sql
CREATE TABLE admin_users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,   -- bcrypt hashed
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Table 2: `projects` — Project Portfolio
```sql
CREATE TABLE projects (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  slug            VARCHAR(220) NOT NULL UNIQUE,   -- URL-friendly name
  category        ENUM('real_estate','construction','mining_transporting','solar') NOT NULL,
  status          ENUM('upcoming','ongoing','completed') DEFAULT 'upcoming',
  location        VARCHAR(200),
  short_desc      TEXT,
  full_desc       LONGTEXT,
  cover_image     VARCHAR(300),                    -- Path to cover photo
  start_date      DATE,
  end_date        DATE,
  is_featured     TINYINT(1) DEFAULT 0,           -- Show on homepage
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### Table 3: `project_images` — Multi-Photo Gallery per Project
```sql
CREATE TABLE project_images (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  project_id  INT NOT NULL,
  image_path  VARCHAR(300) NOT NULL,
  caption     VARCHAR(255),
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

---

### Table 4: `team_members` — Team & Leadership Profiles
```sql
CREATE TABLE team_members (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  designation   VARCHAR(200) NOT NULL,
  bio           TEXT,
  photo         VARCHAR(300),
  phone         VARCHAR(20),
  email         VARCHAR(150),
  sort_order    INT DEFAULT 0,
  is_founder    TINYINT(1) DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Table 5: `contact_leads` — Inquiry Inbox from Contact Form
```sql
CREATE TABLE contact_leads (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(150),
  phone       VARCHAR(20) NOT NULL,
  service     VARCHAR(100),
  message     TEXT,
  status      ENUM('new','contacted','closed') DEFAULT 'new',
  project_ref VARCHAR(200),                        -- Pre-filled project if from detail page
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Table 6: `site_stats` — Homepage Counter Values
```sql
CREATE TABLE site_stats (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  stat_key        VARCHAR(100) NOT NULL UNIQUE,
  stat_label      VARCHAR(150) NOT NULL,
  stat_value      VARCHAR(50) NOT NULL,
  sort_order      INT DEFAULT 0
);

-- Default Data
INSERT INTO site_stats VALUES
  (1, 'projects_completed', 'Projects Completed', '11+', 1),
  (2, 'ongoing_projects',   'Ongoing Projects',   '6',   2),
  (3, 'machinery_fleet',    'Machinery & Fleet',  '700+',3),
  (4, 'years_experience',   'Years in Business',  '3+',  4),
  (5, 'states_active',      'States of Operation','2',   5);
```

---

### Table 7: `services` — Dynamic Services Info
```sql
CREATE TABLE services (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(150) NOT NULL,
  icon        VARCHAR(50),
  description TEXT,
  sort_order  INT DEFAULT 0
);
```

---

### Table 8: `site_settings` — General Site Config
```sql
CREATE TABLE site_settings (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  setting_key   VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT
);

-- Default Settings
INSERT INTO site_settings VALUES
  (1, 'company_name',    'ZIPTRON NEO BUILDCON'),
  (2, 'phone_1',         '+91 9337512111'),
  (3, 'phone_2',         '+91 7008757918'),
  (4, 'email',           'info@ziptron.co.in'),
  (5, 'whatsapp_number', '919337512111'),
  (6, 'address_bbs',     'Ziptron House, 952/3735 Stadium Lane, Nayapalli, Bhubaneswar, Odisha - 751012'),
  (7, 'address_ranchi',  'Sector 3, H.E.C. Colony, Dhurwa, Ranchi, Jharkhand - 834004'),
  (8, 'google_maps_url', 'PASTE_EMBED_URL_HERE'),
  (9, 'meta_description','ZIPTRON NEO BUILDCON - Premier Real Estate, Construction, Mining and Solar company in Eastern India');
```

---

## 🔐 6. SECURITY IMPLEMENTATION

### Authentication Flow
1. Admin enters Email + Password at `/admin/login`.
2. Server checks MySQL `admin_users` table, verifies password with `bcrypt.compare()`.
3. On success → creates `req.session.admin = { id, name, email }`.
4. All `/admin/*` routes protected by `middleware/auth.js`:
   ```javascript
   module.exports = (req, res, next) => {
     if (req.session && req.session.admin) return next();
     return res.redirect('/admin/login');
   };
   ```

### File Upload Security (Multer)
* Accept only `.jpg`, `.jpeg`, `.png`, `.webp` files.
* Max file size: **5 MB** per image.
* Files renamed with `Date.now() + original_extension` to prevent overwrite attacks.
* Uploads stored in: `public/uploads/projects/` and `public/uploads/team/`.

### Environment Variables (`.env`)
```
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=ziptron_db
SESSION_SECRET=your_super_secret_key_here
```

---

## 🚀 7. HOSTINGER NODE.JS DEPLOYMENT GUIDE

### Step 1 — Set Up Hostinger Web App
1. Login to Hostinger hPanel → **Websites** → **Add Website** → **Deploy Web App**.
2. Select **Node.js** runtime.
3. Connect your **GitHub repository** (push code here first).
4. Set **Entry Point:** `server.js`.
5. Set **Node.js Version:** `18.x` or `20.x LTS`.

### Step 2 — Set Up MySQL Database on Hostinger
1. hPanel → **Databases** → **MySQL Databases**.
2. Create Database: `ziptron_db`.
3. Create User and assign full privileges to `ziptron_db`.
4. Import the SQL schema via **phpMyAdmin** (hPanel → phpMyAdmin).

### Step 3 — Configure Environment Variables
1. In Hostinger Web App panel → **Environment Variables** section.
2. Add all variables from `.env`:
   * `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `SESSION_SECRET`, `PORT`.

### Step 4 — Connect Domain
1. hPanel → **Domains** → `ziptron.co.in`.
2. Under Domain Settings → **Connect to Web App** → Select the Node.js web app.
3. SSL Certificate → **Enable Free SSL (Let's Encrypt)** → ✅ Done.

### Step 5 — Deployment Workflow (Every Update)
```bash
# Local development
git add .
git commit -m "Update: [describe change]"
git push origin main

# Hostinger auto-deploys from GitHub on every push to main branch
# OR manually trigger deploy from hPanel Web App dashboard
```

### Step 6 — File Uploads Persistence
> ⚠️ **Important:** Hostinger may clear uploaded files on re-deploy.
> Solution: Use Hostinger **File Manager** or SSH to manually persist the `public/uploads/` folder across deployments. Alternatively, store `uploads/` path outside the git repo and configure Multer to point to a persistent path on the server.

---

## 📦 8. KEY npm DEPENDENCIES

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "ejs": "^3.1.9",
    "mysql2": "^3.6.0",
    "express-session": "^1.17.3",
    "bcryptjs": "^2.4.3",
    "multer": "^1.4.5",
    "dotenv": "^16.3.1",
    "slugify": "^1.6.6"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 📱 9. RESPONSIVE DESIGN BREAKPOINTS

| Breakpoint | Width | Layout |
|---|---|---|
| **Mobile** | < 768px | Single column, hamburger menu |
| **Tablet** | 768px – 1024px | 2-column grid, simplified nav |
| **Desktop** | > 1024px | Full 3-column grid, full navbar |
| **Large Screen** | > 1440px | Max-width 1280px container centered |

---

## ✅ 10. PRE-LAUNCH CHECKLIST

- [ ] MySQL database created & schema imported on Hostinger
- [ ] `.env` environment variables configured in Hostinger panel
- [ ] Admin account seeded in `admin_users` table (bcrypt password)
- [ ] GitHub repo connected to Hostinger Web App
- [ ] SSL certificate activated for `ziptron.co.in`
- [ ] `ziptron.co.in` domain verified & DNS pointing to Hostinger
- [ ] Hostinger Business Email (`info@ziptron.co.in`) configured
- [ ] Google Maps embed URL inserted in `site_settings`
- [ ] WhatsApp number verified (+91 9337512111)
- [ ] All initial project data entered via Admin Panel
- [ ] Mobile responsive testing on iPhone & Android
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Page load speed check (Google PageSpeed Insights)
- [ ] On-page SEO verified (title tags, meta descriptions, H1 structure)
