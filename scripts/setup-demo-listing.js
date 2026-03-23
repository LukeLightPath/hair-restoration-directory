/**
 * Create a demo listing for testing notifications.
 * 
 * Usage: node scripts/setup-demo-listing.js
 * 
 * What it does:
 * 1. Creates a demo@hairrestorationguide.com user in Supabase Auth (if not exists)
 * 2. Creates a profile for that user
 * 3. Creates a demo listing in Liverpool (claimed by that user)
 * 
 * After running, you can:
 * - Visit /uk/liverpool/demo-test-clinic-liverpool to see the listing
 * - Submit an enquiry on that page to test email + SMS notifications
 * - Log in as demo@hairrestorationguide.com to see the dashboard
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const DEMO_EMAIL = 'demo@hairrestorationguide.com'
const DEMO_PASSWORD = 'DemoTest2026!'

async function main() {
  console.log('Setting up demo listing...\n')

  // 1. Create or find demo user
  console.log('1. Creating demo user...')
  let userId

  // Try to find existing user
  const { data: existingUsers } = await supabase.auth.admin.listUsers()
  const existingUser = existingUsers?.users?.find(u => u.email === DEMO_EMAIL)

  if (existingUser) {
    userId = existingUser.id
    console.log(`   Found existing user: ${userId}`)
  } else {
    const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
    })

    if (authError) {
      console.error('   Auth error:', authError.message)
      process.exit(1)
    }

    userId = newUser.user.id
    console.log(`   Created new user: ${userId}`)
  }

  // 2. Ensure profile exists
  console.log('2. Creating profile...')
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: 'Demo Tester',
      business_name: 'Demo Test Clinic',
      phone: null,
      role: 'clinic_owner',
    }, { onConflict: 'id' })

  if (profileError) {
    console.error('   Profile error:', profileError.message)
  } else {
    console.log('   Profile ready')
  }

  // 3. Create demo listing
  console.log('3. Creating demo listing...')

  const slug = 'demo-test-clinic-liverpool'

  // Check if it already exists
  const { data: existing } = await supabase
    .from('listings')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    // Update it to be claimed
    const { error: updateErr } = await supabase
      .from('listings')
      .update({
        claimed: true,
        claimed_by: userId,
        claim_status: 'approved',
        notifications_off: false,
      })
      .eq('id', existing.id)

    if (updateErr) {
      console.error('   Update error:', updateErr.message)
    } else {
      console.log(`   Updated existing listing: ${existing.id}`)
    }
  } else {
    const { data: newListing, error: insertErr } = await supabase
      .from('listings')
      .insert({
        slug,
        title: 'Demo Test Clinic',
        city: 'Liverpool',
        county: 'Liverpool',
        country: 'United Kingdom',
        street: '1 Test Street',
        postcode: 'L1 1AA',
        phone: '+44 7378 433383', // Use your own mobile for SMS testing
        email: DEMO_EMAIL,
        website: 'https://hairrestorationguide.com',
        description: 'This is a demo listing for testing notifications. It is not a real clinic.',
        treatment_category: 'Cosmetic Systems',
        business_status: 'OPERATIONAL',
        google_rating: 5.0,
        google_review_count: 1,
        pricing_tier: '££',
        men_women_both: 'Both',
        free_consultation: 'Yes',
        has_private_room: true,
        claimed: true,
        claimed_by: userId,
        claim_status: 'approved',
        notifications_off: false,
        meta_title: 'Demo Test Clinic Liverpool | Hair Restoration Guide',
        meta_description: 'Demo listing for testing. Not a real clinic.',
      })
      .select()
      .single()

    if (insertErr) {
      console.error('   Insert error:', insertErr.message)
    } else {
      console.log(`   Created listing: ${newListing.id}`)

      // Create listing_services row
      await supabase.from('listing_services').upsert({
        listing_id: newListing.id,
        has_hair_systems: true,
        has_smp: true,
        has_wigs: false,
        has_extensions: false,
        has_prp: false,
        has_transplant: false,
        has_trichology: false,
        has_laser: false,
        has_fitting: true,
        has_toppers: false,
        has_integration: false,
        has_cranial: false,
      }, { onConflict: 'listing_id' })
    }
  }

  console.log('\n✓ Demo setup complete!')
  console.log('\n--- Test Instructions ---')
  console.log(`1. Visit: /uk/liverpool/demo-test-clinic-liverpool`)
  console.log(`2. Submit an enquiry via the contact form`)
  console.log(`3. Check ${DEMO_EMAIL} for the email notification`)
  console.log(`4. Check the phone for SMS (if Twilio is configured)`)
  console.log(`5. Log in as ${DEMO_EMAIL} / ${DEMO_PASSWORD} to see the dashboard`)
  console.log(`\nNote: Update the phone number in the listing if you want SMS sent elsewhere.`)
}

main().catch(console.error)
