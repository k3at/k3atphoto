import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";
import { buttonClass } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "جميع المزايا مجانية", description: "جميع المزايا مجانية" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-2xl text-center">
            <SectionHeading eyebrow="مجاني" title="جميع المزايا مجانية" description="لا حاجة لاشتراك. جميع الأدوات متاحة للجميع." />
            <Link href="/#tools" className={buttonClass("primary", "lg", "mt-8")}>ابدأ الآن</Link>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}