import { Container } from "@/components/ui/layout";
import { site } from "@/lib/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-border-subtle mt-auto border-t py-10">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-foreground font-bold">{site.name}</p>
            <p className="text-muted mt-1 text-sm">{site.tagline}</p>
          </div>
          <div>
            <p className="text-foreground mb-3 text-sm font-bold">المنتج</p>
            <ul className="text-muted space-y-2 text-sm">
              <li><Link href="/" className="hover:text-brand-600">الرئيسية</Link></li>
              <li><Link href="/features" className="hover:text-brand-600">المميزات</Link></li>
              <li><Link href="/help/documentation" className="hover:text-brand-600">الأدوات</Link></li>
              <li><Link href="/help/faq" className="hover:text-brand-600">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-foreground mb-3 text-sm font-bold">الشركة</p>
            <ul className="text-muted space-y-2 text-sm">
              <li><Link href="/help/about" className="hover:text-brand-600">نبذة</Link></li>
              <li><Link href="/contact" className="hover:text-brand-600">اتصل بنا</Link></li>
              <li><Link href="/blog" className="hover:text-brand-600">المدونة</Link></li>
              <li><Link href="/press" className="hover:text-brand-600">الصحافة</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-muted mt-8 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} ® — أدوات تعديل الصورة</p>
          <div className="flex gap-4">
            <Link href="/help/privacy" className="hover:text-brand-600">الخصوصية</Link>
            <Link href="/help/terms" className="hover:text-brand-600">الشروط</Link>
            <Link href="/help/cookies" className="hover:text-brand-600">الكوكيز</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}