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
// popup image & title
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__subtitle');
// cards block '.elements'
const cardsSection = document.querySelector('.elements');
// popup closing buttons array
const popupsList = Array.from(document.querySelectorAll('.popup'));

// cards array
/**
 * Array of card, consist of objects with card title and card image link
 */
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

// Listeners
/**
 * Place profile title and subtitle from page to input field whet opening popupEditProfile
 * active by clicking editButton
 */
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});
/**
 * Clear input field in popupAddCard when opening it
 * active by clicking addButton
 */
addButton.addEventListener('click', () => {
  formAdd.reset();
  openPopup(popupAddCard);
  toggleSubmitButton(formAdd, formAdd.querySelector('.popup__button'));
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
      deleteErrorMessage(popup.querySelector('.popup__form'));
    }
  });
});

// functions

/**
 * Opening popup window by adding new class to popup block
 * @param {Element} popup what you want to open
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => {popupEscClose(evt, popup)});
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
  renderCard(newArray);
  closePopup(popupAddCard);
}

/**
 * Closing popup window
 * @param {element} popup window what you want to close
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => {popupEscClose(evt, popup)});
}

/**
 * Render card block on page
 * @param {Object} obj object with card title and img link what need to render
 */
function renderCard(obj) {
  const cardElement = createCard(obj);
  cardsSection.prepend(cardElement);
}

/**
 * Create card block and make buttons trash & like active and put card info in popupImage
 * @param {Object} obj take info from initialCards array
 * @returns {Element} new cardBlock what ready to render
 */
function createCard(obj) {
  const cardTemplate = document.querySelector('.template').content;
  const cardBlock = cardTemplate.querySelector('.element').cloneNode(true);

  cardBlock.querySelector('.element__image').src = obj.link;
  cardBlock.querySelector('.element__image').alt = obj.name;
  cardBlock.querySelector('.element__title').textContent = obj.name;

  cardBlock.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });

  cardBlock.querySelector('.element__trash').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  cardBlock.querySelector('.element__image').addEventListener('click', () => {
    popupImagePicture.src = obj.link;
    popupImagePicture.alt = obj.name;
    popupImageTitle.textContent = obj.name;
    openPopup(popupImage);
    addCloseListeners(popupImage);
  });

  return cardBlock;
}

/**
 * closing popup by pressing "ESC"
 * @param evt
 * @param {element} popup popup window to close
 */
function popupEscClose (evt, popup) {
  const key = evt.key;
  if (key === 'Escape') {
    closePopup(popup);
    deleteErrorMessage(popup.querySelector('.popup__form'));
  }
}

//make this when loading page

//add initial cards on page
initialCards.forEach(renderCard);



