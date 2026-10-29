import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/layout";
import { ImageTool } from "@/components/image-tool";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return site.tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = site.tools.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tool = site.tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="py-10 sm:py-14">
          <Container>
            <div className="mb-8 text-center">
              <span className="text-4xl" aria-hidden="true">
                {tool.icon}
              </span>
              <h1 className="text-foreground mt-3 text-3xl font-extrabold sm:text-4xl">{tool.title}</h1>
              <p className="text-muted mx-auto mt-3 max-w-2xl text-base leading-7">{tool.description}</p>
            </div>
            <ImageTool mode={slug as never} />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}