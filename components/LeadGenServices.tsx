"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SectionHeading from "./SectionHeading";

interface Metric {
  value: string;
  label: string;
}

interface ClientCard {
  tag: string;
  client: string;
  industry: string;
  description: string;
  metrics: Metric[];
}

interface ServiceGroup {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  projectCount: string;
  clients: ClientCard[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "ads",
    number: "01",
    title: "Performance marketing & paid ads",
    subtitle:
      "All-platform paid media: Google, Meta, LinkedIn, X (Twitter), TikTok & YouTube Ads—built for verified leads, low CPA, and high ROAS.",
    projectCount: "18 client projects",
    clients: [
      {
        tag: "GOOGLE ADS",
        client: "Aura Living Goods",
        industry: "Home & Lifestyle E-Commerce",
        description:
          "Google Shopping and Performance Max campaigns targeting high-intent home decor buyers across tier-1 cities.",
        metrics: [
          { value: "4.5x", label: "average ROAS" },
          { value: "₹450", label: "cost per acquisition" },
          { value: "+180%", label: "quarterly sales growth" },
        ],
      },
      {
        tag: "GOOGLE ADS",
        client: "Planora BIM Viewer",
        industry: "Industrial SaaS / 3D Web",
        description:
          "Google Search campaigns capturing architects and structural engineers seeking 3D WebGL BIM file review software.",
        metrics: [
          { value: "₹1,200", label: "cost per demo request" },
          { value: "6.8%", label: "search CTR" },
          { value: "42", label: "enterprise demos a month" },
        ],
      },
      {
        tag: "GOOGLE ADS",
        client: "Urban Logistics India",
        industry: "Supply Chain & Freight",
        description:
          "Google Search campaigns targeting manufacturers searching for reliable inter-city freight and warehousing.",
        metrics: [
          { value: "₹950", label: "cost per contract lead" },
          { value: "8.2%", label: "conversion rate" },
          { value: "35", label: "corporate contract enquiries" },
        ],
      },
      {
        tag: "GOOGLE ADS",
        client: "Stallion Commercial Finance",
        industry: "Financial Services",
        description:
          "Search campaigns targeting commercial real estate investors looking for working capital and asset loans.",
        metrics: [
          { value: "₹1,800", label: "cost per loan enquiry" },
          { value: "5.4%", label: "CTR on intent keywords" },
          { value: "28", label: "qualified loan leads a month" },
        ],
      },
      {
        tag: "META ADS",
        client: "Velvet Couture Dubai",
        industry: "Luxury Fashion & Retail",
        description:
          "Instagram Catalog and Story ads targeting GCC luxury shoppers for haute couture evening wear collections.",
        metrics: [
          { value: "5.2x", label: "blended ROAS" },
          { value: "3.8%", label: "ad CTR" },
          { value: "140+", label: "high-ticket orders" },
        ],
      },
      {
        tag: "META ADS",
        client: "BioGen Organics",
        industry: "D2C FMCG / Skincare",
        description:
          "Meta Advantage+ Shopping campaigns running user-generated video ads for organic skincare products across Facebook and Instagram.",
        metrics: [
          { value: "3.9x", label: "ROAS at scale" },
          { value: "₹310", label: "CPA per customer" },
          { value: "1,200+", label: "orders a month" },
        ],
      },
      {
        tag: "META ADS",
        client: "HealthStream Diagnostics",
        industry: "Healthcare & Diagnostics",
        description:
          "Facebook and Instagram ad campaigns promoting full-body health checkup packages with home sample collection across Delhi NCR.",
        metrics: [
          { value: "₹180", label: "cost per booking" },
          { value: "4.2%", label: "click-through rate" },
          { value: "320+", label: "monthly checkups booked" },
        ],
      },
      {
        tag: "META ADS",
        client: "Apex Dental Care",
        industry: "Dental & Healthcare",
        description:
          "Hyper-local Meta Ads for teeth whitening and clear aligners targeting residents within a 5km clinic radius.",
        metrics: [
          { value: "₹220", label: "cost per consultation" },
          { value: "18%", label: "consultation booking rate" },
          { value: "65+", label: "new patients a month" },
        ],
      },
      {
        tag: "LINKEDIN ADS",
        client: "CloudCraft Tech Solutions",
        industry: "Cloud & Managed IT",
        description:
          "LinkedIn Sponsored Content and Message Ads targeting IT decision-makers evaluating AWS migration, cloud security and managed IT services.",
        metrics: [
          { value: "₹1,450", label: "cost per SQL" },
          { value: "4.9%", label: "ad engagement rate" },
          { value: "19", label: "signed SLA clients" },
        ],
      },
      {
        tag: "LINKEDIN ADS",
        client: "Metropolis Workspaces",
        industry: "Commercial Co-Working",
        description:
          "LinkedIn Lead Gen Form campaigns targeting startup founders and SMB leaders looking for private office space in Bengaluru.",
        metrics: [
          { value: "₹340", label: "cost per desk lead" },
          { value: "22%", label: "tour visit rate" },
          { value: "85", label: "hotdesk enquiries a month" },
        ],
      },
      {
        tag: "X (TWITTER) ADS",
        client: "NCR Real Estate Developer",
        industry: "Real Estate",
        description:
          "X Ads targeting high-net-worth buyers researching luxury property in Delhi NCR, integrated with OTP-verified lead capture forms.",
        metrics: [
          { value: "₹250 - 1,000", label: "cost per verified lead" },
          { value: "95%+", label: "fake lead reduction" },
          { value: "10 to 15%", label: "lead-to-site visit rate" },
        ],
      },
      {
        tag: "X (TWITTER) ADS",
        client: "Indian Food Exporter, UAE",
        industry: "Import & Export",
        description:
          "X Ads reaching UAE retail buyers and trading-house procurement heads with direct Click-to-WhatsApp trade promotions.",
        metrics: [
          { value: "₹500 - 1,500", label: "cost per B2B lead" },
          { value: "1 to 3%", label: "click-through rate" },
          { value: "15 to 20%", label: "lead-to-conversation rate" },
        ],
      },
      {
        tag: "TIKTOK ADS",
        client: "25-Location Fitness Chain",
        industry: "Fitness Network",
        description:
          "TikTok In-Feed and TopView ads for a pan-India fitness chain, with automatic branch-level lead routing to 25 front desks.",
        metrics: [
          { value: "₹50 - 350", label: "network average CPL" },
          { value: "2 to 5%", label: "click-through rate" },
          { value: "20 to 35%", label: "lead-to-trial rate" },
        ],
      },
      {
        tag: "TIKTOK ADS",
        client: "Pilates Studio",
        industry: "Boutique Fitness",
        description:
          "TikTok video ads targeting HNI lifestyle audiences in Gurugram's premium residential sectors for a ₹1.5L Pilates membership.",
        metrics: [
          { value: "₹90 - 700", label: "cost per lead" },
          { value: "2 to 5%", label: "click-through rate" },
          { value: "10 to 15%", label: "lead-to-trial rate" },
        ],
      },
      {
        tag: "YOUTUBE ADS",
        client: "Aura Living Goods",
        industry: "Home & Lifestyle E-Commerce",
        description:
          "YouTube skippable and non-skippable ads showcasing home décor collections to in-market buyers, retargeting site visitors for repeat purchase.",
        metrics: [
          { value: "4.5x", label: "blended ROAS" },
          { value: "32%", label: "view-through rate" },
          { value: "+180%", label: "quarterly revenue growth" },
        ],
      },
      {
        tag: "YOUTUBE ADS",
        client: "HealthStream Diagnostics",
        industry: "Healthcare & Diagnostics",
        description:
          "YouTube pre-roll ads promoting preventive health checkup packages, reaching working professionals across Delhi NCR.",
        metrics: [
          { value: "₹200", label: "cost per video lead" },
          { value: "38%", label: "view-through rate" },
          { value: "280+", label: "bookings from YouTube" },
        ],
      },
      {
        tag: "MULTI-PLATFORM ADS",
        client: "NCR Real Estate Developer",
        industry: "Real Estate",
        description:
          "Full-funnel Google + Meta + LinkedIn campaign with OTP-verified lead forms, delivering 100% phone-verified buyer leads to sales agents.",
        metrics: [
          { value: "₹250 - 1,000", label: "cost per verified lead" },
          { value: "95%+", label: "fake lead reduction" },
          { value: "10 to 15%", label: "lead-to-site visit rate" },
        ],
      },
      {
        tag: "MULTI-PLATFORM ADS",
        client: "BioGen Organics",
        industry: "D2C FMCG / Skincare",
        description:
          "Cross-platform Google, Meta and YouTube Ads strategy for scaling organic skincare D2C orders with UGC-first creative.",
        metrics: [
          { value: "3.9x", label: "blended ROAS" },
          { value: "₹310", label: "CPA per customer" },
          { value: "1,200+", label: "orders a month" },
        ],
      },
    ],
  },
];

export default function LeadGenServices() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    ads: true, // Performance marketing & paid ads expanded by default
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId !== "all") {
      setExpandedGroups((prev) => ({
        ...prev,
        [tabId]: true,
      }));
    }
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    SERVICE_GROUPS.forEach((g) => {
      all[g.id] = true;
    });
    setExpandedGroups(all);
  };

  const collapseAll = () => {
    setExpandedGroups({});
  };

  const displayedGroups =
    activeTab === "all"
      ? SERVICE_GROUPS
      : SERVICE_GROUPS.filter((g) => g.id === activeTab);

  return (
    <section id="services" className="px-6 py-28 md:px-10 bg-paper">
      <div className="mx-auto max-w-site">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="PERFORMANCE MARKETING SERVICES"
            lines={["Marketing services that", "drive measurable growth"]}
          />
          <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            Performance marketing across Google, Meta, LinkedIn, X (Twitter), TikTok, and YouTube Ads—built to capture high-intent demand, acquire verified buyers, and maximize ROAS. Click any service to explore verified client results.
          </p>
        </div>

        {/* Platform Tags & Expand Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
          <div className="flex flex-wrap gap-2">
            {["Google Ads", "Meta Ads", "LinkedIn Ads", "X (Twitter) Ads", "TikTok Ads", "YouTube Ads"].map((platform) => (
              <span
                key={platform}
                className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-mist/70 text-ink/70"
              >
                {platform}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs font-semibold text-ink/60 hover:text-ink px-3 py-1.5 rounded-full border border-ink/15 hover:border-ink hover:bg-mist/40 transition-all"
            >
              Expand all +
            </button>
            <button
              onClick={collapseAll}
              className="text-xs font-semibold text-ink/60 hover:text-ink px-3 py-1.5 rounded-full border border-ink/15 hover:border-ink hover:bg-mist/40 transition-all"
            >
              Collapse all −
            </button>
          </div>
        </div>

        {/* Services & Client Project Cards */}
        <div className="mt-12 space-y-6">
          {displayedGroups.map((group) => {
            const isExpanded = !!expandedGroups[group.id];

            return (
              <div
                key={group.id}
                className="relative rounded-3xl border border-ink/10 bg-mist/20 p-6 md:p-8 transition-all hover:border-ink/25 hover:shadow-sm"
              >
                {/* Category Header Strip — Clickable */}
                <div
                  onClick={() => toggleGroup(group.id)}
                  className="cursor-pointer group/header flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-accent-dim font-bold text-xl md:text-2xl">
                        {group.number}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-ink group-hover/header:text-accent-dim transition-colors">
                        {group.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm md:text-base text-ink/65 max-w-2xl">
                      {group.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-center shrink-0">
                    <span className="inline-block rounded-full bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70 border border-ink/10">
                      {group.projectCount}
                    </span>

                    {/* Plus / Minus Expand Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.id);
                      }}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.title}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-paper text-ink shadow-sm transition-all duration-300 group-hover/header:bg-ink group-hover/header:text-paper group-hover/header:border-ink"
                    >
                      <motion.span
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl font-light leading-none select-none"
                      >
                        +
                      </motion.span>
                    </button>
                  </div>
                </div>

                {/* Expandable Cards Grid */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${group.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 pt-8 border-t border-ink/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.clients.map((client, idx) => (
                          <motion.div
                            key={`${client.client}-${idx}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: (idx % 6) * 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col justify-between rounded-2xl bg-[#141414] p-6 text-paper border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                          >
                            <div>
                              {/* Top tag & industry pill */}
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-accent/90">
                                  {client.tag}
                                </span>
                                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/60">
                                  {client.industry}
                                </span>
                              </div>

                              {/* Client Title */}
                              <h4 className="font-display text-lg md:text-xl font-bold text-paper mb-2.5 group-hover:text-accent transition-colors">
                                {client.client}
                              </h4>

                              {/* Brief description */}
                              <p className="text-xs md:text-sm text-paper/70 leading-relaxed">
                                {client.description}
                              </p>
                            </div>

                            {/* Metrics Strip */}
                            <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-2">
                              {client.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="flex flex-col">
                                  <span className="font-display text-base md:text-lg font-bold text-paper">
                                    {m.value}
                                  </span>
                                  <span className="text-[10px] uppercase tracking-wider text-paper/50 leading-tight mt-0.5">
                                    {m.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
