import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = { title: "الشروط والأحكام", description: "الشروط" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="القانونية" title="الشروط والأحكام" description="شروط استخدام الخدمة." />
            <p className="text-muted mt-8 text-base leading-8">باستخدامك للخدمة فإنك توافق على هذه الشروط.</p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}