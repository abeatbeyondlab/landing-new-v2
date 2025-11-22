import { ShieldCheck, BarChart3, Cog, Layers, Code2, BookOpen, Users, Layout } from 'lucide-react';
import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    title: "Advisor e Strategia sulla Trasformazione Digitale",
    slug: "software-strategy-consulting-and-advisory",
    description: "Il tuo Ufficiale di Rotta. Definiamo la direzione tecnologica per raggiungere i tuoi obiettivi di business.",
    icon: Users,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Consulenza Strategica Software</h3>
          <p className="leading-relaxed text-slate-400">
            In A Beat Beyond, la consulenza strategica software è il primo passo per trasformare la tecnologia in un vero motore di crescita per la tua PMI. Non ci limitiamo a suggerire software: analizziamo a fondo il tuo business, i tuoi processi e i tuoi obiettivi per definire una strategia IT che sia realmente efficace e sostenibile nel tempo.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Il nostro approccio ingegnerizzato assicura di andare oltre le soluzioni standard, identificando le tecnologie e le architetture più adatte a risolvere le tue sfide specifiche e a cogliere nuove opportunità.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">I nostri servizi includono:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Analisi approfondita dei processi aziendali e degli obiettivi di business.",
              "Valutazione dell'infrastruttura IT esistente e identificazione delle aree di miglioramento.",
              "Definizione di una roadmap tecnologica allineata con la strategia aziendale.",
              "Selezione neutrale delle tecnologie e dei software più adatti (commerciali o open source).",
              "Progettazione di architetture software scalabili, sicure e performanti.",
              "Consulenza sulla digital transformation e sull'adozione di nuove tecnologie (Cloud, AI, IoT).",
              "Supporto nella definizione dei budget IT e nella valutazione del ROI degli investimenti tecnologici."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Affidandoti alla nostra consulenza strategica, otterrai una visione chiara di come la tecnologia può supportare la tua crescita, ottimizzare i costi e migliorare la tua competitività sul mercato.
        </p>
      </div>
    )
  },
  {
    title: "Progettazione Architetture Informatiche",
    slug: "it-architecture-design",
    description: "Lo Scafo della nave. Progettiamo infrastrutture robuste e scalabili per affrontare ogni mare.",
    icon: Layout,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Progettazione Architetture IT</h3>
          <p className="leading-relaxed text-slate-400">
            Un'architettura IT ben progettata è la spina dorsale di un'azienda efficiente e resiliente. A Beat Beyond progetta soluzioni infrastrutturali e software che non solo soddisfano le esigenze attuali della tua PMI, ma sono anche scalabili e pronte ad affrontare le sfide future.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Il nostro approccio ingegnerizzato si concentra su:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Analisi approfondita dei requisiti di business, performance e sicurezza.",
              "Selezione delle tecnologie più adatte (on-premise, cloud, ibride) in linea con il budget e gli obiettivi strategici.",
              "Progettazione di sistemi resilienti, con piani di disaster recovery e business continuity.",
              "Ottimizzazione dei costi (TCO - Total Cost of Ownership) senza compromettere qualità e sicurezza.",
              "Garanzia di scalabilità per supportare la crescita futura del business.",
              "Integrazione fluida con sistemi esistenti e futuri."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Lavoriamo per creare architetture IT che siano non solo tecnologicamente avanzate, ma anche perfettamente allineate con la tua visione aziendale, fornendo una base solida per l'innovazione e la crescita.
        </p>
      </div>
    )
  },
  {
    title: "Integrazione dei Sistemi Gestionali",
    slug: "systems-integration",
    description: "Sincronia dell'equipaggio. ERP, CRM e MES dialogano perfettamente per eliminare errori e ritardi.",
    icon: Layers,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Integrazione Sistemi ERP, WMS, MES</h3>
          <p className="leading-relaxed text-slate-400">
            Nell'odierno panorama aziendale, l'efficienza operativa dipende crucialmente dalla capacità dei diversi sistemi software di comunicare tra loro in modo fluido e automatizzato. A Beat Beyond è specializzata nell'integrazione di sistemi, con un focus particolare sull'armonizzazione del tuo sistema ERP con software gestionali specifici per la logistica (WMS - Warehouse Management System) e la produzione (MES - Manufacturing Execution System).
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Eliminiamo i silos informativi e le inefficienze derivanti da processi manuali di data entry o da sistemi disconnessi. Il nostro obiettivo è creare un ecosistema tecnologico coeso dove i dati fluiscono senza interruzioni, fornendo una visione unica e accurata delle tue operazioni.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">I nostri servizi di integrazione includono:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Analisi dei flussi di dati esistenti e identificazione dei punti critici di integrazione.",
              "Progettazione di architetture di integrazione robuste e scalabili (API, middleware, ETL).",
              "Sviluppo di connettori customizzati per garantire la comunicazione tra ERP e WMS/MES.",
              "Integrazione di dati anagrafici, ordini di produzione, avanzamento lavori, gestione magazzino, tracciabilità e qualità.",
              "Automatizzazione dei processi di business attraverso l'integrazione dei sistemi.",
              "Test e validazione delle soluzioni di integrazione per garantirne l'affidabilità.",
              "Supporto e manutenzione post-implementazione."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Con una corretta integrazione dei sistemi, la tua PMI può beneficiare di una maggiore efficienza, riduzione degli errori, migliore visibilità sui processi, decisioni più rapide basate su dati accurati e una maggiore agilità nel rispondere alle esigenze del mercato.
        </p>
      </div>
    )
  },
  {
    title: "Cybersecurity",
    slug: "cybersecurity",
    description: "Scudo contro le tempeste. Protezione dati e conformità ISO 27001 per navigare sicuri.",
    icon: ShieldCheck,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Cybersecurity e Conformità Normativa</h3>
          <p className="leading-relaxed text-slate-400">
            Nell'era digitale, la sicurezza informatica è una priorità assoluta. A Beat Beyond ti aiuta a proteggere i tuoi asset aziendali, i dati sensibili e la reputazione del tuo brand, garantendo al contempo la conformità alle normative vigenti come GDPR e NIS2.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Offriamo un approccio olistico che include:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Analisi dei rischi (Risk Assessment) e Vulnerability Assessment.",
              "Definizione e implementazione di policy di sicurezza e piani di continuità operativa (Business Continuity Plan).",
              "Progettazione di architetture di sicurezza robuste (firewall, IDS/IPS, endpoint protection).",
              "Consulenza per l'adeguamento al GDPR e alla direttiva NIS2.",
              "Supporto nell'implementazione di Sistemi di Gestione della Sicurezza delle Informazioni (SGSI) conformi allo standard ISO 27001.",
              "Formazione del personale sulla consapevolezza della sicurezza (Security Awareness).",
              "Incident Response e gestione delle crisi."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Con A Beat Beyond, la cybersecurity diventa un fattore abilitante per il tuo business, permettendoti di operare con serenità e fiducia nel panorama digitale.
        </p>
      </div>
    )
  },
  {
    title: "Business Intelligence",
    slug: "business-intelligence",
    description: "Il Radar di bordo. Trasformiamo i dati in una visione chiara per evitare scogli e cogliere opportunità.",
    icon: BarChart3,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Business Intelligence e Analisi Dati</h3>
          <p className="leading-relaxed text-slate-400">
            Trasformiamo i tuoi dati grezzi in informazioni strategiche. Le nostre soluzioni di Business Intelligence (BI) e analisi dati ti permettono di prendere decisioni più rapide, informate e basate su evidenze concrete, migliorando la competitività e l'efficienza della tua PMI.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Il nostro servizio completo include:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Valutazione delle opportunità di BI e definizione degli indicatori chiave di performance (KPI).",
              "Progettazione e implementazione di data warehouse e data lake.",
              "Sviluppo di dashboard interattive e report personalizzati.",
              "Integrazione di dati da diverse fonti (ERP, CRM, fogli di calcolo, etc.).",
              "Analisi predittiva e machine learning per anticipare trend e ottimizzare processi.",
              "Formazione del tuo team per utilizzare al meglio gli strumenti di BI."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Con il nostro supporto, potrai sbloccare il potenziale nascosto nei tuoi dati, identificare nuove opportunità di business, ottimizzare le operazioni e monitorare le performance in tempo reale.
        </p>
      </div>
    )
  },
  {
    title: "Open Source",
    slug: "open-source-software",
    description: "Libertà di manovra. Riduciamo la dipendenza da fornitori esterni (Vendor Lock-in) e tagliamo i costi.",
    icon: Code2,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Valutazione Opportunità Software Open Source</h3>
          <p className="leading-relaxed text-slate-400">
            L'adozione di software open source può rappresentare una significativa opportunità per le PMI di ridurre i costi di licenza, evitare il vendor lock-in e accedere a soluzioni flessibili e personalizzabili. A Beat Beyond ti aiuta a navigare il mondo dell'open source, valutando con un approccio ingegnerizzato dove e come queste soluzioni possono portare valore al tuo business.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Non tutte le soluzioni open source sono uguali, e una transizione richiede un'attenta pianificazione.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Il nostro servizio di valutazione include:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Analisi dell'attuale stack tecnologico e dei costi associati (licenze, manutenzione).",
              "Identificazione delle aree dove soluzioni open source potrebbero sostituire o integrare software proprietari.",
              "Ricerca e valutazione di alternative open source mature, affidabili e supportate dalla community.",
              "Analisi comparativa delle funzionalità, dei rischi e dei benefici (TCO).",
              "Valutazione delle competenze interne necessarie e pianificazione della formazione.",
              "Sviluppo di una strategia di migrazione graduale e a basso rischio.",
              "Consulenza sulla gestione delle licenze open source e sulla compliance."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Il nostro obiettivo è fornirti tutte le informazioni necessarie per prendere una decisione informata, assicurando che qualsiasi transizione sia strategicamente vantaggiosa, sostenibile e sicura.
        </p>
      </div>
    )
  },
  {
    title: "Temporary Project Management",
    slug: "project-management",
    description: "Il Capitano in seconda. Gestiamo i progetti complessi garantendo tempi, costi e risultati.",
    icon: Cog,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Gestione Progetti e Documentazione Tecnica</h3>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-cyan-300 mb-2">Project Management</h4>
            <p className="leading-relaxed text-slate-400 mb-4">
              Una gestione efficace dei progetti è fondamentale per tradurre le strategie IT in risultati concreti. In A Beat Beyond, applichiamo metodologie di project management consolidate (come PMP®) per assicurare che i tuoi progetti tecnologici siano completati nei tempi, nei budget e secondo gli standard qualitativi attesi.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-300 mb-2">Documentazione Tecnica</h4>
            <p className="leading-relaxed text-slate-400">
              Una documentazione tecnica chiara e precisa è fondamentale per il successo di qualsiasi progetto IT. Agiamo come ponte tra le aspettative aziendali e il team di sviluppo, minimizzando incomprensioni e riducendo ritardi.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">I nostri servizi coprono:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Pianificazione dettagliata del progetto e WBS.",
              "Gestione risorse, tempi, costi e rischi.",
              "Monitoraggio continuo e reporting.",
              "Gestione della qualità e del cambiamento.",
              "Analisi dei processi di business e requisiti.",
              "Redazione di capitolati tecnici e documentazione per gare d'appalto.",
              "Creazione di use case, user stories e diagrammi."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Con A Beat Beyond come partner, puoi contare su un team esperto che lavora per trasformare le tue visioni tecnologiche in successi misurabili, permettendoti di concentrarti sul tuo core business.
        </p>
      </div>
    )
  },
  {
    title: "Formazione",
    slug: "training",
    description: "Addestramento equipaggio. Trasferiamo competenze al tuo team per rendervi autonomi.",
    icon: BookOpen,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Formazione in Business Intelligence e Cybersecurity</h3>
          <p className="leading-relaxed text-slate-400">
            In un mondo in rapida evoluzione tecnologica, la formazione continua del personale è un investimento strategico. A Beat Beyond offre programmi di formazione personalizzati, progettati per trasferire competenze pratiche e immediatamente applicabili. Crediamo che la vera autonomia tecnologica si raggiunga quando le competenze risiedono all'interno dell'azienda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-cyan-400 mb-4">Formazione Business Intelligence:</h4>
            <ul className="space-y-3">
              {[
                "Introduzione ai concetti di BI e data-driven decision making.",
                "Utilizzo di strumenti di BI per l'analisi dei dati.",
                "Sviluppo di dashboard interattive e monitoraggio KPI.",
                "Interpretazione dei dati per identificare trend."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-cyan-400 mb-4">Formazione Cybersecurity:</h4>
            <ul className="space-y-3">
              {[
                "Consapevolezza su phishing, malware, ransomware.",
                "Best practice per la sicurezza dei dati.",
                "Principi di conformità normativa (GDPR, NIS2).",
                "Gestione sicura delle password e degli accessi.",
                "Procedure di risposta agli incidenti."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          L'obiettivo è rendere il tuo team più autonomo, consapevole e capace di sfruttare al meglio le tecnologie per il successo della tua PMI.
        </p>
      </div>
    )
  }
];
