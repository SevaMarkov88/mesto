// variables
// profile button edit
const editButton = document.querySelector(".profile__button-edit");
// popup & popup button close
const popupWindow = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
// profile title & subtitle
const profileTitle = document.querySelector(".profile__title");
const progileSubtitle = document.querySelector(".profile__subtitle");
// popup form & bouth input
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__text_input-type_name");
const jobInput = formElement.querySelector(".popup__text_input-type_job");


// cards array

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Listeners

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

//add initial cards
initialCards.forEach(renderCards);

// functions

function openPopup() {
  popupWindow.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = progileSubtitle.textContent;
}

function closePopup() {
  popupWindow.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  progileSubtitle.textContent = jobInput.value;
  closePopup();
}

function renderCards(obj) {
  const cardTemplate = document.querySelector(".template").content;
  const cardsSection = document.querySelector(".elements");

  const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);

  cardBlock.querySelector('.element__image').src = obj.link;
  cardBlock.querySelector('.element__image').alt = obj.name;
  cardBlock.querySelector('.element__title').textContent = obj.name

  cardsSection.append(cardBlock);
}
