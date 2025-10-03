# Service API Documentation

Questa cartella contiene tutti i servizi API organizzati per categoria.

## Struttura dei File

```
service/
├── config.js          # Configurazione base e interceptor axios
├── taskApi.js         # API per la gestione delle task
├── projectApi.js      # API per la gestione dei progetti
├── githubApi.js       # API per l'integrazione con GitHub
├── commandApi.js      # API per la gestione dei comandi
├── index.js           # Esportazioni centralizzate
└── api.js             # File legacy (da deprecare)
```

## Come Usare

### Metodo 1: Import diretto dal file specifico

```javascript
import { getAllTasks, createTask } from "../service/taskApi";
import { getAllProjects } from "../service/projectApi";
```

### Metodo 2: Import dal file index (raccomandato)

```javascript
import { getAllTasks, createTask, getAllProjects } from "../service";
```

### Metodo 3: Import per categoria

```javascript
import { TaskAPI, ProjectAPI } from "../service";

const tasks = await TaskAPI.getAllTasks(token);
const projects = await ProjectAPI.getAllProjects(token);
```

## API Disponibili

### Task API (`taskApi.js`)

- `getAllTasks(token)` - Ottiene tutte le task
- `getTasksNotCompleted(token)` - Ottiene le task non completate
- `getAllCompletedTasks(token)` - Ottiene tutte le task completate
- `createTask(taskData, token)` - Crea una nuova task
- `completeTask(id, token)` - Segna una task come completata
- `deleteTask(id, token)` - Elimina una task
- `getTasks(token)` - Alias di getAllTasks (per retrocompatibilità)

### Project API (`projectApi.js`)

- `getAllProjects(token)` - Ottiene tutti i progetti
- `getProjectById(id, token)` - Ottiene un progetto per ID
- `createProject(projectData, token)` - Crea un nuovo progetto
- `updateProject(id, projectData, token)` - Aggiorna un progetto
- `deleteProject(id, token)` - Elimina un progetto

### GitHub API (`githubApi.js`)

- `getRepos(id)` - Ottiene i repository GitHub dell'utente
- `getGithubUserInfo(id, token)` - Ottiene informazioni utente GitHub
- `getRepoByName(id, repoName)` - Ottiene un repository specifico
- `getRepoCommits(id, repoName, perPage)` - Ottiene i commit di un repository
- `getGithubUsrInfo(id, token)` - Alias di getGithubUserInfo (per retrocompatibilità)

### Command API (`commandApi.js`)

- `getCommand(id, token)` - Ottiene un comando casuale
- `getAllCommands(token)` - Ottiene tutti i comandi
- `getCommandById(id, token)` - Ottiene un comando per ID
- `createCommand(commandData, token)` - Crea un nuovo comando
- `updateCommand(id, commandData, token)` - Aggiorna un comando
- `deleteCommand(id, token)` - Elimina un comando

## Configurazione

Il file `config.js` contiene:

- **API_BASE_URL**: URL base per le API backend
- **GITHUB_BASE_URL**: URL base per le API GitHub
- **apiClient**: Istanza axios configurata con interceptor automatici

Gli interceptor gestiscono automaticamente:

- Aggiunta del token di autenticazione dall'localStorage
- Gestione degli errori comuni
- Logging degli errori

## Migrazione dal Vecchio api.js

Il vecchio file `api.js` è ancora presente per retrocompatibilità, ma è consigliato migrare gradualmente ai nuovi file.

### Prima (api.js)

```javascript
import { getAllTasks } from "../service/api";
```

### Dopo (index.js)

```javascript
import { getAllTasks } from "../service";
// oppure
import { getAllTasks } from "../service/taskApi";
```

Entrambi i metodi funzioneranno grazie al file `index.js` che esporta tutte le funzioni.

## Note

- Tutte le funzioni ritornano una Promise
- Gli errori vengono loggati automaticamente nella console
- Il token può essere passato come parametro o verrà recuperato automaticamente dall'localStorage se usi `apiClient`
