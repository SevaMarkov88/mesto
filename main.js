(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.url=e.baseUrl,this.token=e.headers.authorization}var n,r;return n=t,(r=[{key:"_handleFetch",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this.url,"/users/me"),{method:"GET",headers:{authorization:this.token,"Content-Type":"application/json"}}).then((function(t){return e._handleFetch(t)}))}},{key:"getCardUserName",value:function(e){var t=this;return fetch("".concat(this.url,"/cards/").concat(e),{method:"GET",headers:{authorization:this.token,"Content-Type":"application/json"}}).then((function(e){return t._handleFetch(e)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this.url,"/cards"),{method:"GET",headers:{authorization:this.token,"Content-Type":"application/json"}}).then((function(t){return e._handleFetch(t)}))}},{key:"addNewCard",value:function(e,t){var n=this;return fetch("".concat(this.url,"/cards"),{method:"POST",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify({name:e,link:t})}).then((function(e){return n._handleFetch(e)}))}},{key:"toggleLike",value:function(e){var t=this;return console.log(e.id),e.querySelector(".element__like").classList.contains("element__like_active")?fetch("".concat(this.url,"/cards/").concat(e.id,"/likes"),{method:"DELETE",headers:{authorization:this.token,"Content-Type":"application/json"}}).then((function(e){return t._handleFetch(e)})):fetch("".concat(this.url,"/cards/").concat(e.id,"/likes"),{method:"PUT",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify({likes:[]})}).then((function(e){return t._handleFetch(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this.url,"/cards/").concat(e.id),{method:"DELETE",headers:{authorization:this.token,"Content-Type":"application/json"}}).then((function(e){return t._handleFetch(e)}))}},{key:"updateUserInfo",value:function(e,t){var n=this;return fetch("".concat(this.url,"/users/me"),{method:"PATCH",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:t})}).then((function(e){return n._handleFetch(e)}))}},{key:"updateAvatar",value:function(e){var t=this;return fetch("".concat(this.url,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(e){return t._handleFetch(e)}))}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._likes=t.likes.length,this._cardId=t._id,this._pageOwnerId=a,this._ownerId=t.owner._id,this._cardBlock=n.querySelector(".element").cloneNode(!0),this._handleCardClick=r,this._handleDeleteCard=o,this._handleLike=i,this._cardImage=this._cardBlock.querySelector(".element__image"),this._likeCounter=this._cardBlock.querySelector(".element__counter")}var t,r;return t=e,(r=[{key:"createCard",value:function(){return this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardBlock.id=this._cardId,this._likeCounter.textContent=this._likes,this._cardBlock.querySelector(".element__title").textContent=this._name,this._pageOwnerId!==this._ownerId&&this._cardBlock.querySelector(".element__trash").remove(),this._setEventListeners(),this._cardBlock}},{key:"_setEventListeners",value:function(){var e=this,t=this._cardBlock.querySelector(".element__trash");this._cardBlock.querySelector(".element__like").addEventListener("click",(function(t){e._handleLike(t)})),this._cardBlock.contains(t)&&this._cardBlock.querySelector(".element__trash").addEventListener("click",(function(t){e._handleDeleteCard(t)})),this._cardImage.addEventListener("click",(function(){return e._handleCardClick(e._name,e._link)}))}}])&&n(t.prototype,r),e}();function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._form=n,this._inputList=function(e){if(Array.isArray(e))return o(e)}(r=this._form.querySelectorAll(this._config.inputSelector))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){var e=this;this._toggleSubmitButton(this._submitButton),this._deleteErrorMessage(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleSubmitButton(e._submitButton)}))}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideErrorMassage(e):this._showErrorMassage(e)}},{key:"_showErrorMassage",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error")),n=e.validationMessage.split(".")[0];e.classList.add(this._config.inputErrorClass),t.textContent=n,t.classList.add(this._config.errorClass)}},{key:"_hideErrorMassage",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._config.inputErrorClass),t.textContent="",t.classList.remove(this._config.errorClass)}},{key:"_toggleSubmitButton",value:function(){this._form.checkValidity()?(this._submitButton.classList.remove(this._config.inactiveButtonClass),this._submitButton.disabled=!1):this.submitButtonDisable()}},{key:"_deleteErrorMessage",value:function(){var e=this;this._inputList.forEach((function(t){e._hideErrorMassage(t)}))}},{key:"submitButtonDisable",value:function(){this._submitButton.disabled=!0,this._submitButton.classList.add(this._config.inactiveButtonClass)}}])&&i(t.prototype,n),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._parentContainer=n}var t,n;return t=e,(n=[{key:"renderContainer",value:function(){var e=this;this._items.forEach((function(t){return e._renderer(t)}))}},{key:"addItem",value:function(e){this._parentContainer.prepend(e)}}])&&c(t.prototype,n),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._handleClickClose=this._handleClickClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleClickClose",value:function(e){(e.target===this._popup||e.target.classList.contains("popup__close"))&&this.close()}},{key:"setEventListeners",value:function(){this._popup.addEventListener("click",this._handleClickClose)}}])&&s(t.prototype,n),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=_(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},d.apply(this,arguments)}function _(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}function v(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return v(this,e)});function a(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popup.querySelector("form"),n._formSubmit=t,n._handleSubmitListener=n._handleSubmitListener.bind(m(n)),n._inputList=function(e){if(Array.isArray(e))return h(e)}(r=n._form.querySelectorAll(".popup__text"))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){d(b(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handleSubmitListener)}},{key:"_handleSubmitListener",value:function(e){e.preventDefault(),this.renderLoading(!0),this._formSubmit(this._getInputValues()),this.close(),this.renderLoading(!1)}},{key:"renderLoading",value:function(e){this._form.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}},{key:"close",value:function(){this._form.reset(),d(b(a.prototype),"close",this).call(this)}}])&&p(t.prototype,n),a}(l);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}function E(e,t){return E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},E(e,t)}function L(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(o){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t}return t=a,(n=[{key:"open",value:function(e,t){S(j(a.prototype),"open",this).call(this),this._popupImage.src=t,this._popupImage.alt=e,this._popup.querySelector(".popup__subtitle").textContent=e}}])&&C(t.prototype,n),a}(l),I={formSelector:".popup__form",inputSelector:".popup__text",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__text_error",errorClass:"popup__span-error_active",popupClass:"popup",openedPopupClass:"popup_opened"},q=[];function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T,P,A=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(t),this._job=document.querySelector(n),this._avatar=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return[this._name.textContent,this._job.textContent]}},{key:"setUserInfo",value:function(e,t){this._name.textContent=e,this._job.textContent=t}},{key:"setUserAvatar",value:function(e){this._avatar.src=e}}])&&B(t.prototype,n),e}(),x=document.querySelector(".profile__button-edit"),R=document.querySelector(".profile__button-add"),U=document.querySelector(".form-edit"),D=U.querySelector(".popup__text_input-type_name"),z=U.querySelector(".popup__text_input-type_job"),F=document.querySelector(".profile__popup"),M=document.querySelector(".form-avatar"),V=document.querySelector(".form-add"),N=document.querySelector(".template").content,J=document.querySelector(".elements"),G=document.querySelector(".popup_accept-delete"),H=new a(I,V);H.enableValidation();var $=new a(I,U);$.enableValidation();var K=new a(I,M);K.enableValidation();var Q=new A(".profile__title",".profile__subtitle",".profile__image"),W=new g(".popup_edit-profile",(function(e){Q.setUserInfo(e.name,e.job),te.updateUserInfo(e.name,e.job).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))}));W.setEventListeners();var X=new g(".popup_add-card",(function(e){te.addNewCard(e.title,e.link).then((function(e){console.log(e),ne.addItem(ie(e))})).catch((function(e){return console.log(e)}))}));X.setEventListeners();var Y=new O(".popup_image-fullscreen");Y.setEventListeners();var Z=new l(".popup_accept-delete");Z.setEventListeners();var ee=new g(".popup_avatar-edit",(function(e){Q.setUserAvatar(e.link),te.updateAvatar(e.link).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))}));ee.setEventListeners();var te=new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-32",headers:{authorization:"78a9a2e8-0028-4357-9dc5-3dfee740ccb0"}});x.addEventListener("click",(function(){var e=Q.getUserInfo();D.value=e[0],z.value=e[1],W.open(),$.submitButtonDisable()})),R.addEventListener("click",(function(){X.open(),H.submitButtonDisable()})),F.addEventListener("click",(function(){ee.open(),K.submitButtonDisable()})),G.querySelector(".popup__button").addEventListener("click",(function(){console.log(T),te.deleteCard(T).then((function(e){console.log(e),T.remove()})).catch((function(e){return console.log(e)})),Z.close()})),te.getUserInfo().then((function(e){Q.setUserInfo(e.name,e.about),document.querySelector(".profile").id=e._id,Q.setUserAvatar(e.avatar),P=e._id})).catch((function(e){return console.log(e)})),te.getInitialCards().then((function(e){e.forEach((function(e){return q.push(e)})),ne.renderContainer()})).catch((function(e){return console.log(e)}));var ne=new u({items:q,renderer:function(e){ne.addItem(ie(e))}},J);function re(e,t){Y.open(e,t)}function oe(e){var t=e.target.closest(".element");te.toggleLike(t).then((function(n){t.querySelector(".element__counter").textContent=n.likes.length,e.target.classList.toggle("element__like_active")})).catch((function(e){return console.log(e)}))}function ie(e){return new r(e,N,re,ae,oe,P).createCard()}function ae(e){Z.open(),T=e.target.closest(".element")}})();