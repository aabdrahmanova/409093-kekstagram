'use strict';
var ESC_KEYCODE = 27;
var photos = [];
var url = [];
var comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

for (var i = 1; i <= 25; i++) {
  url.push('photos/' + i + '.jpg');
}
function getLikes() {
  return Math.round(Math.random() * (200 - 15) + 15);
}
function getComments() {
  var arr = [];
  for (var j = 0; j <= Math.round(Math.random() * ((1 - 0) + 0)); j++) {
    arr.push(comments[Math.round(Math.random() * ((comments.length - 1) - 1) + 1)]);
  }
  return arr;
}
function createPhotoArr(count, arr) {
  for (var j = 0; j < count; j++) {
    arr.push({
      url: url[j],
      likes: getLikes(),
      comments: getComments()
    });
  }
}
function addContent() {
  var content = document.querySelector('#picture-template').content;
  for (var j = 0; j <= photos.length - 1; j++) {
    var photoElement = content.querySelector('img');
    photoElement.src = photos[j].url;

    var commentElement = content.querySelector('.picture-comments');
    commentElement.textContent = photos[j].comments;

    var likesElement = content.querySelector('.picture-likes');
    likesElement.textContent = photos[j].likes;

    document.querySelector('.pictures').appendChild(document.importNode(content, true));
  }
}

function openPicture(index) {
  document.querySelector('.gallery-overlay').classList.remove('hidden');
  document.querySelector('.gallery-overlay .gallery-overlay-image').src = photos[index].url;
  document.querySelector('.gallery-overlay .comments-count').textContent = photos[index].comments.length;
  document.querySelector('.gallery-overlay .likes-count').textContent = photos[index].likes;
  document.addEventListener('keydown', onPopupEscPress);
}
function closePicture() {
  document.querySelector('.gallery-overlay').classList.add('hidden');
}

createPhotoArr(25, photos);
addContent();

// Показ изображения в полноэкранном режиме
document.querySelectorAll('.picture').forEach(function (element, index) {
  element.addEventListener('click', function () {
    openPicture(index);
    document.querySelector('.gallery-overlay-close').addEventListener('click', function () {
      closePicture();
    });

  });
});


// Загрузка изображения и показ формы редактирования
var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-overlay');
var uploadCancel = document.querySelector('#upload-cancel');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    closePicture();
  }
}
function openPopup() {
  uploadForm.classList.remove('hidden');
  resizeValue.setAttribute('value', '100%');
  resize();
  document.addEventListener('keydown', onPopupEscPress);
}
function closePopup() {
  uploadForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  document.getElementById('upload-file').value = '';
}
uploadFile.addEventListener('change', function () {
  openPopup();
});
uploadCancel.addEventListener('click', function () {
  closePopup();
});

// Применение эффекта для изображения
var effectLevelElement = document.querySelector('.upload-effect-level');
var effectPin = uploadForm.querySelector('.upload-effect-level-pin');
var effectValue = uploadForm.querySelector('.upload-effect-level-value');
var uploadEffectControls = document.querySelector('.upload-effect-controls');
var photoPreview = document.querySelector('.effect-image-preview');
var ARR_OF_INPUT_IDS = ['upload-effect-none', 'upload-effect-chrome', 'upload-effect-sepia', 'upload-effect-marvin', 'upload-effect-phobos', 'upload-effect-heat'];
var ARR_OF_IMAGE_CLASSES = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];

effectLevelElement.classList.add('hidden');

function setFilterToImage(e) {
  photoPreview.classList.add('effect-image-preview');
  var target = e.target.parentNode;
  for (var j = 0; j < ARR_OF_INPUT_IDS.length; j++) {
    if (target.previousElementSibling.id === ARR_OF_INPUT_IDS[j]) {
      if (ARR_OF_INPUT_IDS[j] === 'upload-effect-none') {
        effectLevelElement.classList.add('hidden');
      } else {
        effectLevelElement.classList.remove('hidden');
      }
      photoPreview.className = '';
      photoPreview.classList.add(ARR_OF_IMAGE_CLASSES[j]);
      photoPreview.style.filter = '';
    }
  }
}

// Навешиваем обработчики событий
uploadEffectControls.addEventListener('click', setFilterToImage);

// Настройка интенсивности фильтра
effectValue.setAttribute('value', parseInt(effectPin.style.left, 10));

// Редактирование размера изображения
var resizeDec = document.querySelector('.upload-resize-controls-button-dec');
var resizeInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeValue = document.querySelector('.upload-resize-controls-value');

resizeDec.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) > 25) {
    resizeValue.setAttribute('value', parseInt(resizeValue.value, 10) - 25 + '%');
    resize();
  }
});
resizeInc.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) < 100) {
    resizeValue.setAttribute('value', parseInt(resizeValue.value, 10) + 25 + '%');
    resize();
  }
});

function resize() {
  photoPreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
}

