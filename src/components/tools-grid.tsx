"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function ToolsGrid() {
  const [category, setCategory] = useState<string>("all");

  const tools = useMemo(() => {
    if (category === "all") return site.tools;
    return site.tools.filter((t) => t.category === category);
  }, [category]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {site.categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setCategory(c.key)}
            className={
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors " +
              (category === c.key
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border-subtle bg-surface-raised text-muted hover:border-brand-300 hover:text-brand-700")
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="card-surface group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-500/10">
              {tool.icon}
            </span>
            <div>
              <h3 className="text-foreground text-base font-bold group-hover:text-brand-700 dark:group-hover:text-brand-200">
                {tool.title}
              </h3>
              <p className="text-muted mt-1 text-sm leading-6">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}