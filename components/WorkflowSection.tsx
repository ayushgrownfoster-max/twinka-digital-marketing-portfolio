"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

const STEPS: WorkflowStep[] = [
  {
    number: "01",
    title: "Discovery & growth targets",
    description:
      "We define your target customer acquisition cost, ideal buyer personas, conversion benchmarks, and revenue goals.",
    deliverable: "You get: A growth blueprint",
  },
  {
    number: "02",
    title: "Marketing audit & roadmap",
    description:
      "I audit your ad accounts, search rankings, landing pages, and competitors to build an actionable 90-day strategy.",
    deliverable: "You get: A full marketing roadmap",
  },
  {
    number: "03",
    title: "Campaign & creative foundation",
    description:
      "High-converting ad angles, direct response copy, warmed sending infrastructure, and tracking pixels set up before launch.",
    deliverable: "You get: Production-ready campaigns",
  },
  {
    number: "04",
    title: "Multi-channel launch",
    description:
      "Paid search, Meta ads, SEO optimization, and targeted B2B outreach go live with daily bid and budget management.",
    deliverable: "You get: Active market acquisition",
  },
  {
    number: "05",
    title: "Lead capture & conversion",
    description:
      "Phone-verified leads, automated CRM routing, and calendar scheduling workflows turn incoming traffic into pipeline.",
    deliverable: "You get: Qualified buyer conversations",
  },
  {
    number: "06",
    title: "Attribution & ROAS scaling",
    description:
      "Transparent weekly reporting on ROAS, CAC, and conversions, with continuous creative testing to scale top performers.",
    deliverable: "You get: Weekly performance reports",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="px-6 py-28 md:px-10 bg-mist/40 border-y border-ink/5">
      <div className="mx-auto max-w-site">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="MARKETING WORKFLOW"
            lines={["From marketing audit to", "scalable revenue"]}
          />
          <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            A proven 6-stage digital marketing framework running behind every campaign to ensure measurable outcomes, continuous optimization, and predictable growth.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col justify-between rounded-2xl bg-paper p-8 shadow-sm border border-ink/8 hover:shadow-md hover:border-ink/20 transition-all duration-300"
            >
              <div>
                <span className="font-display text-accent-dim font-bold text-2xl md:text-3xl block mb-4">
                  {step.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-3 group-hover:text-accent-dim transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/10">
                <span className="inline-block rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-ink/80 border border-ink/10">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
