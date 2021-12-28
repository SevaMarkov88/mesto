//import

import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {config} from "../utils/configValidation.js";
import UserInfo from "../components/UserInfo.js";
// import './index.css';

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

let userId
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

const profilePopup = new PopupWithForm('.popup_edit-profile', submitHandlerProfile);
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm('.popup_add-card', submitHandlerCard);
cardPopup.setEventListeners();
const bigImgPopup = new PopupWithImage('.popup_image-fullscreen');
bigImgPopup.setEventListeners();
const confirmPopup = new PopupWithConfirmation('.popup_accept-delete', submitHandlerConfirm);
confirmPopup.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_avatar-edit', submitHandlerAvatar);
avatarPopup.setEventListeners();

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
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
    profilePopup.open();
    popupEditValidation.submitButtonDisable();
});
/**
 * Clear input field in popupAddCard when opening it
 * active by clicking addButton
 */
addButton.addEventListener('click', () => {
    cardPopup.open();
    popupAddValidation.submitButtonDisable();
});

editAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
    popupEditAvatarValidation.submitButtonDisable();
})

//make this when loading page
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
        profileInfo.setUserInfo(user.name, user.about);
        profileInfo.setUserAvatar(user.avatar);
        userId = user._id;
        renderCardsArr.renderContainer(cards);
    })
    .catch(err => console.log(err))


const renderCardsArr = new Section({
        renderer: (item) => {
            renderCardsArr.addItemAppend(createCard(item));
        }
    },
    cardsContainer
);

//functions

function createCard(data) {
    const cards = new Card(data, cardTemplate, handleCardClick, {
        handleDeleteCard: (cardId) => {
        confirmPopup.open(cardId, cards.deleteCard)
        }
    }, {
        handleLike: (card) => {
            if (cards.isLiked(card)) {
                api.removeLike(card._id)
                    .then((res) => {
                        console.log(res)
                        cards.updateLike(res)
                    })
                    .catch(err => console.log(err))
            } else {
                api.addLike(card._id)
                    .then((res) => {
                        console.log(res)
                        cards.updateLike(res);
                    })
                    .catch(err => console.log(err))
            }
        }
    }, userId);
    return cards.createCard();
}

function handleCardClick(name, link) {
    bigImgPopup.open(name, link);
}

function submitHandlerProfile(inputsArr) {
    profilePopup.renderLoading(true);
    profileInfo.setUserInfo(inputsArr.name, inputsArr.job);
    api.updateUserInfo(inputsArr.name, inputsArr.job)
        .then(res => {
            console.log(res);
            profileInfo.setUserInfo(inputsArr.name, inputsArr.job);
        })
        .catch(err => console.log(err))
        .finally(() => {
            profilePopup.close();
            profilePopup.renderLoading(false)
        })
}

function submitHandlerAvatar(input) {
    avatarPopup.renderLoading(true);
    profileInfo.setUserAvatar(input.link)
    api.updateAvatar(input.link)
        .then(res => {
            console.log(res);
            profileInfo.setUserAvatar(input.link);
        })
        .catch(err => console.log(err))
        .finally(() => {
            avatarPopup.close();
            avatarPopup.renderLoading(false)
        })
}

function submitHandlerCard(inputsArr) {
    cardPopup.renderLoading(true);
    api.addNewCard(inputsArr.title, inputsArr.link)
        .then(res => {
            console.log(res);
            renderCardsArr.addItemPrepend(createCard(res));
        })
        .catch(err => console.log(err))
        .finally(() => {
            cardPopup.close();
            cardPopup.renderLoading(false)
        })
}

function submitHandlerConfirm(card, deleteFunc) {
    api.deleteCard(card.id)
        .then(() => deleteFunc(card))
        .catch(err => console.log(err))
        .finally(() => confirmPopup.close())
}