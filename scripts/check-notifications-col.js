/**
 * Run the notifications_off migration
 */
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function main() {
  // Check if column exists first
  const { data: test } = await supabase
    .from('listings')
    .select('notifications_off')
    .limit(1)

  if (test !== null) {
    console.log('Column notifications_off already exists')
    process.exit(0)
  }

  // If we get here, the column doesn't exist — run via RPC or direct SQL
  console.log('Column does not exist. Please run the following SQL in Supabase SQL Editor:')
  console.log('')
  console.log("ALTER TABLE listings ADD COLUMN IF NOT EXISTS notifications_off boolean DEFAULT false;")
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
