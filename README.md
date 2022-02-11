# Проект: Место

## Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/).

## Описание:

"Mesto" - это интерактивная страница, где пользователи могут делиться фотографиями.

[Посмотреть на GitHub Pages](https://sevamarkov88.github.io/mesto/)

## Функционал:

* Добавление и удаление фотографии
* "Лайк" для фотографии
* Редактирование профиля пользователя
* Данные хранятся на сервере и загружаются с сервера
* Валидация форм на стороне клиента
---

## Технологии:
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![HTML](https://img.shields.io/badge/-HTML-05122A?style=flat&logo=HTML5)&nbsp;
![CSS](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=CSS3&logoColor=1572B6)&nbsp;
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)&nbsp;
![GitHub](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)&nbsp;
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-05122A?style=flat&logo=visual-studio-code&logoColor=007ACC)&nbsp;
![React](https://img.shields.io/badge/-React-000?&logo=React)

1. Grid Layout, Flex и медиазапросы дают сайту быть адаптивным.
```css
.elements {
   display: grid;
   grid-template-columns: repeat(auto-fit, 282px);
   row-gap: 20px;
   column-gap: 17px;
   justify-content: center;
}
```
2. JS оживляет проект и добавляет немного магии.
```js
let elementLike = Array.from(document.querySelectorAll('.element__like'));

elementLike.forEach((img, index) => {
  img.addEventListener("click", () => {
    img.classList.toggle("element__like_active");
    img.setAttribute('style', 'opacity: 1');
  });
});
```

3. Работа с сервером.
```js
   _handleFetch(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._handleFetch(res));

    }
```


