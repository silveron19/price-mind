let popup = document.getElementById('popup');
let noteButton = document.querySelector('.float-element:nth-of-type(2)');
let closeButton = document.querySelector('.close');
let cardTitleInput = document.getElementById('newTitle');

noteButton.addEventListener('click', openPopup);

function openPopup() {
  popup.style.display = 'flex';
}

closeButton.addEventListener('click', closePopup);

function closePopup() {
  popup.style.display = 'none';
  clearInputs();
}

function clearInputs() {
  cardTitleInput.value = 'Kartu tanpa judul';

  let productNameInputs = document.querySelectorAll('#productName');
  productNameInputs.forEach((input) => (input.value = ''));

  let productPriceInputs = document.querySelectorAll('#productPrice');
  productPriceInputs.forEach((input) => (input.value = ''));
}

function changeTitle() {
  let newTitle = document.getElementById('newTitle').value;
  if (newTitle !== null) {
    document.getElementById('newTitle').innerText = newTitle;
  }
}
