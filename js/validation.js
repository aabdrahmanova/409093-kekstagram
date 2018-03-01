'use strict';

(function () {
  // Валидация
  window.Validator = function (input) {
    this.invalidities = [];
    this.input = input;
  };

  window.Validator.prototype.addErrorMessage = function (message) {
    if (this.invalidities.indexOf(message) === -1) {
      this.invalidities.push(message);
    }
  };

  window.Validator.prototype.getInvalidities = function () {
    return this.invalidities.join(' \n');
  };

  window.Validator.prototype.showError = function (message) {
    this.removeError();
    this.input.insertAdjacentHTML('afterend', '<p class="error-message">' + message + '</p>');
    document.querySelector('.error-message').style = 'color: red; font-size: 18px';
  };

  window.Validator.prototype.removeError = function () {
    var nextSubling = this.input.nextElementSibling;
    if (nextSubling && nextSubling.classList.contains('error-message')) {
      nextSubling.remove();
    }
  };
})();
