// Esporta tutto da ogni file API per retrocompatibilità
export * from "./config";
export * from "./taskApi";
export * from "./projectApi";
export * from "./githubApi";
export * from "./commandApi";
export * from "./noteApi";

// Esportazioni per categorie (opzionale - per un uso più organizzato)
import * as TaskAPI from "./taskApi";
import * as ProjectAPI from "./projectApi";
import * as GithubAPI from "./githubApi";
import * as CommandAPI from "./commandApi";
import * as NoteAPI from "./noteApi";

export { TaskAPI, ProjectAPI, GithubAPI, CommandAPI, NoteAPI };
