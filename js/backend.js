'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onload = function () {
      return xhr.status === STATUS_OK ? onLoad(xhr.response) : onError(xhr.response);
    };
    xhr.onerror = function () {
      onError('Произошла ошибка соединения');
    };
    xhr.ontimeout = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.timeout = TIMEOUT; // 10s

    return xhr;
  }

  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  window.save = function (data, onLoad, onError) {
    var URL = ' https://js.dump.academy/kekstagram';
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
