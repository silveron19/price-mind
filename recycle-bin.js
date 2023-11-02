function addCard() {
  let title = document.getElementById('newTitle').value;

  let productNames = Array.from(document.querySelectorAll('#productName')).map(
    (input) => input.value
  );
  let productPrices = Array.from(
    document.querySelectorAll('#productPrice')
  ).map((input) => input.value);

  let products = productNames.map((name, index) => {
    console.log(index);
    return { name: name, price: productPrices[index] };
  });

  let card = { title: title, products: products };

  let cards = JSON.parse(localStorage.getItem('cards')) || [];
  cards.push(card);

  const data = localStorage.setItem('cards', JSON.stringify(cards));

  createCard(data);

  closePopup();
  location.reload();
}

function createCard(card) {
  let template = document.getElementById('productRow');
  let clone = template.content.cloneNode(true);

  clone.querySelector('.card-title').textContent = card.title;
  console.log(card.products);
  document.querySelector('.hero-grid').appendChild(clone);

  clone.querySelectorAll('.deleteCardButton').forEach(function (button) {
    button.onclick = function () {
      this.parentNode.remove();
      removeCardFromStorage(card);
    };
  });
}

function updateCard(index) {
  const newTitle = document.getElementById('newTitle').value;

  let products = [];

  for (let i = 0; i < productList.length - 1; i++) {
    const productName = productList[i].querySelector('.productName').value;
    const productPrice = productList[i].querySelector('.productPrice').value;
    products.push({ name: productName, price: productPrice });
  }

  cards[index] = { item: newTitle, products: products };

  localStorage.setItem('cards', JSON.stringify(cards));
  // updateCardInStorage(cards);
  // updateCardOnPage(cards);
}
// function updateCard(card) {
//   card.title = document.getElementById('newTitle').value;
//   card.products = Array.from(document.querySelectorAll('#productName')).map(
//     (input, index) => {
//       return {
//         name: input.value,
//         price: document.querySelectorAll('#productPrice')[index].value,
//       };
//     }
//   );
//   updateCardInStorage(card);
//   updateCardOnPage(card);
// }

// function updateCardInStorage(card) {
//   let cards = JSON.parse(localStorage.getItem('cards'));

//   let index = cards.findIndex(function (c) {
//     return (
//       c.title === card.title &&
//       JSON.stringify(c.products) === JSON.stringify(card.products)
//     );
//   });

//   if (index !== -1) {
//     cards[index] = card;
//     localStorage.setItem('cards', JSON.stringify(cards));
//   }
// }

// function updateCardOnPage(card) {
//   let cards = document.querySelectorAll('.card');

//   for (const element of cards) {
//     if (element.querySelector('.card-title').textContent === card.title) {
//       element.querySelector('.card-title').textContent = card.title;
//       break;
//     }
//   }
// }
