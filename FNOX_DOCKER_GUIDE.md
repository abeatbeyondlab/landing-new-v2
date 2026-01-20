# Guida: Implementazione di fnox come Secret Manager con Docker

Questa guida spiega come integrare [fnox](https://github.com/jdx/fnox) come secret manager in progetti Docker, permettendo di gestire i segreti in modo sicuro durante lo sviluppo, il build e il deploy.

## 📋 Indice

1. [Panoramica dell'Architettura](#panoramica-dellarchitettura)
2. [Prerequisiti](#prerequisiti)
3. [Setup Iniziale](#setup-iniziale)
4. [Configurazione Dockerfile](#configurazione-dockerfile)
5. [Configurazione docker-compose.yml](#configurazione-docker-composeyml)
6. [Configurazione Makefile](#configurazione-makefile)
7. [Deploy Sicuro su Server Remoto](#deploy-sicuro-su-server-remoto)
8. [Best Practices di Sicurezza](#best-practices-di-sicurezza)
9. [Troubleshooting](#troubleshooting)
10. [Esempi Pratici](#esempi-pratici)

---

## Panoramica dell'Architettura

```
┌─────────────────┐
│  Sviluppo Locale│
│  (fnox.toml)    │
└────────┬────────┘
         │
         ├──> Build Locale (fnox exec -- bun build)
         │
         ├──> Docker Build (FNOX_AGE_KEY come ARG/ENV)
         │
         └──> Deploy Remoto (file .env temporaneo)
                 │
                 ▼
         ┌─────────────────┐
         │  Docker Container│
         │  (fnox exec)    │
         └─────────────────┘
                 │
                 ▼
         ┌─────────────────┐
         │  Applicazione   │
         │  (env vars)     │
         └─────────────────┘
```

### Come Funziona

1. **Sviluppo Locale**: fnox decrittografa i segreti dal file `fnox.toml` e li passa come variabili d'ambiente
2. **Build Docker**: La chiave di decrittazione viene passata come ARG/ENV durante il build
3. **Runtime Docker**: fnox viene eseguito nel container per caricare i segreti prima di avviare l'applicazione
4. **Deploy Remoto**: La chiave viene passata temporaneamente tramite un file `.env` che viene rimosso subito dopo

---

## Prerequisiti

### Software Richiesto

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **fnox** (installato localmente)
- **age** (per la crittografia)

### Installazione di fnox

```bash
# Linux/macOS
curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz
tar -xzf /tmp/fnox.tar.gz -C /tmp
sudo mv /tmp/fnox /usr/local/bin/fnox
sudo chmod +x /usr/local/bin/fnox

# Verifica installazione
fnox --version
```

### Generazione Chiave age

```bash
# Genera chiave age
age-keygen -o ~/.config/fnox/age.txt

# La chiave pubblica sarà mostrata nell'output
# Salvala per usarla in fnox.toml
```

---

## Setup Iniziale

### 1. Inizializza fnox nel Progetto

```bash
# Nella root del progetto
fnox init

# Oppure crea manualmente fnox.toml
```

### 2. Configura fnox.toml

```toml
# fnox.toml

[providers.age]
type = "age"
recipients = ["age1ql3z...kg5sfn9aqmcac8p"]

[secrets]
DATABASE_URL = { provider = "age", value = "encrypted_value_here" }
API_KEY = { provider = "age", value = "encrypted_value_here" }
WEBHOOK_SECRET = { provider = "age", value = "encrypted_value_here" }
```

### 3. Aggiungi Segreti

```bash
# Interattivo
fnox set DATABASE_URL

# Con valore diretto
fnox set API_KEY "sk-1234567890"

# Leggendo da stdin
echo "my-secret-value" | fnox set WEBHOOK_SECRET
```

### 4. Verifica Configurazione

```bash
# Lista segreti
fnox list

# Verifica configurazione
fnox check

# Test provider
fnox provider test age
```

---

## Esempio Configurazione Dockerfile

### Multi-stage Build con fnox

```dockerfile
# Base image
FROM oven/bun:latest AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Builder stage - fnox per decrittare durante build
FROM base AS builder
WORKDIR /app

# Importa FNOX_AGE_KEY come ARG e ENV
ARG FNOX_AGE_KEY
ENV FNOX_AGE_KEY=$FNOX_AGE_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Installa fnox nel builder
RUN apt-get update && apt-get install -y curl ca-certificates && \
    curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz && \
    tar -xzf /tmp/fnox.tar.gz -C /tmp && \
    mv /tmp/fnox /usr/local/bin/fnox && \
    chmod +x /usr/local/bin/fnox && \
    rm /tmp/fnox.tar.gz

# Genera Prisma Client (se necessario)
RUN bunx prisma generate

# Build con fnox - carica i segreti come env vars
RUN fnox exec -- bun run build

# Runner stage - fnox per decrittare a runtime
FROM base AS runner
WORKDIR /app

# Importa FNOX_AGE_KEY come ARG e ENV
ARG FNOX_AGE_KEY
ENV FNOX_AGE_KEY=$FNOX_AGE_KEY
ENV NODE_ENV=production

# Installa fnox e dipendenze runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends tini curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz && \
    tar -xzf /tmp/fnox.tar.gz -C /tmp && \
    mv /tmp/fnox /usr/local/bin/fnox && \
    chmod +x /usr/local/bin/fnox && \
    rm /tmp/fnox.tar.gz

# Crea utente non-root
RUN groupadd -g 1001 -r nodejs && \
    useradd -u 1001 -r -g nodejs -d /home/nodejs -m -s /bin/bash nodejs

# Copia file necessari
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nodejs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nodejs:nodejs /app/fnox.toml ./fnox.toml

# Copia altri file necessari (data, config, etc.)
COPY --from=builder --chown=nodejs:nodejs /app/data ./data

USER nodejs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Usa Tini come init system
ENTRYPOINT ["/usr/bin/tini", "--"]

# Avvia applicazione con fnox
CMD ["sh", "-c", "fnox exec -- node server.js"]
```

### Punti Chiave

1. **ARG → ENV**: `FNOX_AGE_KEY` deve essere definito sia come ARG che come ENV
2. **Installazione fnox**: Installato sia in builder che in runner
3. **Build con fnox**: `fnox exec -- bun run build` carica i segreti durante il build
4. **Runtime con fnox**: `fnox exec -- node server.js` carica i segreti a runtime
5. **Utente non-root**: Best practice per sicurezza

---

## Configurazione docker-compose.yml

### Configurazione Base

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - FNOX_AGE_KEY=${FNOX_AGE_KEY}
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - FNOX_AGE_KEY=${FNOX_AGE_KEY}
    restart: unless-stopped
    volumes:
      - ./data:/app/data
```

### Configurazione Avanzata con Profili

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - FNOX_AGE_KEY=${FNOX_AGE_KEY}
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - FNOX_AGE_KEY=${FNOX_AGE_KEY}
      - TURBO_TELEMETRY_DISABLED=1
      - DO_NOT_TRACK=1
    restart: unless-stopped
    volumes:
      - ./data:/app/data
      # Per sviluppo locale
      - ./app:/app/app
      - ./components:/app/components
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### File .env per Sviluppo

```bash
# .env (non committare in git!)
FNOX_AGE_KEY=AGE-SECRET-KEY-1...
```

### File .env.example

```bash
# .env.example (committare in git)
FNOX_AGE_KEY=your-age-secret-key-here
```

---

## Configurazione Makefile

### Comandi Base

```makefile
# Variabili
FNOX_AGE_KEY=$(shell cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY")

# Docker commands
up:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) docker compose up --build --force-recreate -d

down:
	@docker compose down

restart:
	@make down
	@make up

# fnox commands (locale)
fnox-dev:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) fnox exec -- bun --bun next dev

fnox-build:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) fnox exec -- bun --bun next build

fnox-start:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) fnox exec -- bun --bun next start

fnox-list:
	@fnox list

fnox-set:
	@read -p "Enter secret name: " name; \
	read -s -p "Enter secret value: " value; \
	echo; \
	FNOX_AGE_KEY=$(FNOX_AGE_KEY) fnox set $$name "$$value" --provider age

# Docker + fnox commands
docker-logs:
	@docker compose logs -f app

docker-shell:
	@docker compose exec app sh

docker-fnox-list:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) docker compose exec -e FNOX_AGE_KEY app fnox list

docker-fnox-check:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) docker compose exec -e FNOX_AGE_KEY app fnox check

docker-fnox-test:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) docker compose exec -e FNOX_AGE_KEY app fnox provider test age

docker-check-secrets:
	@echo "Checking secrets in Docker container..."
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) docker compose exec -e FNOX_AGE_KEY app sh -c 'fnox exec -- sh -c "echo \"DATABASE_URL: $$DATABASE_URL\" && echo \"API_KEY: $$API_KEY\""'

docker-build-only:
	@FNOX_AGE_KEY=$(FNOX_AGE_KEY) docker compose build --no-cache
```

### Deploy su Server Remoto

```makefile
# Deploy sicuro con file .env temporaneo
deploy:
	@echo "Rebuilding Docker image on remote server..."
	@echo "Pulling code and building..."
	@ssh user@server 'cd /path/to/project && git pull && docker compose build && docker compose down'
	@echo "Creating temporary .env.fnox file on server..."
	@cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY" | ssh user@server 'cat > /path/to/project/.env.fnox && chmod 600 /path/to/project/.env.fnox'
	@echo "Starting containers with secrets..."
	@ssh user@server 'cd /path/to/project && docker compose --env-file .env.fnox up -d'
	@echo "Removing temporary .env.fnox file..."
	@ssh user@server 'rm /path/to/project/.env.fnox'
	@echo "Deploy completed successfully!"
```

---

## Deploy Sicuro su Server Remoto

### Strategia con File .env Temporaneo

Questa strategia garantisce che la chiave di decrittazione non rimanga mai sul server.

#### Flusso di Deploy

1. **Pull e Build**: Aggiorna il codice e ricostruisce l'immagine
2. **Creazione File Temporaneo**: Copia la chiave in un file `.env.fnox` con permessi 600
3. **Avvio Container**: Avvia i container usando il file temporaneo
4. **Rimozione File**: Rimuove immediatamente il file temporaneo

#### Implementazione

```makefile
deploy:
	@echo "Rebuilding Docker image on remote server..."
	@echo "Pulling code and building..."
	@ssh user@server 'cd /path/to/project && git pull && docker compose build && docker compose down'
	@echo "Creating temporary .env.fnox file on server..."
	@cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY" | ssh user@server 'cat > /path/to/project/.env.fnox && chmod 600 /path/to/project/.env.fnox'
	@echo "Starting containers with secrets..."
	@ssh user@server 'cd /path/to/project && docker compose --env-file .env.fnox up -d'
	@echo "Removing temporary .env.fnox file..."
	@ssh user@server 'rm /path/to/project/.env.fnox'
	@echo "Deploy completed successfully!"
```

#### Aggiorna .dockerignore

```dockerignore
# Aggiungi alla lista
.env.fnox
```

### Alternative per Produzione

#### 1. Docker Secrets (Docker Swarm)

```makefile
deploy-swarm:
	@echo "$$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY")" | ssh user@server 'docker secret create fnox_age_key -'
	@ssh user@server 'cd /path/to/project && git pull && docker stack deploy -c docker-compose.yml app'
```

```yaml
# docker-compose.yml per Swarm
services:
  app:
    secrets:
      - fnox_age_key
    environment:
      - FNOX_AGE_KEY_FILE=/run/secrets/fnox_age_key

secrets:
  fnox_age_key:
    external: true
```

#### 2. Provider Cloud (AWS, Azure, GCP)

Configura fnox per usare provider cloud invece di age:

```toml
# fnox.production.toml
[providers.aws]
type = "aws-sm"
region = "us-east-1"
prefix = "myapp/"

[secrets]
DATABASE_URL = { provider = "aws", value = "database-url" }
API_KEY = { provider = "aws", value = "api-key" }
```

---

## Best Practices di Sicurezza

### 1. Non Committare Chiavi

```bash
# .gitignore
.env
.env.local
.env.*.local
.env.fnox
~/.config/fnox/age.txt
```

### 2. Usa Profili per Ambienti Diversi

```toml
# fnox.toml (base)
[providers.age]
type = "age"
recipients = ["age1..."]

[secrets]
API_KEY = { provider = "age", value = "..." }

# fnox.production.toml
[providers.aws]
type = "aws-sm"
region = "us-east-1"

[secrets]
DATABASE_URL = { provider = "aws", value = "prod-db-url" }
```

### 3. Limita Accesso alle Chiavi

```bash
# Permessi restrittivi per file chiave
chmod 600 ~/.config/fnox/age.txt

# Proprietario corretto
chown $USER:$USER ~/.config/fnox/age.txt
```

### 4. Usa if_missing Appropriatamente

```toml
[secrets]
# Critico: fallisce se mancante
DATABASE_URL = { provider = "age", value = "...", if_missing = "error" }

# Opzionale: avvisa ma continua
ANALYTICS_KEY = { provider = "age", value = "...", if_missing = "warn" }

# Molto opzionale: ignora silenziosamente
DEBUG_MODE = { provider = "age", value = "...", if_missing = "ignore" }
```

### 5. Rotazione Regolare delle Chiavi

```bash
# Genera nuova chiave
age-keygen -o ~/.config/fnox/age-new.txt

# Aggiorna fnox.toml con nuova chiave pubblica
# Re-encrypt tutti i segreti con nuova chiave

# Sostituisci vecchia chiave
mv ~/.config/fnox/age-new.txt ~/.config/fnox/age.txt
```

### 6. Monitoraggio e Logging

```bash
# Verifica accesso ai segreti
fnox list --values

# Log di fnox in produzione
export FNOX_LOG_LEVEL=debug
```

---

## Troubleshooting

### Problema: "FNOX_AGE_KEY not set"

**Sintomo**: Errore durante build o runtime

**Soluzione**:
```bash
# Verifica che la chiave sia impostata
echo $FNOX_AGE_KEY

# Per Docker build
docker compose build --build-arg FNOX_AGE_KEY=$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY")

# Per runtime
docker compose exec -e FNOX_AGE_KEY=$(cat ~/.config/fnox/age.txt | grep "AGE-SECRET-KEY") app sh
```

### Problema: "Secret not found"

**Sintomo**: fnox non trova un segreto

**Soluzione**:
```bash
# Verifica configurazione
fnox check

# Lista segreti disponibili
fnox list

# Verifica che il segreto sia nel profilo corretto
fnox list --profile production
```

### Problema: "Permission denied" su file chiave

**Sintomo**: Impossibile leggere la chiave age

**Soluzione**:
```bash
# Correggi permessi
chmod 600 ~/.config/fnox/age.txt

# Verifica proprietario
ls -la ~/.config/fnox/age.txt
```

### Problema: Container non parte dopo deploy

**Sintomo**: Container crasha subito dopo l'avvio

**Soluzione**:
```bash
# Controlla log
docker compose logs app

# Entra nel container per debug
docker compose exec app sh

# Verifica che fnox funzioni
docker compose exec app fnox list
```

### Problema: Build fallisce con fnox

**Sintomo**: Errore durante `fnox exec -- bun run build`

**Soluzione**:
```bash
# Verifica che fnox sia installato nel container
docker compose exec app which fnox

# Test fnox nel container
docker compose exec app fnox check

# Verifica che FNOX_AGE_KEY sia accessibile
docker compose exec app sh -c 'echo $FNOX_AGE_KEY'
```

---

## Esempi Pratici

### Esempio 1: Setup Completo per Progetto Next.js

```bash
# 1. Inizializza fnox
fnox init

# 2. Aggiungi segreti
fnox set DATABASE_URL "postgresql://localhost:5432/mydb"
fnox set NEXTAUTH_SECRET "my-secret-key"
fnox set API_KEY "sk-1234567890"

# 3. Verifica
fnox list

# 4. Build locale
make fnox-build

# 5. Test locale
make fnox-start

# 6. Build Docker
make docker-build-only

# 7. Avvia Docker
make up

# 8. Verifica segreti nel container
make docker-check-secrets

# 9. Deploy su server
make deploy
```

### Esempio 2: Gestione Segreti per Team

```bash
# 1. Ogni membro genera la propria chiave
age-keygen -o ~/.config/fnox/age.txt

# 2. Aggiungi tutte le chiavi pubbliche a fnox.toml
[providers.age]
type = "age"
recipients = [
  "age1...member1",
  "age1...member2",
  "age1...member3"
]

# 3. Ogni membro può decrittare i segreti
fnox list --values

# 4. Quando un membro lascia il team, rimuovi la sua chiave e re-encrypt
```

### Esempio 3: Profili per Ambienti Diversi

```bash
# Sviluppo locale
fnox exec -- bun run dev

# Staging
FNOX_PROFILE=staging fnox exec -- bun run build

# Produzione
FNOX_PROFILE=production fnox exec -- bun run build
```

### Esempio 4: Integrazione con CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup fnox
        run: |
          curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz
          tar -xzf /tmp/fnox.tar.gz -C /tmp
          sudo mv /tmp/fnox /usr/local/bin/fnox
          sudo chmod +x /usr/local/bin/fnox
      
      - name: Build with fnox
        env:
          FNOX_AGE_KEY: ${{ secrets.FNOX_AGE_KEY }}
        run: |
          fnox exec -- bun run build
      
      - name: Deploy
        env:
          FNOX_AGE_KEY: ${{ secrets.FNOX_AGE_KEY }}
        run: |
          # Deploy commands here
```

---

## Risorse Aggiuntive

- [Documentazione ufficiale fnox](https://github.com/jdx/fnox)
- [Documentazione Docker](https://docs.docker.com/)
- [Age encryption tool](https://github.com/FiloSottile/age)
- [Best practices per segreti in Docker](https://docs.docker.com/engine/swarm/secrets/)
- [Documentazione per LLM](https://context7.com/jdx/fnox/llms.txt?tokens=10000)

---

## Conclusione

Questa guida fornisce una base solida per integrare fnox come secret manager in progetti Docker. La configurazione presentata è:

✅ **Sicura**: I segreti non sono mai in chiaro nel repository
✅ **Flessibile**: Supporta ambienti diversi e provider multipli
✅ **Riutilizzabile**: Può essere applicata a qualsiasi progetto
✅ **Scalabile**: Funziona bene in team e in produzione

Per domande o problemi, consulta la documentazione ufficiale di fnox o apri un issue nel repository del progetto.
