"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Which digital marketing services work best for my business?",
    answer:
      "It depends on your audience: B2B companies typically see fastest returns through LinkedIn outreach and Google Search, while D2C, education, and local clinics excel with Meta Ads and Google Business Profile local 3-pack optimization.",
  },
  {
    question: "How do you track and verify marketing ROAS?",
    answer:
      "We implement server-side tracking, Google Analytics 4, Meta Conversions API, and SMS OTP verification so every lead and sale is attributed accurately without inflated metrics.",
  },
  {
    question: "Do you manage international marketing campaigns?",
    answer:
      "Yes. I actively manage digital marketing and lead acquisition campaigns for clients across India, the USA, Canada, the UK, Australia, Dubai, and the GCC.",
  },
  {
    question: "What do you need from my team to get started?",
    answer:
      "A brief on your commercial goals and target customer, plus standard access to your marketing assets (ad accounts, Google Analytics/Search Console, or CRM).",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="px-6 py-28 md:px-10 bg-paper">
      <div className="mx-auto max-w-site">
        <div className="max-w-3xl mb-16">
          <SectionHeading
            eyebrow="DIGITAL MARKETING FAQ"
            lines={["Questions about our", "marketing services"]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => toggle(idx)}
                className="cursor-pointer rounded-2xl bg-mist/50 p-6 md:p-8 border border-ink/8 hover:border-ink/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg md:text-xl font-bold text-ink">
                    {faq.question}
                  </h3>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink text-sm font-semibold">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm md:text-base text-ink/70 leading-relaxed pt-2 border-t border-ink/10">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
