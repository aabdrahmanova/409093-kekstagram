'use strict';

(function () {
  var ESC_KEYCODE = 27;

  // Загрузка изображения и показ формы редактирования
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-overlay');
  var uploadCancel = document.querySelector('#upload-cancel');

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
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
})();
