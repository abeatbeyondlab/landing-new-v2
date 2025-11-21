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