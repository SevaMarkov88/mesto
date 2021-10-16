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
const progileSubtitle = document.querySelector('.profile__subtitle');
// popup edit profile form & bouth input
const formEdit = document.querySelector('.form-edit');
const nameInput = formEdit.querySelector('.popup__text_input-type_name');
const jobInput = formEdit.querySelector('.popup__text_input-type_job');
// popup add card form & both inputs
const formAdd = document.querySelector('.form-add');
const titleInput = formAdd.querySelector('.popup__text_input-type_title');
const linkInput = formAdd.querySelector('.popup__text_input-type_link');

// cards array
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

//make this when loading page

//add initial cards
initialCards.forEach(renderCard);
popupImageActive();
// find all like buttons & add listener
likeActive();
// find all trash buttons & add listener
deleteCardActive();
// find all popup close buttons
closePopupActive();

// Listeners
editButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
});
addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});
formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formSubmitHandler(popupEditProfile);
});
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formSubmitHandler(popupAddCard);
  popupImageActive();
});

// functions

function openPopup(popup) {
  popup.classList.add('popup_opened');
  switch (popup) {
    case popupEditProfile:
      nameInput.value = profileTitle.textContent;
      jobInput.value = progileSubtitle.textContent;
      break;
    case popupAddCard:
      titleInput.value = '';
      linkInput.value = '';
      break;
    case popupImage:
    default:
      break;
  }
}

function formSubmitHandler(popup) {
  switch (popup) {
    case popupEditProfile:
      profileTitle.textContent = nameInput.value;
      progileSubtitle.textContent = jobInput.value;
      break;
    case popupAddCard:
      const newArray = { name: titleInput.value, link: linkInput.value };
      initialCards.push(newArray);
      renderCard(newArray);
      likeActive();
      deleteCardActive();
      break;
    default:
      break;
  }
  popup.closest('.popup');
  popup.classList.remove('popup_opened');
}

function closePopupActive() {
  let closePopup = Array.from(document.querySelectorAll('.popup__close'));
  closePopup.forEach((button) => {
    button.addEventListener('click', () => {
      let popup = button.closest('.popup');
      popup.classList.remove('popup_opened');
    });
  });
}

function renderCard(arr) {
  const cardTemplate = document.querySelector('.template').content;
  const cardsSection = document.querySelector('.elements');

  const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);

  cardBlock.querySelector('.element__image').src = arr.link;
  cardBlock.querySelector('.element__image').alt = arr.name;
  cardBlock.querySelector('.element__title').textContent = arr.name;

  cardsSection.prepend(cardBlock);
}

function likeActive() {
  let cardLike = Array.from(document.querySelectorAll('.element__like'));
  cardLike.forEach((img) => {
    img.addEventListener('click', () => {
      img.classList.toggle('element__like_active');
      img.setAttribute('style', 'opacity: 1');
    });
  });
}

function deleteCardActive() {
  let trashCard = Array.from(document.querySelectorAll('.element__trash'));
  trashCard.forEach((button) => {
    button.addEventListener('click', () => {
      let cardToDelete = button.closest('.element');
      cardToDelete.remove();
    });
  });
}

function popupImageActive() {
  // let cardsArr = Array.from(document.querySelectorAll('.element'));
  let imageArr = Array.from(document.querySelectorAll('.element__image'));
  imageArr.forEach((elem) => {
    elem.addEventListener('click', () => {
      popupImage.querySelector('.popup__image').src = elem.src;
      popupImage.querySelector('.popup__image').alt = elem.alt;
      let elemParent = elem.closest('.element');
      popupImage.querySelector('.popup__subtitle').textContent =
        elemParent.querySelector('.element__title').textContent;

      popupImage.classList.add('popup_opened');
    });
  });
}
