# Проект: Место

### Обзор

* Интро
* Технологии

---

**Интро**

Здесь будет проект о красивых местах нашей родины.
Все изоброжения оптимизированны на [сайте доброй панды](https://tinypng.com).


**Технологии**

* Grid Layout, Flex и медиазапросы дают сайту быть адаптивным.
```css
.elements {
   display: grid;
   grid-template-columns: repeat(auto-fit, 282px);
   row-gap: 20px;
   column-gap: 17px;
   justify-content: center;
}
```
* JS оживляет проект и добавляет немного магии.
```js
let elementLike = Array.from(document.querySelectorAll('.element__like'));

elementLike.forEach((img, index) => {
  img.addEventListener("click", () => {
    img.classList.toggle("element__like_active");
    img.setAttribute('style', 'opacity: 1');
  });
});
```


