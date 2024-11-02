// count-firebase.js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase initialisieren
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Funktion zum Speichern der Zählerdaten
function saveData() {
    db.collection("counterData").doc("currentCounter").set({
        count: counterValue,
        totalPrice: counterValue * pricePerUnit
    })
    .then(() => console.log("Daten gespeichert!"))
    .catch((error) => console.error("Fehler beim Speichern: ", error));
}
