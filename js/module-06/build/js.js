'use strict';

var _Hamburger$SIZES, _Hamburger$STUFFINGS, _Hamburger$TOPPINGS;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Сеть фастфудов предлагает несколько видов гамбургеров.
  Основа (булочка) гамбургера может быть большой или маленькой (обязательно):
	- маленькая (+30 денег, +50 калорий)
	- большая (+50 денег, +100 калорий)
  Гамбургер может быть с одной из нескольких видов начинок (обязательно):
	- сыром (+15 денег, +20 калорий)
	- салатом (+20 денег, +5 калорий)
	- мясом (+35 денег, +15 калорий)
  Дополнительно, гамбургер можно:
	- посыпать приправой (+10 денег, +0 калорий)
	- полить соусом (+15 денег, +5 калорий)
  Напишите скрипт, расчитывающий стоимость и калорийность гамбургера. Используте ООП подход,
  создайте класс Hamburger, константы, методы для выбора опций и рассчета нужных величин.
  Написанный класс должен соответствовать следующему jsDoc описанию. То есть класс должен содержать
  указанные методы, которые принимают и возвращают данные указанного типа.
*/

/**
 * Класс, объекты которого описывают параметры гамбургера.
 */
var Hamburger = function () {
    /**
     * @constructor
     * @param {String} size - Размер
     * @param {String} stuffing - Начинка
     */
    function Hamburger(size, stuffing) {
        _classCallCheck(this, Hamburger);

        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    _createClass(Hamburger, [{
        key: 'addTopping',

        /**
         * Добавить topping к гамбургеру. Можно добавить несколько topping, при условии, что они разные.
         * @param {String} topping - Тип добавки
         */
        value: function addTopping(topping) {
            if (this.toppings.length === 0) {
                return this.toppings.push(topping);
            };
            if (this.toppings.length > 0) {
                return !this.toppings.includes(topping) ? this.toppings.push(topping) : console.log(this.toppings + ' already exist');
            };
        }

        /**
         * Убрать topping, при условии, что она ранее была добавлена
         * @param {String} topping - Тип добавки
         */

    }, {
        key: 'removeTopping',
        value: function removeTopping(topping) {
            if (this.toppings.length === 0) {
                console.log('Nothing to remove');
            }
            return this.toppings = this.toppings.filter(function (val) {
                return val !== topping;
            });
        }

        /**
         * Получить список toppings
         * @returns {Array} - Массив добавленных topping, содержит значения констант Hamburger.TOPPING_*
         *
         * Попробуйте сделать это геттером чтобы можно было обращаться как obj.toppings и нам вернет массив добавок
         */

    }, {
        key: 'getToppings',
        value: function getToppings() {
            return this.toppings;
        }

        /**
         * Узнать размер гамбургера
         * @returns {String} - размер гамбургера
         *
         * Попробуйте сделать это геттером чтобы можно было обращаться как obj.size и нам вернет размер
         */

    }, {
        key: 'getSize',
        value: function getSize() {
            return this.size;
        }

        /**
         * Узнать начинку гамбургера
         * @returns {String} - начинка гамбургера
         *
         * Попробуйте сделать это геттером чтобы можно было обращаться как obj.stuffing и нам вернет начинку
         */

    }, {
        key: 'getStuffing',
        value: function getStuffing() {
            return this.stuffing;
        }

        /**
         * Узнать цену гамбургера
         * @returns {Number} - Цена в деньгах
         *
         * Попробуйте сделать это геттером чтобы можно было обращаться как obj.price и нам вернет сумму.
         */

    }, {
        key: 'calculatePrice',
        value: function calculatePrice() {
            var totalCost = 0;
            var costOfToppings = this.toppings.reduce(function (acc, val) {
                return acc + Hamburger.TOPPINGS[val].price;
            }, 0);
            totalCost = Hamburger.SIZES[this.size].price + Hamburger.STUFFINGS[this.stuffing].price + costOfToppings;
            return totalCost;
        }

        /**
         * Узнать калорийность
         * @returns {Number} - Калорийность в калориях
         *
         * Попробуйте сделать это геттером чтобы можно было обращаться как obj.calories и нам вернет сумму.
         */

    }, {
        key: 'calculateCalories',
        value: function calculateCalories() {
            var totalCalories = 0;
            var earnCalories = this.toppings.reduce(function (acc, val) {
                return acc + Hamburger.TOPPINGS[val].calories;
            }, 0);
            totalCalories = Hamburger.SIZES[this.size].calories + Hamburger.STUFFINGS[this.stuffing].calories + earnCalories;
            return totalCalories;
        }
    }]);

    return Hamburger;
}();

/*
  Размеры, виды добавок и начинок объявите как статические поля класса.
  Добавьте отсутсвующие поля по аналогии с примером.
*/

/* Вот как может выглядеть использование этого класса */

// Маленький гамбургер с начинкой из сыра


Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE ';
Hamburger.SIZES = (_Hamburger$SIZES = {}, _defineProperty(_Hamburger$SIZES, Hamburger.SIZE_SMALL, {
    price: 30,
    calories: 50
}), _defineProperty(_Hamburger$SIZES, Hamburger.SIZE_LARGE, {
    price: 50,
    calories: 100
}), _Hamburger$SIZES);
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_MEAT = 'STUFFING_MEAT';
Hamburger.STUFFINGS = (_Hamburger$STUFFINGS = {}, _defineProperty(_Hamburger$STUFFINGS, Hamburger.STUFFING_CHEESE, {
    price: 15,
    calories: 20
}), _defineProperty(_Hamburger$STUFFINGS, Hamburger.STUFFING_SALAD, {
    price: 20,
    calories: 5
}), _defineProperty(_Hamburger$STUFFINGS, Hamburger.STUFFING_MEAT, {
    price: 35,
    calories: 15
}), _Hamburger$STUFFINGS);
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
Hamburger.TOPPING_SAUCE = 'TOPPING_SAUCE';
Hamburger.TOPPINGS = (_Hamburger$TOPPINGS = {}, _defineProperty(_Hamburger$TOPPINGS, Hamburger.TOPPING_SPICE, {
    price: 10,
    calories: 0
}), _defineProperty(_Hamburger$TOPPINGS, Hamburger.TOPPING_SAUCE, {
    price: 15,
    calories: 5
}), _Hamburger$TOPPINGS);
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// Добавка из приправы
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// Спросим сколько там калорий
console.log("Calories: ", hamburger.calculateCalories());

// Сколько стоит?
console.log("Price: ", hamburger.calculatePrice());

// Я тут передумал и решил добавить еще соус
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А сколько теперь стоит?
console.log("Price with sauce: ", hamburger.calculatePrice());

// Проверить, большой ли гамбургер?
console.log("Is hamburger large: ", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);

// Смотрим сколько добавок
console.log("Hamburger has %d toppings", hamburger.getToppings().length); // 1

/*
  🔔 Обратите внимание на такие моменты:
        ✔️ класс не взаимодействует с внешним миром. Это не его дело, этим занимается
            другой код, а класс живет в изоляции от мира
        ✔️ обязательные параметры (размер и начинка) мы передаем через конструктор,
        чтобы нельзя было создать объект, не указав их
        ✔️ необязательные (добавка) добавляем через методы
        ✔️ типы начинок обозначены "константами" с понятными именами (на самом деле просто
            свойствами, написанным заглавными буквами, которые мы договорились считать "константами")
        ✔️ объект создается через конструктор - функцию, которая задает начальные значения полей.
        ✔️ в свойствах объекта гамбургера логично хранить исходные данные (размер, тип начинки),
              а не вычисленные из них (цена, число калорий и т.д.). Рассчитывать цену и калории
        логично в тот момент, когда это потребуется, а не заранее.
*/