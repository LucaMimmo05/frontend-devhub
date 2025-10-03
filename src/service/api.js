/**
 * @deprecated Questo file è deprecato. Usa invece:
 * - import { ... } from '../service/taskApi'
 * - import { ... } from '../service/projectApi'
 * - import { ... } from '../service/githubApi'
 * - import { ... } from '../service/commandApi'
 * - oppure import { ... } from '../service' per importare tutto
 *
 * Questo file rimane per retrocompatibilità e re-esporta tutte le funzioni dai nuovi file.
 */

// Re-esporta tutto dai nuovi file organizzati
export * from "./taskApi";
export * from "./projectApi";
export * from "./githubApi";
export * from "./commandApi";
export * from "./config";
