-- 1. Remove editor and moderator roles
DELETE FROM public.roles WHERE id IN ('editor', 'moderator');

-- 2. Add unique constraint to authors on profile_id so we can safely upsert
-- Note: We must ensure no duplicates exist before adding this constraint.
-- If duplicates exist, this will fail, which is intended to prevent data corruption.
ALTER TABLE public.authors ADD CONSTRAINT authors_profile_id_key UNIQUE (profile_id);

-- 3. Create a trigger function to sync profile to author
CREATE OR REPLACE FUNCTION public.sync_author_from_profile()
RETURNS TRIGGER AS $$
DECLARE
    author_slug TEXT;
    full_name TEXT;
BEGIN
    -- Only sync if the role is 'author'
    IF NEW.role_id = 'author' THEN
        -- Construct full name
        full_name := TRIM(COALESCE(NEW.first_name, '') || ' ' || COALESCE(NEW.last_name, ''));
        IF full_name = '' THEN
            full_name := 'Unknown Author';
        END IF;

        -- Create a base slug and append part of the UUID to ensure uniqueness
        author_slug := LOWER(REGEXP_REPLACE(full_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || SUBSTRING(NEW.id::text, 1, 6);

        -- Upsert into authors table
        INSERT INTO public.authors (profile_id, name, slug, photo, bio, social_links)
        VALUES (NEW.id, full_name, author_slug, NEW.avatar_url, NEW.bio, NEW.social_links)
        ON CONFLICT (profile_id) DO UPDATE SET
            name = EXCLUDED.name,
            photo = EXCLUDED.photo,
            bio = EXCLUDED.bio,
            social_links = EXCLUDED.social_links,
            updated_at = timezone('utc'::text, now());
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Attach trigger to profiles
DROP TRIGGER IF EXISTS on_profile_sync_author ON public.profiles;
CREATE TRIGGER on_profile_sync_author
AFTER INSERT OR UPDATE OF role_id, first_name, last_name, avatar_url, bio, social_links
ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_author_from_profile();
