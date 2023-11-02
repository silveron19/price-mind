addList()
// Fungsi untuk menambahkan item baru ke daftar
function addList() {
  let ul = document.getElementById('productList');
  let template = document.getElementById('productTemplate');
  let clone = template.content.cloneNode(true);

  clone.querySelectorAll('.deleteButton').onclick = function () {
    this.parentNode.remove();
  };

  let addItems = document.getElementById('addMoreList').parentNode;
  ul.insertBefore(clone, addItems);

  if (ul.getElementsByTagName('li').length > 2) {
    let deleteButtons = ul.getElementsByClassName('material-symbols-outlined');
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].style.display = 'inline';
    }
  }
}

// Fungsi untuk menambahkan kartu baru ke halaman dan localStorage
function addCard() {
  let title = document.getElementById('newTitle').value;

  let productNames = Array.from(document.querySelectorAll('.productName')).map(
    (input) => input.value
  );
  let productPrices = Array.from(
    document.querySelectorAll('.productPrice')
  ).map((input) => input.value);

  let products = productNames.map((name, index) => {
    return { name: name, price: productPrices[index] };
  });

  let card = { title: title, products: products };
  let cards = JSON.parse(localStorage.getItem('cards')) || [];
  cards.push(card);

  localStorage.setItem('cards', JSON.stringify(cards));

  createCard(card);

  closePopup();
}

// Fungsi untuk membuat kartu baru
function createCard(card) {
  let template = document.getElementById('productRow');
  let clone = template.content.cloneNode(true);

  clone.querySelector('.card-title').textContent = card.title;

  clone.querySelector('.card').onclick = function () {
    openCard(card);
  };

  document.querySelector('.hero-grid').appendChild(clone);

  clone.querySelectorAll('.deleteCardButton').onclick = function () {
    // Remove the card from the page
    this.parentNode.remove();

    // Remove the card from localStorage
    removeCardFromStorage(card);
  };
}

// Fungsi untuk menghapus kartu dari localStorage
function removeCardFromStorage(card) {
  let cards = JSON.parse(localStorage.getItem('cards'));

  let index = cards.findIndex(function (c) {
    return (
      c.title === card.title &&
      JSON.stringify(c.products) === JSON.stringify(card.products)
    );
  });

  if (index !== -1) {
    cards.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cards));
  }
}

// Fungsi untuk membuka kartu
function openCard(card) {
  document.getElementById('popup').style.display = 'flex';
  document.getElementById('newTitle').value = card.title;

  let ul = document.getElementById('productList');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  for (let i = 0; i < card.products.length; i++) {
    let liTemplate = document.getElementById('productTemplate');
    let liClone = liTemplate.content.cloneNode(true);

    liClone.querySelector('.productName').value = card.products[i].name;
    liClone.querySelector('.productPrice').value = card.products[i].price;

    ul.appendChild(liClone);
  }

  addList();
}
