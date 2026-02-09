import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'elldeeone',
  repo: 'docs_kaspa_org',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0L3.2 7.4v17.2L16 32l12.8-7.4V7.4L16 0zm0 3.4l9.6 5.5v11.2L16 25.6l-9.6-5.5V8.9L16 3.4z"
              fill="currentColor"
            />
            <path
              d="M16 8.5l-5.6 3.2v6.5L16 21.5l5.6-3.3v-6.5L16 8.5z"
              fill="currentColor"
            />
          </svg>
          <span className="font-semibold">Kaspa Docs</span>
        </>
      ),
    },
    links: [
      {
        text: 'kaspa.org',
        url: 'https://kaspa.org',
        active: 'none',
      },
      {
        text: 'Explorer',
        url: 'https://explorer.kaspa.org',
        active: 'none',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
