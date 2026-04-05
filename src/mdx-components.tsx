import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Mermaid } from "@/components/mdx/mermaid";
import { GitHubBlockquote } from "@/components/mdx/github-alert";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    blockquote: GitHubBlockquote,
    Mermaid,
    ...components,
  };
}
