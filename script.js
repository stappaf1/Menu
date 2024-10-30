document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.getElementById('loadBtn');
  const saveBtn = document.getElementById('saveBtn');
  const contentDiv = document.getElementById('content');
  
  // Prüfe, ob die Daten bereits geladen wurden und setze den Lade-Button inaktiv
  if (localStorage.getItem('dataLoaded') === 'true') {
    loadBtn.disabled = true;
  }

  // Laden-Funktion
  loadBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('getraenke.json');
      const getraenke = await response.json();

      const data = getraenke.getraenke.map(item => ({
        name: item.Name,
        preis: item.Preis,
        zaehler: 0
      }));
      
      // Speichern in data.json (lokal simuliert durch localStorage)
      localStorage.setItem('data.json', JSON.stringify(data));
      loadBtn.disabled = true;
      localStorage.setItem('dataLoaded', 'true');
      
      renderData(data);
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error);
    }
  });

  // Render-Funktion zur Anzeige der Getränkeliste
  function renderData(data) {
    contentDiv.innerHTML = '';  // Inhalt löschen
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.style.display = 'flex';
      itemDiv.style.justifyContent = 'space-between';
      itemDiv.style.alignItems = 'center';
      itemDiv.style.padding = '10px 0';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = item.name + " - " + item.preis + "€";
      itemDiv.appendChild(nameSpan);

      const counterSpan = document.createElement('span');
      counterSpan.textContent = item.zaehler;
      counterSpan.style.margin = '0 10px';

      const incrementBtn = document.createElement('button');
      incrementBtn.textContent = '+1';
      incrementBtn.style.flex = '0 0 60px';
      incrementBtn.addEventListener('click', () => {
        item.zaehler++;
        counterSpan.textContent = item.zaehler;
        saveData(data);
      });

      const decrementBtn = document.createElement('button');
      decrementBtn.textContent = '-1';
      decrementBtn.style.flex = '0 0 60px';
      decrementBtn.addEventListener('click', () => {
        if (item.zaehler > 0) item.zaehler--;
        counterSpan.textContent = item.zaehler;
        saveData(data);
      });

      itemDiv.appendChild(decrementBtn);
      itemDiv.appendChild(counterSpan);
      itemDiv.appendChild(incrementBtn);

      contentDiv.appendChild(itemDiv);
    });
  }

  // Speichern der aktuellen Daten in localStorage
  function saveData(data) {
    localStorage.setItem('data.json', JSON.stringify(data));
  }

  // Speichern-Funktion
  saveBtn.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('data.json'));
    const emailContent = data.map(item => `${item.name}; ${item.preis}; ${item.zaehler}`).join('\n');
    
    // Betreff abfragen
    const subject = prompt("Betreff der E-Mail eingeben (Projektname):");
    if (subject) {
      sendEmail(subject, emailContent);
    }
  });

  // Funktion zum Senden einer E-Mail
  function sendEmail(subject, content) {
    const mailtoLink = `mailto:stefan@apfl.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
    window.location.href = mailtoLink;
  }

  // Daten anzeigen, falls bereits geladen
  const savedData = localStorage.getItem('data.json');
  if (savedData) {
    renderData(JSON.parse(savedData));
  }
});
