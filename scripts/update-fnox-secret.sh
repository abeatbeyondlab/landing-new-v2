#!/bin/bash

# Script interattivo per aggiornare i segreti fnox
# Questo script permette di modificare i segreti in fnox.toml o fnox.production.toml

set -e

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funzione per mostrare errore
error() {
    echo -e "${RED}✗ Errore: $1${NC}" >&2
    exit 1
}

# Funzione per mostrare successo
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Funzione per mostrare info
info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Funzione per mostrare warning
warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Funzione per mascherare la password (mostra primi 3 e ultimi 3 caratteri)
mask_password() {
    local password="$1"
    local len=${#password}
    
    if [ $len -le 6 ]; then
        # Se la password è troppo corta, mostra solo i primi 3
        echo "${password:0:3}..."
    else
        # Mostra primi 3, ultimi 3, con ... in mezzo
        local first="${password:0:3}"
        local last="${password: -3}"
        echo "${first}...${last}"
    fi
}

# Verifica che FNOX_AGE_KEY sia impostata
if [ -z "$FNOX_AGE_KEY" ]; then
    error "FNOX_AGE_KEY non è impostata. Esegui con: FNOX_AGE_KEY=\$(cat ~/.config/fnox/age.txt | grep \"AGE-SECRET-KEY\") $0"
fi

# Verifica che fnox sia installato
if ! command -v fnox &> /dev/null; then
    error "fnox non è installato. Installalo con: curl -L https://github.com/jdx/fnox/releases/download/v1.7.0/fnox-x86_64-unknown-linux-gnu.tar.gz | tar -xz && sudo mv fnox /usr/local/bin/"
fi

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Aggiornamento Segreti fnox${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# 1. Chiedi quale file modificare
echo "Seleziona il file di configurazione:"
echo "  1) fnox.toml (sviluppo locale)"
echo "  2) fnox.production.toml (produzione Docker)"
echo ""
read -p "Scelta [1-2]: " config_choice

case $config_choice in
    1)
        config_file="fnox.toml"
        config_name="sviluppo locale"
        ;;
    2)
        config_file="fnox.production.toml"
        config_name="produzione Docker"
        ;;
    *)
        error "Scelta non valida. Seleziona 1 o 2."
        ;;
esac

echo ""
info "File selezionato: $config_file ($config_name)"

# Verifica che il file esista
if [ ! -f "$config_file" ]; then
    error "Il file $config_file non esiste."
fi

# 2. Leggi i segreti dal file
echo ""
info "Lettura segreti da $config_file..."

# Estrai i nomi dei segreti dal file TOML
secrets=()
while IFS= read -r line; do
    if [[ $line =~ ^([A-Z_]+)[[:space:]]*= ]]; then
        secrets+=("${BASH_REMATCH[1]}")
    fi
done < "$config_file"

if [ ${#secrets[@]} -eq 0 ]; then
    error "Nessun segreto trovato in $config_file"
fi

# 3. Mostra i segreti con numeri
echo ""
echo "Segreti disponibili:"
for i in "${!secrets[@]}"; do
    secret_name="${secrets[$i]}"
    echo "  $((i+1))) $secret_name"
done
echo ""

# 4. Chiedi quale segreto modificare
read -p "Seleziona il segreto da modificare [1-${#secrets[@]}]: " secret_choice

# Valida la scelta
if ! [[ "$secret_choice" =~ ^[0-9]+$ ]] || [ "$secret_choice" -lt 1 ] || [ "$secret_choice" -gt ${#secrets[@]} ]; then
    error "Scelta non valida. Seleziona un numero tra 1 e ${#secrets[@]}."
fi

secret_name="${secrets[$((secret_choice-1))]}"
echo ""
info "Segreto selezionato: $secret_name"

# Mostra il valore attuale del segreto
echo ""
info "Valore attuale:"
if [ "$config_file" = "fnox.production.toml" ]; then
    current_value=$(fnox get "$secret_name" -c "$config_file" 2>/dev/null || echo "<non disponibile>")
else
    current_value=$(fnox get "$secret_name" 2>/dev/null || echo "<non disponibile>")
fi
if [ "$current_value" != "<non disponibile>" ]; then
    echo "  $(mask_password "$current_value")"
    echo ""
    read -p "Vuoi mostrare la password completa in chiaro? [s/N]: " show_full
    if [[ "$show_full" =~ ^[sS]$ ]]; then
        echo ""
        warning "Password completa: $current_value"
    fi
else
    echo "  $current_value"
fi
echo ""

# 5. Chiedi se generare password casuale o inserire manualmente
echo ""
read -p "Vuoi generare una password casuale? [s/N]: " generate_random

if [[ "$generate_random" =~ ^[sS]$ ]]; then
    # Genera password casuale
    echo ""
    read -p "Inserisci la lunghezza della password (minimo 8): " password_length
    
    # Valida lunghezza
    if ! [[ "$password_length" =~ ^[0-9]+$ ]] || [ "$password_length" -lt 8 ]; then
        error "Lunghezza non valida. Inserisci un numero maggiore o uguale a 8."
    fi
    
    # Genera password con caratteri alfanumerici e speciali
    # Caratteri: a-z, A-Z, 0-9, e caratteri speciali (!@#$%^&*()_+-=[]{}|;:,.<>?)
    chars='a-zA-Z0-9!@#$%^&*()_+-=[]{}|;:,.<>?'
    new_value=$(head /dev/urandom | tr -dc "$chars" | head -c "$password_length")
    
    echo ""
    success "Password generata: $(mask_password "$new_value")"
    echo ""
    read -p "Vuoi mostrare la password completa in chiaro? [s/N]: " show_full_generated
    if [[ "$show_full_generated" =~ ^[sS]$ ]]; then
        echo ""
        warning "Password completa: $new_value"
    fi
    echo ""
    read -p "Vuoi modificare questa password? [s/N]: " modify_password
    
    if [[ "$modify_password" =~ ^[sS]$ ]]; then
        echo ""
        read -e -p "Modifica la password generata: " new_value
        echo ""
        success "Password modificata: $(mask_password "$new_value")"
        echo ""
        read -p "Vuoi mostrare la password completa in chiaro? [s/N]: " show_full_modified
        if [[ "$show_full_modified" =~ ^[sS]$ ]]; then
            echo ""
            warning "Password completa: $new_value"
        fi
    fi
    
    echo ""
    read -p "Vuoi usare questa password? [s/N]: " use_generated
    
    if [[ ! "$use_generated" =~ ^[sS]$ ]]; then
        echo ""
        read -p "Inserisci il nuovo valore per $secret_name: " new_value
    fi
else
    # Inserisci valore manualmente
    echo ""
    read -p "Inserisci il nuovo valore per $secret_name: " new_value
fi

echo ""

# Verifica che il valore non sia vuoto
if [ -z "$new_value" ]; then
    error "Il valore non può essere vuoto."
fi

# 6. Conferma
echo ""
warning "Stai per modificare il segreto '$secret_name' in $config_file"
echo ""
read -p "Confermi? [s/N]: " confirm

if [[ ! "$confirm" =~ ^[sS]$ ]]; then
    info "Operazione annullata."
    exit 0
fi

# 7. Esegui fnox set
echo ""
info "Aggiornamento del segreto..."

# Se è fnox.production.toml, dobbiamo usare un file temporaneo
if [ "$config_file" = "fnox.production.toml" ]; then
    # Crea un backup
    cp "$config_file" "$config_file.backup"
    
    # Copia il file come fnox.toml temporaneo
    cp "$config_file" "fnox.toml.tmp"
    
    # Esegui fnox set sul file temporaneo
    if fnox set "$secret_name" "$new_value" --provider age -c fnox.toml.tmp; then
        # Sposta il file temporaneo al file originale
        mv fnox.toml.tmp "$config_file"
        rm "$config_file.backup"
        success "Segreto '$secret_name' aggiornato con successo in $config_file!"
    else
        # Ripristina il backup in caso di errore
        mv "$config_file.backup" "$config_file"
        rm -f fnox.toml.tmp
        error "Impossibile aggiornare il segreto. Backup ripristinato."
    fi
else
    # Per fnox.toml, usa direttamente
    if fnox set "$secret_name" "$new_value" --provider age; then
        success "Segreto '$secret_name' aggiornato con successo in $config_file!"
    else
        error "Impossibile aggiornare il segreto."
    fi
fi

# 8. Verifica il nuovo valore
echo ""
info "Verifica del nuovo valore..."
if [ "$config_file" = "fnox.production.toml" ]; then
    decrypted_value=$(fnox get "$secret_name" -c "$config_file" 2>/dev/null || echo "")
else
    decrypted_value=$(fnox get "$secret_name" 2>/dev/null || echo "")
fi

if [ "$decrypted_value" = "$new_value" ]; then
    success "Verifica completata: il valore è stato aggiornato correttamente!"
else
    warning "Verifica fallita: il valore decrittato non corrisponde."
    warning "Valore atteso: $(mask_password "$new_value")"
    warning "Valore decrittato: $(mask_password "$decrypted_value")"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Operazione completata!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
info "Ricorda di committare le modifiche a $config_file se necessario."
