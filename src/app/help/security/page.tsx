import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = { title: "الأمان", description: "الأمان" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="المساعدة" title="الأمان" description="نحن نأخذ الأمان على محمل الجد." />
            <p className="text-muted mt-8 text-base leading-8">اتصال HTTPS وحذف تلقائي للملفات.</p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}