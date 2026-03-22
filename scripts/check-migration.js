require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  console.log('1. Checking logo_url column...')
  const { error: e1 } = await supabase.from('listings').select('logo_url').limit(1)

  if (e1) {
    console.log('   logo_url missing:', e1.message)
    console.log('   Run this SQL in the Supabase SQL Editor:')
    console.log('   ALTER TABLE listings ADD COLUMN IF NOT EXISTS logo_url TEXT;')
  } else {
    console.log('   OK logo_url column exists')
  }

  console.log('2. Checking clinic-images bucket...')
  const { data: buckets, error: e2 } = await supabase.storage.listBuckets()
  if (e2) { console.log('   bucket error:', e2.message); return }

  const found = buckets?.find(x => x.name === 'clinic-images')
  if (found) {
    console.log('   OK clinic-images bucket exists, public:', found.public)
  } else {
    console.log('   Creating clinic-images bucket...')
    const { error: e3 } = await supabase.storage.createBucket('clinic-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      fileSizeLimit: 5 * 1024 * 1024,
    })
    if (e3) console.log('   create error:', e3.message)
    else console.log('   OK bucket created')
  }

  console.log('Done.')
}

run().catch(console.error)
