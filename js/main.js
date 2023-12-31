let maxListCount = 10;
function getCards() {
  let cards = JSON.parse(localStorage.getItem('cards')) || [];
  return cards;
}

let cards = getCards();
for (let index = 0; index < cards.length; index++) {
  createCard(cards[index], index);
}

let ul = document.getElementById('productList');

function addList() {
  let ul = document.getElementById('productList');
  let listItems = ul.querySelectorAll('li');
  if (listItems.length >= maxListCount) {
    alert('Batas maksimum list telah tercapai.');
    return;
  }
  if (ul) {
    let li = document.createElement('li');
    let productNameInput = document.createElement('input');
    let productPriceInput = document.createElement('input');
    let deleteButton = document.createElement('span');

    li.appendChild(productNameInput);
    li.appendChild(productPriceInput);
    li.appendChild(deleteButton);

    productNameInput.type = 'text';
    productNameInput.classList.add('productName');
    productNameInput.placeholder = 'Nama produk';

    productPriceInput.type = 'number';
    productPriceInput.setAttribute('inputmode', 'numeric');
    productPriceInput.classList.add('productPrice');
    productPriceInput.placeholder = 'Rp.';

    deleteButton.classList.add('deleteButton', 'material-symbols-outlined');
    deleteButton.style.display = 'none';
    deleteButton.textContent = 'delete';

    ul.insertBefore(li, ul.lastElementChild);

    deleteButton.addEventListener('click', function () {
      this.parentNode.remove();
    });

    let deleteButtons = ul.getElementsByClassName('deleteButton');
    if (deleteButtons.length > 1) {
      for (const button of deleteButtons) {
        button.style.display = 'inline';
      }
    }
    adjustPopupHeight();
  } else {
    console.error('Required elements not found.');
  }
}

function adjustPopupHeight() {
  let popupContent = document.querySelector('.modal-content');
  let height = popupContent.scrollHeight;
  let currentScrollTop = popupContent.scrollTop;
  popupContent.style.minHeight = height + 10 + 'px';
  popupContent.scrollTop = currentScrollTop + 10;
}

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
  cards.push(card);
  const index = cards.length;
  localStorage.setItem('cards', JSON.stringify(cards));
  createCard(card, index);
  closePopup();
}

function createCard(card, index) {
  const template = document.getElementById('productRow');
  const clone = template.content.cloneNode(true);
  const cardElement = clone.querySelector('.cards');
  cardElement.setAttribute('data-index', index);
  cardElement.querySelector('.card-title').textContent = card.title;
  let deleteCard = clone.querySelector('.deleteCardButton');

  cardElement.onclick = function () {
    editCard(card, index);
  };

  deleteCard.onclick = function (event) {
    event.stopPropagation();
    removeCard(index);
  };

  document.getElementById('hero-grid').appendChild(clone);
}

function editCard(card, index) {
  openPopup();

  let newTitle = document.getElementById('newTitle');
  newTitle.value = card.title;
  let productList = document.getElementById('productList');
  let addMoreList = productList.querySelector('#addMoreList');

  while (productList.firstChild) {
    if (productList.firstChild === addMoreList) {
      break;
    }
    productList.removeChild(productList.firstChild);
  }

  card.products.forEach(function (product) {
    let li = document.createElement('li');
    let productNameInput = document.createElement('input');
    let productPriceInput = document.createElement('input');
    let deleteButton = document.createElement('span');

    li.classList.add('first-row');

    productNameInput.type = 'text';
    productNameInput.classList.add('productName');
    productNameInput.value = product.name;

    productPriceInput.type = 'number';
    productPriceInput.setAttribute('inputmode', 'numeric');
    productPriceInput.classList.add('productPrice');

    if (product.price == '' || product.name == '') {
      productPriceInput.placeholder = 'Rp.';
      productNameInput.placeholder = 'Nama barang';
    } else {
      productPriceInput.value = product.price;
      productNameInput.value = product.name;
    }

    deleteButton.classList.add('deleteButton', 'material-symbols-outlined');
    deleteButton.style.display = 'none';
    deleteButton.textContent = 'delete';

    li.appendChild(productNameInput);
    li.appendChild(productPriceInput);
    li.appendChild(deleteButton);
    productList.appendChild(li);

    deleteButton.addEventListener('click', function () {
      this.parentNode.remove();
    });
  });

  let deleteButtons = productList.getElementsByClassName('deleteButton');
  if (card.products.length > 1) {
    for (const button of deleteButtons) {
      button.style.display = 'inline';
    }
  }
  productList.appendChild(addMoreList);

  let submitButton = document.querySelector('.submit');
  submitButton.onclick = function () {
    updateCard(index);
  };
}

// let fileInput = document.getElementById('userFile');
// fileInput.onchange = function (event) {
//   let file = event.target.files[0];
//   let reader = new FileReader();
//   reader.onload = function (e) {
//     let imageSrc = e.target.result;
//     addImageCard(imageSrc);
//   };
//   reader.readAsDataURL(file);
// };

function removeCard(index) {
  let cards = JSON.parse(localStorage.getItem('cards'));
  cards.splice(index, 1);
  localStorage.setItem('cards', JSON.stringify(cards));
  location.reload();
}

function updateCard(index) {
  const newTitle = document.getElementById('newTitle').value;

  let products = [];

  let productNameInputs = document.querySelectorAll('.productName');
  let productPriceInputs = document.querySelectorAll('.productPrice');

  for (let i = 0; i < productNameInputs.length; i++) {
    const productName = productNameInputs[i].value;
    const productPrice = productPriceInputs[i].value;
    products.push({ name: productName, price: productPrice });
  }

  cards[index] = { title: newTitle, products: products };

  localStorage.setItem('cards', JSON.stringify(cards));
  location.reload();
}

// function addImageCard(imageSrc) {
//   const template = document.getElementById('imageCardTemplate');
//   const clone = template.content.cloneNode(true);
//   const imageCard = clone.querySelector('.image-card');
//   const cardImage = clone.querySelector('.card-image');
//   cardImage.src = imageSrc;
//   document.getElementById('hero-grid').appendChild(imageCard);

//   let images = JSON.parse(localStorage.getItem('images')) || [];
//   images.push(imageSrc);
//   localStorage.setItem('images', JSON.stringify(images));
// }
