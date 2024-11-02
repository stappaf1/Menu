// count-app.js
import { initializeProject, createNewProject, openProject, closeProject } from './count-projects.js';
import { loadGetraenke } from './count-getraenke.js';
import { updateTotalPrice } from './count-pricing.js';

// Initialisierung
window.createNewProject = createNewProject;
window.openProject = openProject;
window.closeProject = closeProject;
window.saveData = initializeProject;
