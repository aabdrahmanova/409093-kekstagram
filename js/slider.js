'use strict';

(function () {
  var handle = document.querySelector('.upload-effect-level-pin');
  var container = document.querySelector('.upload-effect-level-line');
  var levelValue = document.querySelector('.upload-effect-level-val');
  var effectValue = document.querySelector('.upload-effect-level-value');
  var photoPreview = document.querySelector('.effect-image-preview');
  var previewStyles = null;

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

    switch (photoPreview.className) {
      case ('effect-chrome effect-image-preview'):
        previewStyles = 'grayscale(' + percent / 100 + ')';
        break;
      case ('effect-sepia effect-image-preview'):
        previewStyles = 'sepia(' + percent / 100 + ')';
        break;
      case ('effect-marvin effect-image-preview'):
        previewStyles = 'invert(' + percent + '%)';
        break;
      case ('effect-phobos effect-image-preview'):
        previewStyles = 'blur(' + percent * 3 / 100 + 'px)';
        break;
      case ('effect-heat effect-image-preview'):
        previewStyles = 'brightness(' + percent * 3 / 100 + ')';
        break;
    }
    photoPreview.style.filter = previewStyles;
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
