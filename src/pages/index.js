//import

import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {config} from "../utils/configValidation.js";
import {initialCards} from "../utils/initialCardsArr.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

// variables

// profile button edit
const editButton = document.querySelector('.profile__button-edit');
// add card button
const addButton = document.querySelector('.profile__button-add');
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

//profile form inputs info adding

const profileInfo = new UserInfo('.profile__title', '.profile__subtitle');

//popups creating

const openEditPopup = new PopupWithForm('.popup_edit-profile', submitHandlerProfile);
openEditPopup.setEventListeners();
const openAddPopup = new PopupWithForm('.popup_add-card', submitHandlerCard);
openAddPopup.setEventListeners();
const openBigImg = new PopupWithImage('.popup_image-fullscreen');
openBigImg.setEventListeners();

// Listeners
/**
 * Place profile title and subtitle from page to input field whet opening popupEditProfile
 * active by clicking editButton
 */
editButton.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo[0];
  jobInput.value = userInfo[1];
  openEditPopup.open();
  popupEditValidation.submitButtonDisable();
});
/**
 * Clear input field in popupAddCard when opening it
 * active by clicking addButton
 */
addButton.addEventListener('click', () => {
  openAddPopup.open();
  popupAddValidation.submitButtonDisable();
});


//make this when loading page
const renderCardsArr = new Section({
    items: initialCards,
    renderer: (item) => {
      renderCardsArr.addItem(createCard(item.name, item.link));
    }
  },
  cardsContainer
);

renderCardsArr.renderContainer();

//functions

function handleCardClick(name, link) {
  openBigImg.open(name, link);
}

function submitHandlerProfile(inputsArr) {
    profileInfo.setUserInfo(inputsArr.name, inputsArr.job);
}

function submitHandlerCard(inputsArr) {
  renderCardsArr.addItem(createCard(inputsArr.title, inputsArr.link));
}

function createCard (name, link) {
  const newCard = new Card(name, link, cardTemplate, handleCardClick);
  return newCard.createCard();
}


