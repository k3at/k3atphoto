import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = { title: "الصحافة", description: "الصحافة" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="الصحافة" title="الصحافة" description="معلومات صحفية عن K3atPhoto." />
            <p className="text-muted mt-10 text-center">للاستفسارات الصحفية: press@K3atPhoto.com</p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}