// count-getraenke.js
export async function loadGetraenke() {
    try {
        const response = await fetch('getraenke.json');
        const data = await response.json();
        const container = document.getElementById('getraenke-container');
        container.innerHTML = '';

        data.getraenke.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `<div class="info"><div class="name">${item.Name}</div><div class="beschreibung">${item.Beschreibung}</div><div class="menge">${item.Menge}</div><div class="preis">€${item.Preis}</div></div>`;
            container.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Fehler beim Laden der Getränkedaten:", error);
    }
}
