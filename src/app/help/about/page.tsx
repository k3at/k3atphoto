import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = { title: "نبذة", description: "نبذة عن K3atPhoto" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="الشركة" title="نبذة عنا" description="K3atPhoto هي أداة تعديل الصور أونلاين." />
            <p className="text-muted mt-8 text-base leading-8">
              K3atPhoto هي الحل المناسب لتعديل الصور أونلاين. استعمل جميع الأدوات التي تحتاجها لتحسين صورك
              بسهولة من الويب مع أمان 100%.
            </p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}