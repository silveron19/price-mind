function search_card() {
  let input = document.getElementById('search__bar').value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName('cards');

  for (const element of x) {
    if (!element.innerHTML.toLowerCase().includes(input)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }
  }
}
