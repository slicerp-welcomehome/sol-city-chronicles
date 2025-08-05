-- Create the app_role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Ensure the user_roles table uses the correct enum type
DO $$ BEGIN
    -- Check if the column exists and update it if needed
    IF EXISTS (SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'user_roles' AND column_name = 'role') THEN
        -- Drop and recreate the column with proper type
        ALTER TABLE public.user_roles DROP COLUMN IF EXISTS role;
        ALTER TABLE public.user_roles ADD COLUMN role app_role NOT NULL;
    END IF;
END $$;