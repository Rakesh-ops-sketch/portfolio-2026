import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_shell" AS ENUM('portfolio-shell', 'inner-page', 'inner-page work-page work-page-detailed', 'inner-page playground-page', 'contact-page');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_shell" AS ENUM('portfolio-shell', 'inner-page', 'inner-page work-page work-page-detailed', 'inner-page playground-page', 'contact-page');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_career_icon" AS ENUM('Code2', 'Layers3', 'Rocket', 'Users2');
  CREATE TYPE "public"."enum_career_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__career_v_version_icon" AS ENUM('Code2', 'Layers3', 'Rocket', 'Users2');
  CREATE TYPE "public"."enum__career_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_playground_demo" AS ENUM('MemoryGameModal', 'TicTacToeModal', 'SnakeGameModal', 'Game2048Modal', 'SimonSaysModal', 'TowerOfHanoiModal', 'PathfindingModal', 'SortingModal', 'BSTModal', 'NQueensModal', 'MazeModal', 'EventLoopModal', 'PromiseModal');
  CREATE TYPE "public"."enum_playground_category" AS ENUM('game', 'system');
  CREATE TYPE "public"."enum_playground_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__playground_v_version_demo" AS ENUM('MemoryGameModal', 'TicTacToeModal', 'SnakeGameModal', 'Game2048Modal', 'SimonSaysModal', 'TowerOfHanoiModal', 'PathfindingModal', 'SortingModal', 'BSTModal', 'NQueensModal', 'MazeModal', 'EventLoopModal', 'PromiseModal');
  CREATE TYPE "public"."enum__playground_v_version_category" AS ENUM('game', 'system');
  CREATE TYPE "public"."enum__playground_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_design_font" AS ENUM('current', 'sans', 'serif');
  CREATE TYPE "public"."enum_design_default_theme" AS ENUM('system', 'light', 'dark');
  CREATE TYPE "public"."enum_design_motion" AS ENUM('full', 'reduced');
  CREATE TYPE "public"."enum_design_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__design_v_version_font" AS ENUM('current', 'sans', 'serif');
  CREATE TYPE "public"."enum__design_v_version_default_theme" AS ENUM('system', 'light', 'dark');
  CREATE TYPE "public"."enum__design_v_version_motion" AS ENUM('full', 'reduced');
  CREATE TYPE "public"."enum__design_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "reset_password_requested_at" timestamp(3) with time zone,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "slug" varchar,
    "shell" "enum_pages_shell" DEFAULT 'inner-page',
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_image_id" integer,
    "seo_no_index" boolean,
    "sections" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "_pages_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_slug" varchar,
    "version_shell" "enum__pages_v_version_shell" DEFAULT 'inner-page',
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_image_id" integer,
    "version_seo_no_index" boolean,
    "version_sections" jsonb,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__pages_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "projects_technologies" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar
  );

  CREATE TABLE "projects" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "slug" varchar,
    "summary" varchar,
    "role" varchar,
    "category" varchar,
    "image_id" integer,
    "presentations" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_projects_status" DEFAULT 'draft'
  );

  CREATE TABLE "_projects_v_version_technologies" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "value" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_projects_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_slug" varchar,
    "version_summary" varchar,
    "version_role" varchar,
    "version_category" varchar,
    "version_image_id" integer,
    "version_presentations" jsonb,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__projects_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "career_responsibilities" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "value" varchar
  );

  CREATE TABLE "career" (
    "id" serial PRIMARY KEY NOT NULL,
    "role" varchar,
    "company" varchar,
    "period" varchar,
    "order" numeric DEFAULT 0,
    "chapter" varchar,
    "headline" varchar,
    "summary" varchar,
    "home_summary" varchar,
    "growth" varchar,
    "icon" "enum_career_icon" DEFAULT 'Code2',
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_career_status" DEFAULT 'draft'
  );

  CREATE TABLE "_career_v_version_responsibilities" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "value" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_career_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_role" varchar,
    "version_company" varchar,
    "version_period" varchar,
    "version_order" numeric DEFAULT 0,
    "version_chapter" varchar,
    "version_headline" varchar,
    "version_summary" varchar,
    "version_home_summary" varchar,
    "version_growth" varchar,
    "version_icon" "enum__career_v_version_icon" DEFAULT 'Code2',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__career_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "testimonials" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "role" varchar,
    "quote" varchar,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_testimonials_status" DEFAULT 'draft'
  );

  CREATE TABLE "_testimonials_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_name" varchar,
    "version_role" varchar,
    "version_quote" varchar,
    "version_order" numeric DEFAULT 0,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "playground" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "description" varchar,
    "demo" "enum_playground_demo",
    "category" "enum_playground_category",
    "order" numeric DEFAULT 0,
    "hidden" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_playground_status" DEFAULT 'draft'
  );

  CREATE TABLE "_playground_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_description" varchar,
    "version_demo" "enum__playground_v_version_demo",
    "version_category" "enum__playground_v_version_category",
    "version_order" numeric DEFAULT 0,
    "version_hidden" boolean DEFAULT false,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__playground_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "caption" varchar,
    "source_path" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_large_url" varchar,
    "sizes_large_width" numeric,
    "sizes_large_height" numeric,
    "sizes_large_mime_type" varchar,
    "sizes_large_filesize" numeric,
    "sizes_large_filename" varchar
  );

  CREATE TABLE "payload_kv" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "data" jsonb NOT NULL
  );

  CREATE TABLE "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "pages_id" integer,
    "projects_id" integer,
    "career_id" integer,
    "testimonials_id" integer,
    "playground_id" integer,
    "media_id" integer
  );

  CREATE TABLE "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "site_navigation" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "href" varchar
  );

  CREATE TABLE "site_socials" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar,
    "href" varchar
  );

  CREATE TABLE "site" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "description" varchar,
    "email" varchar,
    "location" varchar,
    "availability" varchar,
    "logo_id" integer,
    "contact_label" varchar DEFAULT 'Let''s talk',
    "contact_href" varchar DEFAULT '/contact',
    "seo_image_id" integer,
    "_status" "enum_site_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_site_v_version_navigation" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "href" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_site_v_version_socials" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "href" varchar,
    "_uuid" varchar
  );

  CREATE TABLE "_site_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_name" varchar,
    "version_description" varchar,
    "version_email" varchar,
    "version_location" varchar,
    "version_availability" varchar,
    "version_logo_id" integer,
    "version_contact_label" varchar DEFAULT 'Let''s talk',
    "version_contact_href" varchar DEFAULT '/contact',
    "version_seo_image_id" integer,
    "version__status" "enum__site_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  CREATE TABLE "design" (
    "id" serial PRIMARY KEY NOT NULL,
    "light_background" varchar DEFAULT '#ffffff',
    "light_foreground" varchar DEFAULT '#11120f',
    "light_paper" varchar DEFAULT '#f7f7f4',
    "light_ink" varchar DEFAULT '#11120f',
    "light_accent" varchar DEFAULT '#6f8cff',
    "light_warm_accent" varchar DEFAULT '#d38b67',
    "dark_background" varchar DEFAULT '#11120f',
    "dark_foreground" varchar DEFAULT '#f7f7f4',
    "dark_paper" varchar DEFAULT '#171815',
    "dark_ink" varchar DEFAULT '#080907',
    "dark_accent" varchar DEFAULT '#6f8cff',
    "dark_warm_accent" varchar DEFAULT '#d38b67',
    "font" "enum_design_font" DEFAULT 'current',
    "default_theme" "enum_design_default_theme" DEFAULT 'system',
    "text_scale" numeric DEFAULT 1,
    "content_width" numeric DEFAULT 1380,
    "spacing" numeric DEFAULT 1,
    "radius" numeric DEFAULT 1,
    "motion" "enum_design_motion" DEFAULT 'full',
    "_status" "enum_design_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE "_design_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_light_background" varchar DEFAULT '#ffffff',
    "version_light_foreground" varchar DEFAULT '#11120f',
    "version_light_paper" varchar DEFAULT '#f7f7f4',
    "version_light_ink" varchar DEFAULT '#11120f',
    "version_light_accent" varchar DEFAULT '#6f8cff',
    "version_light_warm_accent" varchar DEFAULT '#d38b67',
    "version_dark_background" varchar DEFAULT '#11120f',
    "version_dark_foreground" varchar DEFAULT '#f7f7f4',
    "version_dark_paper" varchar DEFAULT '#171815',
    "version_dark_ink" varchar DEFAULT '#080907',
    "version_dark_accent" varchar DEFAULT '#6f8cff',
    "version_dark_warm_accent" varchar DEFAULT '#d38b67',
    "version_font" "enum__design_v_version_font" DEFAULT 'current',
    "version_default_theme" "enum__design_v_version_default_theme" DEFAULT 'system',
    "version_text_scale" numeric DEFAULT 1,
    "version_content_width" numeric DEFAULT 1380,
    "version_spacing" numeric DEFAULT 1,
    "version_radius" numeric DEFAULT 1,
    "version_motion" "enum__design_v_version_motion" DEFAULT 'full',
    "version__status" "enum__design_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_technologies" ADD CONSTRAINT "projects_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_technologies" ADD CONSTRAINT "_projects_v_version_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_responsibilities" ADD CONSTRAINT "career_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_v_version_responsibilities" ADD CONSTRAINT "_career_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_career_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_career_v" ADD CONSTRAINT "_career_v_parent_id_career_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."career"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_playground_v" ADD CONSTRAINT "_playground_v_parent_id_playground_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."playground"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_career_fk" FOREIGN KEY ("career_id") REFERENCES "public"."career"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_playground_fk" FOREIGN KEY ("playground_id") REFERENCES "public"."playground"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_navigation" ADD CONSTRAINT "site_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_socials" ADD CONSTRAINT "site_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_navigation" ADD CONSTRAINT "_site_v_version_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_socials" ADD CONSTRAINT "_site_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "projects_technologies_order_idx" ON "projects_technologies" USING btree ("_order");
  CREATE INDEX "projects_technologies_parent_id_idx" ON "projects_technologies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "_projects_v_version_technologies_order_idx" ON "_projects_v_version_technologies" USING btree ("_order");
  CREATE INDEX "_projects_v_version_technologies_parent_id_idx" ON "_projects_v_version_technologies" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_image_idx" ON "_projects_v" USING btree ("version_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "career_responsibilities_order_idx" ON "career_responsibilities" USING btree ("_order");
  CREATE INDEX "career_responsibilities_parent_id_idx" ON "career_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "career_updated_at_idx" ON "career" USING btree ("updated_at");
  CREATE INDEX "career_created_at_idx" ON "career" USING btree ("created_at");
  CREATE INDEX "career__status_idx" ON "career" USING btree ("_status");
  CREATE INDEX "_career_v_version_responsibilities_order_idx" ON "_career_v_version_responsibilities" USING btree ("_order");
  CREATE INDEX "_career_v_version_responsibilities_parent_id_idx" ON "_career_v_version_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_career_v_parent_idx" ON "_career_v" USING btree ("parent_id");
  CREATE INDEX "_career_v_version_version_updated_at_idx" ON "_career_v" USING btree ("version_updated_at");
  CREATE INDEX "_career_v_version_version_created_at_idx" ON "_career_v" USING btree ("version_created_at");
  CREATE INDEX "_career_v_version_version__status_idx" ON "_career_v" USING btree ("version__status");
  CREATE INDEX "_career_v_created_at_idx" ON "_career_v" USING btree ("created_at");
  CREATE INDEX "_career_v_updated_at_idx" ON "_career_v" USING btree ("updated_at");
  CREATE INDEX "_career_v_latest_idx" ON "_career_v" USING btree ("latest");
  CREATE INDEX "_career_v_autosave_idx" ON "_career_v" USING btree ("autosave");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_autosave_idx" ON "_testimonials_v" USING btree ("autosave");
  CREATE INDEX "playground_updated_at_idx" ON "playground" USING btree ("updated_at");
  CREATE INDEX "playground_created_at_idx" ON "playground" USING btree ("created_at");
  CREATE INDEX "playground__status_idx" ON "playground" USING btree ("_status");
  CREATE INDEX "_playground_v_parent_idx" ON "_playground_v" USING btree ("parent_id");
  CREATE INDEX "_playground_v_version_version_updated_at_idx" ON "_playground_v" USING btree ("version_updated_at");
  CREATE INDEX "_playground_v_version_version_created_at_idx" ON "_playground_v" USING btree ("version_created_at");
  CREATE INDEX "_playground_v_version_version__status_idx" ON "_playground_v" USING btree ("version__status");
  CREATE INDEX "_playground_v_created_at_idx" ON "_playground_v" USING btree ("created_at");
  CREATE INDEX "_playground_v_updated_at_idx" ON "_playground_v" USING btree ("updated_at");
  CREATE INDEX "_playground_v_latest_idx" ON "_playground_v" USING btree ("latest");
  CREATE INDEX "_playground_v_autosave_idx" ON "_playground_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "media_source_path_idx" ON "media" USING btree ("source_path");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_career_id_idx" ON "payload_locked_documents_rels" USING btree ("career_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_playground_id_idx" ON "payload_locked_documents_rels" USING btree ("playground_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_navigation_order_idx" ON "site_navigation" USING btree ("_order");
  CREATE INDEX "site_navigation_parent_id_idx" ON "site_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_socials_order_idx" ON "site_socials" USING btree ("_order");
  CREATE INDEX "site_socials_parent_id_idx" ON "site_socials" USING btree ("_parent_id");
  CREATE INDEX "site_logo_idx" ON "site" USING btree ("logo_id");
  CREATE INDEX "site_seo_image_idx" ON "site" USING btree ("seo_image_id");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");
  CREATE INDEX "_site_v_version_navigation_order_idx" ON "_site_v_version_navigation" USING btree ("_order");
  CREATE INDEX "_site_v_version_navigation_parent_id_idx" ON "_site_v_version_navigation" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_socials_order_idx" ON "_site_v_version_socials" USING btree ("_order");
  CREATE INDEX "_site_v_version_socials_parent_id_idx" ON "_site_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_version_logo_idx" ON "_site_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_v_version_version_seo_image_idx" ON "_site_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE INDEX "_site_v_autosave_idx" ON "_site_v" USING btree ("autosave");
  CREATE INDEX "design__status_idx" ON "design" USING btree ("_status");
  CREATE INDEX "_design_v_version_version__status_idx" ON "_design_v" USING btree ("version__status");
  CREATE INDEX "_design_v_created_at_idx" ON "_design_v" USING btree ("created_at");
  CREATE INDEX "_design_v_updated_at_idx" ON "_design_v" USING btree ("updated_at");
  CREATE INDEX "_design_v_latest_idx" ON "_design_v" USING btree ("latest");
  CREATE INDEX "_design_v_autosave_idx" ON "_design_v" USING btree ("autosave");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "projects_technologies" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "_projects_v_version_technologies" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "career_responsibilities" CASCADE;
  DROP TABLE "career" CASCADE;
  DROP TABLE "_career_v_version_responsibilities" CASCADE;
  DROP TABLE "_career_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "playground" CASCADE;
  DROP TABLE "_playground_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_navigation" CASCADE;
  DROP TABLE "site_socials" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "_site_v_version_navigation" CASCADE;
  DROP TABLE "_site_v_version_socials" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "design" CASCADE;
  DROP TABLE "_design_v" CASCADE;
  DROP TYPE "public"."enum_pages_shell";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_shell";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_career_icon";
  DROP TYPE "public"."enum_career_status";
  DROP TYPE "public"."enum__career_v_version_icon";
  DROP TYPE "public"."enum__career_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum_playground_demo";
  DROP TYPE "public"."enum_playground_category";
  DROP TYPE "public"."enum_playground_status";
  DROP TYPE "public"."enum__playground_v_version_demo";
  DROP TYPE "public"."enum__playground_v_version_category";
  DROP TYPE "public"."enum__playground_v_version_status";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_status";
  DROP TYPE "public"."enum_design_font";
  DROP TYPE "public"."enum_design_default_theme";
  DROP TYPE "public"."enum_design_motion";
  DROP TYPE "public"."enum_design_status";
  DROP TYPE "public"."enum__design_v_version_font";
  DROP TYPE "public"."enum__design_v_version_default_theme";
  DROP TYPE "public"."enum__design_v_version_motion";
  DROP TYPE "public"."enum__design_v_version_status";`)
}
