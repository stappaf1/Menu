// count-pricing.js
export function updateTotalPrice(currentProject) {
    const total = Object.keys(currentProject.zaehler).reduce((sum, itemName) => {
        const itemCount = currentProject.zaehler[itemName] || 0;
        const itemPrice = document.querySelector(`.item[data-name="${itemName}"] .preis`).textContent.replace('€', '');
        return sum + (itemCount * parseFloat(itemPrice || 0));
    }, 0);
    document.getElementById('total-price').textContent = `Gesamtpreis: €${total.toFixed(2)}`;
}
