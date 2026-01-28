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

# Verifica che i segreti siano accessibili localmente
check-secrets:
	@echo "Checking secrets in local environment..."
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") sh -c 'echo "DATABASE_URL: $$(fnox get DATABASE_URL)" && echo "API_KEY: $$(fnox get API_KEY)" && echo "WEBHOOK_CONTACT_FORM: $$(fnox get WEBHOOK_CONTACT_FORM)" && echo "NODE_ENV: $$(fnox get NODE_ENV 2>/dev/null || echo development)"'

# Set secret with environment selection (local or production)
fnox-set:
	@bash -c 'echo "Select environment:"; echo "  1) Local (fnox.toml)"; echo "  2) Production (fnox.production.toml)"; read -p "Choice [1-2]: " env; if [ "$$env" = "2" ]; then config="fnox.production.toml"; else config="fnox.toml"; fi; echo ""; echo "Available secrets in $$config:"; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox list -c $$config 2>/dev/null | tail -n +2 | awk '"'"'{print $$1}'"'"' | grep -v "^$$" || echo "  (no secrets configured)"; echo ""; read -p "Enter secret name: " name; read -s -p "Enter secret value: " value; echo; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox set $$name "$$value" --provider age -c $$config && echo "✓ Secret set in $$config"'

# Set secret for local environment only
fnox-set-local:
	@bash -c 'echo "Available secrets in fnox.toml:"; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox list 2>/dev/null | tail -n +2 | awk '"'"'{print $$1}'"'"' | grep -v "^$$" || echo "  (no secrets configured)"; echo ""; read -p "Enter secret name: " name; read -s -p "Enter secret value: " value; echo; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox set $$name "$$value" --provider age && echo "✓ Secret set in fnox.toml (local)"'

# Set secret for production environment only
fnox-set-production:
	@bash -c 'echo "Available secrets in fnox.production.toml:"; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox list -c fnox.production.toml 2>/dev/null | tail -n +2 | awk '"'"'{print $$1}'"'"' | grep -v "^$$" || echo "  (no secrets configured)"; echo ""; read -p "Enter secret name: " name; read -s -p "Enter secret value: " value; echo; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox set $$name "$$value" --provider age -c fnox.production.toml && echo "✓ Secret set in fnox.production.toml (production)"'

# List secrets from production file
fnox-list-production:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox list -c fnox.production.toml

# Get secret from production
fnox-get-production:
	@bash -c 'read -p "Enter secret name: "; name; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox get $$name -c fnox.production.toml'

# Get secret with environment selection
fnox-get:
	@bash -c 'echo "Select environment:"; echo "  1) Local (fnox.toml)"; echo "  2) Production (fnox.production.toml)"; read -p "Choice [1-2]: " env; if [ "$$env" = "2" ]; then config="fnox.production.toml"; else config="fnox.toml"; fi; read -p "Enter secret name: " name; FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") fnox get $$name -c $$config'

# Check secrets in production file
check-secrets-production:
	@echo "Checking secrets in production file..."
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") sh -c 'echo "DATABASE_URL: $$(fnox get DATABASE_URL -c fnox.production.toml)" && echo "API_KEY: $$(fnox get API_KEY -c fnox.production.toml)" && echo "WEBHOOK_CONTACT_FORM: $$(fnox get WEBHOOK_CONTACT_FORM -c fnox.production.toml)" && echo "NODE_ENV: $$(fnox get NODE_ENV -c fnox.production.toml 2>/dev/null || echo production)"'

fnox-update-secret:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") bash scripts/update-fnox-secret.sh

# Docker + fnox commands
docker-logs:
	@docker compose logs -f app

docker-shell:
	@docker compose exec app sh

docker-fnox-list:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") docker compose exec -e FNOX_AGE_KEY app fnox list

docker-fnox-check:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") docker compose exec -e FNOX_AGE_KEY app fnox check

docker-fnox-test:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") docker compose exec -e FNOX_AGE_KEY app fnox provider test age

# Verifica che i segreti siano accessibili nel container
docker-check-secrets:
	@echo "Checking secrets in Docker container..."
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") docker compose exec -e FNOX_AGE_KEY app sh -c 'echo "DATABASE_URL: $$(fnox get DATABASE_URL)" && echo "API_KEY: $$(fnox get API_KEY)" && echo "WEBHOOK_CONTACT_FORM: $$(fnox get WEBHOOK_CONTACT_FORM)" && echo "NODE_ENV: $$(fnox get NODE_ENV 2>/dev/null || echo production)"'

# Verifica che i segreti siano accessibili nel container remoto
docker-check-remote-secrets:
	@echo "Checking secrets in remote Docker container..."
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") ssh ale@achih1 "cd /home/ale/landing-new-v2 && FNOX_AGE_KEY='$$FNOX_AGE_KEY' docker compose exec -e FNOX_AGE_KEY app sh -c 'echo \"DATABASE_URL: \$$(fnox get DATABASE_URL)\" && echo \"API_KEY: \$$(fnox get API_KEY)\" && echo \"WEBHOOK_CONTACT_FORM: \$$(fnox get WEBHOOK_CONTACT_FORM)\" && echo \"NODE_ENV: \$$(fnox get NODE_ENV 2>/dev/null || echo production)\"'"

# Build senza avviare (utile per debug)
docker-build-only:
	@FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") docker compose build --no-cache
ssh:
	@ssh ale@achih1
deploy:
	@echo "Rebuilding Docker image on remote server..."
	@echo "Creating .env.fnox with FNOX_AGE_KEY..."
	@echo "FNOX_AGE_KEY=$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY")" > .env.fnox
	@echo "Copying .env.fnox to remote server..."
	@scp .env.fnox ale@achih1:/home/ale/landing-new-v2/.env.fnox
	@rm .env.fnox
	@echo "Deploying with git pull, build, down and up..."
	@ssh ale@achih1 "cd /home/ale/landing-new-v2 && git pull && set -a && source .env.fnox && set +a && docker compose build && docker compose down && docker compose up -d && rm .env.fnox"
	@echo "Deploy completed successfully!"

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

.PHONY: admin-cms
admin-cms:
	@bun --bun admin-cms/server.ts
