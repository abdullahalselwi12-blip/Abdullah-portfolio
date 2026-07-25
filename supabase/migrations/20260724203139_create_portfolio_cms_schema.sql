/*
# Portfolio CMS Schema with Admin Authentication

## Overview
Creates a complete content management system for Abdullah's portfolio website.
All content is stored in the database and editable from the admin dashboard.

## Authentication
- Uses Supabase built-in auth (email/password).
- Admin signs in via the dashboard login page.
- All content tables: anon can SELECT; only authenticated admin can INSERT/UPDATE/DELETE.
- Messages: only authenticated admin can SELECT/UPDATE/DELETE; anon can INSERT.

## New Tables
1. profile, 2. projects, 3. skills, 4. certificates, 5. experience,
6. gallery_items, 7. blog_posts, 8. testimonials, 9. services,
10. messages, 11. social_links, 12. contact_info, 13. site_settings, 14. activity_logs

## Security
- RLS enabled on ALL tables.
- Public content: anon SELECT, authenticated CRUD.
- Messages: anon INSERT only, authenticated full CRUD.
- Activity logs: authenticated SELECT/INSERT only.
*/

-- ============ PROFILE ============
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Abdullah Dia''a Hassan Sief Al-Selwi',
  bio_en text[] DEFAULT ARRAY[''],
  bio_ar text[] DEFAULT ARRAY[''],
  hero_subtitle_en text DEFAULT '',
  hero_subtitle_ar text DEFAULT '',
  avatar_url text DEFAULT '',
  resume_url text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_profile" ON profile;
CREATE POLICY "public_read_profile" ON profile FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_profile" ON profile;
CREATE POLICY "admin_insert_profile" ON profile FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_profile" ON profile;
CREATE POLICY "admin_update_profile" ON profile FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_profile" ON profile;
CREATE POLICY "admin_delete_profile" ON profile FOR DELETE TO authenticated USING (true);

-- ============ PROJECTS ============
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL DEFAULT '',
  title_ar text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  description_ar text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  github_url text DEFAULT '',
  live_url text DEFAULT '',
  tech text[] DEFAULT ARRAY[]::text[],
  category text DEFAULT '',
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_projects" ON projects;
CREATE POLICY "admin_update_projects" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
CREATE POLICY "admin_delete_projects" ON projects FOR DELETE TO authenticated USING (true);

-- ============ SKILLS ============
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'programming',
  icon text DEFAULT 'Code',
  level int DEFAULT 80,
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_skills" ON skills;
CREATE POLICY "public_read_skills" ON skills FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_skills" ON skills;
CREATE POLICY "admin_insert_skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_skills" ON skills;
CREATE POLICY "admin_update_skills" ON skills FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_skills" ON skills;
CREATE POLICY "admin_delete_skills" ON skills FOR DELETE TO authenticated USING (true);

-- ============ CERTIFICATES ============
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL DEFAULT '',
  name_ar text NOT NULL DEFAULT '',
  issuer text DEFAULT '',
  issue_date text DEFAULT '',
  image_url text DEFAULT '',
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_certificates" ON certificates;
CREATE POLICY "public_read_certificates" ON certificates FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_certificates" ON certificates;
CREATE POLICY "admin_insert_certificates" ON certificates FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_certificates" ON certificates;
CREATE POLICY "admin_update_certificates" ON certificates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_certificates" ON certificates;
CREATE POLICY "admin_delete_certificates" ON certificates FOR DELETE TO authenticated USING (true);

-- ============ EXPERIENCE ============
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_en text NOT NULL DEFAULT '',
  role_ar text NOT NULL DEFAULT '',
  company_en text NOT NULL DEFAULT '',
  company_ar text NOT NULL DEFAULT '',
  period text DEFAULT '',
  responsibilities_en text[] DEFAULT ARRAY[]::text[],
  responsibilities_ar text[] DEFAULT ARRAY[]::text[],
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_experience" ON experience;
CREATE POLICY "public_read_experience" ON experience FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_experience" ON experience;
CREATE POLICY "admin_insert_experience" ON experience FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_experience" ON experience;
CREATE POLICY "admin_update_experience" ON experience FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_experience" ON experience;
CREATE POLICY "admin_delete_experience" ON experience FOR DELETE TO authenticated USING (true);

-- ============ GALLERY ITEMS ============
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'projects',
  caption_en text DEFAULT '',
  caption_ar text DEFAULT '',
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_gallery" ON gallery_items;
CREATE POLICY "public_read_gallery" ON gallery_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_gallery" ON gallery_items;
CREATE POLICY "admin_insert_gallery" ON gallery_items FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_gallery" ON gallery_items;
CREATE POLICY "admin_update_gallery" ON gallery_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_gallery" ON gallery_items;
CREATE POLICY "admin_delete_gallery" ON gallery_items FOR DELETE TO authenticated USING (true);

-- ============ BLOG POSTS ============
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL DEFAULT '',
  title_ar text NOT NULL DEFAULT '',
  excerpt_en text DEFAULT '',
  excerpt_ar text DEFAULT '',
  content_en text DEFAULT '',
  content_ar text DEFAULT '',
  category text DEFAULT 'research',
  tags text[] DEFAULT ARRAY[]::text[],
  image_url text DEFAULT '',
  published boolean DEFAULT true,
  published_at date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_blog" ON blog_posts;
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_blog" ON blog_posts;
CREATE POLICY "admin_insert_blog" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_blog" ON blog_posts;
CREATE POLICY "admin_update_blog" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_blog" ON blog_posts;
CREATE POLICY "admin_delete_blog" ON blog_posts FOR DELETE TO authenticated USING (true);

-- ============ TESTIMONIALS ============
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_en text NOT NULL DEFAULT '',
  quote_ar text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  role_en text DEFAULT '',
  role_ar text DEFAULT '',
  avatar_url text DEFAULT '',
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- ============ SERVICES ============
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL DEFAULT '',
  title_ar text NOT NULL DEFAULT '',
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  icon text DEFAULT 'Code',
  sort_order int DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services" ON services FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services" ON services FOR DELETE TO authenticated USING (true);

-- ============ MESSAGES ============
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  subject text DEFAULT '',
  message text NOT NULL DEFAULT '',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_read_messages" ON messages;
CREATE POLICY "admin_read_messages" ON messages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_messages" ON messages;
CREATE POLICY "admin_update_messages" ON messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_messages" ON messages;
CREATE POLICY "admin_delete_messages" ON messages FOR DELETE TO authenticated USING (true);

-- ============ SOCIAL LINKS ============
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  icon text DEFAULT 'Globe',
  sort_order int DEFAULT 0,
  visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_social" ON social_links;
CREATE POLICY "public_read_social" ON social_links FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_social" ON social_links;
CREATE POLICY "admin_insert_social" ON social_links FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_social" ON social_links;
CREATE POLICY "admin_update_social" ON social_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_social" ON social_links;
CREATE POLICY "admin_delete_social" ON social_links FOR DELETE TO authenticated USING (true);

-- ============ CONTACT INFO ============
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text DEFAULT '',
  phone text DEFAULT '',
  whatsapp text DEFAULT '',
  telegram text DEFAULT '',
  location_en text DEFAULT '',
  location_ar text DEFAULT '',
  working_hours_en text DEFAULT '',
  working_hours_ar text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_contact_info" ON contact_info;
CREATE POLICY "public_read_contact_info" ON contact_info FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_contact_info" ON contact_info;
CREATE POLICY "admin_insert_contact_info" ON contact_info FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_contact_info" ON contact_info;
CREATE POLICY "admin_update_contact_info" ON contact_info FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_contact_info" ON contact_info;
CREATE POLICY "admin_delete_contact_info" ON contact_info FOR DELETE TO authenticated USING (true);

-- ============ SITE SETTINGS ============
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title text DEFAULT 'Abdullah Al-Selwi',
  meta_description text DEFAULT '',
  seo_keywords text[] DEFAULT ARRAY[]::text[],
  footer_text_en text DEFAULT '',
  footer_text_ar text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_settings" ON site_settings;
CREATE POLICY "admin_insert_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_update_settings" ON site_settings;
CREATE POLICY "admin_update_settings" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "admin_delete_settings" ON site_settings;
CREATE POLICY "admin_delete_settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- ============ ACTIVITY LOGS ============
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL DEFAULT '',
  entity text NOT NULL DEFAULT '',
  entity_id uuid,
  details text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_read_logs" ON activity_logs;
CREATE POLICY "admin_read_logs" ON activity_logs FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_logs" ON activity_logs;
CREATE POLICY "admin_insert_logs" ON activity_logs FOR INSERT TO authenticated WITH CHECK (true);

-- ============ SEED DATA ============
INSERT INTO profile (name, bio_en, bio_ar, hero_subtitle_en, hero_subtitle_ar)
SELECT 'Abdullah Dia''a Hassan Sief Al-Selwi',
  ARRAY['I''m a third-year Computer Science student at Sana''a University, driven by a deep curiosity for how systems work — and how they break. My journey blends the rigor of academic research with the pragmatism of building real, usable software.',
        'I''m passionate about cybersecurity, artificial intelligence, and the intersection where they meet: securing intelligent systems and the IoT networks they live on. From penetration testing with Kali Linux to architecting full-stack applications, I treat every project as a chance to learn something new and raise the bar for what I can deliver.',
        'Beyond the screen, I believe in continuous learning, clear communication, and leadership that lifts the whole team. I''m always exploring the next technology, the next vulnerability, the next idea worth turning into something real.'],
  ARRAY['أنا طالب علوم حاسوب في السنة الثالثة بجامعة صنعاء، يحركني فضول عميق لفهم كيف تعمل الأنظمة — وكيف تنكسر. تجمع رحلتي بين صرامة البحث الأكاديمي وبراغماتية بناء برمجيات حقيقية قابلة للاستخدام.',
        'أشغف بالأمن السيبراني والذكاء الاصطناعي ونقطة التقاءهما: تأمين الأنظمة الذكية وشبكات إنترنت الأشياء التي تعيش عليها. من اختبار الاختراق باستخدام Kali Linux إلى تصميم تطبيقات Full Stack، أعتبر كل مشروع فرصة لتعلم شيء جديد ورفع سقف ما يمكنني تقديمه.',
        'خارج الشاشة، أؤمن بالتعلم المستمر والتواصل الواضح والقيادة التي ترفع الفريق بأكمله. أستكشف دائماً التقنية التالية، والثغرة التالية، والفكرة التالية التي تستحق أن تتحول إلى شيء حقيقي.'],
  'Bridging security, intelligence, and elegant engineering to build resilient systems for tomorrow.',
  'أربط بين الأمن والذكاء الاصطناعي والهندسة الأنيقة لبناء أنظمة مرنة لمستقبل الغد.'
WHERE NOT EXISTS (SELECT 1 FROM profile);

INSERT INTO projects (title_en, title_ar, description_en, description_ar, image_url, github_url, live_url, tech, category, sort_order, published)
SELECT 'Smart Home Intrusion Detection System using AI', 'نظام كشف التسلط للمنازل الذكية باستخدام الذكاء الاصطناعي',
  'An AI-powered system that monitors smart home networks and detects anomalous behavior in real time, combining machine learning with IoT security principles.',
  'نظام مدعوم بالذكاء الاصطناعي يراقب شبكات المنازل الذكية ويكشف السلوك الشاذ في الوقت الحقيقي، يجمع بين تعلم الآلة ومبادئ أمن إنترنت الأشياء.',
  'https://images.pexels.com/photos/1807336/pexels-photo-1807336.jpeg', 'https://github.com', '#', ARRAY['Python','TensorFlow','IoT','Cybersecurity'], 'AI', 1, true
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

INSERT INTO projects (title_en, title_ar, description_en, description_ar, image_url, github_url, live_url, tech, category, sort_order, published)
SELECT 'Portfolio Website', 'موقع البورتفوليو',
  'A premium, bilingual, fully-responsive personal portfolio with animated dark/light themes, glassmorphism, and a CMS-driven content model.',
  'بورتفوليو شخصي ثنائي اللغة ومتجاوب بالكامل مع سمات داكنة/فاتحة متحركة وتأثيرات زجاجية ونظام محتوى قابل للإدارة.',
  'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg', 'https://github.com', '#', ARRAY['Next.js','TypeScript','Tailwind CSS','Framer Motion'], 'Web', 2, true
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title_en = 'Portfolio Website');

INSERT INTO projects (title_en, title_ar, description_en, description_ar, image_url, github_url, live_url, tech, category, sort_order, published)
SELECT 'Cybersecurity Learning Platform', 'منصة تعلم الأمن السيبراني',
  'An interactive platform for learning offensive and defensive security concepts, with hands-on labs and progress tracking.',
  'منصة تفاعلية لتعلم مفاهيم الأمن الهجومي والدفاعي مع مختبرات عملية وتتبع التقدم.',
  'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg', 'https://github.com', '#', ARRAY['React','Node.js','Supabase','Kali Linux'], 'Security', 3, true
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title_en = 'Cybersecurity Learning Platform');

INSERT INTO projects (title_en, title_ar, description_en, description_ar, image_url, github_url, live_url, tech, category, sort_order, published)
SELECT 'IoT Security Dashboard', 'لوحة أمن إنترنت الأشياء',
  'A monitoring dashboard that visualizes IoT device security posture, network traffic, and threat alerts in a single pane.',
  'لوحة مراقبة تعرض حالة أمان أجهزة إنترنت الأشياء وحركة الشبكة وتنبيهات التهديدات في لوحة واحدة.',
  'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg', 'https://github.com', '#', ARRAY['Next.js','TypeScript','Wireshark','Nmap'], 'IoT', 4, true
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title_en = 'IoT Security Dashboard');

INSERT INTO projects (title_en, title_ar, description_en, description_ar, image_url, github_url, live_url, tech, category, sort_order, published)
SELECT 'ZIDO STORE', 'ZIDO STORE',
  'A full-featured e-commerce storefront with product catalog, cart, and secure checkout — built for speed and conversion.',
  'واجهة متجر إلكتروني متكامل مع كتالوج منتجات وسلة دفع آمن — مبني للسرعة والتحويل.',
  'https://images.pexels.com/photos/2305444/pexels-photo-2305444.jpeg', 'https://github.com', '#', ARRAY['React','Tailwind CSS','PostgreSQL','Stripe'], 'Web', 5, true
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title_en = 'ZIDO STORE');

INSERT INTO projects (title_en, title_ar, description_en, description_ar, image_url, github_url, live_url, tech, category, sort_order, published)
SELECT 'University Projects', 'مشاريع جامعية',
  'A collection of academic projects spanning algorithms, databases, software engineering, and networking — each built to production standards.',
  'مجموعة من المشاريع الأكاديمية تشمل الخوارزميات وقواعد البيانات وهندسة البرمجيات والشبكات — مبنية بمعايير الإنتاج.',
  'https://images.pexels.com/photos/2078805/pexels-photo-2078805.jpeg', 'https://github.com', '#', ARRAY['Java','Python','SQL','Git'], 'Academic', 6, true
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title_en = 'University Projects');

INSERT INTO skills (name, category, icon, level, sort_order, published)
SELECT * FROM (VALUES
  ('Python','programming','Terminal',90,1,true),
  ('Java','programming','Cpu',80,2,true),
  ('JavaScript','programming','Code2',85,3,true),
  ('TypeScript','programming','FileCode',82,4,true),
  ('React','web','Globe',88,5,true),
  ('Next.js','web','Layers',85,6,true),
  ('Tailwind CSS','web','Layers',90,7,true),
  ('HTML','web','FileCode',95,8,true),
  ('CSS','web','Layers',90,9,true),
  ('Cybersecurity','security','Shield',85,10,true),
  ('Kali Linux','security','Terminal',82,11,true),
  ('Nmap','security','Radar',80,12,true),
  ('Burp Suite','security','Bug',78,13,true),
  ('Wireshark','security','Activity',80,14,true),
  ('Networking','security','Network',85,15,true),
  ('Git','tools','GitBranch',85,16,true),
  ('GitHub','tools','Github',88,17,true),
  ('Linux','tools','Terminal',85,18,true),
  ('Communication','soft','MessageSquare',88,19,true),
  ('Leadership','soft','Users',82,20,true),
  ('Problem Solving','soft','Lightbulb',90,21,true),
  ('Research','soft','Search',88,22,true),
  ('Continuous Learning','soft','BookOpen',95,23,true),
  ('Microsoft Office','office','FileCode',90,24,true),
  ('Digital Marketing','office','Megaphone',80,25,true),
  ('Data Entry','office','Database',88,26,true),
  ('Typing Arabic','office','Keyboard',95,27,true),
  ('Typing English','office','Keyboard',90,28,true)
) AS v(name, category, icon, level, sort_order, published)
WHERE NOT EXISTS (SELECT 1 FROM skills LIMIT 1);

INSERT INTO certificates (name_en, name_ar, issuer, sort_order, published)
SELECT * FROM (VALUES
  ('ICDL','الرخصة الدولية لقيادة الحاسوب ICDL','',1,true),
  ('Cybersecurity Awareness','الوعي بالأمن السيبراني','',2,true),
  ('Office Management','إدارة المكتب','',3,true),
  ('Administrative Correspondence','المراسلات الإدارية','',4,true),
  ('Digital Marketing','التسويق الرقمي','',5,true),
  ('Charisma','الجاذبية والكاريزما','',6,true),
  ('Leadership','القيادة','',7,true),
  ('English Diploma','دبلوم اللغة الإنجليزية','',8,true),
  ('Organizational Archiving','الأرشفة التنظيمية','',9,true),
  ('Self Marketing','التسويق الذاتي','',10,true)
) AS v(name_en, name_ar, issuer, sort_order, published)
WHERE NOT EXISTS (SELECT 1 FROM certificates LIMIT 1);

INSERT INTO experience (role_en, role_ar, company_en, company_ar, period, responsibilities_en, responsibilities_ar, sort_order, published)
SELECT 'Sales Representative', 'مندوب مبيعات',
  'Redline for Industrial Equipment and Safety Tools', 'Redline للمعدات الصناعية وأدوات السلامة',
  'Professional Experience',
  ARRAY['Customer Management','Excel Reports','Data Entry','Office Documentation','Administrative Tasks','Time Management','Professional Communication'],
  ARRAY['إدارة العملاء','تقارير Excel','إدخال البيانات','توثيق المكتب','المهام الإدارية','إدارة الوقت','التواصل المهني'],
  1, true
WHERE NOT EXISTS (SELECT 1 FROM experience LIMIT 1);

INSERT INTO services (title_en, title_ar, description_en, description_ar, icon, sort_order, published)
SELECT * FROM (VALUES
  ('Web Development','تطوير الويب','Modern, responsive, and performant web applications built with Next.js, TypeScript, and Tailwind CSS.','تطبيقات ويب حديثة ومتجاوبة وعالية الأداء مبنية بـ Next.js و TypeScript و Tailwind CSS.','Code',1,true),
  ('Cybersecurity Consulting','استشارات الأمن السيبراني','Security assessments, vulnerability analysis, and hardening guidance using industry-standard tools.','تقييمات أمنية وتحليل الثغرات وإرشادات التحصين باستخدام أدوات قياسية في الصناعة.','Shield',2,true),
  ('AI Solutions','حلول الذكاء الاصطناعي','Machine learning model integration, research prototyping, and intelligent automation pipelines.','دمج نماذج تعلم الآلة ونماذج البحث الأولية وخطوط الأتمتة الذكية.','Brain',3,true),
  ('Python Development','تطوير Python','Scripts, automation, data processing, and backend services engineered in clean, idiomatic Python.','سكربتات وأتمتة ومعالجة بيانات وخدمات خلفية بـ Python نظيفة وأنيقة.','Terminal',4,true),
  ('Networking & IoT','الشبكات وإنترنت الأشياء','Network design, traffic analysis, and IoT security reviews to keep your connected systems safe.','تصميم الشبكات وتحليل حركة المرور ومراجعات أمان إنترنت الأشياء.','Network',5,true),
  ('Technical Research','البحث التقني','Deep-dive research, technical writing, and proof-of-concept development for emerging technologies.','أبحاث متعمقة وكتابة تقنية وتطوير إثبات المفهوم للتقنيات الناشئة.','Search',6,true)
) AS v(title_en, title_ar, description_en, description_ar, icon, sort_order, published)
WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);

INSERT INTO testimonials (quote_en, quote_ar, author, role_en, role_ar, avatar_url, sort_order, published)
SELECT * FROM (VALUES
  ('Abdullah brings a rare combination of security mindset and product sensibility. His work is thorough and always thoughtful.','يجمع عبدالله بين عقلية الأمن والحس المنتجي بشكل نادر. عمله دقيق ومفكر دائماً.','University Supervisor','Computer Science Dept.','قسم علوم الحاسوب','https://images.pexels.com/photos/2206158/pexels-photo-2206158.jpeg',1,true),
  ('Reliable, detail-oriented, and genuinely curious. Abdullah elevated every project he touched on our team.','موثوق ودقيق وفضولي بحق. رفع عبدالله كل مشروع لمسه في فريقنا.','Project Teammate','Software Engineering Course','مساق هندسة البرمجيات','https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',2,true),
  ('He communicates clearly, manages his time impeccably, and always delivers more than expected.','يتواصل بوضوح ويدير وقته بإتقان ويقدم دائماً أكثر من المتوقع.','Colleague','Redline','Redline','https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',3,true)
) AS v(quote_en, quote_ar, author, role_en, role_ar, avatar_url, sort_order, published)
WHERE NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1);

INSERT INTO blog_posts (title_en, title_ar, excerpt_en, excerpt_ar, category, image_url, published, published_at)
SELECT * FROM (VALUES
  ('Securing the Smart Home: An AI Approach','تأمين المنزل الذكي: نهج بالذكاء الاصطناعي','How machine learning can detect intrusions in IoT-heavy home networks before damage is done.','كيف يمكن لتعلم الآلة كشف التسلط في شبكات إنترنت الأشياء المنزلية قبل وقوع الضرر.','security','https://images.pexels.com/photos/60504/security-protection-antivirus-software-60504.jpeg',true,'2025-03-12'::date),
  ('Why TypeScript Changed How I Build','كيف غيّر TypeScript طريقة بنائي','A reflection on type safety, developer experience, and scaling frontend codebases.','تأملات في أمان الأنواع وتجربة المطور وتوسيع قواعد الكود الأمامية.','web','https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',true,'2025-02-02'::date),
  ('From Nmap to Burp Suite: A Recon Mindset','من Nmap إلى Burp Suite: عقلية الاستطلاع','A practical walkthrough of the reconnaissance phase of a security assessment.','شرح عملي لمرحلة الاستطلاع في تقييم أمني.','security','https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',true,'2025-01-18'::date),
  ('Research as a Superpower for Developers','البحث كقوة خارقة للمطورين','Why reading papers and reproducing results makes you a better engineer.','لماذا تجعل قراءة الأوراق وإعادة إنتاج النتائج منك مهندساً أفضل.','research','https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',true,'2024-12-05'::date)
) AS v(title_en, title_ar, excerpt_en, excerpt_ar, category, image_url, published, published_at)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);

INSERT INTO gallery_items (image_url, category, caption_en, caption_ar, sort_order, published)
SELECT * FROM (VALUES
  ('https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg','projects','','',1,true),
  ('https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg','projects','','',2,true),
  ('https://images.pexels.com/photos/1807336/pexels-photo-1807336.jpeg','projects','','',3,true),
  ('https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg','certificates','','',4,true),
  ('https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg','certificates','','',5,true),
  ('https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg','certificates','','',6,true),
  ('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg','events','','',7,true),
  ('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg','events','','',8,true),
  ('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg','events','','',9,true)
) AS v(image_url, category, caption_en, caption_ar, sort_order, published)
WHERE NOT EXISTS (SELECT 1 FROM gallery_items LIMIT 1);

INSERT INTO social_links (platform, url, icon, sort_order, visible)
SELECT * FROM (VALUES
  ('GitHub','https://github.com','Github',1,true),
  ('LinkedIn','https://linkedin.com','Linkedin',2,true),
  ('Telegram','https://t.me','Send',3,true),
  ('Facebook','https://facebook.com','Facebook',4,true),
  ('Instagram','https://instagram.com','Instagram',5,true),
  ('X','https://x.com','Twitter',6,true),
  ('YouTube','https://youtube.com','Youtube',7,true),
  ('Website','#','Globe',8,true)
) AS v(platform, url, icon, sort_order, visible)
WHERE NOT EXISTS (SELECT 1 FROM social_links LIMIT 1);

INSERT INTO contact_info (email, phone, whatsapp, telegram, location_en, location_ar, working_hours_en, working_hours_ar)
SELECT 'abdullah.alselwi@example.com', '+967 770 000 000', '+967 770 000 000', '@abdullah_alselwi',
  'Sana''a, Yemen', 'صنعاء، اليمن', 'Sat — Thu, 9:00 — 18:00', 'السبت — الخميس، 9:00 — 18:00'
WHERE NOT EXISTS (SELECT 1 FROM contact_info LIMIT 1);

INSERT INTO site_settings (site_title, meta_description, seo_keywords, footer_text_en, footer_text_ar)
SELECT 'Abdullah Al-Selwi',
  'Computer Science student, cybersecurity enthusiast, AI researcher, and full-stack developer.',
  ARRAY['Abdullah Al-Selwi','Cybersecurity','Full Stack Developer','Computer Science','Portfolio'],
  'Designed & built with care.',
  'صُمم وبُني بعناية.'
WHERE NOT EXISTS (SELECT 1 FROM site_settings LIMIT 1);
