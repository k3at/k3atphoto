import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge, Container, SectionHeading } from "@/components/ui/layout";
import { buttonClass } from "@/components/ui/button";
import { ToolsGrid } from "@/components/tools-grid";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <div
            className="from-brand-200/40 to-accent-400/30 pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative py-16 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <Badge>
                <span className="bg-accent-500 size-2 rounded-full" aria-hidden="true" />
                كل الأدوات التي تحتاجها لتعديل الصور
              </Badge>

              <h1 className="text-foreground mt-6 text-4xl leading-tight font-extrabold text-balance sm:text-5xl lg:text-6xl">
                كل الأدوات التي تحتاجها لتعديل الصور{" "}
                <span className="from-brand-600 to-accent-500 block bg-gradient-to-l bg-clip-text text-transparent">
                  في مكان واحد
                </span>
              </h1>

              <p className="text-muted mx-auto mt-6 max-w-2xl text-lg leading-8">
                {site.name} هي أداة تعديل الصور أونلاين: اضغط، غيّر الحجم، اقصص، حوّل، دور، أضف علامة مائية،
                وأنشئ صور الميم — مجاناً وآمناً 100%.
              </p>

              <div id="start" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="#tools" className={buttonClass("primary", "lg")}>
                  ابدأ الآن
                </Link>
                <Link href="/features" className={buttonClass("secondary", "lg")}>
                  اكتشف المميزات
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Tools */}
        <section id="tools" className="scroll-mt-24 py-16">
          <Container>
            <SectionHeading
              eyebrow="الأدوات"
              title="جميع الأدوات التي تريدها لتعديل الصور"
              description="اختر أداة للبدء. جميع الأدوات تعمل في المتصفح وتدعم المعالجة دفعة واحدة."
            />
            <div className="mt-10">
              <ToolsGrid />
            </div>
          </Container>
        </section>

        {/* Premium */}
        <section className="py-16">
          <Container>
            <div className="from-brand-700 to-brand-900 relative overflow-hidden rounded-3xl bg-gradient-to-l px-6 py-14 text-center text-white sm:px-12">
              <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative mx-auto max-w-2xl">
                <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-white/10 text-4xl">
                  🎁
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-balance sm:text-4xl">جميع المزايا مجانية — بدون اشتراك</h2>
                <p className="mt-4 text-base leading-7 text-indigo-100">
                  جميع أدوات K3atPhoto متاحة مجاناً: معالجة دفعات الملفات، أدوات تحرير متقدمة، وميزات
                  الذكاء الاصطناعي — لا حاجة لحساب مميّز.
                </p>
                <Link
                  href="/#tools"
                  className="text-brand-700 mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 font-semibold transition-colors hover:bg-indigo-50"
                >
                  ابدأ مجاناً
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Trusted */}
        <section className="border-border-subtle border-t py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-foreground text-3xl font-bold text-balance sm:text-4xl">
                أداة تعديل الصور التي تثق بها ويحبها الملايين
              </h2>
              <p className="text-muted mt-4 text-base leading-7">
                {site.name} هي الحل المناسب لتعديل الصور أونلاين. استعمل جميع الأدوات التي تحتاجها لتحسين
                صورك بسهولة من الويب مع أمان 100%.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent-500" aria-hidden="true" />
                  حاصل على شهادة ISO27001
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent-500" aria-hidden="true" />
                  اتصال آمن HTTPS
                </span>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}