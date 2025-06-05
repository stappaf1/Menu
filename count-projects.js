// count-projects.js
import { database } from './count-firebaseConfig.js';
import { ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
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

// 🆕 Projekt umbenennen
export async function renameProject() {
    if (!currentProject.projektname) {
        alert("Kein Projekt geöffnet.");
        return;
    }

    // Dialog-Fenster dynamisch erstellen
    const dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = '#fff';
    dialog.style.padding = '20px';
    dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    dialog.style.zIndex = 1000;

    dialog.innerHTML = `
        <label for="rename-input">Neuer Projektname:</label><br>
        <input id="rename-input" type="text" value="${currentProject.projektname}" style="width: 100%; margin-top: 5px;"><br><br>
        <button id="rename-save">Speichern</button>
        <button id="rename-cancel">Abbrechen</button>
    `;

    document.body.appendChild(dialog);

    document.getElementById('rename-save').onclick = async () => {
        const newName = document.getElementById('rename-input').value.trim();
        if (!newName || newName === currentProject.projektname) {
            document.body.removeChild(dialog);
            return;
        }

        try {
            const oldRef = ref(database, `projekte/${currentProject.projektname}`);
            const newRef = ref(database, `projekte/${newName}`);

            // Prüfen, ob neues Projekt schon existiert
            const exists = await get(newRef);
            if (exists.exists()) {
                alert("Ein Projekt mit diesem Namen existiert bereits.");
                return;
            }

            const snapshot = await get(oldRef);
            if (!snapshot.exists()) {
                alert("Altes Projekt nicht gefunden.");
                return;
            }

            await set(newRef, snapshot.val());
            await remove(oldRef);

            currentProject.projektname = newName;
            updateProjectInfo();
            alert("Projektname erfolgreich geändert.");
        } catch (error) {
            console.error("Fehler beim Umbenennen:", error);
            alert("Fehler beim Umbenennen.");
        }

        document.body.removeChild(dialog);
    };

    document.getElementById('rename-cancel').onclick = () => {
        document.body.removeChild(dialog);
    };
}