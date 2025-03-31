-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    profile_image VARCHAR(255),
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- LINKED ACCOUNTS TABLE
CREATE TABLE linked_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    provider VARCHAR(50) NOT NULL,           -- github, gitlab, etc.
    provider_user_id VARCHAR(100) NOT NULL,  -- GitHub or GitLab ID
    access_token TEXT NOT NULL,
    refresh_token TEXT,                      -- Optional: Some providers don't give refresh tokens
    token_type VARCHAR(20),
    scope VARCHAR(255),
    expires_at TIMESTAMP,
    linked_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_user FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- REFRESH TOKENS TABLE (For JWT Refresh Tokens)
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_user_refresh FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- REPOSITORIES TABLE (Optional: if you fetch repos after sign-in)
CREATE TABLE repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    linked_account_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    repo_provider_id VARCHAR(100),
    description TEXT,
    visibility VARCHAR(20),       -- public or private
    default_branch VARCHAR(50),
    clone_url VARCHAR(255),
    html_url VARCHAR(255),
    last_activity_at TIMESTAMP,
    fetched_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_linked_account FOREIGN KEY(linked_account_id)
        REFERENCES linked_accounts(id)
        ON DELETE CASCADE
);
