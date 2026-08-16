-- ==========================================================
-- ZIPTRON NEO BUILDCON — Initial Seed Data
-- ==========================================================

-- 1. Default Admin User (Password: Ziptron@2026 - bcrypt hashed)
INSERT INTO `admin_users` (`name`, `email`, `password`, `role`) VALUES
('Soumya Ranjan Jena', 'admin@ziptron.co.in', '$2a$10$wNqgI80r/B7v08V7hYl3x.25D.U77eTfZ21QzK0M56461cR7x8r.C', 'superadmin')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 2. Initial Site Settings & Live Stats
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('completed_projects', '11+'),
('ongoing_projects', '6+'),
('machinery_fleet', '400+'),
('years_growth', '3+'),
('tagline', 'Build your Thinking'),
('primary_phone', '+91 9337512111'),
('secondary_phone', '+91 7008757918'),
('email', 'info@ziptron.co.in'),
('corporate_office', 'Ziptron House, Plot No. 952/3735, Stadium Lane, Nayapalli, Bhubaneswar, Khordha, Odisha – 751012, India.')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

-- 3. Pre-populate Projects
INSERT INTO `projects` (`title`, `slug`, `category`, `status`, `location`, `built_up_area`, `unit_types`, `short_desc`, `cover_image`, `is_featured`, `sort_order`) VALUES
('ZIPTRON PRARAMVYA', 'ziptron-praramvya', 'real-estate', 'ongoing', 'Kalinga Nagar, Odisha', 'Commercial & Residential Mixed', 'Retail Suites & Luxury Flats', 'Flagship mixed-use development integrating corporate suites, commercial retail plazas, and luxury residences.', '/images/projects/default.jpg', 1, 1),
('BRAMHANJHARILO APARTMENTS', 'bramhanjharilo', 'real-estate', 'ongoing', 'Bramhanjharilo, Odisha', '2595.97 SQFT', 'S+3 3BHK Luxury Flats (1140 & 1240 SQFT)', 'S+3 Luxury Residential complex with Jaquar fittings, Stilt parking, 24x7 security, and Terrace jogging track.', '/images/projects/default.jpg', 1, 2),
('PREMIUM DUPLEX VILLAS', 'duplex-project', 'real-estate', 'ongoing', 'Odisha / Jharkhand', 'Independent Luxury Duplex', 'Exclusive Residential Units', 'Independent luxury duplex residences with private parking, modular kitchens, and private landscaped terraces.', '/images/projects/default.jpg', 1, 3),
('RESIDENTIAL TOWER (PHASE 2)', 'residential-tower-phase-2', 'real-estate', 'ongoing', 'Bhubaneswar, Odisha', 'Gated Community High-Rise', '2BHK & 3BHK Configurations', 'Gated community development featuring modern clubhouse, landscaped green zones, and recreational facilities.', '/images/projects/default.jpg', 0, 4),
('COMMERCIAL CORPORATE PLAZA', 'commercial-corporate-plaza', 'real-estate', 'ongoing', 'Nayapalli, Bhubaneswar', 'Multi-Level Corporate Center', 'Retail & Business Suites', 'Multi-level commercial complex with modern glass facade, central HVAC infrastructure, and underground parking.', '/images/projects/default.jpg', 0, 5),
('MINING EXTRACTION & TRANSPORT', 'mining-extraction-transport', 'mining', 'ongoing', 'Jharkhand Mining Belt', '200+ Fleet Deployed', 'Opencast Excavation & Haulage', 'Active opencast mining overburden removal, controlled drilling & blasting, and heavy tipper fleet dispatch.', '/images/projects/default.jpg', 1, 6),
('Commercial Solar Power Plant EPC', 'commercial-solar-epc', 'solar', 'completed', 'Eastern India', 'Turnkey Solar Array', 'Multi-Megawatt Industrial EPC', 'Turnkey engineering, procurement, and grid-connected execution of multi-megawatt industrial solar power plant.', '/images/projects/default.jpg', 0, 7),
('Industrial Rooftop Solar Array', 'industrial-rooftop-solar', 'solar', 'completed', 'Odisha Industrial Area', 'High-Efficiency PV Setup', 'Rooftop Solar Integration', 'Complete rooftop PV installation with high-efficiency inverters, net-metering integration, and zero emissions.', '/images/projects/default.jpg', 0, 8),
('Mineral Logistics Corridor Dispatch', 'mineral-logistics-corridor', 'mining', 'completed', 'Odisha-JH Corridors', '213+ Heavy Tippers', 'Bulk Mineral Transport', 'Continuous multi-million ton mineral haulage managed with our proprietary 213+ heavy tipper fleet.', '/images/projects/default.jpg', 0, 9),
('Opencast Overburden Removal (Phase-1)', 'opencast-overburden-phase-1', 'mining', 'completed', 'Keonjhar Sector', 'Deep Excavation Site', 'Bench Formation & Earthworks', 'Complete deep excavation, bench formation, and haulage safely executed within statutory timeframes.', '/images/projects/default.jpg', 0, 10),
('Heavy Haul Road & Drainage', 'heavy-haul-road-drainage', 'construction', 'completed', 'Industrial Corridor', 'Civil Earthworks & Culverts', 'Heavy-Duty Industrial Road', 'Heavy-duty road construction with concrete stormwater drainage channels and dust suppression.', '/images/projects/default.jpg', 0, 11),
('250 TPH Stone Crushing Setup', 'stone-crushing-screening-plant', 'construction', 'completed', 'Odisha Plant Site', '250 TPH Capacity', 'Industrial Crushing Plant', 'Installation and commissioning of Terex & Puzzolana 3-stage crushing and screening plant.', '/images/projects/default.jpg', 0, 12),
('Gated Residential Society (Phase 1)', 'residential-society-phase-1', 'real-estate', 'completed', 'Bhubaneswar', 'Gated Apartments', 'Residential Handover Complete', 'Completed gated community apartments handed over with full amenities and 100% occupancy.', '/images/projects/default.jpg', 0, 13),
('Retail Plaza & Commercial Units', 'retail-plaza-commercial-units', 'real-estate', 'completed', 'Nayapalli, Bhubaneswar', 'Commercial Storefronts', 'Fully Operational Retail Hub', 'Premium commercial retail development with modern storefronts and customer parking.', '/images/projects/default.jpg', 0, 14),
('Luxury Villa Enclave', 'luxury-villa-enclave', 'real-estate', 'completed', 'Odisha', 'Private Villa Enclave', 'Premium Villa Handover', 'Independent gated villas with private landscaping, secure boundary walls, and dedicated security.', '/images/projects/default.jpg', 0, 15),
('Bramhanjharilo Civil Foundation', 'bramhanjharilo-foundation', 'real-estate', 'completed', 'Bramhanjharilo', 'Site Infrastructure', 'Stilt Foundation & Borewell', 'Complete site development, boundary wall perimeter, stilt foundation, and deep borewell water setup.', '/images/projects/default.jpg', 0, 16),
('Controlled Drilling & Blasting Operations', 'controlled-drilling-blasting', 'mining', 'completed', 'Mining Sector', 'DGMS Compliant', 'Precision Blast Engineering', 'Statutory-compliant precision drilling and blast design minimizing ground vibration and maximizing ore yield.', '/images/projects/default.jpg', 0, 17)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);
