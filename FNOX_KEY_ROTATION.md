# Guida: Rotazione delle Chiave age con fnox

Questa guida spiega come ruotare le chiave age in modo sicuro senza downtime, utilizzando la funzionalità **multiple recipients** di age.

## 📋 Indice

1. [Perché Ruotare le Chiavi](#perché-ruotare-le-chiavi)
2. [Concetto di Multiple Recipients](#concetto-di-multiple-recipients)
3. [Processo di Rotazione](#processo-di-rotazione)
4. [Esempio Pratico](#esempio-pratico)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

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

Solo dopo aver verificato che tutto funziona:

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

---

## Conclusione

La rotazione delle chiave age con multiple recipients è un processo semplice e sicuro che permette di:

✅ **Mantenere la sicurezza** senza downtime
✅ **Gestire team** con chiavi separate
✅ **Rispondere rapidamente** a compromissioni
✅ **Seguire best practices** di sicurezza

Per domande o problemi, consulta la documentazione ufficiale di [age](https://github.com/FiloSottile/age) e [fnox](https://github.com/jdx/fnox).
