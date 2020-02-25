'use strict';

var NUMBER_OBJECTS = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];

function showMap() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getWidthFrame = function () {
  var m = document.querySelector('.map');
  return getComputedStyle(m).width;
};

var getWidthPin = function () {
  var m = document.querySelector('.map__pin');
  return getComputedStyle(m).width;
};

var getRandomArray = function (arr) {
  var e = getRandomNumber(1, arr.length);
  var tempArr = arr.slice(0);
  var randomResultArr = [];
  for (var i = 0; i < e; i++) {
    var t = getRandomNumber(0, tempArr.length - 1);
    randomResultArr.push(tempArr[t]);
    tempArr.splice(t, 1);
  }
  return randomResultArr;
};

var getRandomElementArray = function (arr) {
  var e = getRandomNumber(0, arr.length - 1);
  return arr[e];
};

function renderObject(i, frameWidth, pinWidth) {
  i++;
  var object = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: 'заголовок предложения',
      address: 'LOCATION_X' + ', ' + 'LOCATION_Y',
      price: getRandomNumber(10, 10000),
      type: getRandomElementArray(TYPE),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkIn: getRandomElementArray(CHECK_IN),
      checkOut: getRandomElementArray(CHECK_OUT),
      features: getRandomArray(FEATURES),
      description: 'строка с описанием',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomNumber((0 - (pinWidth / 2)), (frameWidth + (pinWidth / 2))),
      y: getRandomNumber(130, 630)
    }
  };
  return object;
}

function createArray() {
  var offerList = [];
  var frameWidth = parseInt(getWidthFrame(), 10);
  var pinWidth = parseInt(getWidthPin(), 10);
  for (var i = 0; i < NUMBER_OBJECTS; i++) {
    offerList [i] = renderObject(i, frameWidth, pinWidth);
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

var renderPinsList = function (offerList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(renderPin(offerList[i]));
  }
  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(fragment);
};

showMap();

var renderElements = function () {
  var offerList = createArray();
  renderPinsList(offerList);
  renderCards(offerList);
};

var renderCard = function (offerList) {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
  var card = cardTemplate.cloneNode(true);
  var theOffer = offerList[0];
  var featuresList = theOffer.offer.features;
  var photosList = theOffer.offer.photos;

  function getRussianType(of) {
    var type;
    switch (of.offer.type) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
    }
    return type;
  }

  var theType = getRussianType(theOffer);

  function getRoomsGuestsString(rooms, guests) {
    var tempGuest = guests === 1 ? 'гостя' : 'гостей';

    var tempRoom = 'комнат';
    if (rooms === 1) {
      tempRoom = tempRoom + 'а';
    } else if ((rooms > 1) && (rooms < 5)) {
      tempRoom = tempRoom + 'ы';
    }
    return rooms + ' ' + tempRoom + ' для ' + guests + ' ' + tempGuest;
  }

  var stringRoomGuest = getRoomsGuestsString(theOffer.offer.rooms, theOffer.offer.guests);

  card.querySelector('.popup__title').textContent = theOffer.offer.title;
  card.querySelector('.popup__text--address').textContent = theOffer.offer.address;
  card.querySelector('.popup__text--price').innerHTML = theOffer.offer.price + '&#x20bd/ночь';
  card.querySelector('.popup__type').textContent = theType;
  card.querySelector('.popup__text--capacity').textContent = stringRoomGuest;
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + theOffer.offer.checkIn + ', выезд до ' + theOffer.offer.checkOut;
  card.querySelector('.popup__description').textContent = theOffer.offer.description;
  card.querySelector('.popup__avatar').setAttribute('scr', theOffer.author.avatar);

  card.querySelector('.popup__features').textContent = 'features';
  for (var i = 0; i < featuresList.length; i++) {
    var feature = document.createElement('li');
    feature.className = 'popup__features-' + featuresList[i];
    feature.innerHTML = featuresList[i];
    card.querySelector('.popup__features').appendChild(feature);
  }

  card.querySelector('.popup__photos').textContent = 'photos';
  for (var ii = 0; ii < photosList.length; ii++) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.scr = photosList[ii];
    card.querySelector('.popup__photos').appendChild(photo);
  }

  return card;
};

function renderCards(offerList) {
  var map = document.querySelector('.map');
  var card = renderCard(offerList);
  map.insertBefore(card, map.querySelector('.map__filters-container'));
}

renderElements();
