/* ─── Database Types ──────────────────────────────────────── */

export interface Listing {
  id: string
  slug: string
  title: string
  city: string
  county: string | null
  country: string
  street: string | null
  postcode: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  email: string | null
  website: string | null
  description: string | null
  treatment_category: 'Cosmetic Systems' | 'Advanced Scalp Therapies' | 'Both' | 'Wig Specialist' | 'General Salon' | null
  business_status: string
  opening_hours: Record<string, string> | null
  google_rating: number | null
  google_review_count: number
  google_place_id: string | null
  google_maps_url: string | null
  google_photos_count: number
  services_list: string[] | null
  pricing_tier: string | null
  men_women_both: string | null
  free_consultation: string | null
  has_private_room: boolean
  certifications: string | null
  booking_url: string | null
  brands_stocked: string | null
  meta_title: string | null
  meta_description: string | null
  logo_url: string | null
  claimed: boolean
  claimed_by: string | null
  featured: boolean
  featured_sort_order: number
  source: string | null
  claim_status: 'none' | 'pending' | 'approved' | 'rejected'
  claim_requested_by: string | null
  claim_requested_at: string | null
  created_at: string
  updated_at: string
}

export interface ListingServices {
  listing_id: string
  has_hair_systems: boolean
  has_smp: boolean
  has_wigs: boolean
  has_extensions: boolean
  has_prp: boolean
  has_transplant: boolean
  has_trichology: boolean
  has_laser: boolean
  has_fitting: boolean
  has_toppers: boolean
  has_integration: boolean
  has_cranial: boolean
}

export interface ListingMaterials {
  listing_id: string
  base_lace: boolean | null
  base_skin: boolean | null
  base_mono: boolean | null
  hair_european: boolean | null
  hair_indian: boolean | null
  hair_chinese: boolean | null
  attachment_tape: boolean | null
  attachment_glue: boolean | null
  attachment_clips: boolean | null
}

export interface ListingSocials {
  listing_id: string
  facebook: string | null
  instagram: string | null
  tiktok: string | null
  youtube: string | null
  twitter: string | null
}

export interface ListingReview {
  id: string
  listing_id: string
  author: string | null
  rating: number | null
  review_text: string | null
  source: string
  created_at: string
}

export interface ListingImage {
  id: string
  listing_id: string
  storage_path: string
  alt_text: string | null
  sort_order: number
  uploaded_by: string | null
  created_at: string
}

export interface Inquiry {
  id: string
  listing_id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  status: string
  created_at: string
}

export interface ListingAnalytics {
  id: string
  listing_id: string
  date: string
  page_views: number
  phone_clicks: number
  website_clicks: number
  inquiry_count: number
  inquiry_clicks: number
}

export interface Profile {
  id: string
  full_name: string | null
  business_name: string | null
  phone: string | null
  role: 'clinic_owner' | 'super_admin'
  notification_email: string | null
  notification_phone: string | null
  email_notifications_on: boolean
  sms_notifications_on: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

/* ─── Composite Types (for pages) ────────────────────────── */

export interface ListingWithRelations extends Listing {
  listing_services: ListingServices | null
  listing_materials: ListingMaterials | null
  listing_socials: ListingSocials | null
  listing_reviews: ListingReview[]
  listing_images: ListingImage[]
}

/**
 * Lightweight listing type for card/list views.
 * Matches the columns in LISTING_CARD_COLUMNS from lib/data.ts.
 * Used when we SELECT only card-display fields instead of *.
 */
export type ListingCardData = Pick<Listing,
  | 'id' | 'slug' | 'title' | 'city' | 'county' | 'country' | 'street'
  | 'phone' | 'website' | 'description' | 'treatment_category'
  | 'google_rating' | 'google_review_count' | 'pricing_tier'
  | 'men_women_both' | 'claimed' | 'featured' | 'featured_sort_order'
  | 'logo_url' | 'business_status'
>

export interface CityInfo {
  city: string
  count: number
  slug: string
}

/* ─── Service Label Map ──────────────────────────────────── */

export const SERVICE_LABELS: Record<string, string> = {
  has_hair_systems: 'Hair Systems',
  has_smp: 'Scalp Micropigmentation',
  has_wigs: 'Wigs',
  has_extensions: 'Extensions',
  has_prp: 'PRP Treatment',
  has_transplant: 'Hair Transplant',
  has_trichology: 'Trichology',
  has_laser: 'Laser Therapy',
  has_fitting: 'Fitting Service',
  has_toppers: 'Hair Toppers',
  has_integration: 'Hair Integration',
  has_cranial: 'Cranial Prosthesis',
}

export const TREATMENT_CATEGORY_LABELS: Record<string, string> = {
  'Cosmetic Systems': 'Hair Replacement',
  'Advanced Scalp Therapies': 'Scalp Treatments',
  'Both': 'Full Service',
  'Wig Specialist': 'Wig Specialist',
  'General Salon': 'General Salon',
}

/* ─── Treatment Slug Map (DB column → URL slug → display) ── */

export interface TreatmentInfo {
  slug: string
  dbColumn: string
  label: string
  shortDescription: string
  seoDescription: string
  enabled: boolean
}

export const TREATMENTS: TreatmentInfo[] = [
  {
    slug: 'hair-systems',
    dbColumn: 'has_hair_systems',
    label: 'Hair Systems',
    shortDescription: 'Non-surgical hair replacement systems for natural-looking results.',
    seoDescription: 'Find clinics offering non-surgical hair replacement systems. Browse ratings, reviews and book a free consultation.',
    enabled: true,
  },
  {
    slug: 'scalp-micropigmentation',
    dbColumn: 'has_smp',
    label: 'Scalp Micropigmentation (SMP)',
    shortDescription: 'Tattooed hair follicle simulation for the appearance of a fuller head of hair.',
    seoDescription: 'Find SMP clinics near you. Scalp micropigmentation creates the look of a closely shaved head or adds density to thinning hair.',
    enabled: true,
  },
  {
    slug: 'wigs',
    dbColumn: 'has_wigs',
    label: 'Wigs',
    shortDescription: 'Custom and ready-to-wear wigs for all hair types and needs.',
    seoDescription: 'Find wig specialists near you offering custom and ready-to-wear wigs. Compare clinics, read reviews and book consultations.',
    enabled: true,
  },
  {
    slug: 'extensions',
    dbColumn: 'has_extensions',
    label: 'Hair Extensions',
    shortDescription: 'Professional hair extension services for added length and volume.',
    seoDescription: 'Find hair extension specialists near you. Compare methods, read reviews and book a free consultation.',
    enabled: true,
  },
  {
    slug: 'prp-treatment',
    dbColumn: 'has_prp',
    label: 'PRP Treatment',
    shortDescription: 'Platelet-rich plasma therapy to stimulate natural hair growth.',
    seoDescription: 'Find clinics offering PRP (platelet-rich plasma) hair restoration treatment. Compare specialists, read reviews and book consultations.',
    enabled: true,
  },
  {
    slug: 'hair-transplant',
    dbColumn: 'has_transplant',
    label: 'Hair Transplant',
    shortDescription: 'Surgical hair restoration including FUE and FUT procedures.',
    seoDescription: 'Find hair transplant clinics near you. Compare FUE and FUT specialists, read reviews and book a free consultation.',
    enabled: false,
  },
  {
    slug: 'trichology',
    dbColumn: 'has_trichology',
    label: 'Trichology',
    shortDescription: 'Specialist diagnosis and treatment of hair and scalp conditions.',
    seoDescription: 'Find qualified trichologists near you. Get expert diagnosis and treatment for hair loss, scalp conditions and more.',
    enabled: true,
  },
  {
    slug: 'laser-therapy',
    dbColumn: 'has_laser',
    label: 'Laser Therapy',
    shortDescription: 'Low-level laser therapy (LLLT) to promote hair growth and scalp health.',
    seoDescription: 'Find clinics offering laser hair therapy. Low-level laser treatment stimulates hair follicles and promotes natural regrowth.',
    enabled: true,
  },
  {
    slug: 'fitting-service',
    dbColumn: 'has_fitting',
    label: 'Fitting Service',
    shortDescription: 'Professional fitting and maintenance services for hair systems.',
    seoDescription: 'Find clinics offering professional hair system fitting and maintenance services near you.',
    enabled: true,
  },
  {
    slug: 'hair-toppers',
    dbColumn: 'has_toppers',
    label: 'Hair Toppers',
    shortDescription: 'Partial coverage hair pieces for thinning on the crown or top.',
    seoDescription: 'Find hair topper specialists near you. Toppers provide natural-looking coverage for thinning hair on the crown or top of the head.',
    enabled: true,
  },
  {
    slug: 'hair-integration',
    dbColumn: 'has_integration',
    label: 'Hair Integration',
    shortDescription: 'Mesh-based systems that blend with your existing hair for added volume.',
    seoDescription: 'Find hair integration specialists near you. Integration systems blend with your natural hair to add volume without a full replacement.',
    enabled: true,
  },
  {
    slug: 'cranial-prosthesis',
    dbColumn: 'has_cranial',
    label: 'Cranial Prosthesis',
    shortDescription: 'Medical-grade hair prosthetics for alopecia, chemotherapy and other medical hair loss.',
    seoDescription: 'Find cranial prosthesis specialists near you. Medical-grade hair replacement for alopecia, chemotherapy and other conditions.',
    enabled: true,
  },
]

/** Look up a treatment by its URL slug */
export function getTreatmentBySlug(slug: string): TreatmentInfo | undefined {
  return TREATMENTS.find(t => t.slug === slug)
}

/** Look up a treatment by its DB column name */
export function getTreatmentByColumn(column: string): TreatmentInfo | undefined {
  return TREATMENTS.find(t => t.dbColumn === column)
}
