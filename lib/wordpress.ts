import type {
  CaseStudy,
  Service,
  Client,
  Testimonial,
  Insight,
  SiteStat,
  PortfolioProject,
} from "./types";

/**
 * ------------------------------------------------------------------------
 * API ABSTRACTION LAYER
 * ------------------------------------------------------------------------
 * Every WordPress request funnels through this file. Components never call
 * fetch() against the WP REST API directly — they call these functions.
 *
 * TO CONNECT REAL WORDPRESS:
 * 1. Set WORDPRESS_API_URL in .env.local, e.g.
 *      WORDPRESS_API_URL=https://cms.grownfoster.com/wp-json
 * 2. Register the "case_study", "insight", "testimonial", "service", and
 *    "client" custom post types + ACF field groups described in the
 *    project's CMS spec.
 * 3. Replace the body of each function below with a `fetchWP()` call
 *    (already stubbed out) that hits the matching REST route and maps the
 *    raw WP/ACF JSON onto the types in lib/types.ts.
 * 4. Delete the placeholder arrays at the bottom of this file.
 *
 * Nothing in /app or /components needs to change when you do this — that's
 * the point of the abstraction.
 * ------------------------------------------------------------------------
 */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

/** Thin wrapper around fetch() with Next.js ISR caching baked in. Not used
 * yet (placeholder data is returned instead) but ready to switch on. */
async function fetchWP<T>(path: string, revalidateSeconds = 300): Promise<T> {
  if (!WORDPRESS_API_URL) {
    throw new Error(
      "WORDPRESS_API_URL is not set — see the header comment in lib/wordpress.ts"
    );
  }
  const res = await fetch(`${WORDPRESS_API_URL}${path}`, {
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`WordPress API error on ${path}: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return PLACEHOLDER_CASE_STUDIES;
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return PLACEHOLDER_CASE_STUDIES.filter((c) => c.featured);
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | undefined> {
  return PLACEHOLDER_CASE_STUDIES.find((c) => c.slug === slug);
}

export async function getAdjacentCaseStudy(
  slug: string
): Promise<CaseStudy | undefined> {
  const idx = PLACEHOLDER_CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (idx === -1) return undefined;
  return PLACEHOLDER_CASE_STUDIES[(idx + 1) % PLACEHOLDER_CASE_STUDIES.length];
}

export async function getIndustries(): Promise<string[]> {
  return Array.from(new Set(PLACEHOLDER_CASE_STUDIES.flatMap((c) => c.industry)));
}

export async function getServiceTags(): Promise<string[]> {
  return Array.from(new Set(PLACEHOLDER_CASE_STUDIES.flatMap((c) => c.services)));
}

// ---------------------------------------------------------------------------
// Services (agency capabilities section, not to be confused with the
// per-case-study "services" taxonomy above)
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  return PLACEHOLDER_SERVICES;
}

// ---------------------------------------------------------------------------
// Clients / logos
// ---------------------------------------------------------------------------

export async function getClients(): Promise<Client[]> {
  return PLACEHOLDER_CLIENTS;
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  return PLACEHOLDER_TESTIMONIALS;
}

// ---------------------------------------------------------------------------
// Insights / blog
// ---------------------------------------------------------------------------

export async function getInsights(): Promise<Insight[]> {
  return PLACEHOLDER_INSIGHTS;
}

export async function getInsightBySlug(slug: string): Promise<Insight | undefined> {
  return PLACEHOLDER_INSIGHTS.find((i) => i.slug === slug);
}

// ---------------------------------------------------------------------------
// Portfolio / projects
// ---------------------------------------------------------------------------

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return PLACEHOLDER_PORTFOLIO;
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  return PLACEHOLDER_PORTFOLIO.find((p) => p.slug === slug);
}

export async function getPortfolioProjectsByCategory(category: "performance" | "seo-search" | "b2b-outreach"): Promise<PortfolioProject[]> {
  return PLACEHOLDER_PORTFOLIO.filter((p) => p.category === category);
}

// ---------------------------------------------------------------------------
// Homepage stats strip
// ---------------------------------------------------------------------------

export async function getSiteStats(): Promise<SiteStat[]> {
  return [
    { value: "5.2X", label: "Peak Blended ROAS" },
    { value: "95%+", label: "OTP-Verified Lead Quality" },
    { value: "1,200+", label: "Monthly D2C Orders Scaled" },
    { value: "14+", label: "Performance Ad Verticals" },
  ];
}

// ---------------------------------------------------------------------------
// PLACEHOLDER DATA
// Shaped exactly like the real content will be once WordPress is connected.
// Delete this section once fetchWP() is wired up.
// ---------------------------------------------------------------------------

const img = (seed: string, w = 1600, h = 1000): { url: string; alt: string; width: number; height: number } => ({
  url: `https://images.unsplash.com/${seed}?w=${w}&h=${h}&fit=crop`,
  alt: "",
  width: w,
  height: h,
});

const PLACEHOLDER_CASE_STUDIES: CaseStudy[] = [
  {
    slug: "dominos-43k-followers",
    title: "43K Followers in 6 Hours",
    shortTitle: "43K in 6 Hours",
    client: "Domino's",
    year: 2026,
    industry: ["Food & Beverage"],
    services: ["Social Media Marketing", "Creative Design"],
    platform: ["Instagram", "Twitter"],
    campaignType: "Real-time campaign",
    tags: ["social", "campaign", "real-time"],
    featured: true,
    thumbnail: img("photo-1513104890138-7c749659a591"),
    heroMedia: img("photo-1513104890138-7c749659a591", 2400, 1350),
    shortDescription:
      "A live, reactive social campaign that turned a single cultural moment into the brand's fastest follower growth on record.",
    description:
      "Domino's needed a way to show up inside a live cultural moment without looking like every other brand piling on. We built a real-time creative pipeline that could publish inside minutes, not days.",
    challenge:
      "Domino's social presence was consistent but predictable. During a major live event, the brand risked being drowned out by faster, louder competitors reacting in real time.",
    insight:
      "Audiences don't reward brands for showing up late to a moment — they reward the fastest, funniest, most specific reaction. Speed had to become a creative advantage, not a constraint.",
    strategy: [
      { label: "01", title: "War Room", body: "A live creative + community team embedded for the full event window." },
      { label: "02", title: "Modular Templates", body: "Pre-built layouts that could be filled with reactive copy in under 3 minutes." },
      { label: "03", title: "Always-on Listening", body: "Real-time social listening flagged trending moments as they happened." },
    ],
    solution:
      "A pre-approved library of on-brand templates let the team publish reactive posts within minutes of key moments, paired with a rapid-response approval flow.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1571091718767-18b5b1457add", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1571997478779-2adcbbe9ab2f") },
      { type: "image", layout: "half", media: img("photo-1601924582970-9238bcb495d9") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1601924582970-9238bcb495d9", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1550547660-d9450f859349") },
      { type: "image", layout: "third", media: img("photo-1571091718767-18b5b1457add") },
      { type: "image", layout: "third", media: img("photo-1513104890138-7c749659a591") },
    ],
    headlineResult: { value: "43K", label: "Followers in 6 Hours" },
    stats: [
      { value: "43K+", label: "Followers" },
      { value: "6", label: "Hours" },
      { value: "3.4X", label: "Engagement" },
      { value: "+82%", label: "Reach" },
    ],
    testimonial: {
      quote:
        "Grow N Foster didn't just execute the campaign. They understood the business problem behind it.",
      name: "Anaya Kapoor",
      designation: "Head of Marketing",
      company: "Domino's India",
    },
    seo: {
      title: "Domino's: 43K Followers in 6 Hours | Grow N Foster",
      description:
        "How a real-time creative pipeline turned one cultural moment into Domino's fastest social growth on record.",
      canonical: "/work/dominos-43k-followers",
    },
  },
  {
    slug: "urbanest-real-estate-relaunch",
    title: "Rebuilding Trust in a Cold Market",
    shortTitle: "Rebuilding Trust",
    client: "Urbanest",
    year: 2025,
    industry: ["Real Estate"],
    services: ["Branding", "Lead Funnel Optimization", "Performance Marketing"],
    platform: ["Google Ads", "Meta Ads"],
    campaignType: "Brand relaunch",
    tags: ["branding", "lead-gen", "performance"],
    featured: true,
    thumbnail: img("photo-1560518883-ce09059eeffa"),
    heroMedia: img("photo-1560518883-ce09059eeffa", 2400, 1350),
    shortDescription:
      "A full identity and acquisition funnel relaunch that repositioned a mid-size developer as the most transparent name in the city.",
    description:
      "Urbanest had the inventory but not the trust. We rebuilt the brand positioning from the inside out, starting with the one thing buyers actually wanted: clarity.",
    challenge:
      "Rising interest rates and a string of delayed projects across the category had made buyers deeply skeptical of any new developer messaging.",
    insight:
      "In a low-trust category, the brand that shows its work — literally — wins. Transparency had to be a marketing principle, not a tagline.",
    strategy: [
      { label: "01", title: "Radical Transparency", body: "Live construction-progress updates integrated directly into lead nurture campaigns." },
      { label: "02", title: "Identity Reset", body: "A calmer, more editorial visual language distinct from competitor noise." },
      { label: "03", title: "Intent-first Media", body: "Performance campaigns built around high-intent search, not awareness." },
    ],
    solution:
      "A new identity system paired with transparent buyer nurture funnels and high-intent search ads, rebuilding confidence project by project.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1600585154340-be6161a56a0c", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1600607687939-ce8a6c25118c") },
      { type: "image", layout: "half", media: img("photo-1600566753086-00f18fb6b3ea") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1600607687939-ce8a6c25118c", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1600566753086-00f18fb6b3ea") },
      { type: "image", layout: "third", media: img("photo-1600585154340-be6161a56a0c") },
      { type: "image", layout: "third", media: img("photo-1560518883-ce09059eeffa") },
    ],
    headlineResult: { value: "+193%", label: "Organic Growth" },
    stats: [
      { value: "+193%", label: "Organic Growth" },
      { value: "+87%", label: "Qualified Leads" },
      { value: "3.2X", label: "ROAS" },
      { value: "+120K", label: "Campaign Reach" },
    ],
    testimonial: {
      quote:
        "For the first time, our marketing delivered qualified buyers consistently.",
      name: "Rohan Mehta",
      designation: "VP Marketing",
      company: "Urbanest",
    },
    seo: {
      title: "Urbanest: Rebuilding Trust in a Cold Market | Grow N Foster",
      description:
        "A full identity and acquisition campaign that repositioned a real-estate developer around transparency.",
      canonical: "/work/urbanest-real-estate-relaunch",
    },
  },
  {
    slug: "carewell-healthcare-seo",
    title: "Owning Local Search in Healthcare",
    shortTitle: "Owning Local Search",
    client: "Carewell Clinics",
    year: 2025,
    industry: ["Healthcare"],
    services: ["SEO", "Local SEO", "Content Marketing"],
    platform: ["Google", "Web"],
    tags: ["seo", "local", "content"],
    featured: true,
    thumbnail: img("photo-1576091160399-112ba8d25d1d"),
    heroMedia: img("photo-1576091160399-112ba8d25d1d", 2400, 1350),
    shortDescription:
      "A city-by-city local SEO overhaul that took a 12-clinic network from page three to page one for its highest-intent searches.",
    description:
      "Carewell had strong clinical outcomes and near-invisible search presence. We rebuilt their local SEO foundation clinic by clinic.",
    challenge:
      "Patients were choosing competitors purely on search visibility — Carewell's actual quality of care never entered the decision.",
    insight:
      "Local healthcare search is won at the level of individual clinics, not the brand. Every location needed to be treated as its own SEO project.",
    strategy: [
      { label: "01", title: "Location Audits", body: "Clinic-by-clinic technical and content audits across all 12 sites." },
      { label: "02", title: "Structured Content", body: "Condition-specific pages built around real patient search intent." },
      { label: "03", title: "Review Velocity", body: "A systemized flow for collecting and responding to patient reviews." },
    ],
    solution:
      "Location-specific landing pages, structured data, and a review-generation system moved every clinic onto page one within two quarters.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1519494026892-80bbd2d6fd0d", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1587854692152-cbe660dbde88") },
      { type: "image", layout: "half", media: img("photo-1631217868264-e5b90bb7e133") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1587854692152-cbe660dbde88", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1631217868264-e5b90bb7e133") },
      { type: "image", layout: "third", media: img("photo-1519494026892-80bbd2d6fd0d") },
      { type: "image", layout: "third", media: img("photo-1576091160399-112ba8d25d1d") },
    ],
    headlineResult: { value: "+312%", label: "Organic Bookings" },
    stats: [
      { value: "12/12", label: "Clinics on Page 1" },
      { value: "+312%", label: "Organic Bookings" },
      { value: "+58%", label: "Review Volume" },
      { value: "9mo", label: "Time to Rank" },
    ],
    seo: {
      title: "Carewell Clinics: Owning Local Search | Grow N Foster",
      description:
        "How a location-by-location SEO overhaul moved a 12-clinic healthcare network to page one.",
      canonical: "/work/carewell-healthcare-seo",
    },
  },
  {
    slug: "loomkraft-ecommerce-growth",
    title: "Scaling a D2C Brand Past Its Ceiling",
    shortTitle: "Scaling Past the Ceiling",
    client: "Loomkraft",
    year: 2026,
    industry: ["E-commerce", "Retail"],
    services: ["Performance Marketing", "Meta Ads", "Creative Design"],
    platform: ["Meta", "Web"],
    tags: ["ecommerce", "performance", "creative"],
    featured: false,
    thumbnail: img("photo-1441984904996-e0b6ba687e04"),
    heroMedia: img("photo-1441984904996-e0b6ba687e04", 2400, 1350),
    shortDescription:
      "A creative-testing engine that broke a plateaued D2C textile brand out of its growth ceiling.",
    description:
      "Loomkraft's paid performance had flatlined for two straight quarters. We rebuilt the creative testing process from scratch.",
    challenge:
      "CAC had crept up for six months straight while the same three ad creatives kept getting refreshed rather than replaced.",
    insight:
      "The brand wasn't out of audience — it was out of new ideas. Creative fatigue, not targeting, was the real ceiling.",
    strategy: [
      { label: "01", title: "Creative Velocity", body: "A weekly production line generating 15+ new ad concepts." },
      { label: "02", title: "Structured Testing", body: "A rigorous test-and-kill framework replacing gut-feel decisions." },
      { label: "03", title: "Catalog Expansion", body: "Dynamic product ads pulling from the full catalog, not bestsellers only." },
    ],
    solution:
      "A high-velocity creative pipeline paired with disciplined test-and-kill rules on ad spend broke the plateau within one quarter.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1445205170230-053b83016050", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1445205170230-053b83016050") },
      { type: "image", layout: "half", media: img("photo-1441984904996-e0b6ba687e04") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1445205170230-053b83016050", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1441984904996-e0b6ba687e04") },
      { type: "image", layout: "third", media: img("photo-1441986300917-64674bd600d8") },
      { type: "image", layout: "third", media: img("photo-1472851294608-062f824d29cc") },
    ],
    headlineResult: { value: "-38%", label: "CAC" },
    stats: [
      { value: "-38%", label: "CAC" },
      { value: "+215%", label: "Revenue" },
      { value: "3.9X", label: "ROAS" },
      { value: "18", label: "New Creatives / Week" },
    ],
    seo: {
      title: "Loomkraft: Scaling a D2C Brand | Grow N Foster",
      description:
        "How a high-velocity creative testing engine broke a plateaued D2C brand's growth ceiling.",
      canonical: "/work/loomkraft-ecommerce-growth",
    },
  },
  {
    slug: "brightpath-education-branding",
    title: "Giving a New School a 100-Year Feel",
    shortTitle: "A 100-Year Feel",
    client: "Brightpath Schools",
    year: 2025,
    industry: ["Education"],
    services: ["Branding", "Inbound Marketing", "Enrollment Campaigns"],
    platform: ["Meta Ads", "Google Search"],
    tags: ["branding", "education", "lead-gen"],
    featured: false,
    thumbnail: img("photo-1523050854058-8df90110c9f1"),
    heroMedia: img("photo-1523050854058-8df90110c9f1", 2400, 1350),
    shortDescription:
      "A founding brand identity and enrollment campaign built to feel established on day one, not like a first-year startup.",
    description:
      "Brightpath was opening its doors for the first time but needed parents to trust it like an institution with decades behind it.",
    challenge:
      "New schools compete against institutions with generational trust. Brightpath had zero track record to point to.",
    insight:
      "Trust for a new school comes from craft and restraint, not from claims. The brand messaging had to look considered, not eager.",
    strategy: [
      { label: "01", title: "Heritage Cues", body: "A visual and copy language borrowing structure from long-established institutions." },
      { label: "02", title: "Founder Story", body: "Leading with the founding team's philosophy across paid and organic social." },
      { label: "03", title: "Enrollment Funnel", body: "A lead nurture funnel built around the actual parent decision journey." },
    ],
    solution:
      "A restrained, editorial identity and a targeted acquisition funnel structured around real parent questions replaced the generic new-school playbook.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1580582932707-520aed937b7b", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1503676260728-1c00da094a0b") },
      { type: "image", layout: "half", media: img("photo-1523050854058-8df90110c9f1") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1503676260728-1c00da094a0b", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1580582932707-520aed937b7b") },
      { type: "image", layout: "third", media: img("photo-1523050854058-8df90110c9f1") },
      { type: "image", layout: "third", media: img("photo-1571260899304-425eee4c7efc") },
    ],
    headlineResult: { value: "92%", label: "Seats Filled at Launch" },
    stats: [
      { value: "92%", label: "Seats Filled at Launch" },
      { value: "+140%", label: "Enquiry Rate" },
      { value: "4.2X", label: "Site Time-on-Page" },
    ],
    seo: {
      title: "Brightpath Schools Branding | Grow N Foster",
      description:
        "A founding brand identity for a new school built to feel established from day one.",
      canonical: "/work/brightpath-education-branding",
    },
  },
  {
    slug: "meridian-fintech-launch",
    title: "Launching a Fintech Brand Nobody Had to Explain",
    shortTitle: "A Brand Nobody Had to Explain",
    client: "Meridian",
    year: 2026,
    industry: ["Finance", "Technology"],
    services: ["Branding", "Digital Marketing", "Acquisition Funnels"],
    platform: ["Google Ads", "Meta Ads"],
    tags: ["fintech", "branding", "launch"],
    featured: false,
    thumbnail: img("photo-1454165804606-c3d57bc86b40"),
    heroMedia: img("photo-1454165804606-c3d57bc86b40", 2400, 1350),
    shortDescription:
      "A category-defining launch identity and go-to-market campaign for a new consumer investing app.",
    description:
      "Meridian's product was simple; its category's marketing was not. We built a campaign that explained the value proposition clearly without jargon.",
    challenge:
      "Consumer fintech marketing had become a wall of jargon. Meridian risked launching into the same noise as everyone else.",
    insight:
      "The clearest fintech brand in the room wins the download. Plain language was the actual differentiator, not another feature callout.",
    strategy: [
      { label: "01", title: "Plain-language System", body: "An ad copy and messaging system that banned category jargon outright." },
      { label: "02", title: "Trust Signals", body: "Security and regulation made visually central across every ad creative." },
      { label: "03", title: "Launch Funnel", body: "A waitlist-to-download acquisition funnel tuned for a single hard launch day." },
    ],
    solution:
      "A jargon-free identity and launch campaign turned a crowded category pitch into a one-sentence promise, backed by a tightly tuned acquisition funnel.",
    execution: [
      { type: "image", layout: "full", media: img("photo-1611974789855-9c2a0a7236a3", 2400, 1400) },
      { type: "image", layout: "half", media: img("photo-1560472354-b33ff0c44a43") },
      { type: "image", layout: "half", media: img("photo-1454165804606-c3d57bc86b40") },
    ],
    gallery: [
      { type: "image", layout: "full", media: img("photo-1560472354-b33ff0c44a43", 2400, 1400) },
      { type: "image", layout: "third", media: img("photo-1611974789855-9c2a0a7236a3") },
      { type: "image", layout: "third", media: img("photo-1454165804606-c3d57bc86b40") },
      { type: "image", layout: "third", media: img("photo-1563986768609-322da13575f3") },
    ],
    headlineResult: { value: "50K", label: "Waitlist Signups" },
    stats: [
      { value: "50K", label: "Waitlist Signups" },
      { value: "+64%", label: "Day-1 Downloads vs Target" },
      { value: "2.1X", label: "ROAS" },
    ],
    seo: {
      title: "Meridian Fintech Launch | Grow N Foster",
      description:
        "A category-defining launch identity and go-to-market site for a consumer investing app.",
      canonical: "/work/meridian-fintech-launch",
    },
  },
];

const PLACEHOLDER_SERVICES: Service[] = [
  { number: "01", title: "Google Ads", description: "High-intent Search, Google Shopping, Display, and Performance Max campaigns capturing buyers ready to convert." },
  { number: "02", title: "Meta Ads (Facebook & Instagram)", description: "Full-funnel Meta Advantage+, Catalog, Story, and Click-to-WhatsApp ad campaigns engineered for low CPA and high ROAS." },
  { number: "03", title: "LinkedIn Ads", description: "Account-based Sponsored Content, Lead Gen Forms, and InMail targeting B2B decision-makers by role, industry, and company size." },
  { number: "04", title: "YouTube Ads", description: "Direct-response in-stream video and YouTube Shorts campaigns engineered to build demand and drive trackable conversions." },
  { number: "05", title: "TikTok Ads", description: "High-velocity UGC creative testing, Spark Ads, and conversion campaigns built to scale D2C and consumer brands." },
  { number: "06", title: "X (Twitter) Ads", description: "Real-time promoted posts, product launch bursts, and interest-targeted campaigns for SaaS, fintech, and high-growth brands." },
  { number: "07", title: "OTP-Verified Lead Generation", description: "Two-step SMS OTP verification integrated into ad forms to eliminate fake leads and deliver 95%+ verified buyers." },
  { number: "08", title: "Conversion Tracking & Attribution", description: "Server-side CAPI, GA4, Google Ads offline conversion tracking, and transparent multi-platform ROAS dashboards." },
];

const PLACEHOLDER_CLIENTS: Client[] = [
  "ThoughtSpot", "Numeric", "Riot Platforms", "UNA Fitness", "Digicomplish",
  "Netciples", "Primrose School", "Aptibit", "Bootz To Heelz", "MPME Abrasives",
  "Munshi OS", "Belt Conveyor Guarding", "Table Tutor", "Bell", "Check Point",
  "Sparx Digital", "Baruni Solutions", "Slatt Capital", "Swopelees", "Hypertel Group",
  "The Gate PM Management",
].map((name) => ({ name, logo: img(`photo-1560518883-ce09059eeffa`, 400, 200) }));

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Twinka's SEO and AI search visibility strategy delivered 187,000+ monthly organic visitors and hundreds of citations across AI search engines.",
    name: "Enterprise SaaS Lead",
    designation: "VP Marketing",
    company: "ThoughtSpot",
  },
  {
    quote: "Integrating OTP verification into our real estate ads solved our fake lead issue overnight. Lead quality jumped to 95% verified buyers.",
    name: "Senior Sales Director",
    designation: "Acquisition Head",
    company: "NCR Real Estate Developer",
  },
  {
    quote: "A single targeted email nurture campaign with the $4,000 tuition offer brought 6 high-value families back for campus tours within weeks.",
    name: "School Director",
    designation: "Owner",
    company: "Primrose School of Rockland, MA",
  },
];

const PLACEHOLDER_INSIGHTS: Insight[] = [
  {
    slug: "creative-fatigue-is-a-growth-problem",
    title: "Creative Fatigue Is a Growth Problem, Not a Content Problem",
    excerpt: "Why plateaued paid performance is usually a creative-supply issue in disguise.",
    content: "Full article content goes here — sourced from WordPress as rendered HTML/blocks.",
    featuredImage: img("photo-1553877522-43269d4ea984", 1600, 1000),
    author: "Grow N Foster Team",
    categories: ["Performance Marketing"],
    tags: ["paid media", "creative"],
    publishedAt: "2026-06-02",
    readingTime: 6,
  },
  {
    slug: "local-seo-is-won-clinic-by-clinic",
    title: "Local SEO Is Won Clinic by Clinic, Not Brand by Brand",
    excerpt: "What a 12-location healthcare rollout taught us about treating every location as its own project.",
    content: "Full article content goes here — sourced from WordPress as rendered HTML/blocks.",
    featuredImage: img("photo-1576091160399-112ba8d25d1d", 1600, 1000),
    author: "Grow N Foster Team",
    categories: ["SEO"],
    tags: ["local seo", "healthcare"],
    publishedAt: "2026-05-14",
    readingTime: 5,
  },
  {
    slug: "the-case-for-boring-brand-launches",
    title: "The Case for a Boring Fintech Brand Launch",
    excerpt: "Plain language beat clever positioning for one consumer investing app's first 50,000 users.",
    content: "Full article content goes here — sourced from WordPress as rendered HTML/blocks.",
    featuredImage: img("photo-1454165804606-c3d57bc86b40", 1600, 1000),
    author: "Grow N Foster Team",
    categories: ["Branding"],
    tags: ["fintech", "launch"],
    publishedAt: "2026-04-22",
    readingTime: 7,
  },
];

export const PLACEHOLDER_PORTFOLIO: PortfolioProject[] = [
  // --- PERFORMANCE MARKETING & PAID ADS ---
  {
    slug: "thoughtspot-demand-gen",
    title: "ThoughtSpot Scaled Search & Demand Gen",
    category: "performance",
    description: "Multi-channel Google Search and LinkedIn Ads scaling enterprise AI analytics trials across global markets.",
    longDescription: "Scaled B2B SaaS trial registrations by capturing high-intent enterprise search queries and deploying account-based LinkedIn sponsored content to VP and C-level data executives. We restructured account bidding to optimize for pipeline value rather than raw clicks.",
    tags: ["Google Ads", "LinkedIn Ads", "Demand Gen"],
    techStack: ["Google Ads", "LinkedIn Campaign Manager", "Google Analytics 4", "Looker Studio", "HubSpot"],
    client: "ThoughtSpot",
    year: 2026,
    thumbnail: img("photo-1551288049-bebda4e38f71"),
    screenshots: [
      img("photo-1551288049-bebda4e38f71"),
      img("photo-1460925895917-afdab827c52f"),
      img("photo-1504868584819-f8e8b4b6d7e3")
    ],
    liveUrl: "https://www.thoughtspot.com",
    challenge: "High customer acquisition costs and low sales-accepted lead rates from broad-match keyword campaigns.",
    solution: "Implemented exact-match intent clusters, offline conversion tracking via Google Ads API, and tailored audience exclusion lists to filter non-commercial traffic."
  },
  {
    slug: "ncr-real-estate-lead-engine",
    title: "NCR Real Estate OTP-Verified Lead Engine",
    category: "performance",
    description: "High-intent Meta and Google ad funnels integrated with SMS OTP verification to eliminate fake leads and boost site visits.",
    longDescription: "High-ticket luxury residential property acquisition campaigns across Delhi NCR. Integrated real-time phone verification directly into instant lead forms and campaign landing pages, filtering out junk submissions before they hit the sales CRM.",
    tags: ["Meta Ads", "Lead Generation", "OTP Verification"],
    techStack: ["Meta Ads Manager", "Google Ads", "Twilio OTP", "Zapier", "Salesforce"],
    client: "NCR Real Estate Developer",
    year: 2025,
    thumbnail: img("photo-1560518883-ce09059eeffa"),
    screenshots: [
      img("photo-1560518883-ce09059eeffa"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600607687939-ce8a6c25118c")
    ],
    liveUrl: "https://ads.google.com",
    challenge: "Massive volume of invalid phone numbers and uncontactable leads that were draining sales team bandwidth.",
    solution: "Designed a two-step OTP verification flow ensuring only buyers with verified mobile numbers could schedule property site visits, cutting fake leads by 95%+."
  },
  {
    slug: "aura-living-roas-scaling",
    title: "Aura Living E-commerce ROAS Scaling",
    category: "performance",
    description: "Google Shopping & Performance Max campaigns with Meta Advantage+ creatives delivering 4.5x blended ROAS.",
    longDescription: "Scaled quarterly revenue by 180% for a luxury home and lifestyle brand through automated product feed optimization, high-converting video reels, and segmented dynamic remarketing for abandoned cart shoppers.",
    tags: ["E-commerce", "Performance Max", "Meta Advantage+"],
    techStack: ["Google Merchant Center", "Performance Max", "Meta Ads", "Google Analytics 4", "Klaviyo"],
    client: "Aura Living Goods",
    year: 2026,
    thumbnail: img("photo-1441984904996-e0b6ba687e04"),
    screenshots: [
      img("photo-1441984904996-e0b6ba687e04"),
      img("photo-1441986300917-64674bd600d8"),
      img("photo-1472851294608-062f824d29cc")
    ],
    liveUrl: "https://business.facebook.com",
    challenge: "Rising acquisition costs and creative fatigue across standard catalog ads during peak retail seasons.",
    solution: "Rebuilt the Google Merchant feed with optimized custom titles, deployed user-generated lifestyle video ads, and set up tiered ROAS bidding targets."
  },
  // --- SEO, AEO & SEARCH VISIBILITY ---
  {
    slug: "thoughtspot-ai-seo",
    title: "ThoughtSpot AI Search & Organic Authority",
    category: "seo-search",
    description: "Enterprise technical SEO, structured hub pages, and AEO optimization driving 187K+ monthly organic visitors.",
    longDescription: "Re-architected content taxonomy, implemented Schema.org semantic data graphs, and produced answer-first content engineered to be indexed and cited by Google AI Overviews, Perplexity, ChatGPT, and Gemini.",
    tags: ["Technical SEO", "AEO & GEO", "Organic Traffic"],
    techStack: ["Google Search Console", "Semrush", "Ahrefs", "Schema.org", "Screaming Frog"],
    client: "ThoughtSpot",
    year: 2026,
    thumbnail: img("photo-1432888498266-38ffec3eaf0a"),
    screenshots: [
      img("photo-1432888498266-38ffec3eaf0a"),
      img("photo-1616469829581-73993eb86b02"),
      img("photo-1599658880436-c61792e70672")
    ],
    liveUrl: "https://search.google.com/search-console",
    challenge: "Low organic footprint for emerging AI analytics keywords and minimal presence in AI answer engine citations.",
    solution: "Built semantic topic clusters, restructured internal link equity, and added entity-rich definitions optimized for zero-click and AI search citations."
  },
  {
    slug: "numeric-accounting-seo",
    title: "Numeric Accounting AI Visibility Engine",
    category: "seo-search",
    description: "B2B SaaS search visibility strategy resulting in 39,000+ monthly organic visitors and 770+ AI engine citations.",
    longDescription: "Developed targeted technical accounting guides and workflow templates that captured high-intent finance leaders searching for automated month-end close software.",
    tags: ["Content SEO", "SaaS Growth", "AEO"],
    techStack: ["Semrush", "Google Analytics 4", "SurferSEO", "Ahrefs", "Google Search Console"],
    client: "Numeric",
    year: 2025,
    thumbnail: img("photo-1454165804606-c3d57bc86b40"),
    screenshots: [
      img("photo-1454165804606-c3d57bc86b40"),
      img("photo-1504711434969-e33886168f5c"),
      img("photo-1551288049-bebda4e38f71")
    ],
    liveUrl: "https://www.numeric.io",
    challenge: "Competing with incumbent legacy accounting portals that held top rankings for generic search terms.",
    solution: "Focused on high-intent bottom-of-funnel comparison terms and structured data schemas that won 777 AI-cited pages."
  },
  {
    slug: "dr-ankur-local-seo",
    title: "Dr. Ankur Local 3-Pack & Clinic Ranking",
    category: "seo-search",
    description: "Local SEO overhaul, Google Business Profile optimization, and citation cleanup driving 180% booking growth.",
    longDescription: "Elevated clinic visibility into the top 3 on Google Maps for all key local dental searches. Created hyper-local service pages and an automated post-treatment review collection process.",
    tags: ["Local SEO", "Google Business Profile", "Review Velocity"],
    techStack: ["Google Business Profile", "BrightLocal", "Google Maps", "Schema.org", "WhatsApp Business"],
    client: "Dr. Ankur Dental Clinic",
    year: 2025,
    thumbnail: img("photo-1576091160399-112ba8d25d1d"),
    screenshots: [
      img("photo-1576091160399-112ba8d25d1d"),
      img("photo-1519494026892-80bbd2d6fd0d"),
      img("photo-1572044162444-ad60f128bdea")
    ],
    liveUrl: "https://business.google.com",
    challenge: "Inconsistent directory listings and low Google Map visibility causing local patients to choose competitor clinics.",
    solution: "Cleaned up 100% of NAP citations across local aggregators, optimized GBP categories with regular updates, and launched geo-targeted service campaigns."
  },
  // --- B2B OUTREACH & LEAD GEN ---
  {
    slug: "digicomplish-linkedin-outreach",
    title: "Digicomplish RPO LinkedIn Acquisition",
    category: "b2b-outreach",
    description: "Sales Navigator precision outreach yielding a 29% connection acceptance rate and 18 executive meetings booked.",
    longDescription: "Designed account-based LinkedIn outreach targeting VP of HR and Talent Acquisition heads across the UK and India. Personalized message angles focusing on offshore recruitment capacity and reduced cost-per-hire.",
    tags: ["LinkedIn Outreach", "Sales Navigator", "B2B Sales"],
    techStack: ["LinkedIn Sales Navigator", "Expandi", "Apollo.io", "HubSpot CRM", "Calendly"],
    client: "Digicomplish",
    year: 2026,
    thumbnail: img("photo-1552664730-d307ca884978"),
    screenshots: [
      img("photo-1552664730-d307ca884978"),
      img("photo-1519389950473-47ba0277781c"),
      img("photo-1542744094-3a31f272c490")
    ],
    liveUrl: "https://business.linkedin.com/sales-solutions",
    challenge: "Low response rates from standard InMail and generic cold connection requests.",
    solution: "Built hyper-specific boolean search prospect lists and conversational, value-first messaging sequences without aggressive sales pitches."
  },
  {
    slug: "primrose-email-nurture",
    title: "Primrose School $4K Tuition Re-Engagement",
    category: "b2b-outreach",
    description: "Segmented cold and nurture email sequences achieving a 48% open rate and 6 booked enrollment tours.",
    longDescription: "Segmented past inactive family enquiries into tailored interest groups and executed a high-touch 6-part email nurture sequence featuring a limited-time $4,000 tuition grant offer from the school owner.",
    tags: ["Email Marketing", "Parent Nurture", "Lead Reactivation"],
    techStack: ["Mailchimp", "Google Workspace", "Instantly.ai", "NeverBounce", "HubSpot"],
    client: "Primrose School of Rockland, MA",
    year: 2025,
    thumbnail: img("photo-1523050854058-8df90110c9f1"),
    screenshots: [
      img("photo-1523050854058-8df90110c9f1"),
      img("photo-1503676260728-1c00da094a0b"),
      img("photo-1580582932707-520aed937b7b")
    ],
    liveUrl: "https://mailchimp.com",
    challenge: "Cold list of past parent enquiries that had stalled without scheduling an in-person school tour.",
    solution: "Re-warmed sending domains, crafted personal founder-to-parent copy, and added single-click tour scheduling links."
  },
  {
    slug: "netciples-it-pipeline",
    title: "Netciples B2B IT Pipeline Outreach",
    category: "b2b-outreach",
    description: "A 12-week multi-touch LinkedIn and cold email campaign producing 31 verified enterprise IT sales leads.",
    longDescription: "Orchestrated systematic multi-channel outreach to CTOs and IT Directors across the USA and Canada. Sent 180+ weekly tailored touches with automated lead logging in a shared pipeline dashboard.",
    tags: ["Multi-Channel Outreach", "Enterprise Pipeline", "Cold Email"],
    techStack: ["LinkedIn Sales Navigator", "Smartlead", "Apollo.io", "Google Sheets", "Notion CRM"],
    client: "Netciples",
    year: 2026,
    thumbnail: img("photo-1553877522-43269d4ea984"),
    screenshots: [
      img("photo-1553877522-43269d4ea984"),
      img("photo-1542744173-8e7e53415bb0"),
      img("photo-1611532736597-de2d4265fba3")
    ],
    liveUrl: "https://www.smartlead.ai",
    challenge: "Long enterprise IT sales cycles and difficulty getting responses from technical decision-makers.",
    solution: "Deployed peer-to-peer technical consultation angles highlighting cloud infrastructure audits and SLA guarantees."
  }
];
