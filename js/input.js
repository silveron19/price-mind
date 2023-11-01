async function openCamera() {
  document.addEventListener('DOMContentLoaded', () => {
    let but = document.getElementById('but');
    let video = document.getElementById('vid');
    let mediaDevices = navigator.mediaDevices;
    vid.muted = true;
    but.addEventListener('click', () => {
      // Accessing the user camera and video.
      mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          // Changing the source of video to current stream.
          video.srcObject = stream;
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        })
        .catch(alert);
    });
  });
}

function openFile() {
  document.getElementById('userFile').click();
}

function addCard() {
  if ('content' in document.createElement('template')) {
    const cards = document.querySelector('cards');
    const template = document.querySelector('#productrow');

    const clone = template.cloneNode(true);

    let title = 'Kartu tanpa judul';

    let card = createCard(title);
    cards.push({ title: title });

    localStorage.setItem('cards', JSON.stringify(cards));

    heroSection.appendChild(card);
  }
}

function createCard(title) {
  let card = document.createElement('div');
  card.className = 'card';

  let cardTitle = document.createElement('p');
  cardTitle.className = 'card-title';
  cardTitle.textContent = title;

  card.appendChild(cardTitle);

  return card;
}
