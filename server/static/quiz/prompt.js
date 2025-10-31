const prompt=`
[01-Pianificare lo sviluppo.pdf](attachment:23ff0a0a-86f4-4486-bd2a-df36fe2d3198:01-Pianificare_lo_sviluppo.pdf)
# **Pianificare lo sviluppo software**
## **1. Approcci di sviluppo**
### **Top-Down**
- Si parte da una **visione d’insieme** e la si specializza progressivamente.
- Principio: **divide et impera**
- Identificazione delle **macro-funzionalità**
- Suddivisione in **sotto-funzionalità**
- Implementazione
- Ricostruzione della “piramide”
👉 Questo approccio valorizza il **“perché”** (gli obiettivi), da cui il **come** emerge.
### **Bottom-Up**
- Si parte da un’idea e si procede iterativamente verso una visione completa tramite **composizione**.
- Passaggi tipici:
- Uso di **soluzioni già esistenti**
- Scelta di **soluzioni facili e rapide**
- Creazione di piccole **unità funzionali**
👉 Parte dal **“come”**, facendo emergere un **perché**.
👉 È ideale per **POC (Proof of Concept)** e per validare soluzioni tecniche **quick & dirty** (veloci ma non definitive).
### **Core Approach**
- Combina **design top-down** con sviluppo **bottom-up**.
- Ordine di sviluppo delle aree:
1. Aree con **alto valore** e **alta complessità**
2. Aree con **alto valore** e **bassa complessità**
3. Aree con **basso valore** e **bassa complessità**
4. **Esclusione** delle aree con **basso valore** e **alta complessità**
👉 In questo modo si ottimizza lo sforzo tecnico rispetto al valore prodotto.
### **Mock**
- Componenti software (oggetti, API, database) che **simulano** una funzionalità ritornando dati statici.
- Sono utili per:
- sviluppare componenti **in parallelo** senza dover attendere sviluppi di altri moduli;
- testare parti di sistema **in isolamento**.
---
## **2. Step di progetto (workflow tradizionale)**
1. **Raccolta requisiti**
- Fonti: requisiti aziendali, stakeholder, funzionali, surveys, indagini di mercato, analisi dei competitor, analisi del legacy, vincoli di qualità.
- **Output**: lista di requisiti.
2. **Analisi**
- Si trasformano i requisiti in una **visione funzionale** del software.
- Si assegnano **priorità** e si valutano i **rischi**.
- Definisce lo **scope** del progetto ed è solitamente ciò che viene approvato dal cliente.
- **Output**: analisi funzionale.
3. **Design (analisi tecnica)**
- Definizione di:
- architettura software
- data model e strutture dati
- diagrammi UML (classi, flussi, sequenze)
- interfacce/API
- integrazioni con sistemi esterni
- Documento fondamentale per guidare gli sviluppatori.
- **Output**: analisi tecnica.
4. **Sviluppo**
- Trasformazione dell’analisi funzionale in **codice**.
- Applicazione di metodologie di qualità:
- test unitari
- test end-to-end
- test di integrazione
- linting, code review, static code analysis
- **Output**: codice sorgente + ambienti di test/demo/collaudo.
5. **Test**
- Il team verifica che le funzionalità corrispondano all’analisi funzionale.
- Ogni anomalia genera un **bug**, che riattiva il ciclo di sviluppo.
- Si fanno anche test con utenti non esperti (*dummy testing*).
- **Output**: testbook + bugfix.
6. **Validazione / Collaudo**
- Stakeholder e utenti esterni eseguono i testbook.
- Si decide se andare in **produzione** o riavviare lo sviluppo.
- **Output**: via libera al deploy.
7. **Deploy (Go Live!)**
- Rilascio del software in produzione.
- Può richiedere blocchi temporanei o downtime.
- Alla fine si validano le funzionalità e si producono documenti come manuale utente e documentazione tecnica.
- **Output**: software live + documentazione.
8. **Mantenimento**
- Dura per tutta la vita del software.
- Attività: pulizia dati temporanei, aggiornamenti di sistema e librerie, bugfix, ottimizzazioni, gestione backup e storicizzazione dati.
9. **Evolutive (CR – Change Request)**
- Richieste aggiuntive su un progetto esistente.
- Segue lo stesso ciclo completo: requisiti → analisi → sviluppo → mantenimento.
![image.png](attachment:a68e5fcd-0544-48e3-9fbe-4170e027cffd:49b18f5d-d3ea-4c79-98fe-83cc62801fc3.png)
---
## **3. Ruoli nel team**
- **UX Designer** → definisce l’esperienza utente, produce wireframes, individua requisiti nascosti.
- **Developer (Dev)** → figura generica che scrive codice.
- **Frontend Developer** → interfacce utente e logica di presentazione. Lavora con mock backend.
- **Backend Developer** → logica applicativa, database, API, business logic.
- **Fullstack Developer** → si muove su FE e BE, visione completa.
- **Web Developer** → siti web di piccola-media entità (spesso freelance).
- **DB Developer** → sviluppo, tra DBA e sviluppatore, sviluppa software su database, sviluppa stored procedure, trigger, funzioni DB (ruolo in declino).
- **Tester** → scrive ed esegue test case, cerca bug e regressioni è molto importante nello sviluppo. E’ scarso e caga i coglioni.
- **Technical Leader** → guida tecnica, analisi tecnica, scelte architetturali, figura di riferimento degli stakeholder.
- **Project Manager (PM)** → responsabile tempi, costi e composizione team. Si fa aiutare dal technical leader per funzioni analista.
- **IT Operations (OPS)** → gestisce infrastruttura, server, reti, backup, configurazioni.
- **DevOps** → unisce sviluppo e ops, lavora con approccio **I**a**C (Infrastructure** as **Code)**.
- **DBA** → amministratore database, ottimizzazione e sicurezza.
- **Security Engineer** → controlla la sicurezza del progetto (spesso esterno).
- **Stakeholders** → portatori di interesse (clienti, utenti finali, finanziatori).
![image.png](attachment:3923bdc2-d5a5-4876-afef-c7c30b99f1c9:394993ab-b401-45eb-b72f-129fb1c23026.png)
---
## **4. Documentazione**
### **Documentazione ufficiale**
- Analisi Funzionale
- Analisi Tecnica
- Manuale Utente
- Mappe infrastrutturali
- Diagrammi delle classi
- Data Model
- Manuale di manutenzione
### **Documentazione “in project”**
- README
- CONTRIBUTING
- CHANGELOG cambiamenti, aggiornamenti
- Git log storico modifiche git
- Codice auto-documentante
- Commenti (solo se indispensabili)
- Configurazioni linter / IDE


`
export default prompt;