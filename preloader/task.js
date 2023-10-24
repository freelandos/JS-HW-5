const loader = document.getElementById('loader');
const items = document.getElementById('items');
const request = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

function loadDataFromLocalStorage() {
  const cashedData = JSON.parse(localStorage.getItem('currencies'));

  if (cashedData) {
    for (const item in cashedData) {
      addItemToHTML(cashedData[item].CharCode, cashedData[item].Value);
    }
  }
}

function addItemToHTML(charcode, value) {
  const itemHTML = `
    <div class="item">
      <div class="item__code">${charcode}</div>
      <div class="item__value">${value}</div>
      <div class="item__currency">руб.</div>
    </div>
  `;
  items.insertAdjacentHTML('beforeend', itemHTML);
}

function removeAllItemsFromHTML() {
  const itemsList = document.querySelectorAll('.item');

  if (itemsList) {
    for (const item of itemsList) {
      item.remove();
    }
  }
}

request.addEventListener('readystatechange', () => {
  if (request.readyState === request.DONE) {
    loader.classList.remove('loader_active');
    removeAllItemsFromHTML();
        
    const data = JSON.parse(request.responseText).response.Valute;
    localStorage.setItem('currencies', JSON.stringify(data));

    for (const item in data) {
      addItemToHTML(data[item].CharCode, data[item].Value);
    }
  }
})

loadDataFromLocalStorage();
request.open('GET', url);
request.send();