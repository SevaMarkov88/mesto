// popup opening and closing

const editButton = document.querySelector(".profile__button_edit");
const popupWindow = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);

function openPopup() {
  if (!popupWindow.classList.contains("popup_opened")) {
    popupWindow.classList.add("popup_opened");
  }
}

function closePopup() {
  if (popupWindow.classList.contains("popup_opened")) {
    popupWindow.classList.remove("popup_opened");
  }
}

//input to profile

let profileTitle = document.querySelector(".profile__title");
let progileSubtitle = document.querySelector(".profile__subtitle");

let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".name-input");
let jobInput = formElement.querySelector(".job-input");

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

  profileTitle.textContent = name;
  progileSubtitle.textContent = job;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
