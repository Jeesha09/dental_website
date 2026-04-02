-- CleftConnect Database Schema
-- Comprehensive multi-table schema for cleft lip and palate care management

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===== USERS & AUTHENTICATION =====

-- Users table (parents/guardians)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'parent', -- 'parent', 'doctor', 'ngo_staff', 'admin'
  language_preference VARCHAR(10) DEFAULT 'en', -- 'en', 'hi'
  accessibility_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== CHILD RECORDS =====

-- Children table
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20),
  cleft_type VARCHAR(100), -- 'unilateral-lip', 'bilateral-lip', 'palate-only', 'lip-and-palate'
  cleft_side VARCHAR(50), -- 'left', 'right', 'bilateral'
  location VARCHAR(255), -- city, state
  medical_id VARCHAR(100),
  assigned_doctor_id UUID,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'inactive', 'archived'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== TREATMENT TIMELINE MILESTONES =====

-- Milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  milestone_type VARCHAR(100), -- 'lip-repair', 'palate-repair', 'speech-assessment', 'bone-graft', 'orthodontics'
  scheduled_age_months INT,
  scheduled_date DATE,
  actual_date DATE,
  purpose TEXT,
  expected_outcomes TEXT,
  preparation_tips TEXT,
  doctor_id UUID,
  hospital_id UUID,
  status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'postponed', 'missed'
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Milestone reminders
CREATE TABLE IF NOT EXISTS milestone_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  reminder_date DATE,
  reminder_type VARCHAR(50), -- 'email', 'sms', 'app'
  sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== SPEECH TRACKING & ANALYSIS =====

-- Speech records (Speak & Shine data)
CREATE TABLE IF NOT EXISTS speech_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  recording_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  audio_url VARCHAR(500),
  transcription TEXT,
  phoneme_analysis JSONB, -- AI analysis results
  hypernasality_score FLOAT, -- 0-100 scale
  speech_clarity_score FLOAT,
  recommended_therapy BOOLEAN DEFAULT FALSE,
  therapy_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Speech game sessions (Speak & Shine gameplay)
CREATE TABLE IF NOT EXISTS speech_game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  words_attempted INT,
  correct_pronunciations INT,
  game_level INT DEFAULT 1,
  stars_earned INT,
  duration_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== FEEDING TRACKING & ANALYSIS =====

-- Feeding records
CREATE TABLE IF NOT EXISTS feeding_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  video_url VARCHAR(500),
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  baby_positioning_score FLOAT, -- AI analysis: 0-100
  aspiration_risk_level VARCHAR(50), -- 'low', 'moderate', 'high'
  regurgitation_detected BOOLEAN,
  latching_quality_score FLOAT,
  feeding_efficiency_score FLOAT,
  recommendations TEXT,
  analyzed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== GROWTH & FACIAL ANALYSIS =====

-- Growth tracking (facial symmetry, development)
CREATE TABLE IF NOT EXISTS growth_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  photo_url VARCHAR(500),
  photo_date DATE,
  age_months INT,
  facial_symmetry_score FLOAT, -- 0-100, higher is more symmetric
  maxillary_development_score FLOAT,
  post_surgery_progress_notes TEXT,
  compared_to_previous_id UUID REFERENCES growth_records(id),
  ai_analysis JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== HEALTHCARE PROVIDERS =====

-- Doctors
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id),
  specialization VARCHAR(100), -- 'cleft-surgeon', 'orthodontist', 'speech-therapist', 'anesthesiologist'
  license_number VARCHAR(100),
  hospital_id UUID,
  verified BOOLEAN DEFAULT FALSE,
  biography TEXT,
  languages VARCHAR(255),
  availability_status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hospitals
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  latitude FLOAT,
  longitude FLOAT,
  phone VARCHAR(20),
  email VARCHAR(255),
  hospital_type VARCHAR(50), -- 'government', 'private', 'ngo'
  cleft_surgery_capability BOOLEAN DEFAULT FALSE,
  free_camp_facility BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NGO Organizations
CREATE TABLE IF NOT EXISTS ngo_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  services_offered TEXT, -- 'surgical', 'speech-therapy', 'financial-aid', 'counseling'
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== NATIONAL CLEFT REGISTRY =====

-- Registry entries (anonymized)
CREATE TABLE IF NOT EXISTS registry_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID UNIQUE REFERENCES children(id),
  cleft_classification VARCHAR(100),
  incidence_region VARCHAR(100),
  surgery_completed BOOLEAN DEFAULT FALSE,
  first_surgery_date DATE,
  total_surgeries INT DEFAULT 0,
  surgery_outcomes JSONB,
  follow_up_status VARCHAR(50), -- 'active', 'inactive', 'lost-to-follow-up'
  dropout_risk_score FLOAT,
  long_term_success_indicators JSONB,
  anonymized_hash VARCHAR(255) UNIQUE,
  data_shared_for_research BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== GAMIFICATION & ENGAGEMENT =====

-- Achievements/Badges
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100), -- 'speech-milestone', 'therapy-streak', 'brushing-habit', 'attendance'
  badge_name VARCHAR(100),
  badge_icon VARCHAR(500),
  earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Smile Garden (virtual garden/flowers)
CREATE TABLE IF NOT EXISTS smile_garden (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL UNIQUE REFERENCES children(id) ON DELETE CASCADE,
  total_flowers INT DEFAULT 0,
  total_stars INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  last_activity_date DATE,
  mascot_unlocked BOOLEAN DEFAULT FALSE,
  mascot_level INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily rewards log
CREATE TABLE IF NOT EXISTS daily_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  reward_date DATE DEFAULT CURRENT_DATE,
  reward_type VARCHAR(100), -- 'therapy-completion', 'speech-practice', 'brushing', 'milestone-reached'
  flowers_earned INT DEFAULT 0,
  stars_earned INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== PARENT RESOURCES & SUPPORT =====

-- FAQ/Resources
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100), -- 'faq', 'financial-aid', 'emotional-support', 'government-schemes'
  title VARCHAR(255),
  content TEXT,
  url VARCHAR(500),
  language VARCHAR(10),
  order_priority INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES users(id),
  child_name_display VARCHAR(100),
  content TEXT,
  approved BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parent consents (HIPAA-style compliance)
CREATE TABLE IF NOT EXISTS parent_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES users(id),
  child_id UUID NOT NULL REFERENCES children(id),
  data_sharing_research BOOLEAN DEFAULT FALSE,
  data_encryption_acknowledged BOOLEAN DEFAULT TRUE,
  privacy_policy_accepted BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  consent_version VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  message TEXT,
  notification_type VARCHAR(50), -- 'milestone-reminder', 'appointment', 'achievement', 'resource'
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== INDEXES FOR PERFORMANCE =====

CREATE INDEX IF NOT EXISTS idx_children_parent_id ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_doctor_id ON children(assigned_doctor_id);
CREATE INDEX IF NOT EXISTS idx_milestones_child_id ON milestones(child_id);
CREATE INDEX IF NOT EXISTS idx_speech_records_child_id ON speech_records(child_id);
CREATE INDEX IF NOT EXISTS idx_feeding_records_child_id ON feeding_records(child_id);
CREATE INDEX IF NOT EXISTS idx_growth_records_child_id ON growth_records(child_id);
CREATE INDEX IF NOT EXISTS idx_achievements_child_id ON achievements(child_id);
CREATE INDEX IF NOT EXISTS idx_smile_garden_child_id ON smile_garden(child_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_registry_child_id ON registry_entries(child_id);
CREATE INDEX IF NOT EXISTS idx_doctors_user_id ON doctors(user_id);
CREATE INDEX IF NOT EXISTS idx_hospitals_city ON hospitals(city);
CREATE INDEX IF NOT EXISTS idx_ngos_city ON ngo_organizations(city);

-- ===== ROW LEVEL SECURITY (RLS) =====

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE speech_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE smile_garden ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE registry_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own profile
CREATE POLICY "users_select_own" ON users 
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "users_insert_own" ON users 
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "users_update_own" ON users 
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policy: Parents can only see their children
CREATE POLICY "children_select_own" ON children 
  FOR SELECT USING (parent_id = auth.uid());

CREATE POLICY "children_insert_own" ON children 
  FOR INSERT WITH CHECK (parent_id = auth.uid());

CREATE POLICY "children_update_own" ON children 
  FOR UPDATE USING (parent_id = auth.uid());

-- RLS Policy: Can only see records related to own children
CREATE POLICY "milestones_select_own" ON milestones
  FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "milestones_insert_own" ON milestones
  FOR INSERT WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "speech_records_select_own" ON speech_records
  FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "feeding_records_select_own" ON feeding_records
  FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "growth_records_select_own" ON growth_records
  FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "achievements_select_own" ON achievements
  FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

-- RLS Policy: Can only see own garden
CREATE POLICY "smile_garden_select_own" ON smile_garden
  FOR SELECT USING (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "smile_garden_insert_own" ON smile_garden
  FOR INSERT WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

CREATE POLICY "registry_entries_insert_own" ON registry_entries
  FOR INSERT WITH CHECK (child_id IN (SELECT id FROM children WHERE parent_id = auth.uid()));

-- RLS Policy: Can see own notifications
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- RLS Policy: Public access to resources (FAQ, testimonials)
CREATE POLICY "resources_select_public" ON resources
  FOR SELECT USING (TRUE);

CREATE POLICY "testimonials_select_approved" ON testimonials
  FOR SELECT USING (approved = TRUE);

-- RLS Policy: Doctors can see assigned patients
CREATE POLICY "doctors_select_own" ON doctors
  FOR SELECT USING (user_id = auth.uid());

-- Allow anon users to view hospitals and NGOs (for finding help)
CREATE POLICY "hospitals_select_public" ON hospitals
  FOR SELECT USING (TRUE);

CREATE POLICY "ngos_select_public" ON ngo_organizations
  FOR SELECT USING (TRUE);

-- Create views for registry (anonymized)
CREATE OR REPLACE VIEW registry_statistics AS
SELECT 
  cleft_classification,
  COUNT(*) as total_cases,
  SUM(CASE WHEN surgery_completed THEN 1 ELSE 0 END) as surgeries_completed,
  AVG(CASE WHEN dropout_risk_score IS NOT NULL THEN dropout_risk_score ELSE 0 END) as avg_dropout_risk
FROM registry_entries
GROUP BY cleft_classification;

-- Summary statistics view
CREATE OR REPLACE VIEW cleft_incidence_by_region AS
SELECT 
  incidence_region,
  COUNT(*) as total_cases,
  SUM(CASE WHEN surgery_completed THEN 1 ELSE 0 END) as surgeries_completed,
  ROUND(100.0 * SUM(CASE WHEN follow_up_status = 'active' THEN 1 ELSE 0 END) / COUNT(*), 2) as active_followup_percentage
FROM registry_entries
WHERE incidence_region IS NOT NULL
GROUP BY incidence_region
ORDER BY total_cases DESC;
