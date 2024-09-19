const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const context = canvas.getContext('2d');

// Acessar a câmera do usuário
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error('Erro ao acessar a câmera: ', err);
  });

// Capturar imagem ao clicar no botão
captureButton.addEventListener('click', () => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Registrar Service Worker para o PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso: ', registration.scope);
      }, (err) => {
        console.log('Falha ao registrar o Service Worker: ', err);
      });
  });
}
