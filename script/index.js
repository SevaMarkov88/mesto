//import

import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import {config} from "./configValidation.js";
import {initialCards} from "./initialCardsArr.js";

// variables

// profile button edit
const editButton = document.querySelector('.profile__button-edit');
// add card button
const addButton = document.querySelector('.profile__button-add');
// popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image-fullscreen');
// profile title & subtitle
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// popup edit profile form & both input
const formEdit = document.querySelector('.form-edit');
const nameInput = formEdit.querySelector('.popup__text_input-type_name');
const jobInput = formEdit.querySelector('.popup__text_input-type_job');
// popup add card form & both inputs
const formAdd = document.querySelector('.form-add');
const titleInput = formAdd.querySelector('.popup__text_input-type_title');
const linkInput = formAdd.querySelector('.popup__text_input-type_link');
// cards block
const cardTemplate = document.querySelector('.template').content;
// popup closing buttons array
const popupsList = Array.from(document.querySelectorAll('.popup'));


// Listeners
/**
 * Place profile title and subtitle from page to input field whet opening popupEditProfile
 * active by clicking editButton
 */
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
  popupEditValidation.deleteErrorMessage();
});
/**
 * Clear input field in popupAddCard when opening it
 * active by clicking addButton
 */
addButton.addEventListener('click', () => {
  formAdd.reset();
  openPopup(popupAddCard);
  popupAddValidation.deleteErrorMessage();
});
/**
 * Start function handleEditProfile
 * active by clicking submit button in popupEditProfile
 */
formEdit.addEventListener('submit', handleEditProfile);
/**
 * Start function handleAddCard
 * active by clicking submit button in popupAddCard
 */
formAdd.addEventListener('submit', handleAddCard);

/**
 * add event listeners to all popup closing buttons, overlay click or pressing "ESC"
 */
popupsList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close')){
      closePopup(popup);
    }
  });
});

// functions

/**
 * Opening popup window by adding new class to popup block
 * @param {Object} popup what you want to open
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupEscClose);
}

/**
 * Closing popupEditProfile by pressing submit button
 * @param {*} evt standard event what must to be stopped
 */
function handleEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

/**
 * Closing popupAddCard by pressing submit button and add new card in initialCards array
 * @param {*} evt
 */
function handleAddCard(evt) {
  evt.preventDefault();
  const newArray = {name: titleInput.value, link: linkInput.value};
  initialCards.push(newArray);
  const card = new Card(newArray.name, newArray.link, cardTemplate);
  card.renderCard();
  closePopup(popupAddCard);
}

/**
 * Closing popup window
 * @param {Object} popup window what you want to close
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupEscClose);
}

/**
 * closing popup by pressing "ESC"
 * @param evt
 */
function popupEscClose (evt) {
  const key = evt.key;
  const popup = document.querySelector('.popup_opened')
  if (key === 'Escape') {
    closePopup(popup);
  }
}

//make this when loading page

//add initial cards on page
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, cardTemplate);
  card.renderCard();
})

const popupEditValidation = new FormValidator(config, formEdit);
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator(config, formAdd);
popupAddValidation.enableValidation();

//export

export {openPopup, popupImage}

