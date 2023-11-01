function checkScreenSize() {
  let logo = document.querySelector('.logo');
  if (window.innerWidth <= 768) {
    logo.textContent = 'XX';
  } else {
    logo.textContent = 'XXXX';
  }
}
checkScreenSize();

window.addEventListener('resize', checkScreenSize);
