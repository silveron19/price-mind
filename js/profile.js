const dropdownProfile = document.querySelector('.dropdown-profile');
const profile = document.querySelector('#profile-button');
profile.onclick = () => {
  dropdownProfile.classList.toggle('active');
};

document.addEventListener('click', function (e) {
  if (!dropdownProfile.contains(e.target) && !profile.contains(e.target)) {
    dropdownProfile.classList.remove('active');
  }
});
