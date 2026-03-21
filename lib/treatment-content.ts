/* ─── Treatment Page Content ────────────────────────────────
   Intro paragraphs and FAQs for each treatment.
   Imported by the treatment page templates.
   ────────────────────────────────────────────────────────── */

export interface TreatmentFAQ {
  question: string
  answer: string
}

export interface TreatmentContent {
  slug: string
  intro: string
  faqs: TreatmentFAQ[]
}

export const TREATMENT_CONTENT: TreatmentContent[] = [
  {
    slug: 'hair-systems',
    intro:
      'A hair system is a custom or semi-custom hairpiece bonded to the scalp, designed to blend with your existing hair. Modern systems use lace, skin or mono bases with real human hair, and when fitted properly they\'re undetectable. Most people wear one continuously for 3 to 6 months before replacing it, with maintenance visits every 4 to 6 weeks.',
    faqs: [
      {
        question: 'How much does a hair system cost in the UK?',
        answer:
          'Prices typically range from £200 to £1,500 for the unit itself, depending on the base material, hair type and density. On top of that, expect to pay £50 to £150 per maintenance appointment every 4 to 6 weeks. Over a year, most people spend between £1,500 and £4,000 in total.',
      },
      {
        question: 'Can you swim and exercise with a hair system?',
        answer:
          'Yes. A properly bonded system stays secure during swimming, gym sessions and most sports. Adhesive bonds (tape or glue) hold through sweat and water. You\'ll want to let your stylist know your activity level so they can recommend the right attachment method.',
      },
      {
        question: 'How long does a hair system last?',
        answer:
          'A single unit typically lasts 3 to 6 months with daily wear, though some higher-end systems can stretch to 8 months. Lace bases tend to be more breathable but less durable than skin bases. Most clients keep 2 systems in rotation.',
      },
    ],
  },
  {
    slug: 'scalp-micropigmentation',
    intro:
      'Scalp micropigmentation (SMP) uses tiny dots of pigment deposited into the scalp to replicate the look of hair follicles. It works for receding hairlines, thinning patches, full baldness and scar camouflage. There\'s no surgery involved, no downtime and results are visible from the first session. Most treatments take 2 to 4 sessions spread over a few weeks.',
    faqs: [
      {
        question: 'How much does SMP cost in the UK?',
        answer:
          'SMP typically costs between £800 and £3,000 depending on the area being treated and the number of sessions needed. Small areas like hairline work sit at the lower end, while full-head coverage for Norwood 6 or 7 patterns costs more. Most clinics offer payment plans.',
      },
      {
        question: 'Does SMP look natural?',
        answer:
          'When done well, yes. The key is a skilled practitioner who matches the pigment to your skin tone and uses the right needle depth. Up close it looks like a freshly shaved head or added density. It won\'t fool anyone into thinking you have long hair, but that\'s not the point.',
      },
      {
        question: 'How long does SMP last?',
        answer:
          'Results typically last 3 to 5 years before the pigment starts to lighten. Most people book a touch-up session to refresh the colour. Fading happens gradually, so it\'s not a sudden change. Sun exposure and skin type can affect how quickly the pigment fades.',
      },
    ],
  },
  {
    slug: 'wigs',
    intro:
      'Wigs have come a long way from the obvious, shiny hairpieces of the past. Today\'s options include custom-made lace front wigs, monofilament caps and hand-tied pieces that look and move like real hair. Whether you\'re dealing with alopecia, chemotherapy-related hair loss or simply want a full change of style, a good wig specialist will help you find the right fit, colour and construction.',
    faqs: [
      {
        question: 'What is the difference between synthetic and human hair wigs?',
        answer:
          'Human hair wigs look and feel more natural, can be heat-styled and typically last 1 to 3 years. Synthetic wigs are lighter, cheaper and hold their style after washing, but they don\'t tolerate heat and usually last 4 to 6 months. Many people own both for different occasions.',
      },
      {
        question: 'How much do wigs cost in the UK?',
        answer:
          'Synthetic wigs start from around £50 to £300. Human hair wigs range from £200 to £3,000 or more for custom pieces. If you\'re experiencing hair loss due to a medical condition, you may be eligible for a wig on the NHS or through a private prescription.',
      },
      {
        question: 'Can I get a wig on the NHS?',
        answer:
          'Yes, if your hair loss is caused by a medical condition or treatment. Your GP or consultant can refer you to a wig fitting service. NHS wigs are usually synthetic, but you can sometimes pay the difference to upgrade to human hair. Eligibility and waiting times vary by area.',
      },
    ],
  },
  {
    slug: 'extensions',
    intro:
      'Hair extensions add length, volume or both using real or synthetic hair attached to your natural hair. Methods include tape-ins, micro rings, nano rings, keratin bonds and weaves. A good extensionist will match the colour and texture to your own hair so the join is invisible. Extensions typically last 2 to 4 months before needing to be moved up or replaced.',
    faqs: [
      {
        question: 'Do hair extensions damage your natural hair?',
        answer:
          'They can if fitted badly or left in too long without maintenance. The weight and tension on your natural hair matters. Lighter methods like nano rings put less stress on fine hair. Choosing a qualified, experienced extensionist is the single biggest factor in avoiding damage.',
      },
      {
        question: 'How much do hair extensions cost in the UK?',
        answer:
          'A full head of tape-in extensions typically costs £150 to £400. Micro ring and keratin bond methods range from £250 to £600. Maintenance appointments (every 6 to 8 weeks) cost £60 to £150. Human hair extensions cost more than synthetic but look better and last longer.',
      },
      {
        question: 'Which extension method is best for fine hair?',
        answer:
          'Nano rings or tape-ins are usually the safest options for fine hair because they distribute weight across a wider area and put less tension on individual strands. Avoid glue-based methods on very fine hair. A good extensionist will assess your hair before recommending a method.',
      },
    ],
  },
  {
    slug: 'prp-treatment',
    intro:
      'PRP (platelet-rich plasma) therapy involves drawing a small amount of your blood, processing it to concentrate the platelets, then injecting the plasma into areas of thinning hair. The growth factors in platelets can stimulate dormant follicles and improve hair density over time. It\'s not surgery, but it does involve needles. Most people need 3 to 4 sessions spaced a month apart, with top-ups once or twice a year.',
    faqs: [
      {
        question: 'Does PRP actually work for hair loss?',
        answer:
          'Clinical studies show PRP can improve hair density and thickness in people with androgenetic alopecia (pattern thinning). It works best for early to moderate thinning rather than areas of complete baldness where follicles are no longer active. Results vary, and not everyone responds the same way.',
      },
      {
        question: 'How much does PRP cost in the UK?',
        answer:
          'A single PRP session typically costs between £300 and £800. Most clinics recommend 3 to 4 initial sessions (roughly £1,000 to £2,500 total) followed by maintenance sessions every 6 to 12 months. Some clinics offer package deals that bring the per-session price down.',
      },
      {
        question: 'Is PRP painful?',
        answer:
          'Most people describe it as uncomfortable rather than painful. The scalp is numbed with a topical anaesthetic before the injections. The blood draw itself is the same as any standard blood test. The whole process takes about 45 minutes to an hour, and you can go back to normal activities straight away.',
      },
    ],
  },
  {
    slug: 'trichology',
    intro:
      'A trichologist is a specialist in hair and scalp conditions. They diagnose the cause of hair loss, thinning, scalp irritation and other problems using detailed analysis. Unlike a GP (who might refer you to a dermatologist), a trichologist focuses exclusively on hair. Consultations typically involve a scalp examination, hair pull tests and sometimes blood work referrals to identify underlying causes.',
    faqs: [
      {
        question: 'What is the difference between a trichologist and a dermatologist?',
        answer:
          'A dermatologist is a medical doctor who treats skin conditions, including scalp issues. A trichologist specialises specifically in hair and scalp health but isn\'t a medical doctor. For conditions like alopecia areata or scarring alopecia, you might see both. Trichologists are particularly useful for identifying lifestyle, nutritional or stress-related hair loss causes.',
      },
      {
        question: 'How much does a trichologist consultation cost?',
        answer:
          'An initial consultation with a registered trichologist in the UK typically costs between £75 and £200. Follow-up appointments are usually cheaper. Some trichologists offer treatment plans that include products and ongoing check-ups. Trichology is not available on the NHS.',
      },
      {
        question: 'When should I see a trichologist?',
        answer:
          'If you\'re noticing more hair in your brush than usual, patches of thinning, an itchy or flaky scalp, or hair breakage that doesn\'t have an obvious explanation, a trichologist can help. The sooner you address hair loss, the more options you have. Most causes of thinning are treatable when caught early.',
      },
    ],
  },
  {
    slug: 'laser-therapy',
    intro:
      'Low-level laser therapy (LLLT) uses red light at specific wavelengths to stimulate hair follicles and promote growth. It\'s completely painless, non-invasive and can be done in-clinic or at home using a laser cap or comb. Research suggests it works best alongside other treatments rather than as a standalone solution. Sessions are typically 15 to 30 minutes, 2 to 3 times per week.',
    faqs: [
      {
        question: 'Does laser hair therapy actually work?',
        answer:
          'Multiple studies have shown that LLLT can improve hair density and thickness, particularly in people with androgenetic alopecia. It\'s FDA-cleared in the US and widely used in the UK. Results take time (usually 3 to 6 months of consistent use) and it works better for slowing loss and thickening existing hair than regrowing hair in completely bald areas.',
      },
      {
        question: 'How much does laser hair therapy cost?',
        answer:
          'In-clinic sessions typically cost £50 to £100 each, with most clinics recommending 2 to 3 sessions per week for several months. Home devices like laser caps range from £300 to £1,000 as a one-off purchase. The home route is usually more cost-effective long term if you\'re committed to regular use.',
      },
    ],
  },
  {
    slug: 'fitting-service',
    intro:
      'A fitting service covers the professional application and maintenance of hair systems, wigs and hairpieces. This includes bonding, cutting-in, blending with your natural hair and ongoing reattachment appointments. A skilled fitter makes the difference between a hair system that looks obvious and one that\'s completely undetectable. Most people visit every 4 to 6 weeks for maintenance.',
    faqs: [
      {
        question: 'What happens during a hair system fitting?',
        answer:
          'Your fitter will prep your scalp (cleaning any old adhesive), position the new or cleaned system, bond it using tape or glue, then cut and blend it with your existing hair. The whole process takes 1 to 2 hours. First fittings take longer because the system needs to be shaped to your head.',
      },
      {
        question: 'How often do I need maintenance appointments?',
        answer:
          'Most hair system wearers visit their fitter every 4 to 6 weeks for a rebond. During these appointments, the system is removed, your scalp is cleaned, and the system is reattached. Some people extend this to 6 to 8 weeks depending on the adhesive and their lifestyle.',
      },
    ],
  },
  {
    slug: 'hair-toppers',
    intro:
      'A hair topper (sometimes called a top piece) clips or bonds to the crown area to cover thinning on top while blending with your own hair around the sides and back. They\'re smaller and lighter than a full wig, which makes them a popular choice for women experiencing early to moderate thinning. Modern toppers use lace or silk bases that mimic a natural scalp at the parting.',
    faqs: [
      {
        question: 'What is the difference between a topper and a wig?',
        answer:
          'A topper only covers the top and crown area, clipping onto your existing hair for support. A wig covers your entire head. Toppers work best when you still have reasonable hair around the sides and back. They\'re lighter, more discreet and easier to put on than a full wig.',
      },
      {
        question: 'How much do hair toppers cost in the UK?',
        answer:
          'Synthetic toppers start from around £80 to £200. Human hair toppers range from £200 to £1,500 depending on size, hair quality and construction. Custom-made pieces sit at the top of that range. Many people buy two and rotate them to extend the lifespan of each piece.',
      },
    ],
  },
  {
    slug: 'hair-integration',
    intro:
      'Hair integration systems use a fine mesh that sits over your existing hair. Your own hair is pulled through the mesh and blended with additional hair woven into it, adding volume and coverage without hiding your natural growth. It\'s a popular option for women with diffuse thinning who want to keep using their own hair rather than covering it entirely.',
    faqs: [
      {
        question: 'How does a hair integration system work?',
        answer:
          'A lightweight mesh is placed over the thinning area. Your own hair is pulled through the holes in the mesh using a small hook, then the additional hair woven into the mesh blends with yours. The result looks like one full head of hair. The system is secured with clips or micro rings and can be removed for washing.',
      },
      {
        question: 'Is hair integration suitable for all types of hair loss?',
        answer:
          'It works best for diffuse thinning where you still have hair spread across the scalp, because your natural hair needs to pull through the mesh. It\'s less suitable for total baldness in one area or alopecia areata with patchy loss. A consultation will help determine if it\'s the right fit for your situation.',
      },
    ],
  },
  {
    slug: 'cranial-prosthesis',
    intro:
      'A cranial prosthesis is a medical-grade hairpiece designed for people who\'ve lost their hair due to alopecia, chemotherapy, burns or other medical conditions. They\'re custom-made to fit your head exactly and built with materials that are gentle on sensitive scalps. Unlike cosmetic hair systems, a cranial prosthesis may be partially funded through the NHS or private health insurance.',
    faqs: [
      {
        question: 'What is the difference between a cranial prosthesis and a regular wig?',
        answer:
          'A cranial prosthesis is custom-fitted and built specifically for medical hair loss. The base materials are hypoallergenic and designed for sensitive, irritated or healing scalps. A regular wig is a general-purpose hairpiece. The distinction also matters for insurance and NHS funding, where "wig" and "cranial prosthesis" are treated differently.',
      },
      {
        question: 'Can I get a cranial prosthesis on the NHS?',
        answer:
          'In most cases, yes. If your hair loss is caused by a medical condition or treatment, your consultant can refer you for a wig fitting through the NHS. The standard NHS provision is usually a synthetic wig, but some areas allow you to put the funding towards a partial contribution to a human hair piece. Availability and waiting times vary by region.',
      },
    ],
  },
]
