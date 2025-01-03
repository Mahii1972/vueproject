-- 1. Categories Table (for art categories like paintings, drawings, digital art, etc.)
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Artworks Table
CREATE TABLE artworks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500) NOT NULL,  -- Main artwork image
    category_id BIGINT,
    artist_name VARCHAR(255) NOT NULL,
    medium VARCHAR(255),  -- e.g., "Oil on canvas", "Watercolor", "Charcoal"
    dimensions VARCHAR(100),  -- e.g., "24x36 inches"
    status VARCHAR(20) DEFAULT 'available' 
        CHECK (status IN ('available', 'sold', 'hidden')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create basic indexes
CREATE INDEX idx_artworks_status ON artworks(status);
CREATE INDEX idx_artworks_category_id ON artworks(category_id);
