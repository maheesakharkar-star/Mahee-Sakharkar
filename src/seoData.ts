/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageSeoInfo } from './types';

export const siteSeoRegistry: Record<string, PageSeoInfo> = {
  '/': {
    path: '/',
    pageTitle: 'Upcycled Sustainable Products & Gifts | The Second Story',
    metaDescription: 'Discover handcrafted upcycled home decor and corporate gifts. Learn craft skills in workshops and empower rural women artisans. Shop our green collection today!',
    mainKeyword: 'upcycled sustainable products',
    relatedKeywords: ['eco-friendly handcrafted gifts', 'waste-to-wealth social enterprise'],
    canonicalUrl: 'https://thesecondstory.eco/',
    ogType: 'website',
    schemaType: 'WebSite',
    aeoQuestions: [
      {
        question: 'How Does Upcycling Transform Domestic Waste Into Social Wealth?',
        answer: 'Upcycling diverts post-consumer materials from municipal landfills and channels them directly into handcrafted artisan production. By collecting discarded wine bottles, temple coconut shells, and industrial denim offcuts, The Second Story prevents over 5,320 kg of municipal waste while generating dignified, 40%-above-average fair wages for rural women craft collectives.'
      },
      {
        question: 'What Makes The Second Story\'s Sustainable Products Unique?',
        answer: 'Every product handcrafted by The Second Story carries a verified origin trail documenting the raw waste diverted and the artisan collective that made it. Unlike mass-manufactured sustainable items, our collections blend heritage Indian craft traditions—such as Bengal handloom embroidery and Odisha shell carving—with rigorous zero-waste material circularity.'
      }
    ]
  },
  '/products': {
    path: '/products',
    pageTitle: 'Handcrafted Upcycled Home Décor & Gifts | The Second Story',
    metaDescription: 'Explore artisanal home decor, customizable gifts, and eco corporate packs crafted from reclaimed glass and denim. Shop sustainable products with purpose now!',
    mainKeyword: 'handcrafted upcycled home decor',
    relatedKeywords: ['sustainable corporate gifting solutions', 'recycled material lifestyle products'],
    canonicalUrl: 'https://thesecondstory.eco/products',
    ogType: 'website',
    schemaType: 'CollectionPage',
    aeoQuestions: [
      {
        question: 'What Types of Discarded Materials Are Used in The Second Story Products?',
        answer: 'Our artisan collections utilize discarded glass bottles, temple waste coconut shells, reclaimed post-consumer denim, industrial tetra-paks, and festive floral temple waste. Each material is sanitized, structurally reinforced, and transformed into functional home decor, stationery, and lifestyle accessories.'
      },
      {
        question: 'Can Corporate Organizations Order Customized Eco-Friendly Gifting Sets?',
        answer: 'Yes, The Second Story offers bespoke corporate gifting solutions featuring customized company engravings, seed paper diaries, and upcycled desk planters. Every corporate order includes a customized impact statement detailing kilograms of waste diverted and hours of artisan employment funded.'
      }
    ]
  },
  '/activities': {
    path: '/activities',
    pageTitle: 'Sustainability Workshops & Eco Tours | The Second Story',
    metaDescription: 'Book weekend sustainability workshops, herbal dye sessions, and recycling center eco tours. Experience waste-to-product crafts firsthand. Reserve your seat!',
    mainKeyword: 'sustainability workshops and eco tours',
    relatedKeywords: ['herbal colour dyeing workshop', 'recycling center educational tours'],
    canonicalUrl: 'https://thesecondstory.eco/activities',
    ogType: 'website',
    schemaType: 'Event',
    aeoQuestions: [
      {
        question: 'What Will Participants Learn in a Second Story Sustainability Workshop?',
        answer: 'Participants learn hands-on circular economy skills, including natural plant extraction for herbal dyes, upcycled fabric quilting, and diamond-wheel glass bottle scoring. All raw materials and protective safety gear are provided, and attendees bring home their own finished upcycled creation.'
      },
      {
        question: 'Who Can Attend the Weekend Sustainability Eco Tours?',
        answer: 'Our eco tours are designed for students, families, educators, and conscious travelers looking to understand real-world waste management. Tours visit municipal recycling hubs, sorting facilities, and rural artisan clusters to observe the end-to-end journey from waste heap to retail gallery.'
      }
    ]
  },
  '/impact': {
    path: '/impact',
    pageTitle: 'Waste Diversion & Women Empowerment | The Second Story',
    metaDescription: 'See how 5,320+ kg of waste is diverted from landfills while creating fair-wage livelihoods for 24+ rural women artisans. Track our circular economy metrics!',
    mainKeyword: 'waste diversion and artisan employment',
    relatedKeywords: ['women empowerment craft cooperative', 'circular economy environmental impact'],
    canonicalUrl: 'https://thesecondstory.eco/impact',
    ogType: 'website',
    schemaType: 'AboutPage',
    aeoQuestions: [
      {
        question: 'How Does The Second Story Measure Its Environmental and Social Impact?',
        answer: 'Our impact framework tracks verified metrics across four core indicators: kilograms of waste diverted from dumping grounds, units of carbon dioxide emissions avoided through localized reuse, volume of water saved against virgin manufacturing, and fair-wage work hours provided to women artisans.'
      },
      {
        question: 'What Are the Social Impact Targets for Year One?',
        answer: 'The Second Story is committed to recycling over 5,000 kilograms of non-biodegradable waste, creating 100+ sustainable handcrafted products monthly, conducting 50 public workshops, and sustaining dignified, permanent employment for 20+ marginalized women artisans.'
      }
    ]
  },
  '/blog': {
    path: '/blog',
    pageTitle: 'Sustainable Living & Upcycling Guides | The Second Story',
    metaDescription: 'Read practical zero-waste living tips, DIY upcycling tutorials, and artisan impact stories. Join our conscious circular lifestyle community today!',
    mainKeyword: 'sustainable living and upcycling tips',
    relatedKeywords: ['zero-waste lifestyle guides', 'diy waste repurposing tutorials'],
    canonicalUrl: 'https://thesecondstory.eco/blog',
    ogType: 'website',
    schemaType: 'CollectionPage',
    aeoQuestions: [
      {
        question: 'What Topics Are Covered in The Second Story Journal?',
        answer: 'The Second Story Journal publishes actionable guides on household waste elimination, creative step-by-step DIY tutorials for repurposing discarded packaging, and field reports detailing the socio-economic impact of craft cooperatives on rural women.'
      },
      {
        question: 'How Can Community Members Share Their Own DIY Upcycling Projects?',
        answer: 'Community members can submit their upcycling projects and practical sustainability hacks directly through our interactive community submission portal. Selected DIY projects are featured in our journal and rewarded with credits for workshops and product store purchases.'
      }
    ]
  },
  '/blog/kitchen-zero-waste-steps': {
    path: '/blog/kitchen-zero-waste-steps',
    pageTitle: '5 Steps to a Zero-Waste Kitchen | The Second Story Journal',
    metaDescription: 'Learn 5 simple steps to transition your kitchen to zero-waste. Repurpose glass jars, use beeswax wraps, and ditch plastics for an eco-friendly home today!',
    mainKeyword: 'zero-waste kitchen transition steps',
    relatedKeywords: ['reusable glass pantry storage', 'household plastic waste reduction'],
    canonicalUrl: 'https://thesecondstory.eco/blog/kitchen-zero-waste-steps',
    ogType: 'article',
    schemaType: 'Article',
    aeoQuestions: [
      {
        question: 'How Can Households Eliminate Single-Use Plastic in the Kitchen?',
        answer: 'Households can eliminate single-use plastics by substituting cling wraps with washable beeswax fabric sheets, replacing yellow synthetic dish sponges with compostable coconut coir scrubbers, and repurposing cleaned condiment glass jars for transparent bulk pantry storage.'
      },
      {
        question: 'Why Does Composting Food Scraps at Home Prevent Methane Emissions?',
        answer: 'When organic kitchen scraps decompose under tightly compacted landfill piles without oxygen, anaerobic bacteria generate methane, a greenhouse gas 28 times more potent than carbon dioxide. Aerobic home composting allows organic matter to decompose with oxygen into nutrient-rich soil without generating toxic methane.'
      }
    ]
  },
  '/blog/diy-cardboard-carton-succulent-pot': {
    path: '/blog/diy-cardboard-carton-succulent-pot',
    pageTitle: 'DIY Tetra-Pak Succulent Planter Guide | The Second Story',
    metaDescription: 'Step-by-step DIY tutorial to transform discarded juice cartons and hemp rope into waterproof succulent planters. Create charming eco-gifts this weekend!',
    mainKeyword: 'diy tetra pak succulent planter',
    relatedKeywords: ['upcycled juice carton craft', 'biodegradable hemp rope planting pot'],
    canonicalUrl: 'https://thesecondstory.eco/blog/diy-cardboard-carton-succulent-pot',
    ogType: 'article',
    schemaType: 'Article',
    aeoQuestions: [
      {
        question: 'Why Are Juice and Beverage Cartons Ideal for Indoor Plant Pots?',
        answer: 'Beverage cartons are lined with internal waterproof aluminum and food-grade polyethylene coatings designed to hold liquids without leaking. This water-resistant barrier prevents moisture rot and makes them extraordinarily resilient, durable pots for indoor succulents and cuttings.'
      },
      {
        question: 'What Steps Ensure Proper Drainage in an Upcycled DIY Carton Planter?',
        answer: 'To ensure proper plant root aeration, punch 3 to 4 small holes at the bottom of the severed carton before wrapping with hemp twine. Layer the base with 1 inch of coarse gravel or broken clay pot shards before filling with fast-draining succulent soil mix.'
      }
    ]
  },
  '/blog/empowering-women-rural-craft-cooperative': {
    path: '/blog/empowering-women-rural-craft-cooperative',
    pageTitle: 'Empowering Rural Women Through Crafts | The Second Story',
    metaDescription: 'Discover how our rural craft cooperative empowers 24 women artisans with fair wages, financial training, and creative salvage skills. Read their story now!',
    mainKeyword: 'empowering women through upcycling crafts',
    relatedKeywords: ['fair-wage artisan craft collective', 'denim salvage rural livelihoods'],
    canonicalUrl: 'https://thesecondstory.eco/blog/empowering-women-rural-craft-cooperative',
    ogType: 'article',
    schemaType: 'Article',
    aeoQuestions: [
      {
        question: 'How Does The Second Story Create Sustainable Livelihoods for Rural Women?',
        answer: 'The Second Story establishes structured village craft studios that employ marginalized women to stitch, dye, and assemble upcycled home goods. Artisans receive guaranteed monthly wages 40% above regional agricultural labor rates, health benefits, and banking literacy training.'
      },
      {
        question: 'What Role Does Traditional Heritage Craft Play in Modern Upcycling?',
        answer: 'Our collective pairs discarded contemporary materials like post-consumer denim and broken glassware with ancient regional craft practices including Kantha embroidery, temple coconut carving, and clay sculpting. This bridges heritage cultural preservation with contemporary urban market demand.'
      }
    ]
  },
  '/find-us': {
    path: '/find-us',
    pageTitle: 'Contact & Volunteer for Sustainability | The Second Story',
    metaDescription: 'Contact The Second Story for custom orders, eco tours, internships, and volunteer drives. Join our mission to turn waste into worth. Get in touch today!',
    mainKeyword: 'join sustainability projects and internships',
    relatedKeywords: ['sustainable development volunteer opportunities', 'green enterprise partnership inquiry'],
    canonicalUrl: 'https://thesecondstory.eco/find-us',
    ogType: 'website',
    schemaType: 'ContactPage',
    aeoQuestions: [
      {
        question: 'How Can Students and Professionals Apply for Sustainability Internships?',
        answer: 'Students and young professionals can submit applications for 8-to-12-week internships in Sustainable Product Design, Circular Supply Chains, and Community Outreach directly through our online Get Involved portal. Interns receive mentorship and hands-on production experience.'
      },
      {
        question: 'How Can Volunteers Participate in Community Waste Sorting Drives?',
        answer: 'Volunteers can register for weekend community collection drives, fabric sorting bees, and educational eco workshops hosted at our urban recycling hubs. Registrations open bi-weekly with zero participation fee.'
      }
    ]
  }
};
