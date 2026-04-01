import Image from "next/image";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

type SharedNavOptions = NonNullable<BaseLayoutProps["nav"]> & {
  mode?: "top" | "auto";
};

export type SharedLayoutOptions = BaseLayoutProps & {
  nav?: Partial<SharedNavOptions>;
};

export const gitConfig = {
  user: "elldeeone",
  repo: "docs_kaspa_org",
  branch: "main",
};

export function baseOptions(): SharedLayoutOptions {
  return {
    nav: {
      title: (
        <span className="kaspa-docs-brand">
          <Image
            src="/apple-icon.png"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="kaspa-docs-brand__logo"
          />
          Kaspa Docs
        </span>
      ),
      mode: "top",
      transparentMode: "none",
    },
    themeSwitch: {
      enabled: true,
      mode: "light-dark-system",
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
