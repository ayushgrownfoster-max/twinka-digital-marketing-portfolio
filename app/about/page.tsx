import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import CaseStudyStats from "@/components/CaseStudyStats";
import ClientMarquee from "@/components/ClientMarquee";
import { getSiteStats, getClients } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "Twinka Singhal is a senior digital marketing specialist with 10+ years of experience helping brands scale through performance marketing, SEO, and multi-channel acquisition.",
};

export default async function AboutPage() {
  const [siteStats, clients] = await Promise.all([getSiteStats(), getClients()]);

  return (
    <>
      <section className="px-6 pb-20 pt-40 md:px-10">
        <div className="mx-auto max-w-site">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            About Twinka Singhal
          </span>
          <RevealText
            as="h1"
            lines={["Data-driven digital marketing", "engineered for growth."]}
            className="font-display text-display-lg text-balance"
          />
          <p className="mt-10 max-w-2xl text-lg text-ink/70 leading-relaxed">
            I&apos;m Twinka Singhal, a senior digital marketing specialist with 10+ years of experience scaling clients across India, the USA, the UK, Canada, Australia, Dubai and the GCC. I partner with growth-oriented teams to deliver measurable performance: high-ROAS paid ads, top search &amp; AI visibility, and predictable B2B sales pipelines.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-site">
          <CaseStudyStats stats={siteStats} />
        </div>
      </section>

      <section className="border-y border-ink/10 py-16">
        <div className="mx-auto max-w-site px-6 md:px-10 mb-8">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 text-center">
            BUSINESSES I HAVE WORKED WITH
          </span>
        </div>
        <ClientMarquee clients={clients} />
      </section>

      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-site grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50">
              Marketing Philosophy
            </span>
            <h2 className="font-display text-display-sm text-balance">
              Data before spend. Accountable attribution. Measured ROI.
            </h2>
          </div>
          <div className="space-y-4 text-ink/70 leading-relaxed">
            <p>
              Every engagement begins with an extensive marketing audit, competitive benchmarking, and verified attribution modeling. Whether scaling Meta Advantage+ shopping funnels, dominating Google search for high-intent queries, or executing multi-touch LinkedIn outbound, I treat every marketing budget like an accountable revenue generator.
            </p>
            <p>
              You always know where your marketing budget is deployed, which creatives are winning, and what revenue is generated through transparent weekly reporting.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
