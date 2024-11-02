// count-app.js
let counterValue = 0; // Zählerwert

document.getElementById('incrementBtn').addEventListener('click', incrementCounter);
document.getElementById('decrementBtn').addEventListener('click', decrementCounter);

function incrementCounter() {
    counterValue++;
    updateDisplay();
    saveData(); // Speichern nach Erhöhung
}

function decrementCounter() {
    if (counterValue > 0) {
        counterValue--;
        updateDisplay();
        saveData(); // Speichern nach Verringerung
    }
}

// Funktion zum Aktualisieren der Anzeige
function updateDisplay() {
    document.getElementById('counter').innerText = counterValue;
    document.getElementById('totalPrice').innerText = 'Gesamtpreis: ' + formatPrice(counterValue * pricePerUnit);
}

// Diese Funktion wird beim Laden der Seite aufgerufen, um die Daten aus Firebase zu laden
function loadCounterData() {
    db.collection("counterData").doc("currentCounter").get().then((doc) => {
        if (doc.exists) {
            counterValue = doc.data().count; // Zählerstand setzen
            updateDisplay(); // Anzeige aktualisieren
        }
    }).catch((error) => {
        console.log("Fehler beim Laden der Daten: ", error);
    });
}

// Initialisieren der Anwendung
window.onload = loadCounterData;
