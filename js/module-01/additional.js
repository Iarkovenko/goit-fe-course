/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'

*/

const sharm = 15;
const hurgada = 25;
const taba = 6;

const welcome = 'Добро пожаловать в турагенство Iarkovenko Travel';
const countTripPlace = prompt(`${welcome}. \nВведите число необходимых мест`);


const checkNumber = Number.parseInt(countTripPlace);
const inputPlace = checkNumber; // необходимо предложить ввести число необходимых мест,результат сохранить в переменную.
const trueInputPlace = checkNumber > 0;

const checkInputPlace = checkNumber <= Math.max(sharm, hurgada, taba);
const maxPlaceGroup =  Math.max(sharm, hurgada, taba);
const minPlaceGroup = Math.min(sharm, hurgada, taba);

const allGroup = maxPlaceGroup >= inputPlace;
const twoGroup = inputPlace > minPlaceGroup;
const oneGroup = inputPlace > sharm;


let findPlace;

if (countTripPlace === null) {
    alert('Заходите к нам еще!)')
}
else {
    switch(trueInputPlace) {
        case true: // последовательно проверить кол-во мест в группах, и кол-во необходимых мест введенных пользователем.
                switch (checkInputPlace) {
                    case true:
                            switch(true) {    // последовательно проверить кол-во мест в группах, и кол-во необходимых мест введенных пользователем.
                                case oneGroup:
                                    findPlace = confirm(`Мы нашли для Вас места группе Hurgada. \nCогласны ли Вы быть в этой группе?`);
                                        if (findPlace === true) {
                                            alert('Приятного путешествия в группе Hurgada');
                                        } else {
                                             alert('Нам очень жаль, приходите еще!');
                                        }
                                    break;           
                                case twoGroup:
                                findPlace = confirm(`Мы нашли для Вас места группах Sharm, Hurgada. \nCогласны ли Вы быть в этой группе?`);
                                        if (findPlace === true) {
                                            alert(`Мы с Вами свяжемся для уточнения группы. \nПриятного путешествия в группе Hurgada или Sharm`);
                                        } else {
                                            alert('Нам очень жаль, приходите еще!');
                                        }
                                    break;
                                case allGroup:
                                    findPlace = confirm(`Мы нашли для Вас места группах Taba, Sharm, Hurgada. \nCогласны ли Вы быть в этой группе?`);
                                        if (findPlace === true) {
                                            alert(`Мы с Вами свяжемся для уточнения группы. \nПриятного путешествия в группе Taba, Hurgada или Sharm`);
                                        } else {
                                            alert('Нам очень жаль, приходите еще!');
                                        }
                                    break;                   
                            }                          
                        break; 
                    default:
                        alert('Извините, столько мест нет ни в одной группе!');
                        break;
                }
            break;
        default: 
            alert("Ошибка ввода");
            break;
    }
}

                            