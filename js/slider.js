'use strict';

(function () {
  var slider = document.querySelector('.upload-effect-level-pin');
  var container = document.querySelector('.upload-effect-level-line');
  var levelValue = document.querySelector('.upload-effect-level-val');
  var effectValue = document.querySelector('.upload-effect-level-value');
  var photoPreview = document.querySelector('.effect-image-preview');
  var previewStyles = null;

  function onMoveHandle(evt) {
    var pinWidth = 18;
    var dataContainer = container.getBoundingClientRect();
    var left = evt.clientX + pinWidth / 2 - dataContainer.left - slider.offsetWidth / 2;
    var percent = left * 100 / dataContainer.width;
    var minPercent = 0;
    var maxPercent = 100;
    var maxBlur = 3;
    var maxBrightness = 3;


    if (percent < minPercent) {
      percent = minPercent;
    } else if (percent > maxPercent) {
      percent = maxPercent;
    }

    slider.style.left = percent + '%';
    levelValue.style.width = slider.style.left;
    effectValue.setAttribute('value', percent);

    switch (photoPreview.className) {
      case ('effect-chrome effect-image-preview'):
        previewStyles = 'grayscale(' + percent / maxPercent + ')';
        break;
      case ('effect-sepia effect-image-preview'):
        previewStyles = 'sepia(' + percent / maxPercent + ')';
        break;
      case ('effect-marvin effect-image-preview'):
        previewStyles = 'invert(' + percent + '%)';
        break;
      case ('effect-phobos effect-image-preview'):
        previewStyles = 'blur(' + percent * maxBlur / maxPercent + 'px)';
        break;
      case ('effect-heat effect-image-preview'):
        previewStyles = 'brightness(' + percent * maxBrightness / maxPercent + ')';
        break;
    }
    photoPreview.style.filter = previewStyles;
  }

  slider.onmousedown = function (evt) {
    onMoveHandle(evt);
    document.onmousemove = function (e) {
      onMoveHandle(e);
    };
  };

  document.onmouseup = function () {
    document.onmousemove = null;
    slider.onmouseup = null;
  };
})();
