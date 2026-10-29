import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "الأدوات", description: "توثيق الأدوات" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="المساعدة" title="الأدوات" description="جميع أدوات K3atPhoto." />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {site.tools.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`} className="card-surface flex items-center gap-3 p-4 hover:border-brand-300">
                  <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                  <span className="text-foreground font-semibold">{t.title}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}