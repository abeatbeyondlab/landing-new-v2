# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 landing page and blog for "A Beat Beyond", an Italian digital transformation consultancy for SMEs (PMI). The site is bilingual (Italian default, English via `/en` path).

## Common Commands

### Development
- `bun bdev` - Start development server (uses Bun runtime)
- `bun bbuild` - Build for production
- `bun bstart` - Start production server

### Testing
- `npm test` - Run Mocha tests

### Prisma (Database)
- `make prisma-pull` - Pull schema from remote database
- `make prisma-generate` - Generate Prisma Client
- `make prisma-migrate-create` - Create migration (without applying)
- `make prisma-migrate-up` - Apply pending migrations
- `make prisma-ui` - Open Prisma Studio (database UI)

### Blog Post Management
- `make post-create` - Create new post placeholder in DB
- `make post-download` - Download all posts to `blogpost/` as markdown
- `make post-update ID=<id>` - Upload markdown content to DB
- `make post-metadata` - Download post metadata to JSON files
- `make post-update-metadata ID=<id>` - Upload metadata and tags to DB
- `make post-status ID=<id> STATE=<0|1>` - Change post state (0=draft, 1=published)
- `make post-delete ID=<id>` - Delete post and local files
- `make tags-download` - Download tags to `blogpost/tags.json`
- `make tags-upload` - Sync tags to DB

### Docker
- `make up` - Build and start containers
- `make down` - Stop containers
- `make restart` - Restart containers
- `make deploy` - Deploy to remote server (achih1 via SSH)

**Docker Setup Details:**
- **Multi-stage build**: `base` -> `deps` -> `builder` -> `runner` using `oven/bun:latest`
- **Port**: 3000
- **Database persistence**: SQLite database mounted via volume `./data:/app/data`
- **Non-root execution**: Runs as `nextjs` user (uid 1001)
- **Init system**: Uses Tini for proper signal/zombie process handling
- **Environment variables**:
  - `NODE_ENV=production`
  - `WEBHOOK_CONTACT_FORM` (contact form webhook secret)
  - `TURBO_TELEMETRY_DISABLED=1`
  - `DO_NOT_TRACK=1`

## Architecture

### Internationalization (i18n)
- **Default locale**: Italian (`it`)
- **English locale**: Accessible via `/en` prefix
- **Locale detection**: `proxy.ts` middleware checks `NEXT_LOCALE` cookie first, then `Accept-Language` header
- **Configuration**: `i18n/routing.ts` defines locales with `localePrefix: 'as-needed'`
- **Messages**: Stored in `messages/it.json` and `messages/en.json`

### Directory Structure
- `app/` - Next.js App Router pages and API routes
- `app/api/v1/blog/posts/[id]/` - Blog post CRUD API (GET, POST, PATCH, DELETE)
- `app/api/v1/contact-form/` - Contact form submission endpoint
- `components/` - Reusable React components
- `config/` - Configuration files (site config, etc.)
- `data/` - SQLite database (`db.sqlite3`) and database utilities (`db.ts`)
- `i18n/` - Internationalization configuration
- `messages/` - Translation files
- `prisma/` - Prisma schema (`schema.prisma`)
- `scripts/` - Utility scripts for blog management
- `blogpost/` - Local copies of blog posts (markdown + JSON metadata)

### Database (Prisma + SQLite)
- Schema: `prisma/schema.prisma`
- Models: `post`, `tag`, `post_tag` (many-to-many relation)
- Client generated to: `app/generated/client/`
- Singleton pattern in `data/db.ts` to prevent multiple instances
- Bun SQLite adapter: `prisma-adapter-bun-sqlite`

### Routing & Proxy
- `proxy.ts` middleware handles locale routing before Next.js
- Redirects non-Italian browsers to `/en`, sets `NEXT_LOCALE` cookie
- Skips API routes, static assets, and already-localized paths

### Blog System
The blog supports an external content creation workflow via n8n automation:
1. Posts are created externally and uploaded via API
2. Content and metadata are managed separately
3. Draft/published state via `state` field (0=draft, 1=published)
4. Each post can have multiple tags

### Styling
- Tailwind CSS v4
- Font: Libre Baskerville (variable font)
- Dark mode: Not currently implemented

## Important Notes

- **Runtime**: Uses Bun (`bun bdev`, `bun bbuild`) not Node.js/npm
- **Deployment**: Standalone output enabled for Docker
- **Images**: Unoptimized (disabled for standalone output)
- **Analytics**: Google Analytics ID in `config/site.ts`
- **Docker build**: Runs `bunx prisma generate` before `bun run build` to ensure Prisma Client is available

## External Content Workflow

Posts are generated externally via n8n and synced to the site via API. The Makefile commands in `POST_LIFECYCLE.md` document the local development workflow for editing posts.

## API Reference

The blog system exposes a REST API at `/api/v1/blog` for external automation (e.g., n8n, makefile scripts). All requests must include the `x-api-key` header with a valid API key.

### Posts

- **Create Post Pair**
  - `POST /posts/create-pair`
  - Body: `{ title_it, title_en, slug_it, slug_en, description_it, description_en }`
  - Creates linked Italian and English post placeholders.

- **List Posts**
  - `GET /posts`
  - Query: `page` (default 1), `limit` (default 10)

- **Post Metadata**
  - `GET /posts/:id/metadata` - Get post metadata (excluding content)
  - `PUT /posts/:id/metadata` - Update metadata
  - Body (PUT): `{ title, description }`

- **Post Content**
  - `GET /posts/:id/content` - Get post content
  - `PUT /posts/:id/content` - Update content
  - Body (PUT): `{ content }` (Markdown string)

- **Post Status**
  - `PUT /posts/:id/status`
  - Body: `{ state: 0 | 1 }` (0=Draft, 1=Published)

- **Post Tags**
  - `GET /posts/:id/tags` - Get assigned tags
  - `PUT /posts/:id/tags` - Update assigned tags
  - Body (PUT): `{ tag_ids: number[] }` (Replaces all existing tags)

- **Delete Post**
  - `DELETE /posts/:id`

### Tags

- **List Tags**
  - `GET /tags`
  - Query: `page`, `limit`

- **Create Tag**
  - `POST /tags`
  - Body: `{ name, slug }`

- **Update Tag**
  - `PUT /tags/:id`
  - Body: `{ name }`

- **Delete Tag**
  - `DELETE /tags/:id`

## User-Invocable Skills

These skills can be invoked using slash commands.

- `/create-post`
  - **Description**: Creates a new blog post via the interactive script.
  - **Implementation**:
    1. Ask the user for the **Post Title** and **Post Slug**.
    2. Construct a command to pipe these inputs: `(echo "TITLE"; echo "SLUG") | bun scripts/create-post.ts`
    3. Execute the command.

- `/deploy`
  - **Description**: Deploys the site to the remote server.
  - **Implementation**: Run `make deploy` (confirm with user first).

- `/publish <id>`
  - **Description**: Publishes a post by ID.
  - **Implementation**: Run `make post-status ID=<id> STATE=1`.

- `/unpublish <id>`
  - **Description**: Reverts a post to draft by ID.
  - **Implementation**: Run `make post-status ID=<id> STATE=0`.
