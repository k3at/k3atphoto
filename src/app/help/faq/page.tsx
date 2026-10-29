import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = { title: "الأسئلة الشائعة", description: "FAQ" };

const faqs = [
  { q: "هل الخدمة مجانية؟", a: "نعم، الاستخدام الأساسي مجاني للأبد." },
  { q: "هل ملفاتي آمنة؟", a: "نعم، الاتصال مشفر والملفات تُحذف بعد المعالجة." },
  { q: "ما الصيغ المدعومة؟", a: "JPG وPNG وGIF وSVG وWEBP وTIFF وHEIC وPSD وRAW." },
  { q: "هل يمكن معالجة عدة ملفات؟", a: "نعم، جميع الأدوات تدعم المعالجة دفعة واحدة." },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="المساعدة" title="الأسئلة الشائعة" description="إجابات سريعة." />
            <div className="card-surface mt-10 divide-y divide-border-subtle overflow-hidden">
              {faqs.map((f) => (
                <details key={f.q} className="group px-6 py-4">
                  <summary className="text-foreground flex cursor-pointer items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="text-brand-600 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-muted mt-3 text-sm leading-7">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}