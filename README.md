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


