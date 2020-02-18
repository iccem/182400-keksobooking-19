'use strict';

var NUMBER_OBJECTS = 8;
var type = ['palace', 'flat', 'house', 'bungalo'];
var locationX = 600;
var locationY = 350;
var tempCheckTime = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];
var offerList = [];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  var max = arr.length - 1;
  var min = 0;
  var e = Math.round(Math.random() * max) + min;
  return arr[e];
};

function renderObject(i) {
  var object = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: 'строка, заголовок предложения',
      address: 'locationX' + ', ' + 'locationY', // '600, 350',
      price: getRandomNumber(10, 10000), // 'число, стоимость',
      type: getRandomElement(type), // 'строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo',
      rooms: getRandomNumber(1, 10), // 'число, количество комнат',
      guests: getRandomNumber(1, 10), // 'число, количество гостей, которое можно разместить',
      checkin: getRandomElement(tempCheckTime), // 'строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,',
      checkout: getRandomElement(tempCheckTime), // 'строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00',
      features: getRandomElement(features), // 'массив строк случайной длины wifi dishwasher parking washer elevator conditioner',
      description: 'строка с описанием',
      photos: photos, // 'массив строк случайной длины адреса фотографий http://o0.github.io/assets/images/tokyo/hotel1.jpg'
    },
    location: {
      x: locationX, // 'случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка',
      y: locationY // 'случайное число, координата y метки на карте от 130 до 630'
    }
  };
  return object;
}

function createArray() {
  var tempObject = [];
  for (var i = 0; i < NUMBER_OBJECTS; i++) {
    tempObject [i] = renderObject(i);
  }
  return tempObject;
}

function renderPin(offer) {
  var r = getRandomNumber(1, 9);
  var pinElement = similarPinTemplate.cloneNode(true);
  var x = offer.location.x + (50 * r) + 'px';
  var y = offer.location.y + (50 * r) + 'px';
  pinElement.style.left = x;
  pinElement.style.top = y;
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.author.title;
  return pinElement;
}

var renderPinsList = function () {
  var fragment = document.createDocumentFragment();

  for (var n = 0; n < offerList.length; n++) {
    fragment.appendChild(renderPin(offerList[n]));
  }
  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(fragment);
};

offerList = createArray();
renderPinsList();

// var housePriceField = document.querySelector('#housing-price');

// housePriceField.classList.add('hidden');

// housePriceField.classList.remove('hidden');
