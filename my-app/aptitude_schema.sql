-- Aptitude App Database Schema - Essential Tables Only
-- Suitable for MySQL/MariaDB
-- Contains only tables required for current frontend functionality

-- 1. USERS TABLE (Required for login/register/auth)
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. TOPICS TABLE (Required for topic pages)
CREATE TABLE topics (
    topic_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    topic_name VARCHAR(100) NOT NULL,
    topic_slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. TOPIC VIDEOS TABLE (Required for video content in topics)
CREATE TABLE topic_videos (
    video_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    topic_id BIGINT NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
);

-- 4. TOPIC NOTES TABLE (Required for study content in topics)
CREATE TABLE topic_notes (
    note_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    topic_id BIGINT NOT NULL,
    note_content TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
);

-- 5. TOPIC EXAMPLES TABLE (Required for examples in topics)
CREATE TABLE topic_examples (
    example_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    topic_id BIGINT NOT NULL,
    example_text TEXT NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
);

-- 6. QUESTIONS TABLE (Required for quizzes)
CREATE TABLE questions (
    question_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    topic_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
);

-- 7. QUESTION OPTIONS TABLE (Required for quiz answers)
CREATE TABLE question_options (
    option_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    option_label VARCHAR(10) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

-- 8. QUIZ SESSIONS TABLE (Required for tracking quiz attempts)
CREATE TABLE quiz_sessions (
    session_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    mode ENUM('study', 'training', 'challenge') NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    total_questions INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    score DECIMAL(5,2) DEFAULT 0.00,
    time_taken_seconds INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
);

-- 9. FEEDBACK TABLE (Required for feedback system)
CREATE TABLE feedback (
    feedback_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'reviewed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- SAMPLE DATA
-- Insert default topics
INSERT INTO topics (topic_name, topic_slug, description) VALUES
('Percentage', 'percentage', 'Learn about percentages, calculations, and applications'),
('Profit and Loss', 'profit-loss', 'Understand profit, loss, and business calculations'),
('Time and Work', 'time-work', 'Solve problems related to time and work efficiency'),
('Speed, Distance & Time', 'speed-distance', 'Master speed, distance, and time calculations'),
('Ratio and Proportion', 'ratio', 'Learn about ratios, proportions, and their applications'),
('Number Series', 'number-series', 'Identify patterns and complete number sequences'),
('Problems on Ages', 'ages', 'Solve age-related mathematical problems'),
('Simple Interest', 'simple-interest', 'Calculate simple interest and related problems'),
('Probability', 'probability', 'Understand probability concepts and calculations'),
('Average', 'average', 'Learn about averages, means, and statistical concepts');

-- Insert default admin user (replace password with hashed value in production)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@aptitude.com', '$2a$10$encrypted_password_hash', 'admin');

-- Insert sample questions for percentage topic
INSERT INTO questions (topic_id, question_text, difficulty) VALUES
(1, 'What is 25% of 200?', 'easy'),
(1, 'If a number is increased by 20% and then decreased by 20%, what is the net change?', 'medium');

-- Insert options for the first question
INSERT INTO question_options (question_id, option_label, option_text, is_correct) VALUES
(1, 'A', '40', FALSE),
(1, 'B', '50', TRUE),
(1, 'C', '60', FALSE),
(1, 'D', '70', FALSE);