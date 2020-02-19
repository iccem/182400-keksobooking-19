'use strict';

var NUMBER_OBJECTS = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_X = 600;
var LOCATION_Y = 350;
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];

function showMap () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getWidthFrame = function () {
  var m = document.querySelector('.map');
  return getComputedStyle(m).width;
}

var getWidthPin = function () {
  var m = document.querySelector('.map__pin');
  return getComputedStyle(m).width;
}

var getHeightPin = function () {
  var m = document.querySelector('.map__pin');
  return getComputedStyle(m).height;
}

var getRandomArray = function (arr) {
  var e = getRandomNumber(1, arr.length);
  var tempArr = arr.slice(0);
  var randomresultArr = [];
  for (var i = 0; i < e; i++)
  {
    var t = getRandomNumber(0, tempArr.length-1);
    randomresultArr.push(tempArr[t]);
    tempArr.splice(t, 1);
  }
  return randomresultArr;
};

function renderObject(i, w, pW, pH) {
  i++;
  var object = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: 'строка, заголовок предложения',
      address: 'LOCATION_X' + ', ' + 'LOCATION_Y', // '600, 350',
      price: getRandomNumber(10, 10000), // 'число, стоимость',
      TYPE: getRandomNumber(0, TYPE.length), // 'строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo',
      rooms: getRandomNumber(1, 10), // 'число, количество комнат',
      guests: getRandomNumber(1, 10), // 'число, количество гостей, которое можно разместить',
      CHECK_IN: getRandomNumber(0, CHECK_IN.length), // 'строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,',
      CHECK_OUT: getRandomNumber(0, CHECK_OUT.length), // 'строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00',
      FEATURES: getRandomArray(FEATURES), // 'массив строк случайной длины wifi dishwasher parking washer elevator conditioner',
      description: 'строка с описанием',
      PHOTOS: getRandomArray(PHOTOS), // 'массив строк случайной длины адреса фотографий http://o0.github.io/assets/images/tokyo/hotel1.jpg'
    },
    location: {
      x: getRandomNumber((100 + pW), (w - pW)), // 'случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка',
      y: getRandomNumber((130 + pH), (630 - pH)) // 'случайное число, координата y метки на карте от 130 до 630'
    }
  };
  return object;
}

function createArray() {
  var offerList = [];
  var w = parseInt(getWidthFrame(), 10);
  var pW = parseInt(getWidthPin(), 10);
  var pH = parseInt(getHeightPin(), 10);
  for (var i = 0; i < NUMBER_OBJECTS; i++) {
    offerList [i] = renderObject(i, w, pW, pH);
  }
  return offerList;
}

function renderPin(offer) {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
    
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = offer.location.x + 'px';
  pinElement.style.top = offer.location.y + 'px';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.author.title;
  return pinElement;
}

var renderPinsList = function () {
  var fragment = document.createDocumentFragment();
  var offerList = createArray();

  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(renderPin(offerList[i]));
  }
  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(fragment);
};

showMap();
renderPinsList();
