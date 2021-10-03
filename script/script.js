// variables

const editButton = document.querySelector(".profile__button-edit");
const popupWindow = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const progileSubtitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_name");
const jobInput = formElement.querySelector(".popup__input_job");

// Listeners

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

// functions

function openPopup() {
  popupWindow.classList.add("popup_opened");
  if (nameInput.value === "") {
    nameInput.value = profileTitle.textContent;
  }
  if (jobInput.value === "") {
    jobInput.value = progileSubtitle.textContent;
  }
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
