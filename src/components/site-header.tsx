import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-border-subtle bg-surface/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold">
          <span className="from-brand-600 to-accent-500 grid size-9 place-items-center rounded-xl bg-gradient-to-br text-sm text-white shadow-sm">
            📷
          </span>
          <span className="text-foreground">{site.name}</span>
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 md:flex">
          <details className="relative">
            <summary className="text-muted hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-white/5 dark:hover:text-brand-200 cursor-pointer list-none rounded-lg px-3 py-2 text-sm font-medium transition-colors">
              جميع أدوات الصورة ▾
            </summary>
            <div className="card-surface absolute right-0 top-full z-50 mt-2 max-h-96 w-72 overflow-auto p-2">
              {site.tools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="text-foreground hover:bg-brand-50 dark:hover:bg-white/5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                >
                  <span aria-hidden="true">{t.icon}</span>
                  {t.title}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/features" className="text-muted hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-white/5 dark:hover:text-brand-200 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            المميزات
          </Link>
          <Link href="/help/faq" className="text-muted hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-white/5 dark:hover:text-brand-200 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            المساعدة
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="text-muted hover:text-brand-600 hidden text-sm font-medium sm:inline">
            تسجيل الدخول
          </Link>
          <Link href="/register" className={buttonClass("primary", "sm", "hidden sm:inline-flex")}>
            التسجيل
          </Link>
        </div>
      </Container>
    </header>
  );
}