
-- Database schema for the AI Developer Portfolio
-- Select the ai_portfolio database before running this script.

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    email VARCHAR(254) COLLATE utf8mb4_unicode_ci NOT NULL,
    subject VARCHAR(150) COLLATE utf8mb4_unicode_ci NOT NULL,
    message TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

