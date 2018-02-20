'use strict';

(function () {
  var handle = document.querySelector('.upload-effect-level-pin');
  var container = document.querySelector('.upload-effect-level-line');
  var levelValue = document.querySelector('.upload-effect-level-val');
  var effectValue = document.querySelector('.upload-effect-level-value');
  var photoPreview = document.querySelector('.effect-image-preview');

  function moveHandle(event) {
    var dataContainer = container.getBoundingClientRect();
    var left = event.clientX + 9 - dataContainer.left - handle.offsetWidth / 2;
    var percent = left * 100 / dataContainer.width;
    if (percent < 0) {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }

    handle.style.left = percent + '%';
    levelValue.style.width = handle.style.left;
    effectValue.setAttribute('value', percent);

    if (photoPreview.className === 'effect-chrome effect-image-preview') {
      photoPreview.style.filter = 'grayscale(' + percent / 100 + ')';
    } else if (photoPreview.className === 'effect-sepia effect-image-preview') {
      photoPreview.style.filter = 'sepia(' + percent / 100 + ')';
    } else if (photoPreview.className === 'effect-marvin effect-image-preview') {
      photoPreview.style.filter = 'invert(' + percent + '%)';
    } else if (photoPreview.className === 'effect-phobos effect-image-preview') {
      photoPreview.style.filter = 'blur(' + percent * 3 / 100 + 'px)';
    } else if (photoPreview.className === 'effect-heat effect-image-preview') {
      photoPreview.style.filter = 'brightness(' + percent * 3 / 100 + ')';
    }
  }

  handle.onmousedown = function (event) {
    moveHandle(event);
    document.onmousemove = function (evt) {
      moveHandle(evt);
    };
  };

  document.onmouseup = function () {
    document.onmousemove = null;
    handle.onmouseup = null;
  };
})();
