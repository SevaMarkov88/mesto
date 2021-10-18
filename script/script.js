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
// popup image & title
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__subtitle');
// cards block '.elements'
const cardsSection = document.querySelector('.elements');

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
// find all popup close buttons
closePopupActive();

// Listeners
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = progileSubtitle.textContent;
  openPopup(popupEditProfile);
});
addButton.addEventListener('click', () => {
  titleInput.value = '';
  linkInput.value = '';
  openPopup(popupAddCard);
});
formEdit.addEventListener('submit', handleEditProfile);
formAdd.addEventListener('submit', handleAddCard);

// functions

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  progileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCard(evt) {
  evt.preventDefault();
  const newArray = { name: titleInput.value, link: linkInput.value };
  initialCards.push(newArray);
  renderCard(newArray);
  closePopup(popupAddCard);
}

function closePopupActive() {
  const closePopupList = Array.from(document.querySelectorAll('.popup__close'));
  closePopupList.forEach((button) => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      popup.classList.remove('popup_opened');
    });
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function renderCard(arr) {
  const cardElement = createCard(arr);
  cardsSection.prepend(cardElement);
}

function createCard(arr) {
  const cardTemplate = document.querySelector('.template').content;
  const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);

  cardBlock.querySelector('.element__image').src = arr.link;
  cardBlock.querySelector('.element__image').alt = arr.name;
  cardBlock.querySelector('.element__title').textContent = arr.name;

  cardBlock.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  cardBlock.querySelector('.element__trash').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  cardBlock.querySelector('.element__image').addEventListener('click', () => {
  popupImagePicture.src = arr.link;
  popupImagePicture.alt = arr.name;
  popupImageTitle.textContent = arr.name;
  openPopup(popupImage);
  });

  return cardBlock;
}

