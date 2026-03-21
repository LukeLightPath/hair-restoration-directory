// Run from project root: node scripts/create-demo-user.mjs
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mazinyslabtuutstgonk.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hemlueXNsYWJ0dXV0c3Rnb25rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc1OTQzMywiZXhwIjoyMDg5MzM1NDMzfQ.j410pdFHH_OhlTDKAG9RV1cCUObukUmb4cWTnmcLdbw'

const DEMO_EMAIL = 'demo@hairrestorationguide.com'
const DEMO_PASSWORD = 'demo123456'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function main() {
  // 1. Create demo user (or get existing)
  console.log('Creating demo user...')
  let userId

  const { data: existingUsers } = await supabase.auth.admin.listUsers()
  const existingUser = existingUsers?.users?.find(u => u.email === DEMO_EMAIL)

  if (existingUser) {
    userId = existingUser.id
    console.log(`Demo user already exists: ${userId}`)
  } else {
    const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Demo Clinic Owner' }
    })
    if (createErr) { console.error('Create user error:', createErr); return }
    userId = newUser.user.id
    console.log(`Created demo user: ${userId}`)
  }

  // 2. Create/update profile
  console.log('Setting up profile...')
  const { error: profileErr } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: 'Demo Clinic Owner',
      role: 'clinic_owner'
    }, { onConflict: 'id' })
  if (profileErr) console.error('Profile error:', profileErr)
  else console.log('Profile ready')

  // 3. Pick a listing to claim
  console.log('Finding a listing to claim...')
  const { data: listing, error: listErr } = await supabase
    .from('listings')
    .select('id, title, city, slug')
    .eq('business_status', 'OPERATIONAL')
    .not('google_rating', 'is', null)
    .order('google_rating', { ascending: false })
    .limit(1)
    .single()

  if (listErr || !listing) { console.error('No listing found:', listErr); return }
  console.log(`Claiming: "${listing.title}" in ${listing.city}`)

  // 4. Claim the listing
  const { error: claimErr } = await supabase
    .from('listings')
    .update({
      claimed: true,
      claimed_by: userId,
      claim_status: 'approved'
    })
    .eq('id', listing.id)
  if (claimErr) console.error('Claim error:', claimErr)
  else console.log('Listing claimed')

  // 5. Seed analytics data for this month
  console.log('Seeding analytics data...')
  const today = new Date()
  const analyticsRows = []

  for (let i = 0; i < 15; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (d.getMonth() !== today.getMonth()) break

    analyticsRows.push({
      listing_id: listing.id,
      date: d.toISOString().split('T')[0],
      page_views: Math.floor(Math.random() * 30) + 5,
      phone_clicks: Math.floor(Math.random() * 8) + 1,
      website_clicks: Math.floor(Math.random() * 12) + 2,
      inquiry_count: Math.floor(Math.random() * 3)
    })
  }

  const { error: analyticsErr } = await supabase
    .from('listing_analytics')
    .upsert(analyticsRows, { onConflict: 'listing_id,date' })
  if (analyticsErr) console.error('Analytics seed error:', analyticsErr)
  else console.log(`Seeded ${analyticsRows.length} days of analytics`)

  // 6. Seed some inquiries
  console.log('Seeding demo inquiries...')
  const demoInquiries = [
    { listing_id: listing.id, name: 'James Wilson', email: 'james@example.com', message: "I'd like to book a consultation for hair systems." },
    { listing_id: listing.id, name: 'Sarah Mitchell', email: 'sarah@example.com', phone: '+44 7700 900123', message: 'Do you offer free consultations?' },
    { listing_id: listing.id, name: 'David Thompson', email: 'david@example.com', message: 'What are your prices for SMP?' },
  ]

  for (const inq of demoInquiries) {
    const { error: inqErr } = await supabase.from('inquiries').insert(inq)
    if (inqErr) console.log(`Inquiry for ${inq.name}: ${inqErr.message}`)
    else console.log(`Added inquiry from ${inq.name}`)
  }

  console.log('\n========================================')
  console.log('Demo account ready!')
  console.log(`Email:    ${DEMO_EMAIL}`)
  console.log(`Password: ${DEMO_PASSWORD}`)
  console.log(`Listing:  ${listing.title} (${listing.city})`)
  console.log('========================================')
}

main().catch(console.error)
