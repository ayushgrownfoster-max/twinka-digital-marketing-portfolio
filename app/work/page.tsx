import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import { getCaseStudies } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Digital Marketing Case Studies | Twinka Singhal",
  description:
    "Verified digital marketing case studies across performance marketing, SEO, Meta & Google ads, and B2B growth.",
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <section className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        <RevealText
          as="h1"
          lines={["Digital marketing work", "that made an impact."]}
          className="font-display text-display-lg text-balance"
        />
        <p className="mt-8 max-w-lg text-lg text-ink/60">
          Every project below represents verified performance data, real revenue growth, and scalable marketing funnels built for ambitious brands.
        </p>

        <div className="mt-16">
          <CaseStudyGrid caseStudies={caseStudies} filterBy="services" />
        </div>
      </div>
    </section>
  );
}
