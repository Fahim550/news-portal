-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ROLES & PERMISSIONS
CREATE TABLE public.roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Roles
INSERT INTO public.roles (name, description) VALUES
('Super Admin', 'Full access to all system features'),
('Admin', 'Administrative access with most privileges'),
('Editor', 'Can manage all content, categories, and tags'),
('Reporter', 'Can submit news for review'),
('Author', 'Can write and manage own articles'),
('Moderator', 'Can moderate comments and user content'),
('Reader', 'Standard authenticated user');

-- PROFILES (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    social_links JSONB, -- e.g., {"twitter": "...", "facebook": "..."}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AUTHORS (Specific profile details for article authors)
CREATE TABLE public.authors (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CATEGORIES
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TAGS
CREATE TABLE public.tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- NEWS (Articles)
CREATE TYPE public.news_status AS ENUM ('draft', 'pending', 'published', 'scheduled');

CREATE TABLE public.news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description_en TEXT,
    short_description_bn TEXT,
    content_en TEXT,
    content_bn TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
    status public.news_status DEFAULT 'draft',
    is_breaking BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_editors_choice BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    reading_time INTEGER, -- in minutes
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT,
    canonical_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- NEWS TAGS (Many-to-Many)
CREATE TABLE public.news_tags (
    news_id UUID REFERENCES public.news(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (news_id, tag_id)
);

-- COMMENTS
CREATE TYPE public.comment_status AS ENUM ('pending', 'approved', 'rejected', 'spam');

CREATE TABLE public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    news_id UUID REFERENCES public.news(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status public.comment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- MEDIA (Library)
CREATE TABLE public.media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    uploader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER, -- in bytes
    alt_text TEXT,
    folder VARCHAR(100) DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ADVERTISEMENTS
CREATE TYPE public.ad_placement AS ENUM ('header', 'sidebar', 'homepage', 'category', 'article_top', 'article_middle', 'article_bottom', 'footer', 'popup', 'sticky');

CREATE TABLE public.advertisements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    placement public.ad_placement NOT NULL,
    image_url TEXT,
    redirect_url TEXT,
    custom_html TEXT,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SETTINGS (Key-Value pairs for site settings)
CREATE TABLE public.settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PAGES (Static pages like About, Privacy)
CREATE TABLE public.pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content_en TEXT,
    content_bn TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) Configuration
-- (Basic RLS setup. Fine-grained policies should be added later based on roles)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active categories, tags, news, comments, etc.
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public tags are viewable by everyone" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Published news is viewable by everyone" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Approved comments are viewable by everyone" ON public.comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Active ads are viewable by everyone" ON public.advertisements FOR SELECT USING (is_active = true);
CREATE POLICY "Published pages are viewable by everyone" ON public.pages FOR SELECT USING (is_published = true);

-- Enable Realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.news;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
