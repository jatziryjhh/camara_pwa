// Referencias
const openCameraBtn = document.getElementById('openCamera');
const cameraContainer = document.getElementById('cameraContainer');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('takePhoto');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let stream = null;

// Abrir cámara
async function openCamera() {
  try {
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 320 },
        height: { ideal: 240 }
      }
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    cameraContainer.style.display = 'block';
    openCameraBtn.disabled = true;
    openCameraBtn.textContent = 'Cámara abierta';
    console.log('Cámara encendida');
  } catch (err) {
    console.error('Error al abrir la cámara:', err);
    alert('No se pudo acceder a la cámara. Da permisos para continuar.');
  }
}

// Tomar foto
function takePhoto() {
  if (!stream) {
    alert('Primero abre la cámara.');
    return;
  }

  // Mostrar el canvas (foto)
  canvas.style.display = 'block';

  // Dibujar el frame actual del video en el canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convertir a imagen base64 (opcional)
  const dataURL = canvas.toDataURL('image/png');
  console.log('Foto capturada:', dataURL.substring(0, 50) + '...');

  // Apagar cámara
  closeCamera();
}

// Cerrar cámara
function closeCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    video.srcObject = null;
    openCameraBtn.disabled = false;
    openCameraBtn.textContent = 'Abrir cámara';
    console.log('Cámara cerrada');
  }
}

openCameraBtn.addEventListener('click', openCamera);
takePhotoBtn.addEventListener('click', takePhoto);

window.addEventListener('beforeunload', closeCamera);