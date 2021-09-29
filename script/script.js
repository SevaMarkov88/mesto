// popup opening and closing

const editButton = document.querySelector('.profile__button-edit');
const popupWindow = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function openPopup() {
  if (!popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.add('popup_opened');
  }
}

function closePopup() {
  if (popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.remove('popup_opened');
  }
}

//like element

let elementLike = Array.from(document.querySelectorAll('.element__like'));

elementLike.forEach((img, index) => {
  img.addEventListener('click', () => {
    img.classList.toggle('element__like_active');
    img.setAttribute('style', 'opacity: 1');
  });
});

//input to profile

let profileTitle = document.querySelector('.profile__title');
let progileSubtitle = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.name-input');
let jobInput = formElement.querySelector('.job-input');

if (nameInput.value.length === 0) {
  nameInput.value = profileTitle.textContent;
}

if (jobInput.value.length === 0) {
  jobInput.value = progileSubtitle.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let job = jobInput.value;
  let name = nameInput.value;

  if (name.length > 30) {
    alert('Имя может быть не более 30 симвлов');
    return
  }
  if (job.length > 50) {
    alert('Профессия может быть не более 50 симвлов');
    return
  }

  profileTitle.textContent = name;
  progileSubtitle.textContent = job;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
