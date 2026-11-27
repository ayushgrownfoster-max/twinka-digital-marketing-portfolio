"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import type { Service } from "@/lib/types";

/** Images for every service — keyed by service title */
const SERVICE_STRIP_IMAGES: Record<string, { seed: string; alt: string }[]> = {
  Strategy: [
    { seed: "photo-1552664730-d307ca884978", alt: "Strategy workshop" },
    { seed: "photo-1519389950473-47ba0277781c", alt: "Team planning session" },
    { seed: "photo-1454165804606-c3d57bc86b40", alt: "Growth roadmap" },
    { seed: "photo-1611532736597-de2d4265fba3", alt: "Data analytics" },
    { seed: "photo-1542744094-3a31f272c490", alt: "Brand positioning" },
  ],
  Branding: [
    { seed: "photo-1611162617474-5b21e879e113", alt: "Brand identity design" },
    { seed: "photo-1523726491678-bf852e717f6a", alt: "Logo design process" },
    { seed: "photo-1561070791-2526d30994b5", alt: "Design system creation" },
    { seed: "photo-1558655146-9f40138edfeb", alt: "Color palette exploration" },
    { seed: "photo-1586717791821-3f44a563fa4c", alt: "Typography and brand" },
  ],
  "Social Media": [
    { seed: "photo-1611162616305-c69b3fa7fbe0", alt: "Social media content" },
    { seed: "photo-1611162618071-b39a2ec055fb", alt: "Instagram feed design" },
    { seed: "photo-1611162616475-46b635cb6868", alt: "Content creation" },
    { seed: "photo-1603570388552-bc2890adf8a5", alt: "Community management" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "Campaign analytics" },
  ],
  "Performance Marketing": [
    { seed: "photo-1460925895917-afdab827c52f", alt: "Performance dashboard" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "Ad analytics" },
    { seed: "photo-1563986768609-322da13575f3", alt: "ROAS metrics" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "Growth charts" },
    { seed: "photo-1614680376573-df3480f0c6ff", alt: "Paid media campaigns" },
  ],
  "Google Ads": [
    { seed: "photo-1432888498266-38ffec3eaf0a", alt: "High-intent search keywords" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Performance Max dashboard" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "Google Shopping feed" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "Search CTR optimization" },
    { seed: "photo-1563986768609-322da13575f3", alt: "Bidding & ROAS metrics" },
  ],
  "Meta Ads (Facebook & Instagram)": [
    { seed: "photo-1611162616305-c69b3fa7fbe0", alt: "Meta Ads Manager" },
    { seed: "photo-1611162618071-b39a2ec055fb", alt: "Instagram Story & Catalog ads" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Paid social ROAS" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "Meta Advantage+ scaling" },
    { seed: "photo-1614680376573-df3480f0c6ff", alt: "Social ad creatives" },
  ],
  "LinkedIn Ads": [
    { seed: "photo-1552664730-d307ca884978", alt: "B2B Sponsored Content" },
    { seed: "photo-1519389950473-47ba0277781c", alt: "LinkedIn Lead Gen Forms" },
    { seed: "photo-1542744094-3a31f272c490", alt: "Account-based targeting" },
    { seed: "photo-1454165804606-c3d57bc86b40", alt: "B2B pipeline scaling" },
    { seed: "photo-1611532736597-de2d4265fba3", alt: "Decision-maker reach" },
  ],
  "YouTube Ads": [
    { seed: "photo-1493612276216-ee3925520721", alt: "YouTube video ads" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "In-stream & Shorts campaigns" },
    { seed: "photo-1561070791-2526d30994b5", alt: "Direct-response video hooks" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Video conversion tracking" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "YouTube campaign ROAS" },
  ],
  "TikTok Ads": [
    { seed: "photo-1611162616475-46b635cb6868", alt: "TikTok Spark Ads" },
    { seed: "photo-1602992708529-c9fdb12905c9", alt: "UGC video creatives" },
    { seed: "photo-1441984904996-e0b6ba687e04", alt: "D2C TikTok scaling" },
    { seed: "photo-1563986768609-322da13575f3", alt: "Creative velocity testing" },
    { seed: "photo-1472851294608-062f824d29cc", alt: "E-commerce order growth" },
  ],
  "X (Twitter) Ads": [
    { seed: "photo-1611162616305-c69b3fa7fbe0", alt: "Promoted posts on X" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "Real-time launch bursts" },
    { seed: "photo-1454165804606-c3d57bc86b40", alt: "SaaS & fintech targeting" },
    { seed: "photo-1611532736597-de2d4265fba3", alt: "Traffic & conversion ads" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "Campaign performance metrics" },
  ],
  "D2C & E-Commerce Scaling": [
    { seed: "photo-1441984904996-e0b6ba687e04", alt: "E-commerce product ads" },
    { seed: "photo-1441986300917-64674bd600d8", alt: "D2C catalog scaling" },
    { seed: "photo-1472851294608-062f824d29cc", alt: "Online store revenue" },
    { seed: "photo-1563986768609-322da13575f3", alt: "Blended ROAS tracking" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Order volume scaling" },
  ],
  "OTP-Verified Lead Generation": [
    { seed: "photo-1460925895917-afdab827c52f", alt: "Verified lead reporting" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "SMS OTP verification" },
    { seed: "photo-1563986768609-322da13575f3", alt: "High-ticket buyer filtering" },
    { seed: "photo-1560518883-ce09059eeffa", alt: "Real estate verified leads" },
    { seed: "photo-1542744094-3a31f272c490", alt: "Sales team qualified calls" },
  ],
  "Multi-Location Ad Scaling": [
    { seed: "photo-1572044162444-ad60f128bdea", alt: "Geo-targeted radius ads" },
    { seed: "photo-1519389950473-47ba0277781c", alt: "Branch lead routing" },
    { seed: "photo-1576091160399-112ba8d25d1d", alt: "Multi-clinic ad scaling" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Centralized ad dashboard" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "Network CPL optimization" },
  ],
  "B2B Search & Trade Campaigns": [
    { seed: "photo-1552664730-d307ca884978", alt: "B2B decision maker ads" },
    { seed: "photo-1454165804606-c3d57bc86b40", alt: "Enterprise demo search" },
    { seed: "photo-1611532736597-de2d4265fba3", alt: "Click-to-WhatsApp trade ads" },
    { seed: "photo-1542744094-3a31f272c490", alt: "Pipeline acquisition" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "B2B SQL tracking" },
  ],
  "Conversion Tracking & Attribution": [
    { seed: "photo-1460925895917-afdab827c52f", alt: "GA4 & Meta CAPI" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "Offline conversion tracking" },
    { seed: "photo-1611532736597-de2d4265fba3", alt: "Attribution dashboards" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "ROAS analytics" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "CRM lead attribution" },
  ],
  "Ad Creative & Copy Testing": [
    { seed: "photo-1561070791-2526d30994b5", alt: "High-converting ad angles" },
    { seed: "photo-1558655146-9f40138edfeb", alt: "Direct response copy" },
    { seed: "photo-1541462608143-67571c6738dd", alt: "Ad creative testing" },
    { seed: "photo-1602992708529-c9fdb12905c9", alt: "UGC video hooks" },
    { seed: "photo-1586717791821-3f44a563fa4c", alt: "Campaign creative strategy" },
  ],
  "Email Marketing & Cold Email": [
    { seed: "photo-1553877522-43269d4ea984", alt: "Email campaign copy" },
    { seed: "photo-1455390582262-044cdead277a", alt: "High-converting email sequences" },
    { seed: "photo-1504711434969-e33886168f5c", alt: "Outreach deliverability" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "Email analytics dashboard" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Nurture sequence performance" },
  ],
  "Email Marketing": [
    { seed: "photo-1553877522-43269d4ea984", alt: "Email campaign copy" },
    { seed: "photo-1455390582262-044cdead277a", alt: "High-converting email sequences" },
    { seed: "photo-1504711434969-e33886168f5c", alt: "Outreach deliverability" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "Email analytics dashboard" },
    { seed: "photo-1460925895917-afdab827c52f", alt: "Nurture sequence performance" },
  ],
  "SEO, AEO & GEO": [
    { seed: "photo-1432888498266-38ffec3eaf0a", alt: "SEO keyword analysis" },
    { seed: "photo-1616469829581-73993eb86b02", alt: "Technical search audit" },
    { seed: "photo-1599658880436-c61792e70672", alt: "AI engine citations" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "Organic ranking growth" },
    { seed: "photo-1572044162444-ad60f128bdea", alt: "Local search map results" },
  ],
  SEO: [
    { seed: "photo-1432888498266-38ffec3eaf0a", alt: "SEO keyword research" },
    { seed: "photo-1616469829581-73993eb86b02", alt: "Technical SEO audit" },
    { seed: "photo-1599658880436-c61792e70672", alt: "Content SEO strategy" },
    { seed: "photo-1504711434969-e33886168f5c", alt: "Backlink strategy" },
    { seed: "photo-1572044162444-ad60f128bdea", alt: "Local SEO maps" },
  ],
  "Google Business Profile": [
    { seed: "photo-1572044162444-ad60f128bdea", alt: "Google local 3-pack" },
    { seed: "photo-1560518883-ce09059eeffa", alt: "Local store visibility" },
    { seed: "photo-1576091160399-112ba8d25d1d", alt: "Clinic GBP listing" },
    { seed: "photo-1519494026892-80bbd2d6fd0d", alt: "Local business reviews" },
    { seed: "photo-1454165804606-c3d57bc86b40", alt: "Local search conversion" },
  ],
  "Lead Verification & Qualification": [
    { seed: "photo-1460925895917-afdab827c52f", alt: "Verified lead reporting" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "OTP verification rate" },
    { seed: "photo-1563986768609-322da13575f3", alt: "Sales pipeline qualification" },
    { seed: "photo-1519389950473-47ba0277781c", alt: "Calendar booked meetings" },
    { seed: "photo-1542744094-3a31f272c490", alt: "Decision maker filtering" },
  ],
  "CRM & Routing Automation": [
    { seed: "photo-1460925895917-afdab827c52f", alt: "Automated CRM routing" },
    { seed: "photo-1551288049-bebda4e38f71", alt: "Instant sales notification" },
    { seed: "photo-1611532736597-de2d4265fba3", alt: "Pipeline speed tracking" },
    { seed: "photo-1504868584819-f8e8b4b6d7e3", alt: "Conversion tracking" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "Team lead distribution" },
  ],
  "Creative & Copywriting": [
    { seed: "photo-1561070791-2526d30994b5", alt: "High-converting ad angles" },
    { seed: "photo-1558655146-9f40138edfeb", alt: "Direct response copy" },
    { seed: "photo-1541462608143-67571c6738dd", alt: "Ad creative testing" },
    { seed: "photo-1602992708529-c9fdb12905c9", alt: "Visual ad performance" },
    { seed: "photo-1586717791821-3f44a563fa4c", alt: "Campaign creative strategy" },
  ],
  Content: [
    { seed: "photo-1553877522-43269d4ea984", alt: "Content creation" },
    { seed: "photo-1542744173-8e7e53415bb0", alt: "Editorial calendar" },
    { seed: "photo-1493612276216-ee3925520721", alt: "Video production" },
    { seed: "photo-1504711434969-e33886168f5c", alt: "Blog writing" },
    { seed: "photo-1455390582262-044cdead277a", alt: "Copywriting" },
  ],
  Creative: [
    { seed: "photo-1561070791-2526d30994b5", alt: "Creative direction" },
    { seed: "photo-1558655146-9f40138edfeb", alt: "Art direction" },
    { seed: "photo-1541462608143-67571c6738dd", alt: "Design exploration" },
    { seed: "photo-1602992708529-c9fdb12905c9", alt: "Visual identity" },
    { seed: "photo-1586717791821-3f44a563fa4c", alt: "Brand aesthetics" },
  ],
};

function HoverImage({
  seed,
  alt,
  index,
}: {
  seed: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseY = useMotionValue(0);
  const springY = useSpring(mouseY, { stiffness: 280, damping: 18, mass: 0.4 });
  const translateY = useTransform(springY, [-1, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseY.set(Math.max(-1, Math.min(1, relY)));
  };

  const handleMouseLeave = () => mouseY.set(0);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: 24, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        delay: index * 0.06,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex-none cursor-pointer overflow-hidden rounded-xl bg-mist shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{
        y: translateY,
        width: "clamp(96px, 13vw, 152px)",
        height: "clamp(64px, 8.5vw, 104px)",
      }}
    >
      <Image
        src={`https://images.unsplash.com/${seed}?w=400&h=280&fit=crop`}
        alt={alt}
        fill
        sizes="152px"
        className="object-cover transition-transform duration-700 ease-out hover:scale-110"
      />
      {/* Sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function ServiceImageStrip({ images, serviceTitle }: { images: { seed: string; alt: string }[]; serviceTitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="pl-[3.5rem] md:pl-[5.5rem]">
        <div className="mt-5 flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {images.map(({ seed, alt }, i) => (
            <HoverImage key={`${serviceTitle}-${seed}`} seed={seed} alt={alt} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceList({ services }: { services: Service[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div>
      {services.map((service, i) => {
        const isActive = activeIdx === i;
        // Use service title to look up images; fall back to a generic set if missing
        const stripImages =
          SERVICE_STRIP_IMAGES[service.title] ??
          SERVICE_STRIP_IMAGES["Creative"];

        return (
          <motion.div
            key={service.number}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-default border-b border-ink/15 py-8 transition-colors duration-300"
          >
            <div className="flex items-baseline gap-6 md:gap-10">
              <span
                className={clsx(
                  "font-display text-lg transition-colors duration-300",
                  isActive ? "text-accent" : "text-ink/30"
                )}
              >
                {service.number}
              </span>
              <h3
                className={clsx(
                  "font-display text-3xl transition-transform duration-500 ease-grow md:text-5xl",
                  isActive && "translate-x-3"
                )}
              >
                {service.title}
              </h3>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-xl pl-[3.5rem] pt-4 text-ink/60 md:pl-[5.5rem]">
                    {service.description}
                  </p>

                  {/* Horizontal image strip — shown for ALL services */}
                  <ServiceImageStrip images={stripImages} serviceTitle={service.title} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}