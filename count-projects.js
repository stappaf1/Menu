// count-projects.js
import { database } from './count-firebaseConfig.js';
import { ref, set, get, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { loadGetraenke } from './count-getraenke.js';

let currentProject = { projektname: '', projektdatum: '', zaehler: {} };

export function createNewProject() {
    const projektname = prompt("Bitte Projektname eingeben:");
    const projektdatum = prompt("Bitte Projektdatum eingeben (z.B. 01.01.2024):");
    if (projektname && projektdatum) {
        currentProject.projektname = projektname;
        currentProject.projektdatum = projektdatum;
        loadGetraenke();
        updateProjectInfo();
    }
}

export async function openProject() {
    const projektname = prompt("Bitte den Namen des Projekts eingeben, das Sie öffnen möchten:");
    if (projektname) {
        try {
            const snapshot = await get(ref(database, `projekte/${projektname}`));
            if (snapshot.exists()) {
                currentProject = { projektname, projektdatum: snapshot.val().datum, zaehler: snapshot.val().zaehler || {} };
                loadGetraenke();
                updateProjectInfo();
            }
        } catch (error) {
            console.error("Fehler beim Öffnen des Projekts:", error);
        }
    }
}

export function closeProject() {
    currentProject = { projektname: '', projektdatum: '', zaehler: {} };
    document.getElementById('getraenke-container').innerHTML = '';
    document.getElementById('project-info').textContent = '';
    document.getElementById('total-price').textContent = 'Gesamtpreis: €0.00';
}

function updateProjectInfo() {
    const projectInfo = document.getElementById('project-info');
    projectInfo.textContent = `${currentProject.projektname} / ${currentProject.projektdatum}`;
}

export function initializeProject() {
    // Hier wird die Funktion zum Speichern des Projekts initialisiert
    // Verwendet die Firebase-Funktion zum Speichern von Daten
}
