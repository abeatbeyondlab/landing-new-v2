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
