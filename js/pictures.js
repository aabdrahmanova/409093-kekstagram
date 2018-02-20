'use strict';

(function () {
  // Создание данных
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

  createPhotoArr(25, photos);
  addContent();

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

  document.querySelectorAll('.picture').forEach(function (element, index) {
    element.addEventListener('click', function () {
      openPicture(index);

    });
  });

  document.querySelector('.gallery-overlay-close').addEventListener('click', closePicture);
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePicture();
    }
  }
})();

