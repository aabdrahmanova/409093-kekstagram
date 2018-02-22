'use strict';

(function () {
  // Создание данных
  var ESC_KEYCODE = 27;
  var content = document.querySelector('#picture-template').content;
  var photos = [];

  function renderPhoto(photo) {
    var photoElement = content.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;

    return photoElement;
  }

  function successHandler(photosFromBackend) {
    var fragment = document.createDocumentFragment();
    photos = photosFromBackend;
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    document.querySelector('.container').appendChild(fragment);
    addEvents();
  }

  // Показываем ошибки
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 3% auto; color: white; text-align: center; background-color: #ff2430; width: 50%; opacity: 0.8; padding: 30px; border-radius: 10px; border: 3px solid #ee2430; box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.7);';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';
    node.style.fontFamily = 'Arial, Helvetica, sans-serif';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    document.addEventListener('click', function () {
      node.remove();
    });
  }

  window.load(successHandler, errorHandler);

  // Показ изображения в полноэкранном режиме
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

  function addEvents() {
    document.querySelectorAll('.picture').forEach(function (element, index) {
      element.addEventListener('click', function () {
        openPicture(index);
      });
    });
  }

  document.querySelector('.gallery-overlay-close').addEventListener('click', closePicture);
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePicture();
    }
  }
})();

