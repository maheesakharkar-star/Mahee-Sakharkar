/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Workshop, Tour, BlogPost, MaterialTransformation } from './types';

export const productsData: Product[] = [
  {
    id: 'prod-01',
    name: 'Artisanal Mosaic Glass Bottle Lamp',
    category: 'decor',
    description: 'A spectacular tabletop lamp crafted from discarded wine bottles and shattered glass chips, transforming waste into mesmerizing colored patterns.',
    price: 35,
    image: '/src/assets/images/craft_glass_mosaic_lamp_1791988805283.jpg',
    originalMaterial: 'Discarded Wine Bottles & Stained Glass Offcuts',
    artisanGroup: 'Marginalized Women Self-Help Group, Bengal',
    wasteDivertedKg: 1.8,
    details: [
      'Upcycled glass bottle curated with local waste collectors',
      'Illuminates warm, stained-glass colors on the walls',
      'Includes an energy-efficient warm LED bulb',
      '100% handcrafted and unique'
    ],
    inStock: true
  },
  {
    id: 'prod-02',
    name: 'Coconut Husk Pendant Planter',
    category: 'decor',
    description: 'Suspended planter handcrafted from coconut shells discarded by local temples and street vendors, treated with organic oils.',
    price: 18,
    image: '/src/assets/images/craft_coconut_planter_1791988806237.jpg',
    originalMaterial: 'Temple Waste Coconut Shells',
    artisanGroup: 'Youth Eco-Artisans, Odisha Coast',
    wasteDivertedKg: 0.7,
    details: [
      'Biodegradable planter base with long wire drop',
      'Coated with pure natural linseed oil for weather defense',
      'Provides micro-aeration designed specifically for succulents and money plants',
      'Helps divert organic temple waste'
    ],
    inStock: true
  },
  {
    id: 'prod-03',
    name: 'Recycled Paper Seed Diary Set',
    category: 'corporate',
    description: 'An elegant premium corporate gifting set made of 100% recycled industrial paper with plantable marigold seed embedded covers.',
    price: 12,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=700',
    originalMaterial: 'Tetra-Paks & Carton Shreds',
    artisanGroup: 'Handloom Paper Collective, Saharanpur',
    wasteDivertedKg: 1.2,
    details: [
      'Contains 1 handmade paper diary and 2 plantable seed pens',
      '100% acid-free, zero chlorine paper',
      'Marigold and tomato seed covers can be planted directly in the soil after use',
      'Can be customized with company logos for orders over 50 units'
    ],
    inStock: true
  },
  {
    id: 'prod-04',
    name: 'Upcycled Denim Patchwork Tote Bag',
    category: 'custom',
    description: 'A stylish, ultra-durable heavy-duty tote bag created entirely from scrap denim jeans donated by local thrift stores and factories.',
    price: 24,
    image: '/src/assets/images/craft_denim_saree_tote_1791988805890.jpg',
    originalMaterial: 'Discarded Factory Cotton & Post-consumer Denim',
    artisanGroup: 'Surviving Single Mothers Association, Mumbai Slums',
    wasteDivertedKg: 2.5,
    details: [
      'Handcrafted thick patchwork denim material with double stitching',
      'Features 3 secure utility pockets (including internal zip pocket)',
      'Each tote carries a tag signed by the individual woman who tailored it',
      'Saves over 2,000 liters of water compared to producing new denim'
    ],
    inStock: true
  },
  {
    id: 'prod-05',
    name: 'Terracotta Festive Diya Chandelier',
    category: 'festival',
    description: 'A traditional hanging multi-lamp chandelier upcycled from fractured terracotta clay cups, reinforced with hemp cords and forest-sourced wax.',
    price: 29,
    image: '/src/assets/images/craft_terracotta_diya_1791988806395.jpg',
    originalMaterial: 'Reclaimed Broken Clay Kulhads',
    artisanGroup: 'Traditional Kumhar Artisans, Dharavi',
    wasteDivertedKg: 3.2,
    details: [
      'A majestic 5-tier hanging wind-chime upcycled diya hanger',
      'Repurposed broken pottery baked with secure natural resin',
      'Comes with handmade organic cow dung diyas and cotton wicks',
      'Ideal for eco-conscious Diwali, Christmas, and house-warmings'
    ],
    inStock: true
  },
  {
    id: 'prod-06',
    name: 'Earthy Saree-Wrapped Photo Frame',
    category: 'custom',
    description: 'Exquisite wooden picture frames recovered from demolition timber, wrapped neatly in vibrant silk saree borders.',
    price: 22,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=700',
    originalMaterial: 'Industrial Wood Pallets & Pre-loved Silk Sarees',
    artisanGroup: 'Weaving Families of Varanasi Collective',
    wasteDivertedKg: 1.5,
    details: [
      'Constructed with discarded shipping pallet pine wood',
      'Vividly decorated with silk saree offcuts utilizing organic adhesives',
      'Fitted with sustainable protective clear acrylic fronting',
      'Supports traditional family artisans seeking upcycling alternatives'
    ],
    inStock: true
  },
  {
    id: 'prod-07',
    name: 'The Second Story Eco-Friendly Seed Box',
    category: 'festival',
    description: 'A deluxe festive gifting hamper composed of plantable green products, handmade sweets wrapping, and dry seed crackers.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=700',
    originalMaterial: 'Discarded Wood Shavings & Organic Cotton Scrap',
    artisanGroup: 'Multi-Community Women Self-Employment Initiative',
    wasteDivertedKg: 4.1,
    details: [
      'Packaged in a raw reusable bamboo-strip jewelry chest',
      'Contains 6 handmade seed crackers, 4 herbal scented soy candles, and 1 mini journal',
      'Diverts waste and supports 4 distinct local artisanal communities',
      'Wonderful, customized gift box for conscious households'
    ],
    inStock: true
  }
];

export const workshopsData: Workshop[] = [
  {
    id: 'work-01',
    title: 'DIY Waste Upcycling and Bottle Designing',
    description: 'Learn the secrets of cutting, smoothing, and painting discarded glass bottles to create stunning bedside lamps, candle-holders, and decorative storage jars.',
    duration: '3 Hours',
    price: 25,
    date: '2026-06-14',
    time: '14:00 - 17:00',
    facilitator: 'Arundhati Sen (Master of Recycled Arts)',
    materialsProvided: [
      '3 Re-scrubbed glass bottles',
      'Non-toxic environmental glass paints and brushes',
      'Mini LED cork-lights',
      'Traditional sanding paper, glass protective tools'
    ],
    maxSeats: 15,
    seatsBooked: 9,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=700'
  },
  {
    id: 'work-02',
    title: 'Organic Herbal Colour Workshop',
    description: 'Rediscover ancestral techniques for extracting vibrant, skin-safe colors from discarded kitchen scraps, crushed flowers, turmeric, and beetroots.',
    duration: '2.5 Hours',
    price: 20,
    date: '2026-06-20',
    time: '10:30 - 13:00',
    facilitator: 'Ramachandra Dev (Traditional Dye Practitioner)',
    materialsProvided: [
      'Fresh flower temple waste',
      'Kitchen wastes (onion skins, spinach stocks, pomegranate rind)',
      'Natural organic binders and powders',
      'Take-home herbal dye jar'
    ],
    maxSeats: 20,
    seatsBooked: 16,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=700'
  },
  {
    id: 'work-03',
    title: 'Heritage Saree Painting & Revamp Session',
    description: 'Bring your pre-loved, faded sarees or heavy clothes from home! We will teach you block painting, stenciling, and patch restoration to create a modern masterpiece.',
    duration: '4 Hours',
    price: 30,
    date: '2026-06-28',
    time: '13:00 - 17:00',
    facilitator: 'Sunita Mehra (Textile Designer & Conservator)',
    materialsProvided: [
      'Fabric block prints (carved upcycled wooden stamps)',
      'Fabric acrylic dyes and metallic pigments',
      'Needles, organic threads, and cotton patches',
      'Artisan high teas and refreshments'
    ],
    maxSeats: 12,
    seatsBooked: 4,
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=700'
  }
];

export const toursData: Tour[] = [
  {
    id: 'tour-01',
    title: 'Weekend Sustainability Trail & Artisan Village Tour',
    duration: 'Full Saturday (8 AM - 5 PM)',
    price: 49,
    date: '2026-06-13',
    location: 'Starts at Center Point Bus Terminal, routes to Shaktipuri Rural Craft cluster',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=700',
    description: 'A deep-dive educational journey to our partnering artisanal village. See how shredded fabrics and scrap glass items are organized, sorted and crafted by women collectives.',
    itinerary: [
      '08:00 AM - Departure & Eco-conscious breakfast chat',
      '09:45 AM - Welcome to Shaktipuri village, local herbal drinks',
      '10:30 AM - Live upcycling demonstration (Glass smelting and bottle painting blocks)',
      '12:30 PM - Organic clay pot lunch sourced from native organic farms',
      '02:00 PM - DIY Patch-weaving with native artisans',
      '04:00 PM - Eco-souvenir curation and thank you circle'
    ],
    highlights: [
      'Interact directly with the women artisans behind your products',
      'Traditional hand-cooked organic country lunch included',
      'Make-your-own take-home Upcycle Souvenir kit included',
      'AC travel transit provided both ways'
    ]
  },
  {
    id: 'tour-02',
    title: 'Waste-to-Product Recycling Center Demonstration Tour',
    duration: 'Half Day (9 AM - 1:30 PM)',
    price: 25,
    date: '2026-06-24',
    location: 'District Green Eco-Industrial Yard, Block C',
    image: 'https://images.unsplash.com/photo-1532187640605-a25927110900?auto=format&fit=crop&q=80&w=700',
    description: 'Witness the magnificent mechanical processes converting mountains of post-consumer plastics, cartons, and metals into raw sheets and functional industrial tiles.',
    itinerary: [
      '09:00 AM - Registration and brief presentation on municipal solid waste patterns',
      '09:45 AM - Walking tour of the sorted paper-pulping and carton-shredding center',
      '11:00 AM - Demonstration of thermo-pressing waste plastic flakes into building tiles',
      '12:00 PM - Guided panel discussion: "Circular Economy in Action"',
      '01:00 PM - Organic juice serving and final feedback forms completion'
    ],
    highlights: [
      'Educational guide with safe industrial-grade helmets and visual gear',
      'Learn about waste segregation, recycling streams, and circular operations',
      'Great for students, engineering groups, and conscious families'
    ]
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'blog-01',
    title: '5 Simple Steps to Transition Your Kitchen to Zero-Waste',
    category: 'tips',
    summary: 'Ditching Single-Use plastics doesnâtm t need to be stressful. Learn how simple substitutions with glass jars, beeswax wraps, and compost tins can make a massive difference.',
    content: `Living sustainably starts with simple steps right in your home. The kitchen is typically the largest producer of household waste—from single-use plastic wrappers to discarded vegetable remains. 

Here are five accessible steps to transform your active kitchen into a zero-waste hub:

1. **Repurpose Glass Jars**: Never throw away a pickle or jam jar! Soak them in warm water to clear the label, then use them as beautiful pantry storage for rice, lentils, spices, and nuts. It looks incredibly aesthetic and saves you from buying plastic containers.
2. **Employ Natural Cotton Wax Wraps**: Scrap cotton fabrics, when sealed with natural organic beeswax, become perfect reusable coverings for fruit bowls, cheese, and cut vegetables.
3. **Establish a Countertop Compost Tin**: Keep a small, sealed tin right beside your cutting board for vegetable peels, eggshells, and coffee grounds. Diverting organic waste from general bags avoids methane production in landfill dumps.
4. **Choose Wooden Dish-Brushes**: Standard yellow plastic sponges shed thousands of microplastics down your drain. Choose biodegradable coir (coconut fiber) scrubbers or wooden bamboo brushes instead. They last longer and compost safely!
5. **Shop with Cloth Produce Bags**: Stitch small bags from pre-loved translucent sarees or old light cotton shirts to hold tomatoes, chillies, and grains. Keep them inside your trunk so you're always ready.

By implementing just two of these shifts, you prevent over 50 kilograms of waste from reaching city dump sites within a single year!`,
    author: 'Karishma Sahay (Sustainability Advocate)',
    publishedDate: '2026-05-28',
    readTime: '4 Mins',
    likes: 42,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=700',
    comments: [
      { id: 'c1', author: 'Vineet Rao', text: 'I tried the glass jar tip and my pantry looks so neat! Thanks!', date: '2026-05-29' },
      { id: 'c2', author: 'Ananya S.', text: 'Excellent, practical advice that is easy to follow.', date: '2026-05-30' }
    ]
  },
  {
    id: 'blog-02',
    title: 'DIY Upcycling Project: Cardboard Carton Succulent Pot',
    category: 'diy',
    summary: 'Donâtm t bin those milk or juice cartons! Grab some hemp rope, scissor, and biodegradable adhesives to build delightful, customized planting pots.',
    content: `Finished that carton of orange juice? Think twice before throwing it in the recycling bin. Juice and milk cartons are lined with water-resistant plastic and aluminum layers, which makes them highly durable and absolutely perfect as waterproof succulent planters!

Here is a quick, fun DIY project for a rainy Sunday afternoon:

### What You Will Need:
- 2 Empty clean beverage cartons (tetra-paks)
- A pair of sturdy scissors or utility cutter
- 10 meters of hemp rope or coconut fiber twine
- Natural organic adhesive (white glue/gum)
- A small nail for making drainage holes
- Potting soil and small succulents / plant cuttings

### Step-by-Step Instructions:

1. **Prep the Cartons**: Cut the juice carton in half horizontally. Clean the inside thoroughly with soapy water and let it dry.
2. **Make Drainage Holes**: Punch 3-4 small ventilation holes at the bottom of the carton using a clean nail or scissor tip. Good drainage keeps succulents happy!
3. **The Twine Wrap**: Apply glue in thin sections around the bottom of the carton. Take your hemp rope and wrap it tightly around the carton, pressing down. Work your way upward line by line until the gray carton is fully hidden under the rustic, earthy hemp wrap.
4. **Planting Day**: Fill the bottom with a small layer of gravel (for drainage), top it up with dry sandy potting soil, and tuck in your succulent cutting.
5. **Style and Mount**: You can paint the hemp with eco-friendly pigments or suspend them on your windows with cotton cords.

It is simple, cute, reduces waste, and makes a beautiful customized present for your friends!`,
    author: 'Meera Patil (DIY Lead at The Second Story)',
    publishedDate: '2026-06-02',
    readTime: '5 Mins',
    likes: 58,
    image: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?auto=format&fit=crop&q=80&w=700',
    comments: [
      { id: 'c3', author: 'Dr. Ramesh Sharma', text: 'Excellent step by step tutorial. I am going to try this with my kids this weekend.', date: '2026-06-03' }
    ]
  },
  {
    id: 'blog-03',
    title: 'Empowering Women: The Heart of the Second Story',
    category: 'impact',
    summary: 'A look inside the Shaktipuri Rural craft cooperative, where traditional embroidery is blended with modern denim salvage techniques.',
    content: `At The Second Story, we believe that 'sustainability' is vacant if it doesn't support the communities around us. Our core brand promise is that we don't just recycle waste—we create opportunities, stories, and a greener future.

Today, we take you behind the scenes to visit the Shaktipuri Rural Craft collective in West Bengal, currently housing 24 full-time women artisans. 

For many like Malati Halder, a mother of three, a structured upcycling workspace changed everything. "Earlier, my handloom skills were restricted to domestic repairs with no steady revenue. Now, tailoring denim jackets and scrap sarees into global-quality tote bags gives me an independent financial voice," shares Malati.

Our upcycling operations allow these incredible artisans to combine heritage embroidery with modern patchwork designs. Our waste collectors bring in denim jeans and sarees from cities, which are then cleaned, ironed, and distributed to tailoring stations. Each artisan is paid fair wages that are 40% higher than the local average, and they receive training in financial literacy.

By choosing upcycled products, you aren't just saving fabric from choking our landfills—you are directly financing the education of young children, enhancing family nutrition, and safeguarding traditional handcrafting arts.

Thank you for being part of Malati’s story. Each time you wear or carry a Second Story item, you carry their heritage, courage, and dedication.`,
    author: 'Aditi Roy (Co-Founder & Impact Director)',
    publishedDate: '2026-05-15',
    readTime: '6 Mins',
    likes: 83,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=700',
    comments: [
      { id: 'c4', author: 'Sonal Sen', text: 'This made me tear up! Beautiful initiative. Will buy more products.', date: '2026-05-16' }
    ]
  }
];

export const initialImpactStats = {
  wasteDivertedKg: 5320,
  productsCreated: 1420,
  communitiesSupported: 8,
  employmentGenerated: 24,
  goals: {
    wasteGoalKg: 10000,
    productsGoal: 3000,
    employmentGoal: 50,
  }
};

export const materialTransformations: MaterialTransformation[] = [
  {
    id: 'trans-glass',
    rawMaterial: 'Discarded Wine & Spirit Bottles',
    wasteSource: 'Hospitality waste & urban ragpicker collectives',
    endProductTitle: 'Artisanal Mosaic Table Lamp',
    endProductCategory: 'Lighting & Home Décor',
    image: '/src/assets/images/craft_glass_mosaic_lamp_1791988805283.jpg',
    artisanCluster: 'Bengal Women Glassmakers Cooperative',
    craftProcess: [
      'De-labeling, sanitation & diamond glass scoring',
      'Artisanal stone mosaic mosaic fracture & sorting by color hue',
      'Organic non-toxic bonding onto recycled base frame',
      'Fitting with warm LED low-energy electricals'
    ],
    impactFacts: {
      wasteDivertedKg: 1.8,
      co2AvoidedKg: 1.2
    }
  },
  {
    id: 'trans-denim',
    rawMaterial: 'Discarded Denim Jeans & Saree Borders',
    wasteSource: 'Garment factories & pre-loved clothes collection drives',
    endProductTitle: 'Heritage Patchwork Utility Tote',
    endProductCategory: 'Customized & Lifestyle',
    image: '/src/assets/images/craft_denim_saree_tote_1791988805890.jpg',
    artisanCluster: 'Surviving Single Mothers Association, Mumbai',
    craftProcess: [
      'Metal zipper & copper rivet deconstruction',
      'Steam sanitation with herbal neem extract',
      'Traditional blockprint accenting on silk borders',
      'Heavy-duty double-seam tailoring by artisan mothers'
    ],
    impactFacts: {
      wasteDivertedKg: 2.5,
      waterSavedLiters: 2400,
      co2AvoidedKg: 4.8
    }
  },
  {
    id: 'trans-coconut',
    rawMaterial: 'Temple & Street Vendor Coconut Shells',
    wasteSource: 'Pilgrimage shrine waste & tender coconut kiosks',
    endProductTitle: 'Pendant Hanging Planter',
    endProductCategory: 'Eco Home Décor',
    image: '/src/assets/images/craft_coconut_planter_1791988806237.jpg',
    artisanCluster: 'Youth Coastal Artisans, Odisha',
    craftProcess: [
      'Manual outer fiber coir de-husking (reused for potting mulch)',
      'Fine interior sand polishing with native river stone',
      'Cold-pressed flaxseed and linseed oil curing for weatherproofing',
      'Hand-braided natural jute suspension cords'
    ],
    impactFacts: {
      wasteDivertedKg: 0.7,
      co2AvoidedKg: 0.5
    }
  },
  {
    id: 'trans-terracotta',
    rawMaterial: 'Fractured Tea Stall Clay Kulhads',
    wasteSource: 'Railway platforms & traditional street chai vendors',
    endProductTitle: 'Terracotta Festive Diya Chandelier',
    endProductCategory: 'Festival Collections',
    image: '/src/assets/images/craft_terracotta_diya_1791988806395.jpg',
    artisanCluster: 'Dharavi Traditional Kumhar Guild',
    craftProcess: [
      'Collection, sorting and structural sorting of intact cup bells',
      'Natural tree resin reinforcement and edge smoothing',
      'Hand-twisted hemp fiber tier balancing',
      'Pouring organic soy wax and organic cotton wicks'
    ],
    impactFacts: {
      wasteDivertedKg: 3.2,
      co2AvoidedKg: 2.1
    }
  }
];
