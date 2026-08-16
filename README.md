# ZIPTRON NEO BUILDCON — Enterprise Web & Portal

![ZIPTRON NEO BUILDCON](public/images/logo/logo_wide.png)

Official Enterprise Web Platform & Administrative Content Management System for **ZIPTRON NEO BUILDCON PVT. LTD.** — A multi-disciplinary infrastructure leader specializing in Real Estate Development, Turnkey Construction & Civil Engineering, Logistics & Mining Transport, and Clean Solar Energy across Eastern India.

---

## 🌟 Key Features

* 🏢 **Flagship Real Estate Showcase:** Dynamic portfolio supporting ongoing sites, completed developments, and detailed floor plan specifications.
* 📸 **Multi-Photo Interactive Lightbox:** Upload and manage high-resolution site progress photos with fullscreen gallery view.
* 🎥 **Virtual Video Walkthroughs:** Cinematic 4K video walkthroughs and drone footage embedded directly via YouTube, Vimeo, or video uploads.
* 💬 **Client Testimonials & Trust:** Verified client reviews highlighting architectural planning, zoning, and land efficiency.
* 📊 **Dynamic Live Stats Engine:** Real-time editable metric counters (Completed Projects, Fleet Size, Happy Clients, On-Time Rate).
* 🔐 **Enterprise Admin CMS:** Zero-config administrative suite for managing leads, inquiries, projects, and site-wide corporate settings.
* 📬 **Instant Lead Notification Desk:** Direct WhatsApp and one-click phone dispatch for sales and engineering inquiries.
* 🚀 **Dual-Mode Database Architecture:** Local zero-dependency JSON persistence for offline development + 100% MySQL schema parity for production hosting (cPanel / Hostinger / phpMyAdmin).

---

## 🛠️ Technology Stack

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Template Engine:** EJS with Layouts
* **Styling:** Tailwind CSS + Vanilla CSS Custom Design Tokens
* **Typography:** Google Fonts (*Outfit* & *Plus Jakarta Sans*)
* **Icons:** FontAwesome 6 Pro
* **Media Handling:** Multer (Multi-field Cover, Gallery & Video File Processing)
* **Authentication:** Express Session with Bcrypt Hashing
* **Database Options:**
  * Local: JSON Store (`data/ziptron.json`)
  * Production: MySQL (`db/schema.sql` & `db/seed.sql`)

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/Chandrakanta0055/Zpitron-Neo-BuildCon.git
cd Zpitron-Neo-BuildCon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env
```

### 4. Start the Application
```bash
npm start
# or for live reload development
npm run dev
```

The application will be live at:
* 🌐 **Public Website:** `http://localhost:3000`
* 🔐 **Admin Portal:** `http://localhost:3000/admin/login`

---

## 🔐 Default Admin Credentials

* **Login URL:** `/admin/login`
* **Email:** `admin@ziptron.co.in`
* **Password:** `Ziptron@2026`

*(Note: Admin password can be changed directly from the Admin Settings panel).*

---

## 📁 Project Structure

```
├── config/              # Database & environment configurations
├── data/                # Local data store & JSON fallback persistence
├── db/                  # Production MySQL schema.sql & seed.sql
├── middleware/          # Authentication & session guards
├── public/              # Static assets (images, uploads, logos, css, js)
│   ├── images/          # Hero backgrounds, emblems, logos
│   └── uploads/         # Admin uploaded project photos & videos
├── routes/              # Express route controllers (public, projects, contact, admin)
├── views/               # EJS templates (pages, partials, layouts, admin)
├── server.js            # Main Express application entrypoint
└── package.json         # Dependencies & project scripts
```

---

## 🌐 Production Deployment (Hostinger / cPanel)

1. Upload the project files to your Node.js application directory on Hostinger/cPanel.
2. In Hostinger **phpMyAdmin**, import `db/schema.sql` and `db/seed.sql`.
3. Set environment variables in your Hostinger cPanel / `.env`:
   ```env
   NODE_ENV=production
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   SESSION_SECRET=your_secret_key
   ```
4. Run `npm install --production` and start your Node.js application.

---

## 📄 License
Proprietary — Developed for **ZIPTRON NEO BUILDCON PVT. LTD.** All rights reserved.
