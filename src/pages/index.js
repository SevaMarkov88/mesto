//import

import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {config} from "../utils/configValidation.js";
import {initialCards} from "../utils/initialCardsArr.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
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
//button edit avatar
const editAvatarButton = document.querySelector('.profile__popup');
//popup edit avatar
const formAvatarEdit = document.querySelector('.form-avatar')
// popup add card form
const formAdd = document.querySelector('.form-add');
// cards block
const cardTemplate = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.elements');
//delete card popup
const cardDeletePopup = document.querySelector('.popup_accept-delete');
let cardDeleteElement;
let userId;

//validation enable

const popupAddValidation = new FormValidator(config, formAdd);
popupAddValidation.enableValidation();
const popupEditValidation = new FormValidator(config, formEdit);
popupEditValidation.enableValidation();
const popupEditAvatarValidation = new FormValidator(config, formAvatarEdit);
popupEditAvatarValidation.enableValidation();

//profile form inputs info adding

const profileInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image');

//popups creating

const openEditPopup = new PopupWithForm('.popup_edit-profile', submitHandlerProfile);
openEditPopup.setEventListeners();
const openAddPopup = new PopupWithForm('.popup_add-card', submitHandlerCard);
openAddPopup.setEventListeners();
const openBigImg = new PopupWithImage('.popup_image-fullscreen');
openBigImg.setEventListeners();
const openDeleteCardPopup = new Popup('.popup_accept-delete');
openDeleteCardPopup.setEventListeners();
const openEditAvatarPopup = new PopupWithForm('.popup_avatar-edit', submitHandlerAvatar);
openEditAvatarPopup.setEventListeners();

//API active

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: {
    authorization: '78a9a2e8-0028-4357-9dc5-3dfee740ccb0'
  }
});

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

editAvatarButton.addEventListener('click', () => {
  openEditAvatarPopup.open();
  popupEditAvatarValidation.submitButtonDisable();
})


cardDeletePopup.querySelector('.popup__button').addEventListener('click', () => {
  console.log(cardDeleteElement)
  api.deleteCard(cardDeleteElement)
    .then(res => {
      console.log(res);
      cardDeleteElement.remove()
    })
    .catch(err => console.log(err))
  openDeleteCardPopup.close();
});


//make this when loading page
api.getUserInfo()
  .then(res => {
    profileInfo.setUserInfo(res.name, res.about);
    document.querySelector('.profile').id = res._id;
    profileInfo.setUserAvatar(res.avatar);
    userId = res._id;
  })
  .catch(err => console.log(err))

api.getInitialCards()
  .then(res => {
    res.forEach(item => initialCards.push(item));
    renderCardsArr.renderContainer();
  })
  .catch(err => console.log(err))


const renderCardsArr = new Section({
    items: initialCards,
    renderer: (item) => {
      renderCardsArr.addItem(createCard(item));
    }
  },
  cardsContainer
);

//functions

function handleCardClick(name, link) {
  openBigImg.open(name, link);
}

function handleLike(evt) {
  const element = evt.target.closest('.element');
  api.toggleLike(element)
    .then(res => {
      element.querySelector('.element__counter').textContent = res.likes.length;
      evt.target.classList.toggle('element__like_active');
    })
    .catch(err => console.log(err))
}

function submitHandlerProfile(inputsArr) {
  profileInfo.setUserInfo(inputsArr.name, inputsArr.job);
  api.updateUserInfo(inputsArr.name, inputsArr.job)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
}

function submitHandlerAvatar(input) {
  profileInfo.setUserAvatar(input.link)
  api.updateAvatar(input.link)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
}

function submitHandlerCard(inputsArr) {
  api.addNewCard(inputsArr.title, inputsArr.link)
    .then(res => {
      console.log(res);
      renderCardsArr.addItem(createCard(res));
    })
    .catch(err => console.log(err))

}

function createCard(data) {
  const newCard = new Card(data, cardTemplate, handleCardClick, handleDeleteCard, handleLike, userId);
  return newCard.createCard();
}

function handleDeleteCard(evt) {
  openDeleteCardPopup.open();
  cardDeleteElement = evt.target.closest('.element');
}



