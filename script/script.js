// popup opening and closing

const editButton = document.querySelector(".profile__button-edit");
const popupWindow = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);

function openPopup() {
  popupWindow.classList.add("popup_opened");
}

function closePopup() {
  popupWindow.classList.remove("popup_opened");
}

//like element

let elementLike = Array.from(document.querySelectorAll(".element__like"));

elementLike.forEach((img, index) => {
  img.addEventListener("click", () => {
    img.classList.toggle("element__like_active");
    img.classList.toggle("element__like");
    img.setAttribute("style", "opacity: 1");
  });
});

//input to profile

const profileTitle = document.querySelector(".profile__title");
const progileSubtitle = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".name-input");
const jobInput = formElement.querySelector(".job-input");

nameInput.value = profileTitle.textContent;
jobInput.value = progileSubtitle.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();

  let job = jobInput.value;
  let name = nameInput.value;

  profileTitle.textContent = name;
  progileSubtitle.textContent = job;

  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
