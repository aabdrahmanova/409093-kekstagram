'use strict';

(function () {
  var slider = document.querySelector('.upload-effect-level-pin');
  var container = document.querySelector('.upload-effect-level-line');
  var levelValue = document.querySelector('.upload-effect-level-val');
  var effectValue = document.querySelector('.upload-effect-level-value');
  var photoPreview = document.querySelector('.effect-image-preview');
  var previewStyles = null;

  function onMoveHandler(evt) {
    var dataContainer = container.getBoundingClientRect();
    var left = evt.clientX + 9 - dataContainer.left - slider.offsetWidth / 2;
    var percent = left * 100 / dataContainer.width;
    if (percent < 0) {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }

    slider.style.left = percent + '%';
    levelValue.style.width = slider.style.left;
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

  slider.onMouseDown = function (evt) {
    onMoveHandler(evt);
    document.onMouseMove = function (e) {
      onMoveHandler(e);
    };
  };

  document.onMouseUp = function () {
    document.onMouseMove = null;
    slider.onMouseUp = null;
  };
})();
