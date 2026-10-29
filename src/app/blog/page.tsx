import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = { title: "المدونة", description: "مدونة K3atPhoto" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="المدونة" title="المدونة" description="آخر الأخبار والنصائح." />
            <p className="text-muted mt-10 text-center">قريباً: مقالات حول تعديل الصور.</p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}