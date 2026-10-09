# Portfolio + CMS

Next.js portfolio with an integrated Payload CMS at `/admin`. The original five pages and visual components are preserved as editable section templates. New pages can use reusable hero, text, image, capability, project, timeline, testimonial, playground, and CTA sections.

## Try the CMS locally first

Run `npm run cms:local`, then open http://localhost:3000/admin and create your owner account. This starts a persistent local Postgres/PGlite database, applies migrations, imports the portfolio, and starts Next.js. No hosted credentials are needed. Stop any existing dev server on port 3000 first.

Your account, content, and local database secret are stored under the ignored `.cms-local/` directory; uploads stay in `media/`. Restart with the same command to resume. This local launcher binds both services to loopback and enables first-owner registration only for this development session. Production registration remains disabled. PGlite is a development convenience; production uses Neon PostgreSQL.

## Local setup with PostgreSQL

Requires Node.js 20.18.1+ and PostgreSQL. The public portfolio runs with its original content when `DATABASE_URL` is absent; `/admin` explains how to enable editing. Once a database is configured, the site reads CMS content and does not silently fall back on database errors.

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and enter `DATABASE_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SITE_URL`. Generate a secret with `openssl rand -hex 32`. Use a separate development database.
3. Run `npm run cms:migrate` to apply the checked-in schema.
4. Run `npm run cms:owner` to create your owner account. The password prompt is hidden. Public account creation, including first-user registration, is disabled.
5. Run `npm run cms:seed` to import all current content and images. The seed is idempotent and preserves existing edits.
6. Run `npm run dev`, then sign in at `http://localhost:3000/admin`.

Uploads are stored in the ignored `media/` folder during local development. Add a Vercel Blob token to test remote uploads. Uploaded images have public URLs, including images attached to drafts; upload only public portfolio assets.

## Editing

- **Pages:** edit SEO and section content. Drag section handles to reorder, use the row menu to duplicate, or hide a section. New page slugs use lowercase letters/numbers/hyphens. Existing pages keep their URLs; changing a slug changes its URL and requires updating navigation.
- **Projects:** titles are shared between Home and Work. Each project has editable Home and Work presentations to preserve their different case-study layouts. Use project relationships to feature projects on other pages.
- **Career and Testimonials:** shared records populate existing timelines and quote sections. Set Order to control ordering. Career has a short Home summary and a detailed About summary.
- **Playground:** edit titles, descriptions, categories, order, and visibility for existing coded demos. New game implementations require a code registry entry.
- **Site settings:** edit navigation, logo, email, availability, location, social links, and default SEO settings.
- **Design settings:** edit light/dark palettes, font presets, text scale, width, spacing, rounding, motion, and the default theme. Default values preserve the original design. Visitor theme choices take priority over the default.

Save Draft keeps changes private. Preview requires your owner session and shows draft page content, shared records, and settings together. It uses the same responsive portfolio rendering, so resize the preview to inspect mobile and desktop layouts. Publish updates the public site and invalidates its content cache without a redeploy. Version History allows restoring old content as a draft before publishing.

The CMS uses Payload's normal admin forms, rich-text editor, repeatable fields, relationship selectors, and section menu. It is a controlled section editor, rather than a freeform canvas or custom CSS editor. Existing image/text section templates retain their specialized layouts; reusable sections expose layout controls.

## Deploy on Vercel

1. Create a Neon PostgreSQL database and a Vercel Blob store. Use distinct databases and stores for preview and production environments.
2. Set `DATABASE_URL` (Neon's pooled connection string), `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, and `NEXT_PUBLIC_SITE_URL` in Vercel. All four are required for a live CMS. No passwords or database tokens go in `NEXT_PUBLIC_*` variables.
3. Apply migrations against the target database using `npm run cms:migrate`. Run the owner setup and seed commands against that environment before exposing the CMS.
4. Deploy using `npm run build`. Restart the local dev server after changing dependencies or environment variables.

Database migrations run explicitly, rather than at build time. Schema auto-push is disabled. For subsequent schema changes, generate a migration with `npm run cms:migration -- descriptive_name`, review the SQL, apply it to staging, and verify before production. Run `npm run cms:types` and `npm run cms:importmap` after schema/admin-component changes.

For the initial local-to-production transfer, `node --import tsx scripts/prepare-production-snapshot.ts` creates an encrypted snapshot and a CMS secret under the ignored `.vercel/` directory. Stop `cms:local` before reading its database. The snapshot preserves content, drafts, version history, and the owner's password hash; it excludes active sessions and password-reset tokens. It supports the repository-backed media imported by the local launcher; additional local uploads require a separate media transfer. Set the snapshot as the temporary production secret `CMS_BOOTSTRAP_SNAPSHOT`, with the matching `PAYLOAD_SECRET`, and explicitly run `node --import tsx scripts/bootstrap-production.ts` in a one-time deployment build before `npm run build`. This applies migrations, imports into an empty database, and uploads the images to Blob. A database marker allows retries of the same import and rejects a different snapshot or an already populated CMS. Remove the temporary snapshot environment variable and deploy with the normal build command afterward. Normal builds never run this initializer.

Use Neon backups or point-in-time restore for production recovery and retain uploaded assets in Vercel Blob. Content version history is an editing tool, not a substitute for database and media backups. Monitor Vercel function errors and database/storage usage. Database failures are surfaced rather than replaced by stale seed content.

The owner can change their password at `/admin/account`. No outbound email provider is configured; do not rely on password-reset emails until you add one. Keep the account credentials in a password manager.

## Validation

- `npm run test:cms`: validation and database integration checks against a disposable Postgres/PGlite instance; never connects to your Neon database.
- `npx tsc --noEmit`: type checks.
- `npm run lint`: repository lint checks.
- `npm run build`: production build.

The service worker caches only selected public static assets. It excludes HTML, RSC, APIs, admin pages, and preview requests, preventing drafts from entering offline caches. The old cache namespace is removed when the new worker activates.
