'use strict';

(function () {
  // Валидация хэш-тега
  function Validator(input) {
    this.invalidities = [];
    this.input = input;
  }

  Validator.prototype.addErrorMessage = function (message) {
    if (this.invalidities.indexOf(message) === -1) {
      this.invalidities.push(message);
    }
  };

  Validator.prototype.getInvalidities = function () {
    return this.invalidities.join(' \n');
  };

  Validator.prototype.showError = function (message) {
    this.removeError();
    this.input.insertAdjacentHTML('afterend', '<p class="error-message">' + message + '</p>');
  };

  Validator.prototype.removeError = function () {
    var nextSubling = this.input.nextElementSibling;
    if (nextSubling && nextSubling.classList.contains('error-message')) {
      nextSubling.remove();
    }
  };

  var buttonSubmit = document.getElementById('upload-submit');
  if (buttonSubmit) {
    buttonSubmit.addEventListener('click', function (event) {
      var input = document.querySelector('.upload-form-hashtags');
      var validator = new Validator(input);
      var value = input.value.toLowerCase();
      var hashtags = value.split(' ');
      if (hashtags.length > 5) {
        validator.addErrorMessage('Количество хэш-тегов не должно быть больше 5');
      }
      var keys = {};
      for (var j = 0; j < hashtags.length; j++) {
        if (hashtags[j][0] !== '#') {
          validator.addErrorMessage('Все хэш-теги должны начинаться с #');
        } else if (hashtags[j].length > 20) {
          validator.addErrorMessage('Длина хэш-тега не должна превышать 20 символов');
        }
        if (keys[hashtags[j]]) {
          validator.addErrorMessage('Один и тот же хэш-тег не должен применяться более одного раза');
        }
        keys[hashtags[j]] = 1;
      }
      var errorMessages = validator.getInvalidities();
      if (errorMessages) {
        validator.showError(errorMessages);
        event.preventDefault();
      }
    });
  }
})();