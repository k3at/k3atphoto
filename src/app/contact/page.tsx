import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = { title: "اتصل بنا", description: "تواصل معنا" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-2xl">
            <SectionHeading eyebrow="اتصل بنا" title="نحن هنا للمساعدة" description="أرسل لنا رسالة وسنرد عليك قريباً." />
            <form className="card-surface mt-10 space-y-4 p-6">
              <input className="border-border-subtle w-full rounded-lg border bg-transparent px-3 py-2" placeholder="الاسم" />
              <input className="border-border-subtle w-full rounded-lg border bg-transparent px-3 py-2" placeholder="البريد الإلكتروني" type="email" />
              <textarea className="border-border-subtle w-full rounded-lg border bg-transparent px-3 py-2" rows={5} placeholder="الرسالة" />
              <button type="button" className={buttonClass("primary", "md")}>إرسال</button>
            </form>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}