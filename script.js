document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.getElementById('loadBtn');
  const saveBtn = document.getElementById('saveBtn');
  const contentDiv = document.getElementById('content');

  // Prüfe, ob die Daten bereits geladen wurden
  if (localStorage.getItem('dataLoaded') === 'true') {
    loadBtn.disabled = true;
    renderData(JSON.parse(localStorage.getItem('data.json')));
  }

  loadBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('getraenke.json');
      const getraenke = await response.json();

      const data = getraenke.getraenke.map(item => ({
        name: item.Name,
        preis: item.Preis,
        zaehler: 0
      }));
      
      localStorage.setItem('data.json', JSON.stringify(data));
      loadBtn.disabled = true;
      localStorage.setItem('dataLoaded', 'true');
      
      renderData(data);
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error);
    }
  });

  function renderData(data) {
    contentDiv.innerHTML = '';  // Inhalt löschen
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.style.display = 'flex';
      itemDiv.style.justifyContent = 'space-between';
      itemDiv.style.padding = '5px 0';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${item.name} - ${item.preis}€`;
      itemDiv.appendChild(nameSpan);

      const counterSpan = document.createElement('span');
      counterSpan.textContent = item.zaehler;

      const incrementBtn = document.createElement('button');
      incrementBtn.textContent = '+1';
      incrementBtn.addEventListener('click', () => {
        item.zaehler++;
        counterSpan.textContent = item.zaehler;
        saveData(data);
      });

      const decrementBtn = document.createElement('button');
      decrementBtn.textContent = '-1';
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

  function saveData(data) {
    localStorage.setItem('data.json', JSON.stringify(data));
  }

  saveBtn.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('data.json'));
    const emailContent = data.map(item => `${item.name}; ${item.preis}; ${item.zaehler}`).join('\n');
    const subject = prompt("Betreff der E-Mail eingeben (Projektname):");
    if (subject) {
      sendEmail(subject, emailContent);
    }
  });

  function sendEmail(subject, content) {
    const mailtoLink = `mailto:stefan@apfl.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
    window.location.href = mailtoLink;
  }
});
