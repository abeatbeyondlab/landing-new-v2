up:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") docker compose up --build --force-recreate -d

down:
	@docker compose down

restart:
	@make down
	@make up

# fnox commands
fnox-dev:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox exec -- bun --bun next dev

fnox-build:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox exec -- bun --bun next build

fnox-start:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox exec -- bun --bun next start

fnox-list:
	@fnox list

fnox-set:
	@read -p "Enter secret name: " name; read -s -p "Enter secret value: " value; echo; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox set $$name "$$value" --provider age
ssh:
	@ssh ale@achih1
deploy:
	@echo "Rebuilding Docker image on remote server..."
#@bun bbuild
	@ssh ale@achih1 'cd /home/ale/landing-new-v2 && git pull && docker compose build && docker compose down && docker compose up -d'

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
post-create:
	@echo "Creating new post..."
	@bun scripts/create-post.ts

post-download:
	@echo "Downloading all posts to blogpost/..."
	@bun scripts/download-posts.ts

post-metadata:
	@echo "Downloading all post metadata to blogpost/..."
	@bun scripts/download-metadata.ts

tags-download:
	@echo "Downloading all tags to blogpost/tags.json..."
	@bun scripts/download-tags.ts

post-update-metadata:
	@echo "Updating post metadata for ID $(ID)..."
	@bun scripts/upload-metadata.ts $(ID)

post-update:
	@echo "Updating post $(ID)..."
	@bun scripts/upload-post.ts $(ID)

post-status:
	@echo "Changing status of post $(ID) to $(STATE)..."
	@bun scripts/change-post-status.ts $(ID) $(STATE)

post-delete:
	@echo "Deleting post $(ID)..."
	@bun scripts/delete-post.ts $(ID)

tags-upload:
	@echo "Uploading tags from blogpost/tags.json..."
	@bun scripts/upload-tags.ts
