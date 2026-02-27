     1	# docs_kaspa_org
     2	
     3	This is a Next.js application generated with
     4	[Create Fumadocs](https://github.com/fuma-nama/fumadocs).
     5	
     6	Run development server:
     7	
     8	```bash
     9	npm run dev
    10	# or
    11	pnpm dev
    12	# or
    13	yarn dev
    14	```
    15	
    16	Open http://localhost:3000 with your browser to see the result.
    17	
    18	## Explore
    19	
    20	In the project, you can see:
    21	
    22	- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
    23	- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.
    24	
    25	| Route                     | Description                                            |
    26	| ------------------------- | ------------------------------------------------------ |
    27	| `app/(home)`              | The route group for your landing page and other pages. |
    28	| `app/docs`                | The documentation layout and pages.                    |
    29	| `app/api/search/route.ts` | The Route Handler for search.                          |
    30	
    31	### Fumadocs MDX
    32	
    33	A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.
    34	
    35	Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.
    36	
    37	## Learn More
    38	
    39	To learn more about Next.js and Fumadocs, take a look at the following
    40	resources:
    41	
    42	- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
    43	  features and API.
    44	- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
    45	- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
