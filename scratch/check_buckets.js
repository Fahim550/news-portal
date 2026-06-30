const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('Error fetching buckets:', error);
  } else {
    console.log('Buckets:', data.map(b => b.name));
    
    if (!data.some(b => b.name === 'media')) {
      console.log('Creating media bucket...');
      const { data: createData, error: createError } = await supabase.storage.createBucket('media', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
        fileSizeLimit: 10485760 // 10MB
      });
      if (createError) console.error('Error creating bucket:', createError);
      else console.log('Created media bucket:', createData);
    }
  }
}

checkBuckets();
