//import

import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import {config} from "./configValidation.js";
import {initialCards} from "./initialCardsArr.js";
import './index.css';

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
// popup add card form
const formAdd = document.querySelector('.form-add');
// cards block
const cardTemplate = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.elements');

// Listeners
/**
 * Place profile title and subtitle from page to input field whet opening popupEditProfile
 * active by clicking editButton
 */
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  const openEditPopup = new PopupWithForm(popupEditProfile, formEdit);
  openEditPopup.open();
  popupEditValidation.deleteErrorMessage();
});
/**
 * Clear input field in popupAddCard when opening it
 * active by clicking addButton
 */
addButton.addEventListener('click', () => {
  const openAddPopup = new PopupWithForm(popupAddCard, formAdd);
  openAddPopup.open();
  popupAddValidation.deleteErrorMessage();
});


//make this when loading page
const renderCardsArr = new Section({
  items: initialCards,
  renderer: (item) => {
    console.log(item);
    const newCard = new Card(item.name, item.link, cardTemplate);
    const cardElement = newCard.createCard();

    renderCardsArr.addItem(cardElement);
  }
},
  cardsContainer
);

renderCardsArr.renderContainer();

const popupEditValidation = new FormValidator(config, formEdit);
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator(config, formAdd);
popupAddValidation.enableValidation();

//export
export {profileTitle, profileSubtitle, cardTemplate, popupImage, cardsContainer};


