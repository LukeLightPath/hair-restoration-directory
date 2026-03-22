/**
 * City Page Content Variant System
 *
 * Deterministic randomisation using a seeded hash of the city name.
 * Each city gets a unique combination of intro, expect, pricing,
 * choosing and FAQ content. Stable across builds.
 */

/* ── Seeded hash ──────────────────────────────────────────── */

/** Simple deterministic hash from a string → positive integer */
export function cityHash(city: string): number {
  let hash = 0
  for (let i = 0; i < city.length; i++) {
    hash = ((hash << 5) - hash + city.charCodeAt(i)) | 0
  }
  return Math.abs(hash) || 1
}

/** Pick an item from an array using the city hash + a salt */
function pick<T>(arr: T[], hash: number, salt: number): T {
  return arr[((hash * salt) >>> 0) % arr.length]
}

/** Pick N unique items from a pool using the city hash */
function pickN<T>(pool: T[], n: number, hash: number): T[] {
  const indices: number[] = []
  let h = hash
  while (indices.length < n && indices.length < pool.length) {
    const idx = (h >>> 0) % pool.length
    if (!indices.includes(idx)) {
      indices.push(idx)
    }
    h = ((h * 1103515245 + 12345) >>> 0)
  }
  return indices.map(i => pool[i])
}

/* ── Intro Variants ───────────────────────────────────────── */

const INTRO_VARIANTS = [
  (city: string, count: number) =>
    `If you're looking into non-surgical hair replacement in ${city}, you're not short on options. There are ${count} clinics in the area offering hair systems, and each one takes a slightly different approach. Some focus on lace front systems for an undetectable hairline. Others lean towards skin or mono bases for durability. The right choice comes down to your hair type, your lifestyle and what matters most to you. This page brings them all together so you can compare ratings, services and reviews before booking a consultation.`,

  (city: string, count: number) =>
    `Hair loss affects people differently, but the frustration tends to be the same: a gradual loss of confidence that creeps in over months and years. In ${city}, ${count} clinics now offer non-surgical hair systems as a practical alternative to transplants or medication. These aren't the wigs of twenty years ago. Modern systems use lightweight bases bonded to the scalp, lasting weeks at a time through work, gym sessions and everyday life. We've listed every clinic in ${city} below so you can compare what's available.`,

  (city: string, count: number) =>
    `${city} has a growing number of clinics specialising in non-surgical hair replacement, and we've brought ${count} of them together on this page. Whether you're dealing with thinning on top, a receding hairline or more advanced hair loss, a hair system can give you a full head of natural-looking hair without surgery. Costs vary, techniques differ and not all clinics are created equal. That's why we've gathered reviews, ratings and service details in one place, so you can make an informed decision.`,

  (city: string, count: number) =>
    `Non-surgical hair systems have become one of the most popular ways to deal with hair loss in the UK, and ${city} is no exception. With ${count} clinics offering this service locally, there's plenty of choice, but choosing the right one takes a bit of research. What base material do they use? Do they offer ongoing maintenance? What do their clients actually say about them? We've compiled all of that information here to save you the legwork.`,

  (city: string, count: number) =>
    `Finding a hair system clinic you trust isn't always straightforward, especially when you're new to non-surgical hair replacement. In ${city}, there are ${count} clinics offering hair systems, ranging from small independent studios to larger practices with dedicated hair loss teams. We've pulled together their Google ratings, the services they provide and what real clients have to say, so you can compare them side by side and find the right fit.`,

  (city: string, count: number) =>
    `More people in ${city} are turning to hair systems as a solution for hair loss, and it's easy to see why. They're non-invasive, they look natural when fitted properly, and there's no recovery time to worry about. This page lists ${count} clinics in ${city} that offer hair system consultations and fittings. You'll find Google ratings, service breakdowns and client reviews for each one, everything you need to narrow down your shortlist.`,

  (city: string, count: number) =>
    `Whether you've been researching hair replacement for a while or you're just starting to explore your options, ${city} has ${count} clinics worth looking at. Hair systems have come a long way from the obvious toupees of decades past. Today's systems use medical-grade adhesives and premium hair to create a result that's virtually impossible to spot. Below, you'll find a full list of clinics in ${city}, complete with ratings, reviews and the treatments they offer.`,

  (city: string, count: number) =>
    `Dealing with hair loss is personal, and there's no single right answer. But if you're based in ${city} and considering a non-surgical route, hair systems are worth serious consideration. They give you a full, natural-looking head of hair from day one, with no scalpel in sight. We've listed ${count} clinics in ${city} that specialise in hair systems, along with their ratings, prices and services, so you can compare your options and book a consultation with confidence.`,
]

/* ── "What to Expect" Variants ────────────────────────────── */

const EXPECT_VARIANTS = [
  (city: string) => [
    `Most clinics in ${city} offer a free initial consultation, either in person or over a video call, to assess your hair loss and recommend a system type.`,
    `Pricing for an initial hair system typically falls between £400 and £2,500, depending on the base material, hair type and level of customisation.`,
    `Popular system types include lace front (for the most natural hairline), skin/poly (for durability) and mono (a solid all-rounder).`,
    `A fitting appointment usually takes 1 to 2 hours. You'll leave with the system fully bonded and styled.`,
    `Maintenance visits are typically needed every 3 to 6 weeks for re-bonding, cleaning and minor adjustments.`,
  ],
  (city: string) => [
    `Expect your first visit to involve a detailed consultation where the clinic assesses your scalp, discusses your goals and recommends a suitable system.`,
    `In ${city}, hair system prices generally range from £400 to £2,500 for the initial unit, with monthly maintenance adding £60 to £150 on top.`,
    `Lace, skin and mono bases are the three main options. Each has trade-offs between natural appearance, durability and breathability.`,
    `Fitting takes around 1 to 2 hours. The base is trimmed to fit your specific area of hair loss, then bonded and styled by the technician.`,
    `You'll need regular maintenance appointments, usually every 3 to 6 weeks, to keep the bond secure and the system looking its best.`,
  ],
  (city: string) => [
    `A typical first appointment in ${city} starts with a consultation (often free) and may include a same-day fitting if you're ready to go ahead.`,
    `Hair system costs in ${city} sit in a broad range: £400 to £2,500+ depending on the quality of hair and the complexity of the base construction.`,
    `The three main base types are lace (lightweight, natural), skin (durable, low-maintenance) and monofilament (balanced performance).`,
    `From consultation to walking out with a fitted system, expect to spend 2 to 3 hours at the clinic on your first visit.`,
    `Ongoing care involves re-bonding every 3 to 6 weeks, plus occasional trims and colour matching as needed.`,
  ],
  (city: string) => [
    `Clinics in ${city} typically begin with a one-to-one consultation, either face-to-face or via video, so you can discuss your options without pressure.`,
    `Budget-wise, a first hair system in ${city} usually costs between £400 and £2,500. Higher prices tend to reflect European hair and custom-moulded bases.`,
    `You'll choose between lace, skin and mono bases. Your technician will recommend the best option based on your hair loss pattern and lifestyle.`,
    `The fitting itself is quick: 1 to 2 hours on average. Most people are surprised by how natural it looks straight away.`,
    `Plan for maintenance every 3 to 6 weeks. Some clinics offer subscription packages to keep costs predictable.`,
  ],
  (city: string) => [
    `Your journey starts with a consultation, and most clinics in ${city} offer this at no cost. It's a chance to see samples, ask questions and get a realistic idea of what to expect.`,
    `Initial system costs range from around £400 for basic stock units to £2,500+ for fully custom systems with European hair.`,
    `The main base options are lace front (best hairline), polyurethane skin (most durable) and mono (good middle ground between the two).`,
    `First appointments typically take 2 to 3 hours, including consultation, fitting and styling.`,
    `Ongoing maintenance runs every 3 to 6 weeks, with each session costing roughly £60 to £150 depending on the clinic.`,
  ],
  (city: string) => [
    `Most ${city} clinics offer free consultations so you can explore your options before committing to anything.`,
    `Prices for a complete hair system, fitted and styled, range from £400 to £2,500 depending on the specification.`,
    `Lace, skin and mono are the three base types you'll hear about. Each suits different needs: lace for looks, skin for ease, mono for balance.`,
    `A fitting appointment lasts about 1 to 2 hours. The system is cut, bonded and blended with your existing hair by a specialist.`,
    `Maintenance appointments are needed every 3 to 6 weeks. Regular care extends the system's lifespan considerably.`,
  ],
]

/* ── Pricing Section Variants ─────────────────────────────── */

const PRICING_VARIANTS = [
  (city: string) =>
    `Hair system costs in ${city} vary depending on the type of base, the quality of hair used and how much customisation you need. As a rough guide, expect to pay between £400 and £2,500 for the system itself. Monthly maintenance, which includes re-bonding and cleaning, typically adds £60 to £150 on top. Some clinics offer package deals where you pay a flat monthly fee that covers everything: the system, maintenance and replacement units. It's worth asking about these during your consultation, as they can work out cheaper in the long run.`,

  (city: string) =>
    `Pricing for hair systems in ${city} depends on a few key factors. The base material matters: lace and mono bases sit at the premium end, while poly/skin bases can be more affordable. Hair type makes a big difference too, with European human hair costing significantly more than Indian or Chinese alternatives. Most clinics charge £400 to £2,500 for an initial system including fitting. On top of that, budget for £60 to £150 per month in maintenance costs. These figures are guidance, not guarantees. Your best bet is to get quotes from a couple of clinics before committing.`,

  (city: string) =>
    `How much you'll pay for a hair system in ${city} comes down to what you choose. A stock system with Indian hair and a poly base might cost £400 to £600. A fully custom unit with European hair, a lace front and a perfectly matched density could push towards £2,500. Maintenance adds £60 to £150 per month, covering re-bonding, scalp cleaning and minor repairs. Most clinics in ${city} are upfront about pricing during the initial consultation, so don't be afraid to ask for a full cost breakdown.`,

  (city: string) =>
    `There's no single price for a hair system in ${city}, because they're not one-size-fits-all products. A basic system with synthetic or Chinese hair might start around £400. Go for a custom-built system with European hair and a lace front, and you're looking at £1,500 to £2,500. Monthly upkeep runs between £60 and £150 depending on your attachment method and how often you visit. The clinics listed below can give you an accurate quote based on your specific needs.`,

  (city: string) =>
    `Cost is usually one of the first questions people ask, and it's a fair one. In ${city}, hair systems typically range from £400 for stock units up to £2,500 for fully bespoke systems. The price reflects the base construction, the hair origin and the level of customisation involved. Maintenance costs sit between £60 and £150 per month, covering re-bonding, scalp preparation and system cleaning. Some clinics offer tiered pricing, so there's usually an option at different budget levels.`,

  (city: string) =>
    `What you'll spend on a hair system in ${city} depends on the specification. Entry-level stock systems with Indian or Chinese hair start from around £400 and work well for many people. Custom systems built to your exact head mould, colour and density fall in the £1,200 to £2,500 range. Then there's ongoing maintenance: £60 to £150 monthly for re-bonding and care. Most clinics break this down clearly during a free consultation, so you'll know exactly what you're committing to before going ahead.`,
]

/* ── "Choosing the Right Clinic" Variants ─────────────────── */

const CHOOSING_VARIANTS = [
  () => [
    { title: 'Hair system experience', text: 'Look for clinics where non-surgical hair replacement is a core service, not a sideline. Specialists will know the materials, the bonding techniques and the maintenance schedule inside out.' },
    { title: 'Before-and-after photos', text: 'Real client photos tell you far more than marketing copy. Ask to see results on people with a similar hair loss pattern to yours.' },
    { title: 'Ongoing maintenance support', text: 'A good clinic won\'t just fit your system and send you on your way. Check whether they offer regular maintenance appointments and emergency fixes.' },
    { title: 'Privacy and discretion', text: 'Many people prefer a private consultation room rather than an open salon floor. Check whether the clinic offers this, especially for your first visit.' },
    { title: 'Consultation quality', text: 'The initial consultation should feel thorough, not rushed. A good technician will assess your scalp, discuss your lifestyle and explain your options clearly.' },
  ],
  () => [
    { title: 'Specialist knowledge', text: 'Not every hairdresser or trichologist has hands-on experience with hair systems. Ask how many systems they fit per month and how long they\'ve been doing it.' },
    { title: 'Client reviews', text: 'Google reviews from real clients give you an unfiltered view of what the experience is actually like. Pay attention to what people say about the results and the aftercare.' },
    { title: 'Maintenance packages', text: 'Regular upkeep is part of wearing a hair system. Some clinics offer monthly subscription plans that bundle maintenance, replacement and repairs at a fixed rate.' },
    { title: 'Comfortable environment', text: 'You\'ll be spending an hour or two in the clinic for each fitting. A comfortable, private setting makes a real difference, particularly during your first appointment.' },
    { title: 'Honest pricing', text: 'The best clinics are transparent about costs from the start. If you can\'t get a clear price breakdown during the consultation, that\'s a red flag.' },
  ],
  () => [
    { title: 'Track record with hair systems', text: 'Choose a clinic that does this regularly. The difference between an experienced fitter and someone who does the occasional system is visible in the final result.' },
    { title: 'Real results from real clients', text: 'Ask for before-and-after photos or video content showing actual clients. Social media accounts (Instagram, TikTok) can be a good source of unscripted results.' },
    { title: 'Aftercare commitment', text: 'The relationship with your clinic lasts as long as your hair system does. Make sure they offer ongoing re-bonding, adjustments and replacement fittings.' },
    { title: 'Discretion', text: 'Hair loss is a personal topic. A clinic that offers private rooms and handles your case with sensitivity will make the entire process more comfortable.' },
    { title: 'No-pressure consultation', text: 'A reputable clinic will let you take your time. If you feel pushed towards an immediate purchase during the consultation, consider looking elsewhere.' },
  ],
  () => [
    { title: 'Years of experience', text: 'Ask how long the clinic has been fitting hair systems specifically. General hairdressing experience doesn\'t automatically translate to system-fitting skill.' },
    { title: 'Portfolio of work', text: 'Before-and-after galleries are the single best indicator of quality. Look for results on clients with similar levels of hair loss to yours.' },
    { title: 'Full service offering', text: 'Ideally, your clinic should handle everything: consultation, custom ordering, fitting, styling and ongoing maintenance. A one-stop experience is much easier to manage.' },
    { title: 'Private treatment rooms', text: 'Not everyone wants to discuss hair loss in an open salon. Check whether the clinic has a private area for consultations and fittings.' },
    { title: 'Transparent communication', text: 'Good clinics explain the process, the costs and the realistic outcomes upfront. You should leave your consultation feeling informed rather than confused.' },
  ],
  () => [
    { title: 'Dedication to non-surgical hair', text: 'The best results tend to come from clinics where hair systems are a primary focus, rather than one of many services they happen to offer.' },
    { title: 'Visual evidence', text: 'Photos and videos of previous clients give you a realistic sense of what\'s achievable. If a clinic can\'t show you any examples, that\'s worth noting.' },
    { title: 'Maintenance availability', text: 'Re-bonding is needed every 3 to 6 weeks. Choose a clinic with good appointment availability so you\'re not left waiting when you need a touch-up.' },
    { title: 'Respectful approach', text: 'Look for reviews that mention the clinic\'s sensitivity and professionalism. Feeling comfortable during the process matters just as much as the end result.' },
    { title: 'Clear, upfront pricing', text: 'You should be able to get a ballpark figure during your first consultation. If costs are unclear or constantly changing, consider that a warning sign.' },
  ],
  () => [
    { title: 'Proven expertise with systems', text: 'Fitting a hair system is a skill that improves with practice. Ask how frequently they fit systems and whether it\'s a core part of their business.' },
    { title: 'Genuine client feedback', text: 'Check Google reviews, social media comments and any testimonials on the clinic\'s website. Consistent positive feedback across platforms is a good sign.' },
    { title: 'Long-term support', text: 'Your hair system will need replacing every 3 to 9 months. A clinic that plans ahead for replacement timelines and offers seamless reorders saves you hassle.' },
    { title: 'Comfortable setting', text: 'A welcoming, professional environment sets the tone. If the clinic feels rushed or impersonal, you might not enjoy the regular visits that come with system maintenance.' },
    { title: 'Realistic expectations', text: 'The best clinics will be honest about what a hair system can and can\'t do. Avoid any clinic that overpromises or makes claims that sound too good to be true.' },
  ],
]

/* ── FAQ Pool ─────────────────────────────────────────────── */

export interface FAQ {
  question: string
  answer: string
}

const FAQ_POOL: FAQ[] = [
  {
    question: 'How much does a hair system cost in {{CITY}}?',
    answer: 'Prices in {{CITY}} typically range from £400 to £2,500 for the initial system, depending on the base type and hair quality. Monthly maintenance adds another £60 to £150. Most clinics will give you a full price breakdown during a free consultation.',
  },
  {
    question: 'How long do hair systems last?',
    answer: 'Most hair systems last between 3 and 9 months with proper care. Lace bases tend to be the most delicate and may need replacing sooner, while skin and mono bases generally last longer. Your maintenance routine and attachment method also affect lifespan.',
  },
  {
    question: 'Can I exercise or swim with a hair system?',
    answer: 'Yes. Modern hair systems are bonded with medical-grade adhesive that holds securely through exercise, swimming and everyday activities. Many wearers go to the gym daily or swim regularly without any issues. Tape attachments may need more frequent re-application if you sweat heavily.',
  },
  {
    question: 'Are there non-surgical hair replacement options near {{CITY}}?',
    answer: 'Absolutely. The clinics listed on this page all offer non-surgical hair replacement in or near {{CITY}}. Options include hair systems, toppers, wigs and hair integration, depending on your level of hair loss and personal preference.',
  },
  {
    question: 'Do clinics in {{CITY}} offer free consultations?',
    answer: 'Many clinics in {{CITY}} offer free initial consultations, either in person or via video call. This gives you a chance to discuss your hair loss, see sample systems and get a personalised quote without any obligation.',
  },
  {
    question: 'Will a hair system look natural?',
    answer: 'When fitted by an experienced technician, a modern hair system is virtually undetectable. Lace front bases create a particularly natural-looking hairline. The key is having the right match in terms of hair colour, density and base size for your specific pattern of loss.',
  },
  {
    question: 'How often do I need maintenance appointments?',
    answer: 'Most people visit their clinic every 3 to 6 weeks for re-bonding, scalp cleaning and general upkeep. The exact frequency depends on your attachment method. Adhesive bonds tend to last longer than tape, so you may need fewer visits.',
  },
  {
    question: 'What is the difference between a hair system and a wig?',
    answer: 'A hair system is semi-permanently attached to your scalp and worn continuously for weeks at a time. A wig is removable and typically taken off daily. Hair systems bond more securely and tend to look more natural at the hairline, but they require regular professional maintenance.',
  },
  {
    question: 'Can women wear hair systems?',
    answer: 'Yes. Hair systems are available for both men and women. Women often opt for toppers (which cover specific thinning areas) or full hair integration systems that blend with existing hair. Several clinics in {{CITY}} specialise in female hair loss solutions.',
  },
  {
    question: 'Do hair systems damage existing hair?',
    answer: 'Not when they are fitted and maintained correctly by a trained technician. The area beneath the system is usually trimmed short to create a secure bond. Problems only tend to arise if the removal process is rushed or if adhesives are used improperly.',
  },
  {
    question: 'How do I choose the right hair system?',
    answer: 'It depends on your hair loss pattern, lifestyle and budget. Lace bases look the most natural. Skin bases are the easiest to maintain. Mono bases are a good all-round option. Your clinic will recommend the best choice during your consultation based on all of these factors.',
  },
  {
    question: 'Can I colour or style a hair system?',
    answer: 'Yes, human hair systems can be cut, coloured and heat-styled just like natural hair. Synthetic systems are more limited. It\'s best to have styling done by your clinic or a stylist experienced with hair systems to avoid damaging the base.',
  },
  {
    question: 'How quickly can I get a hair system fitted in {{CITY}}?',
    answer: 'Stock systems can often be fitted within a week or two. Custom systems take longer, usually 4 to 8 weeks, because they are built to your exact head measurements and colour match. Clinics in {{CITY}} can advise on current lead times during your consultation.',
  },
  {
    question: 'Is a hair system noticeable in wind or rain?',
    answer: 'A well-fitted system stays securely in place in wind, rain and other everyday conditions. The adhesive bond is strong enough for normal weather. Most wearers say they forget they are wearing one after the first few days.',
  },
  {
    question: 'What should I bring to my first consultation?',
    answer: 'Just yourself. Some people like to bring photos of their desired hairstyle or pictures from before their hair loss. This helps the technician understand what you are looking for. Otherwise, the clinic will guide you through everything during the appointment.',
  },
]

/* ── Meta Title Variants ──────────────────────────────────── */

const META_TITLE_VARIANTS = [
  (city: string, count: number) => `Hair Systems in ${city} | Compare ${count} Clinics`,
  (city: string, count: number) => `${count} Hair System Clinics in ${city} | Ratings & Reviews`,
  (city: string) => `Hair Systems in ${city} | Clinics, Costs & Reviews`,
  (city: string) => `Non-Surgical Hair Replacement in ${city} | Compare Clinics`,
  (city: string, count: number) => `Compare ${count} Hair System Clinics in ${city}`,
  (city: string) => `Hair Replacement Systems in ${city} | Clinic Guide`,
]

/* ── Meta Description Variants ────────────────────────────── */

const META_DESC_VARIANTS = [
  (city: string, count: number) => `Compare ${count} hair system clinics in ${city}. Read real Google reviews, check services and pricing, and book a free consultation. Find the right clinic for your non-surgical hair replacement.`,
  (city: string, count: number) => `Looking for a hair system in ${city}? Browse ${count} clinics with ratings, reviews and service details. Compare your options and book a free consultation today.`,
  (city: string, count: number) => `Find the best non-surgical hair replacement clinics in ${city}. ${count} clinics compared with Google ratings, services and costs. Book your free consultation.`,
  (city: string, count: number) => `${count} clinics in ${city} offering hair systems. Compare ratings, read client reviews, check pricing and book a free consultation. Updated for 2026.`,
  (city: string, count: number) => `Explore ${count} hair system clinics in ${city}. Compare services, read Google reviews and find the right non-surgical hair replacement clinic for you.`,
  (city: string, count: number) => `Hair systems in ${city}: ${count} clinics compared. Check Google ratings, read reviews and get pricing guidance. Free consultations available at most clinics.`,
]

/* ── Section Order Variants ───────────────────────────────── */

/** Middle sections that can be reordered */
export type MiddleSection = 'expect' | 'pricing' | 'choosing'

const SECTION_ORDERS: MiddleSection[][] = [
  ['expect', 'pricing', 'choosing'],
  ['expect', 'choosing', 'pricing'],
  ['pricing', 'expect', 'choosing'],
  ['choosing', 'expect', 'pricing'],
  ['pricing', 'choosing', 'expect'],
  ['choosing', 'pricing', 'expect'],
]

/* ── Public API ───────────────────────────────────────────── */

export interface CityContent {
  metaTitle: string
  metaDescription: string
  intro: string
  expectBullets: string[]
  pricingText: string
  choosingBullets: { title: string; text: string }[]
  faqs: FAQ[]
  sectionOrder: MiddleSection[]
}

export function getCityContent(cityName: string, clinicCount: number): CityContent {
  const hash = cityHash(cityName)

  // Replace {{CITY}} placeholder in FAQ text
  const cityFaqs = pickN(FAQ_POOL, 6, hash).map(faq => ({
    question: faq.question.replace(/\{\{CITY\}\}/g, cityName),
    answer: faq.answer.replace(/\{\{CITY\}\}/g, cityName),
  }))

  const introFn = pick(INTRO_VARIANTS, hash, 31)
  const expectFn = pick(EXPECT_VARIANTS, hash, 37)
  const pricingFn = pick(PRICING_VARIANTS, hash, 41)
  const choosingFn = pick(CHOOSING_VARIANTS, hash, 43)
  const metaTitleFn = pick(META_TITLE_VARIANTS, hash, 47)
  const metaDescFn = pick(META_DESC_VARIANTS, hash, 53)
  const sectionOrder = pick(SECTION_ORDERS, hash, 59)

  return {
    metaTitle: metaTitleFn(cityName, clinicCount),
    metaDescription: metaDescFn(cityName, clinicCount),
    intro: introFn(cityName, clinicCount),
    expectBullets: expectFn(cityName),
    pricingText: pricingFn(cityName),
    choosingBullets: choosingFn(),
    faqs: cityFaqs,
    sectionOrder,
  }
}
