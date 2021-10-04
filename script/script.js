// variables

const editButton = document.querySelector(".profile__button-edit");
const popupWindow = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const progileSubtitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__text_input-type_name");
const jobInput = formElement.querySelector(".popup__text_input-type_job");

// Listeners

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

// functions

function openPopup() {
  popupWindow.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = progileSubtitle.textContent;
}

function closePopup() {
  popupWindow.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  progileSubtitle.textContent = jobInput.value;
  closePopup();
}
