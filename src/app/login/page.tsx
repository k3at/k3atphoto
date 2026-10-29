import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container, SectionHeading } from "@/components/ui/layout";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = { title: "تسجيل الدخول", description: "تسجيل الدخول" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-16">
          <Container className="max-w-md">
            <SectionHeading eyebrow="تسجيل الدخول" title="تسجيل الدخول" description="أدخل بياناتك للمتابعة." />
            <form className="card-surface mt-10 space-y-4 p-6">
              <input className="border-border-subtle w-full rounded-lg border bg-transparent px-3 py-2" placeholder="البريد الإلكتروني" type="email" />
              <input className="border-border-subtle w-full rounded-lg border bg-transparent px-3 py-2" placeholder="كلمة المرور" type="password" />
              <button type="button" className={buttonClass("primary", "md", "w-full")}>دخول</button>
            </form>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}