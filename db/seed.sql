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

-- 3. Pre-populate 5 Real Client Projects
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `status`, `location`, `built_up_area`, `unit_types`, `short_desc`, `cover_image`, `is_featured`, `sort_order`, `video_url`) VALUES
(1, 'ZIPTRON AVANYA', 'ziptron-avanya', 'real-estate', 'completed', 'Bramhanjharilo (5 KM from Phulnakhara), Odisha', '22 Exclusive Duplex Units', '22 Duplex Units | EWS Affordable Housing', 'Duplex Project AVANYA at Bramhanjharilo. Total 22 units developed under EWS Affordable Housing Scheme, situated 5 KM from Phulnakhara.', '/uploads/projects/cover_1786863341831_670549.jpeg', 1, 1, ''),
(2, 'Townhouse at Bramhanjharilo', 'townhouse-bramhanjharilo', 'real-estate', 'completed', 'Bramhanjharilo, Odisha', 'Luxury Townhouse Enclave', '4 Beds | 3 Baths | 2 Cars', 'Modern luxury townhouse development featuring 4 bedrooms, 3 bathrooms, and 2 covered car parking spaces.', '/images/projects/default.jpg', 1, 2, ''),
(3, 'Single Family Bungalow at Malipada', 'bungalow-malipada', 'real-estate', 'completed', 'Malipada, Bhubaneswar, Odisha', 'Single Family Luxury Bungalow', '2 Beds | 2 Baths | 1 Car', 'Architecturally planned single-family bungalow featuring 2 bedrooms, 2 bathrooms, and dedicated car parking.', '/images/projects/default.jpg', 0, 3, ''),
(4, 'Duplex Project at Gudiapokhari', 'duplex-gudiapokhari', 'real-estate', 'completed', 'Gudiapokhari, Bhubaneswar, Odisha', 'Executive Duplex Housing', '4 Beds | 4 Baths | 2 Cars', 'Exclusive residential duplex complex featuring 4 spacious bedrooms, 4 bathrooms, double car parking, and modern glass facade.', '/images/projects/default.jpg', 0, 4, ''),
(5, 'ZIPTRON HEAVEN', 'ziptron-heaven', 'real-estate', 'ongoing', 'Pahala (100m from Main Road), Bhubaneswar, Odisha', '8 Exclusive Apartment Units', '8 Residential Apartment Units', 'Ongoing premium residential apartment development comprising 8 exclusive units, located just 100 meters from Pahala Main Road.', '/uploads/projects/cover_1786863856096_730065.jpeg', 1, 5, '')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `cover_image` = VALUES(`cover_image`);

-- 4. Pre-populate Gallery Images
INSERT INTO `project_images` (`project_id`, `image_url`) VALUES
(1, '/uploads/projects/gallery_1786863341853_100612.jpeg'),
(1, '/uploads/projects/gallery_1786863341868_12279.jpeg'),
(1, '/uploads/projects/gallery_1786863341885_132015.jpeg'),
(5, '/uploads/projects/gallery_1786863856107_50206.jpeg'),
(5, '/uploads/projects/gallery_1786863856112_131549.jpeg'),
(5, '/uploads/projects/gallery_1786863856117_982588.jpeg'),
(5, '/uploads/projects/gallery_1786863856121_445941.jpeg'),
(5, '/uploads/projects/gallery_1786863856138_505148.jpeg'),
(5, '/uploads/projects/gallery_1786863856143_20944.jpeg');
