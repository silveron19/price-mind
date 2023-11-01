function openPopup() {
  let popup = document.getElementById('popup');
  popup.style.display = 'flex';
}

function closePopup() {
  let popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function addProduct() {
  let cardTemplate = document.getElementById('productRow');
  let cardClone = cardTemplate.content.cloneNode(true);
  let cardTitle = document.getElementById('cardTitle').value;
  let productName = document.getElementById('productName').value;
  let productPrice = document.getElementById('productPrice').value;
  let card = cardClone.querySelector('.card');
  let cardTitleElement = card.querySelector('.card-title');
  cardTitleElement.textContent =
    cardTitle + ' - ' + productName + ' - ' + productPrice;
  document.querySelector('.cards').appendChild(cardClone);
  closePopup();
}

let noteButton = document.querySelector('.float-element:nth-of-type(3)');
noteButton.addEventListener('click', openPopup);

let closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', closePopup);

function changeTitle() {
  let newTitle = document.getElementById('new-title').value;
  if (newTitle !== null) {
    document.getElementById('card-title').innerText = newTitle;
  }
}

cards.forEach(function (cardData) {
  let card = createCard(cardData.title);
  heroSection.appendChild(card);
});
