import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import type { CSSProperties, ReactNode } from "react";

const notebookContainerStyle = {
  gridTemplate: `"header header header"
    "sidebar toc-popover toc-popover"
    "sidebar main toc" 1fr /
    var(--fd-sidebar-col)
    minmax(0, 1fr)
    var(--fd-toc-width)`,
} as CSSProperties;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      containerProps={{ style: notebookContainerStyle }}
    >
      {children}
    </DocsLayout>
  );
}
