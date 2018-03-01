'use strict';

(function () {
  var ARR_OF_INPUT_IDS = ['upload-effect-none', 'upload-effect-chrome', 'upload-effect-sepia', 'upload-effect-marvin', 'upload-effect-phobos', 'upload-effect-heat'];
  var ARR_OF_IMAGE_CLASSES = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Загрузка изображения и показ формы редактирования
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var description = document.querySelector('.upload-form-description');
  var photoPreview = document.querySelector('.effect-image-preview');

  function onPopupEscPress(evt) {
    window.isEscEvent(evt, closePopup);
  }

  function openPopup() {

    uploadForm.classList.remove('hidden');
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.onload = function () {
        photoPreview.src = reader.result;
      };

      reader.readAsDataURL(file);

      resizeValue.setAttribute('value', '100%');
      resize();
      document.onkeydown = onPopupEscPress;
      slider.style.left = '100%';
      levelValue.style.width = slider.style.left;
      effectValue.setAttribute('value', 100);
      photoPreview.className = 'effect-none effect-image-preview';
      photoPreview.style.filter = '';

      description.onfocus = function () {
        document.onkeydown = null;
      };
      description.onblur = function () {
        document.onkeydown = onPopupEscPress;
      };
    }
  }

  function closePopup() {
    uploadForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.getElementById('upload-file').value = '';
    document.querySelector('.upload-form-hashtags').style = '';
    form.reset();
    if (form.querySelector('.error-message')) {
      form.querySelector('.error-message').remove();
    }
  }

  uploadFile.onchange = openPopup;
  uploadCancel.onclick = closePopup;

  // Применение эффекта для изображения
  var effectLevelElement = document.querySelector('.upload-effect-level');
  var effectValue = uploadForm.querySelector('.upload-effect-level-value');
  var slider = document.querySelector('.upload-effect-level-pin');
  var levelValue = document.querySelector('.upload-effect-level-val');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');

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
        slider.style.left = '100%';
        levelValue.style.width = slider.style.left;
        effectValue.setAttribute('value', 100);
      }
    }
  }

  uploadEffectControls.onclick = setFilterToImage;

  // Редактирование размера изображения
  var RESIZE_STEP = 25;
  var minSize = 25;
  var maxSize = 100;
  var resizeDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = document.querySelector('.upload-resize-controls-value');

  resizeDec.onclick = function () {
    if (parseInt(resizeValue.value, 10) > minSize) {
      resizeValue.setAttribute('value', parseInt(resizeValue.value, 10) - RESIZE_STEP + '%');
      resize();
    }
  };
  resizeInc.onclick = function () {
    if (parseInt(resizeValue.value, 10) < maxSize) {
      resizeValue.setAttribute('value', parseInt(resizeValue.value, 10) + RESIZE_STEP + '%');
      resize();
    }
  };
  function resize() {
    photoPreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
  }

  var form = document.querySelector('#upload-select-image');
  form.onsubmit = function (evt) {
    window.save(new FormData(form), function () {
      uploadForm.classList.add('hidden');
    });
    evt.preventDefault();
    closePopup();
  };

  // Валидация хэштегов
  var MAX_HASHTAG_LENGTH = 20;
  var buttonSubmit = document.getElementById('upload-submit');

  if (buttonSubmit) {
    buttonSubmit.onclick = function (evt) {
      var input = document.querySelector('.upload-form-hashtags');
      var validator = new window.Validator(input);
      var value = input.value.toLowerCase();
      var hashtags = value.split(' ');

      if (hashtags.length > 5) {
        validator.addErrorMessage('Количество хэш-тегов не должно быть больше 5');
        input.style = 'border: 3px solid red';
      }
      var keys = {};
      for (var j = 0; j < hashtags.length; j++) {

        if (hashtags[j][0] !== '#') {
          validator.addErrorMessage('Все хэш-теги должны начинаться с #');
          input.style = 'border: 3px solid red';
        } else if (hashtags[j].length > MAX_HASHTAG_LENGTH) {
          validator.addErrorMessage('Длина хэш-тега не должна превышать 20 символов');
          input.style = 'border: 3px solid red';
        }

        if (hashtags[j].length === 0) {
          validator.invalidities = [];
        }

        if (keys[hashtags[j]]) {
          validator.addErrorMessage('Один и тот же хэш-тег не должен применяться более одного раза');
          input.style = 'border: 3px solid red';
        }
        keys[hashtags[j]] = 1;
      }
      var errorMessages = validator.getInvalidities();

      if (errorMessages) {
        validator.showError(errorMessages);
        evt.preventDefault();
      }
    };
  }
})();
