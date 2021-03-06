'use strict';

(function () {
  // Создание данных
  var content = document.querySelector('#picture-template').content;
  var photos = [];
  var filters = document.querySelector('.filters');
  var container = document.querySelector('.container');

  function renderPhoto(photo) {
    var photoElement = content.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;

    return photoElement;
  }

  function successHandler(photosArr) {
    photos = photosArr;
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });

    document.querySelector('.container').appendChild(fragment);
    addEvents();
    filters.classList.remove('filters-inactive');
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

    document.onclick = function () {
      node.remove();
    };
  }

  window.load(successHandler, errorHandler);

  // Показ изображения в полноэкранном режиме
  function openPicture(index) {
    document.querySelector('.gallery-overlay').classList.remove('hidden');
    document.querySelector('.gallery-overlay .gallery-overlay-image').src = photos[index].url;
    document.querySelector('.gallery-overlay .comments-count').textContent = photos[index].comments.length;
    document.querySelector('.gallery-overlay .likes-count').textContent = photos[index].likes;
    document.onkeydown = onPopupEscPress;
  }

  function closePicture() {
    document.querySelector('.gallery-overlay').classList.add('hidden');
  }

  function addEvents() {
    document.querySelectorAll('.picture').forEach(function (element, index) {
      element.onclick = function () {
        openPicture(index);
      };
    });
  }

  document.querySelector('.gallery-overlay-close').onclick = closePicture;
  function onPopupEscPress(evt) {
    window.isEscEvent(evt, closePicture);
  }

  // Фильтрация картинок
  function clearContainer() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function sortPictures(e) {
    clearContainer();
    var target = e.target;

    window.debounce(function () {
      if (target.id === 'filter-popular') {
        var sortByLikes = photos.slice().sort(function (a, b) {

          if (a.likes > b.likes) {
            return -1;
          }
          if (a.likes < b.likes) {
            return 1;
          }
          return 0;
        });

        setTimeout(successHandler(sortByLikes), 2000);
      }

      if (target.id === 'filter-discussed') {
        var sortByComments = photos.slice().sort(function (a, b) {

          if (a.comments.length > b.comments.length) {
            return -1;
          }
          if (a.comments.length < b.comments.length) {
            return 1;
          }
          return 0;
        });

        successHandler(sortByComments);
      }

      if (target.id === 'filter-random') {
        var randomSort = photos.slice().sort(function () {
          return Math.random();
        });

        successHandler(randomSort);
      }

      if (target.id === 'filter-recommend') {
        window.load(successHandler, errorHandler);
      }
    });
  }

  document.querySelectorAll('.filters-radio').forEach(function (element) {
    element.onclick = sortPictures;
  });
})();
