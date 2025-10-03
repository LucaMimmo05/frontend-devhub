# Guida alla Migrazione delle API

## Panoramica

Le API sono state riorganizzate in file separati per categoria per migliorare la manutenibilità e l'organizzazione del codice.

## Nuova Struttura

```
src/service/
├── config.js          # Configurazione e client axios
├── taskApi.js         # API per le task
├── projectApi.js      # API per i progetti
├── githubApi.js       # API per GitHub
├── commandApi.js      # API per i comandi
├── index.js           # Esportazioni centralizzate
├── api.js             # File legacy (re-export per retrocompatibilità)
└── README.md          # Documentazione completa
```

## Come Migrare (Opzionale)

### Opzione 1: Non fare nulla

Il vecchio file `api.js` continua a funzionare! Tutte le funzioni sono re-esportate automaticamente.

```javascript
// Questo continua a funzionare
import { getAllTasks, createProject } from "../service/api";
```

### Opzione 2: Migrazione graduale (Raccomandato)

Puoi migrare gradualmente i tuoi import per una migliore organizzazione:

#### Prima:

```javascript
import { getAllTasks, createTask } from "../service/api";
import { getAllProjects, createProject } from "../service/api";
import { getRepos } from "../service/api";
```

#### Dopo (Metodo 1 - Import specifici):

```javascript
import { getAllTasks, createTask } from "../service/taskApi";
import { getAllProjects, createProject } from "../service/projectApi";
import { getRepos } from "../service/githubApi";
```

#### Dopo (Metodo 2 - Import centralizzato):

```javascript
import { getAllTasks, createTask, getAllProjects, createProject, getRepos } from "../service";
```

#### Dopo (Metodo 3 - Import per categoria):

```javascript
import { TaskAPI, ProjectAPI, GithubAPI } from "../service";

const tasks = await TaskAPI.getAllTasks(token);
const projects = await ProjectAPI.getAllProjects(token);
const repos = await GithubAPI.getRepos(userId);
```

## Vantaggi della Migrazione

1. **Organizzazione**: Codice più pulito e organizzato per categoria
2. **Manutenibilità**: Più facile trovare e modificare API specifiche
3. **Documentazione**: Ogni file ha JSDoc completo
4. **Tree-shaking**: Bundle più piccolo se usi solo alcune API
5. **Scalabilità**: Facile aggiungere nuove API senza file giganti

## Mapping delle Funzioni

### Task API

- `getTasks()` → `taskApi.js`
- `getAllTasks()` → `taskApi.js`
- `getTasksNotCompleted()` → `taskApi.js`
- `getAllCompletedTasks()` → `taskApi.js`
- `createTask()` → `taskApi.js`
- `completeTask()` → `taskApi.js`
- `deleteTask()` → `taskApi.js`

### Project API

- `getAllProjects()` → `projectApi.js`
- `getProjectById()` → `projectApi.js`
- `createProject()` → `projectApi.js`
- `updateProject()` → `projectApi.js`
- `deleteProject()` → `projectApi.js` (nuova!)

### GitHub API

- `getRepos()` → `githubApi.js`
- `getGithubUsrInfo()` → `githubApi.js`
- `getGithubUserInfo()` → `githubApi.js` (nuovo nome!)
- `getRepoByName()` → `githubApi.js` (nuova!)
- `getRepoCommits()` → `githubApi.js` (nuova!)

### Command API

- `getCommand()` → `commandApi.js`
- `getAllCommands()` → `commandApi.js` (nuova!)
- `getCommandById()` → `commandApi.js` (nuova!)
- `createCommand()` → `commandApi.js` (nuova!)
- `updateCommand()` → `commandApi.js` (nuova!)
- `deleteCommand()` → `commandApi.js` (nuova!)

## Script di Ricerca e Sostituzione (Opzionale)

Se vuoi migrare tutti i file automaticamente, puoi usare questi pattern:

### Per VSCode Find & Replace:

**Trova:**

```
from ['"]../service/api['"]
```

**Sostituisci con:**

```
from '../service'
```

Oppure, se vuoi import specifici:

**Trova:**

```
from ['"]../service/api['"]
```

**Sostituisci manualmente** con l'import appropriato basandosi sulle funzioni usate.

## Compatibilità

✅ **Tutti i componenti esistenti continueranno a funzionare senza modifiche**
✅ **Nessuna breaking change**
✅ **Tutte le funzioni hanno alias per retrocompatibilità**

## Nuove Funzionalità

### Interceptor Axios Automatici

Il file `config.js` include interceptor che:

- Aggiungono automaticamente il token dall'localStorage
- Gestiscono errori comuni
- Loggano errori nella console

### Nuove Funzioni API

Sono state aggiunte funzioni mancanti come:

- `deleteProject()`
- `getAllCommands()`
- `createCommand()`
- `updateCommand()`
- `deleteCommand()`
- `getRepoByName()`
- `getRepoCommits()`

## Domande Frequenti

**Q: Devo aggiornare tutti i miei import ora?**
A: No! Il vecchio `api.js` continua a funzionare perfettamente.

**Q: Ci sono breaking changes?**
A: No, tutto è retrocompatibile.

**Q: Quando dovrei migrare?**
A: Quando aggiorni un componente o ne crei uno nuovo, usa i nuovi import.

**Q: Posso eliminare il vecchio api.js?**
A: Non ancora, ma in futuro quando tutti i componenti usano i nuovi import, sì.

**Q: Come faccio a sapere quale file usare?**
A: Guarda il nome della funzione - `createTask` → `taskApi.js`, `getRepos` → `githubApi.js`

## Prossimi Passi

1. ✅ Leggi il `README.md` nella cartella service
2. 📝 Quando crei nuovi componenti, usa i nuovi import
3. 🔄 Quando modifichi componenti esistenti, considera di aggiornare gli import
4. 🧪 Testa che tutto funzioni correttamente
5. 📚 Consulta la documentazione JSDoc nei file API

## Supporto

Per domande o problemi, consulta:

- `src/service/README.md` - Documentazione completa
- Ogni file API ha documentazione JSDoc integrata
- I commenti nei file spiegano il funzionamento
