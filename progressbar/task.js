const form = document.getElementById('form');
const progress = document.getElementById('progress');
const request = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/upload';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  request.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      progress.value = event.loaded / event.total;
    }
  })

  request.addEventListener('readystatechange', () => {
    if (request.readyState === request.DONE) {
      alert('Файл отправлен');
    }
  })

  request.open('POST', url);
  const formData = new FormData(form);
  request.send(formData);
})