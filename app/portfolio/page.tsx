import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import PortfolioGrid from "./PortfolioGrid";
import { getPortfolioProjects } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our digital marketing campaigns, high-ROAS paid ad scaling, SEO & AI search visibility, and B2B lead generation systems.",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <section className="px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-site">
        <RevealText
          as="h1"
          lines={["Campaigns built to convert.", "Strategies made to scale."]}
          className="font-display text-display-lg text-balance"
        />
        <p className="mt-8 max-w-lg text-lg text-ink/60">
          A curated selection of verified client campaigns spanning high-ROAS paid ads, 
          organic SEO &amp; AI search visibility, and systematic B2B lead acquisition.
        </p>

        <div className="mt-16">
          <PortfolioGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
