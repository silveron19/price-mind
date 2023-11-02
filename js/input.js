// function openCamera() {
//   const constraints = {
//     video: {
//       facingMode: front ? 'user' : 'environment',
//       width: 1280,
//       height: 720,
//     },
//   };

//   let front = false;
//   document.getElementById('flip-button').onclick = () => {
//     front = !front;
//   };

//   navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then((mediaStream) => {
//       const video = document.querySelector('video');
//       video.srcObject = mediaStream;
//       video.onloadedmetadata = () => {
//         video.play();
//       };
//     })
//     .catch((err) => {
//       // always check for errors at the end.
//       console.error(`${err.name}: ${err.message}`);
//     });
// }

function openFile() {
  document.getElementById('userFile').click();
}
