import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading, Card } from "@/components/ui/layout";
import { buttonClass } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "المميزات", description: "مميزات K3atPhoto" };

const items = [
  { t: "معالجة دفعة واحدة", d: "معالجة عشرات الصور دفعة واحدة بضغطة زر." },
  { t: "آمن 100%", d: "اتصال HTTPS وحذف تلقائي للملفات بعد المعالجة." },
  { t: "في المتصفح", d: "대부분 الأدوات تعمل محلياً في متصفحك." },
  { t: "مجاني", d: "الاستخدام الأساسي مجاني للأبد." },
  { t: "واجهة عربية", d: "دعم كامل للغة العربية واتجاه RTL." },
  { t: "أداة تعديل صور", d: "نصوص ومؤثرات وإطارات وملصقات." },
];

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="المميزات" title="مميزات K3atPhoto" description="كل ما تحتاجه لتعديل الصور بسهولة." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((i) => (
                <Card key={i.t}>
                  <h3 className="text-foreground text-lg font-bold">{i.t}</h3>
                  <p className="text-muted mt-2 text-sm leading-7">{i.d}</p>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/" className={buttonClass("primary", "md")}>
                العودة للرئيسية
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}