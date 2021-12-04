//import

import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {config} from "../utils/configValidation.js";
import {initialCards} from "../utils/initialCardsArr.js";
import UserInfo from "../components/UserInfo.js";
// import './index.css';

// variables

// profile button edit
const editButton = document.querySelector('.profile__button-edit');
// add card button
const addButton = document.querySelector('.profile__button-add');
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

//validation enable

const popupAddValidation = new FormValidator(config, formAdd);
popupAddValidation.enableValidation();
const popupEditValidation = new FormValidator(config, formEdit);
popupEditValidation.enableValidation();

// Listeners
/**
 * Place profile title and subtitle from page to input field whet opening popupEditProfile
 * active by clicking editButton
 */
editButton.addEventListener('click', () => {
  const profileInfo = new UserInfo('.profile__title', '.profile__subtitle');
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo[0];
  jobInput.value = userInfo[1];
  const openEditPopup = new PopupWithForm('.popup_edit-profile', submitHandler);
  openEditPopup.open();
  openEditPopup.setEventListeners();
  popupEditValidation.submitButtonDisable();
});
/**
 * Clear input field in popupAddCard when opening it
 * active by clicking addButton
 */
addButton.addEventListener('click', () => {
  const openAddPopup = new PopupWithForm('.popup_add-card', submitHandler);
  openAddPopup.open();
  openAddPopup.setEventListeners();
  popupAddValidation.submitButtonDisable();
});


//make this when loading page
const renderCardsArr = new Section({
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item.name, item.link, cardTemplate, handleCardClick);
      renderCardsArr.addItem(newCard.createCard());
    }
  },
  cardsContainer
);

renderCardsArr.renderContainer();

//functions

function handleCardClick(name, link) {
  const openBigImg = new PopupWithImage('.popup_image-fullscreen');
  openBigImg.open(name, link);
  openBigImg.setEventListeners();
}

function submitHandler(inputsArr) {
  if (this._form.classList.contains('form-edit')) {
    const newProfile = new UserInfo('.profile__title', '.profile__subtitle');
    newProfile.setUserInfo(inputsArr.name, inputsArr.job);
  } else if (this._form.classList.contains('form-add')) {
    const newCard = new Card(inputsArr.title, inputsArr.link, cardTemplate, handleCardClick);
    renderCardsArr.addItem(newCard.createCard());
  }
}



