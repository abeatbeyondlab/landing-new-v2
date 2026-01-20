# Guida: Rotazione delle Chiave age con fnox

Questa guida spiega come ruotare le chiave age in modo sicuro senza downtime, utilizzando la funzionalità **multiple recipients** di age.

## 📋 Indice

1. [Perché Ruotare le Chiavi](#perché-ruotare-le-chiavi)
2. [Concetto di Multiple Recipients](#concetto-di-multiple-recipients)
3. [Processo di Rotazione](#processo-di-rotazione)
4. [Rotazione con Profili](#rotazione-con-profili)
5. [Automazione della Rotazione](#automazione-della-rotazione)
6. [Integrazione con CI/CD](#integrazione-con-cicd)
7. [Esempio Pratico](#esempio-pratico)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Perché Ruotare le Chiavi

### Quando Ruotare

- **Chiave compromessa**: Se una chiave privata è stata esposta accidentalmente (es. in log, commit in git)
- **Rotazione periodica**: Best practice di sicurezza (es. ogni 6-12 mesi)
- **Membro del team lascia**: Rimuovere accesso ai segreti
- **Nuovo ambiente**: Aggiungere supporto per un nuovo server o ambiente

### Rischi di Non Ruotare

- Accesso non autorizzato ai segreti
- Impossibilità di revocare accesso a ex-membri del team
- Violazione della sicurezza se chiave viene compromessa

---

## Concetto di Multiple Recipients

### Come Funziona

Age supporta la crittografia con **multiple chiavi pubbliche**. Questo significa che:

1. **Crittografia**: I segreti vengono crittografati una volta con tutte le chiavi pubbliche
2. **Decrittazione**: Qualsiasi chiave privata corrispondente può decrittare i segreti
3. **Rotazione**: Puoi aggiungere/rimuovere chiavi senza downtime

### Vantaggi

✅ **Zero downtime**: Durante la transizione, sia vecchia che nuova chiave funzionano
✅ **Rotazione semplice**: Aggiungi nuova chiave, re-encrypt, rimuovi vecchia
✅ **Team support**: Ogni membro può avere la sua chiave
✅ **Sicurezza**: Se una chiave viene compromessa, puoi rimuoverla senza interrompere gli altri

---

## Processo di Rotazione

### Passo 1: Genera Nuova Chiave

```bash
# Genera nuova chiave age
age-keygen -o ~/.config/fnox/age-new.txt

# Output esempio:
# Public key: age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p
# Private key: AGE-SECRET-KEY-1...
```

**Importante**: Salva la chiave pubblica (Public key) e la chiave privata (Private key) in un luogo sicuro.

### Passo 2: Aggiungi Nuova Chiave ai Recipients

Modifica `fnox.toml` (e `fnox.production.toml` se usi file separati):

```toml
[providers.age]
type = "age"
recipients = [
  "age1...chiave-vecchia",    # Mantieni per transizione
  "age1...chiave-nuova"       # Aggiungi nuova chiave
]
```

**Non rimuovere ancora la vecchia chiave!**

### Passo 3: Re-encrypt Tutti i Segreti

```bash
# Per ogni segreto
fnox set DATABASE_URL "postgresql://localhost:5432/mydb" --provider age
fnox set API_KEY "sk-1234567890" --provider age
fnox set WEBHOOK_CONTACT_FORM "my-webhook-secret" --provider age

# Se usi profili, ripeti per ogni profilo
FNOX_PROFILE=test fnox set DATABASE_URL "postgresql://test..." --provider age
FNOX_PROFILE=production fnox set DATABASE_URL "postgresql://prod..." --provider age
```

### Passo 4: Distribuisci Nuova Chiave

```bash
# Sviluppo locale - già fatto (hai generato la chiave)

# Server di test
scp ~/.config/fnox/age-new.txt user@test-server:~/.config/fnox/age.txt
ssh user@test-server "chmod 600 ~/.config/fnox/age.txt"

# Server di produzione
scp ~/.config/fnox/age-new.txt user@prod-server:~/.config/fnox/age.txt
ssh user@prod-server "chmod 600 ~/.config/fnox/age.txt"
```

### Passo 5: Verifica Funzionamento

```bash
# Verifica locale
fnox list --values

# Verifica su server
ssh user@test-server "cd /path/to/project && fnox list --values"
ssh user@prod-server "cd /path/to/project && fnox list --values"
```

Assicurati che tutti i segreti siano decrittati correttamente.

### Passo 6: Rimuovi Vecchia Chiave

Solo dopo aver verificato che tutto funzioni:

```toml
[providers.age]
type = "age"
recipients = [
  "age1...chiave-nuova"       # Rimuovi vecchia chiave
]
```

### Passo 7: Re-encrypt di Nuovo

```bash
# Re-encrypt con solo la nuova chiave
fnox set DATABASE_URL "postgresql://localhost:5432/mydb" --provider age
fnox set API_KEY "sk-1234567890" --provider age
fnox set WEBHOOK_CONTACT_FORM "my-webhook-secret" --provider age
```

### Passo 8: Pulisci Vecchia Chiave

```bash
# Rimuovi vecchia chiave locale
rm ~/.config/fnox/age-old.txt

# Rimuovi vecchia chiave dai server (se presente)
ssh user@test-server "rm ~/.config/fnox/age-old.txt"
ssh user@prod-server "rm ~/.config/fnox/age-old.txt"
```

---

## Rotazione con Profili

Quando usi profili separati (`fnox.toml` e `fnox.production.toml`), devi ruotare le chiavi per entrambi i file.

### Scenario: Rotazione per Sviluppo e Produzione

#### 1. Genera Nuove Chiavi

```bash
# Chiave per sviluppo locale
age-keygen -o ~/.config/fnox/age-dev-new.txt

# Chiave per produzione
age-keygen -o ~/.config/fnox/age-prod-new.txt
```

#### 2. Aggiorna fnox.toml (Sviluppo)

```toml
# fnox.toml
[providers.age]
type = "age"
recipients = [
  "age1...chiave-dev-vecchia",    # Mantieni per transizione
  "age1...chiave-dev-nuova"       # Aggiungi nuova chiave
]
```

#### 3. Aggiorna fnox.production.toml (Produzione)

```toml
# fnox.production.toml
[providers.age]
type = "age"
recipients = [
  "age1...chiave-prod-vecchia",   # Mantieni per transizione
  "age1...chiave-prod-nuova"      # Aggiungi nuova chiave
]
```

#### 4. Re-encrypt Segreti per Sviluppo

```bash
# Usa fnox.toml (default)
fnox set DATABASE_URL "postgresql://localhost:5432/mydb" --provider age
fnox set API_KEY "sk-1234567890" --provider age
fnox set WEBHOOK_CONTACT_FORM "my-webhook-secret" --provider age
```

#### 5. Re-encrypt Segreti per Produzione

```bash
# Usa fnox.production.toml
fnox set -c fnox.production.toml DATABASE_URL "postgresql://prod..." --provider age
fnox set -c fnox.production.toml API_KEY "sk-prod-1234567890" --provider age
fnox set -c fnox.production.toml WEBHOOK_CONTACT_FORM "prod-webhook-secret" --provider age
```

#### 6. Distribuisci Chiave di Produzione

```bash
# Copia chiave di produzione sul server
scp ~/.config/fnox/age-prod-new.txt user@prod-server:~/.config/fnox/age.txt
ssh user@prod-server "chmod 600 ~/.config/fnox/age.txt"
```

#### 7. Verifica Entrambi gli Ambienti

```bash
# Verifica sviluppo locale
fnox list --values

# Verifica produzione
ssh user@prod-server "cd /path/to/project && fnox list --values"
```

#### 8. Rimuovi Vecchie Chiavi

```toml
# fnox.toml
[providers.age]
type = "age"
recipients = [
  "age1...chiave-dev-nuova"       # Solo nuova
]

# fnox.production.toml
[providers.age]
type = "age"
recipients = [
  "age1...chiave-prod-nuova"      # Solo nuova
]
```

#### 9. Re-encrypt Finale

```bash
# Sviluppo
fnox set DATABASE_URL "postgresql://localhost:5432/mydb" --provider age
fnox set API_KEY "sk-1234567890" --provider age

# Produzione
fnox set -c fnox.production.toml DATABASE_URL "postgresql://prod..." --provider age
fnox set -c fnox.production.toml API_KEY "sk-prod-1234567890" --provider age
```

---

## Automazione della Rotazione

Per automatizzare il processo di rotazione, puoi creare uno script bash.

### Script di Rotazione Automatica

Crea il file `scripts/rotate-fnox-keys.sh`:

```bash
#!/bin/bash

# Script per rotazione automatica delle chiave age

set -e

# Configurazione
BACKUP_DIR="$HOME/backups/fnox"
ROTATION_LOG="$HOME/.config/fnox/rotation-history.txt"
DATE=$(date +%Y-%m-%d)

# Crea directory backup se non esiste
mkdir -p "$BACKUP_DIR"

# Funzione per log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$ROTATION_LOG"
}

# Funzione per backup
backup_key() {
    local key_file="$1"
    local backup_file="$BACKUP_DIR/$(basename $key_file)-$DATE.bak"
    cp "$key_file" "$backup_file"
    chmod 600 "$backup_file"
    log "Backup creato: $backup_file"
}

# Funzione per generare nuova chiave
generate_new_key() {
    local key_file="$1"
    local new_key_file="${key_file}.new"
    
    log "Generando nuova chiave: $new_key_file"
    age-keygen -o "$new_key_file"
    
    # Estrai chiave pubblica
    local public_key=$(grep "^# public key:" "$new_key_file" | cut -d' ' -f3)
    echo "$public_key"
}

# Funzione per aggiornare recipients
update_recipients() {
    local config_file="$1"
    local old_key="$2"
    local new_key="$3"
    
    log "Aggiornando recipients in $config_file"
    
    # Aggiungi nuova chiave ai recipients
    sed -i "s/recipients = \[\"$old_key\"\]/recipients = [\"$old_key\", \"$new_key\"]/" "$config_file"
    
    log "Nuova chiave aggiunta ai recipients"
}

# Funzione per re-encrypt segreti
reencrypt_secrets() {
    local config_file="$1"
    local fnox_age_key="$2"
    
    log "Re-encrypt segreti in $config_file"
    
    # Ottieni lista segreti
    local secrets=$(FNOX_AGE_KEY="$fnox_age_key" fnox list -c "$config_file" | tail -n +2 | awk '{print $1}')
    
    # Re-encrypt ogni segreto
    for secret in $secrets; do
        local value=$(FNOX_AGE_KEY="$fnox_age_key" fnox get -c "$config_file" "$secret")
        log "Re-encrypt: $secret"
        FNOX_AGE_KEY="$fnox_age_key" fnox set -c "$config_file" "$secret" "$value" --provider age
    done
}

# Funzione per rimuovere vecchia chiave
remove_old_key() {
    local config_file="$1"
    local old_key="$2"
    
    log "Rimuovendo vecchia chiave da $config_file"
    
    # Rimuovi vecchia chiave dai recipients
    sed -i "s/\"$old_key\", //" "$config_file"
    sed -i "s/, \"$old_key\"//" "$config_file"
    
    log "Vecchia chiave rimossa"
}

# Main
log "=== Inizio rotazione chiave age ==="

# Backup chiave corrente
backup_key "$HOME/.config/fnox/age.txt"

# Genera nuova chiave
NEW_PUBLIC_KEY=$(generate_new_key "$HOME/.config/fnox/age.txt")
NEW_PRIVATE_KEY=$(cat "$HOME/.config/fnox/age.txt.new")

# Ottieni chiave pubblica corrente
OLD_PUBLIC_KEY=$(grep "^# public key:" "$HOME/.config/fnox/age.txt" | cut -d' ' -f3)

# Aggiorna fnox.toml
update_recipients "fnox.toml" "$OLD_PUBLIC_KEY" "$NEW_PUBLIC_KEY"

# Re-encrypt segreti
reencrypt_secrets "fnox.toml" "$NEW_PRIVATE_KEY"

# Se esiste fnox.production.toml, aggiorna anche quello
if [ -f "fnox.production.toml" ]; then
    log "Aggiornando fnox.production.toml"
    update_recipients "fnox.production.toml" "$OLD_PUBLIC_KEY" "$NEW_PUBLIC_KEY"
    reencrypt_secrets "fnox.production.toml" "$NEW_PRIVATE_KEY"
fi

# Verifica funzionamento
log "Verifica funzionamento..."
FNOX_AGE_KEY="$NEW_PRIVATE_KEY" fnox list --values > /dev/null

if [ $? -eq 0 ]; then
    log "✅ Verifica completata con successo"
    
    # Rimuovi vecchia chiave
    remove_old_key "fnox.toml" "$OLD_PUBLIC_KEY"
    
    if [ -f "fnox.production.toml" ]; then
        remove_old_key "fnox.production.toml" "$OLD_PUBLIC_KEY"
    fi
    
    # Re-encrypt finale
    reencrypt_secrets "fnox.toml" "$NEW_PRIVATE_KEY"
    
    if [ -f "fnox.production.toml" ]; then
        reencrypt_secrets "fnox.production.toml" "$NEW_PRIVATE_KEY"
    fi
    
    # Sostituisci vecchia chiave
    mv "$HOME/.config/fnox/age.txt.new" "$HOME/.config/fnox/age.txt"
    chmod 600 "$HOME/.config/fnox/age.txt"
    
    log "✅ Rotazione completata con successo"
    log "Nuova chiave pubblica: $NEW_PUBLIC_KEY"
else
    log "❌ Verifica fallita, rollback in corso"
    rm "$HOME/.config/fnox/age.txt.new"
    exit 1
fi

log "=== Fine rotazione chiave age ==="
```

### Utilizzo dello Script

```bash
# Rendi lo script eseguibile
chmod +x scripts/rotate-fnox-keys.sh

# Esegui lo script
./scripts/rotate-fnox-keys.sh

# Oppure dal Makefile
make rotate-keys
```

### Aggiungi al Makefile

```makefile
# Rotazione chiave age
rotate-keys:
	@bash scripts/rotate-fnox-keys.sh
```

---

## Integrazione con CI/CD

Puoi integrare la rotazione delle chiavi nelle pipeline CI/CD per automatizzare il processo.

### GitHub Actions

Crea il file `.github/workflows/rotate-keys.yml`:

```yaml
name: Rotate fnox Keys

on:
  schedule:
    # Esegui ogni 6 mesi (primo giorno del mese alle 00:00)
    - cron: '0 0 1 */6 *'
  workflow_dispatch:  # Permette esecuzione manuale

jobs:
  rotate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup fnox
        run: |
          curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz
          tar -xzf /tmp/fnox.tar.gz -C /tmp
          sudo mv /tmp/fnox /usr/local/bin/fnox
          sudo chmod +x /usr/local/bin/fnox
      
      - name: Setup age
        run: |
          curl -L https://github.com/FiloSottile/age/releases/download/v1.1.1/age-v1.1.1-linux-amd64.tar.gz -o /tmp/age.tar.gz
          tar -xzf /tmp/age.tar.gz -C /tmp
          sudo mv /tmp/age/age /usr/local/bin/age
          sudo mv /tmp/age/age-keygen /usr/local/bin/age-keygen
          sudo chmod +x /usr/local/bin/age /usr/local/bin/age-keygen
      
      - name: Generate new key
        run: |
          age-keygen -o age-new.txt
          echo "NEW_PUBLIC_KEY=$(grep '^# public key:' age-new.txt | cut -d' ' -f3)" >> $GITHUB_ENV
          echo "NEW_PRIVATE_KEY=$(cat age-new.txt | grep '^AGE-SECRET-KEY')" >> $GITHUB_ENV
      
      - name: Update fnox.toml
        env:
          FNOX_AGE_KEY: ${{ secrets.FNOX_AGE_KEY }}
        run: |
          # Aggiungi nuova chiave ai recipients
          # Re-encrypt segreti
          # Verifica funzionamento
      
      - name: Commit and push
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add fnox.toml
          git commit -m "chore: rotate age keys"
          git push
```

### GitLab CI

Crea il file `.gitlab-ci.yml`:

```yaml
rotate-keys:
  image: alpine:latest
  schedule:
    # Esegui ogni 6 mesi
    - cron: "0 0 1 */6 *"
  script:
    - apk add --no-cache curl tar bash
    - curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz -o /tmp/fnox.tar.gz
    - tar -xzf /tmp/fnox.tar.gz -C /tmp
    - mv /tmp/fnox /usr/local/bin/fnox
    - chmod +x /usr/local/bin/fnox
    - curl -L https://github.com/FiloSottile/age/releases/download/v1.1.1/age-v1.1.1-linux-amd64.tar.gz -o /tmp/age.tar.gz
    - tar -xzf /tmp/age.tar.gz -C /tmp
    - mv /tmp/age/age /usr/local/bin/age
    - mv /tmp/age/age-keygen /usr/local/bin/age-keygen
    - chmod +x /usr/local/bin/age /usr/local/bin/age-keygen
    - bash scripts/rotate-fnox-keys.sh
    - git config --global user.email "gitlab-ci@gitlab.com"
    - git config --global user.name "GitLab CI"
    - git add fnox.toml
    - git commit -m "chore: rotate age keys"
    - git push
  only:
    - main
```

---

## Esempio Pratico

### Scenario: Chiave Compromessa in Log

Immagina che la tua chiave privata sia finita per errore in un log del sistema.

#### 1. Identifica il Problema

```bash
# Cerca la chiave nei log
grep -r "AGE-SECRET-KEY" /var/log/

# Trovi la chiave in un log!
```

#### 2. Genera Nuova Chiave

```bash
age-keygen -o ~/.config/fnox/age-new.txt

# Output:
# Public key: age1yq4n7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p
# Private key: AGE-SECRET-KEY-1Y4N7HJY54PW3HYWW5AYYFG7ZQGVC7W3J2ELW8ZMRJ2KG5SFN9AQMCAC8P
```

#### 3. Aggiorna fnox.toml

```toml
[providers.age]
type = "age"
recipients = [
  "age17vaq8s9wks3te6qvdvg7zvctv43nq9z9ywqpw5nffgxkkflr05nqlsm64u",  # Vecchia (compromessa)
  "age1yq4n7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p"   # Nuova
]
```

#### 4. Re-encrypt Segreti

```bash
fnox set DATABASE_URL "postgresql://localhost:5432/mydb" --provider age
fnox set API_KEY "sk-1234567890" --provider age
fnox set WEBHOOK_CONTACT_FORM "my-webhook-secret" --provider age
```

#### 5. Distribuisci Nuova Chiave

```bash
# Sviluppo locale
mv ~/.config/fnox/age-new.txt ~/.config/fnox/age.txt

# Server di test
scp ~/.config/fnox/age.txt user@test-server:~/.config/fnox/age.txt

# Server di produzione
scp ~/.config/fnox/age.txt user@prod-server:~/.config/fnox/age.txt
```

#### 6. Verifica

```bash
# Locale
fnox list --values

# Test
ssh user@test-server "cd /path/to/project && fnox list --values"

# Produzione
ssh user@prod-server "cd /path/to/project && fnox list --values"
```

#### 7. Rimuovi Vecchia Chiave

```toml
[providers.age]
type = "age"
recipients = [
  "age1yq4n7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p"   # Solo nuova
]
```

#### 8. Re-encrypt Finale

```bash
fnox set DATABASE_URL "postgresql://localhost:5432/mydb" --provider age
fnox set API_KEY "sk-1234567890" --provider age
fnox set WEBHOOK_CONTACT_FORM "my-webhook-secret" --provider age
```

#### 9. Pulisci Log

```bash
# Rimuovi chiave dai log (se possibile)
# Nota: Questo dipende dal sistema di logging
sudo truncate -s 0 /var/log/app.log
```

---

## Best Practices

### 1. Rotazione Periodica

```bash
# Crea un reminder per rotazione periodica
# Esempio: ogni 6 mesi
echo "Rotazione chiave age: $(date +%Y-%m-%d)" >> ~/.config/fnox/rotation-log.txt
```

### 2. Backup delle Chiavi

```bash
# Fai backup delle chiavi in un luogo sicuro
cp ~/.config/fnox/age.txt ~/backups/fnox-age-$(date +%Y%m%d).txt
chmod 600 ~/backups/fnox-age-*.txt
```

### 3. Documentazione

Mantieni un registro delle rotazioni:

```bash
# ~/.config/fnox/rotation-history.txt
2024-01-20: Rotazione chiave - Motivo: chiave compromessa in log
2024-07-20: Rotazione chiave - Rotazione periodica
```

### 4. Permessi Corretti

```bash
# Assicurati che le chiavi abbiano permessi corretti
chmod 600 ~/.config/fnox/age.txt
chown $USER:$USER ~/.config/fnox/age.txt
```

### 5. Non Committare Chiavi

```bash
# .gitignore
~/.config/fnox/
*.txt
age-*.txt
```

### 6. Usa Script Interattivo per Aggiornamento

```bash
# Usa lo script interattivo per aggiornare segreti dopo la rotazione
make fnox-update-secret
```

### 7. Testa Prima di Distribuire

```bash
# Verifica sempre che la nuova chiave funzioni localmente
fnox list --values

# Prima di distribuire ai server
```

### 8. Automazione con CI/CD

```bash
# Configura rotazione automatica in CI/CD
# Esempio: ogni 6 mesi
```

---

## Troubleshooting

### Problema: "Secret not found" dopo rotazione

**Sintomo**: fnox non trova i segreti dopo la rotazione

**Soluzione**:
```bash
# Verifica che la chiave sia corretta
cat ~/.config/fnox/age.txt

# Verifica che la chiave pubblica sia nei recipients
grep "age1..." fnox.toml

# Re-encrypt i segreti
fnox set DATABASE_URL "postgresql://..." --provider age
```

### Problema: "Permission denied" su chiave

**Sintomo**: Impossibile leggere la chiave

**Soluzione**:
```bash
# Correggi permessi
chmod 600 ~/.config/fnox/age.txt

# Verifica proprietario
ls -la ~/.config/fnox/age.txt
```

### Problema: Container non parte dopo rotazione

**Sintomo**: Docker container crasha dopo aver aggiornato la chiave

**Soluzione**:
```bash
# Verifica che la chiave sia passata correttamente
docker compose exec app sh -c 'echo $FNOX_AGE_KEY'

# Verifica che fnox funzioni nel container
docker compose exec app fnox list

# Riavvia container
make down && make up
```

### Problema: Vecchia chiave ancora funziona

**Sintomo**: Dopo aver rimosso la vecchia chiave, questa funziona ancora

**Soluzione**:
```bash
# Verifica che la vecchia chiave sia stata rimossa dai recipients
grep "age1...vecchia-chiave" fnox.toml

# Se presente, rimuovila e re-encrypt
fnox set DATABASE_URL "postgresql://..." --provider age
```

### Problema: Rotazione fallisce con profili

**Sintomo**: La rotazione funziona per un profilo ma non per l'altro

**Soluzione**:
```bash
# Verifica che entrambi i file siano stati aggiornati
cat fnox.toml
cat fnox.production.toml

# Re-encrypt per entrambi i profili
fnox set DATABASE_URL "postgresql://..." --provider age
fnox set -c fnox.production.toml DATABASE_URL "postgresql://..." --provider age
```

---

## Conclusione

La rotazione delle chiave age con multiple recipients è un processo semplice e sicuro che permette di:

✅ **Mantenere la sicurezza** senza downtime
✅ **Gestire team** con chiavi separate
✅ **Rispondere rapidamente** a compromissioni
✅ **Seguire best practices** di sicurezza
✅ **Automatizzare** il processo con script e CI/CD
✅ **Gestire profili** diversi per sviluppo e produzione

Per domande o problemi, consulta la documentazione ufficiale di [age](https://github.com/FiloSottile/age) e [fnox](https://github.com/jdx/fnox).
