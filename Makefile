up:
	@docker compose up --build --force-recreate -d

down:
	@docker compose down

restart:
	@make down
	@make up

deploy:
	@echo "Rebuilding Docker image on remote server..."
	@ssh ale@achih1 'cd /home/ale/abeatbeyond.com && git pull && docker compose build && docker compose down && docker compose up -d'

# Prisma Commands
prisma-pull:
	@echo "Pulling schema from database..."
	@bunx prisma db pull

prisma-generate:
	@echo "Generating Prisma Client..."
	@bunx prisma generate

prisma-migrate-create:
	@echo "Creating a new migration (without applying)..."
	@bunx prisma migrate dev --create-only

prisma-migrate-up:
	@echo "Applying pending migrations..."
	@bunx prisma migrate dev

prisma-ui:
	@echo "Starting Prisma Studio..."
	@bunx prisma studio

# Post Lifecycle Commands
post-download:
	@echo "Downloading all posts to blogpost/..."
	@bunx tsx scripts/download-posts.ts

post-metadata:
	@echo "Downloading all post metadata to blogpost/..."
	@bunx tsx scripts/download-metadata.ts

tags-download:
	@echo "Downloading all tags to blogpost/tags.json..."
	@bunx tsx scripts/download-tags.ts

post-update-metadata:
	@echo "Updating post metadata for ID $(ID)..."
	@bunx tsx scripts/upload-metadata.ts $(ID)

post-update:
	@echo "Updating post $(ID)..."
	@bunx tsx scripts/upload-post.ts $(ID)

post-status:
	@echo "Changing status of post $(ID) to $(STATE)..."
	@bunx tsx scripts/change-post-status.ts $(ID) $(STATE)

post-delete:
	@echo "Deleting post $(ID)..."
	@bunx tsx scripts/delete-post.ts $(ID)

tags-upload:
	@echo "Uploading tags from blogpost/tags.json..."
	@bunx tsx scripts/upload-tags.ts
