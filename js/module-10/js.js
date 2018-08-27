/*
    Написать приложение для работы с REST сервисом,
    все функции делают запрос и возвращают Promise
    с которым потом можно работать.

    Реализовать следующий функционал:
    - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.

    - функция getUserById(id) - должна вернуть пользователя с переданным id.

    - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.

    - функция removeUser(id) - должна удалять из БД юзера по указанному id.

    - функция updateUser(id, user) - должна обновлять данные пользователя по id.
        user это объект с новыми полями name и age.
    Документацию по бэкенду и пример использования прочитайте
    в документации https://github.com/trostinsky/users-api#users-api.
    Сделать минимальный графический интерфейс в виде панели с полями и кнопками.
    А так же панелью для вывода результатов операций с бэкендом.
    */

const urlAPI = "https://test-users-api.herokuapp.com/users/";

// ==========================================================
const btnGetAllUsers = document.querySelector(".js-btn-getAllUsers");
const allUsersList = document.querySelector(".js-allUsersList");
btnGetAllUsers.addEventListener("click", handleGetAllUsers);
let p;

function handleGetAllUsers() {
  fetch(urlAPI)
    .then(res => res.json())
    .then(data => {
      p = data.data.reduce(
        (acc, item) => acc + `<p>${item.name} age ${item.age}</p>`,
        ""
      );
      allUsersList.innerHTML = p;
    })

    .catch(err => console.log(err));
}
// ==========================================================
const form = document.querySelector(".getUserById");
const btnGetUserById = document.querySelector(".js-btn-getUserById");
const userField = document.querySelector(".js-getUserById");
const userId = document.querySelector(".js-enterUserId");
let p_Id;
btnGetUserById.addEventListener("click", handleGetUserById);

function handleGetUserById(e) {
  e.preventDefault();
  fetch(`${urlAPI}${userId.value}`)
    .then(res => res.json())
    .then(data => {
      userField.innerHTML = `<p>${data.data.name} age ${data.data.age}</p>`;
      userId.value = "";
    });
}

// ==========================================================

function addUser(name, age) {
  fetch(urlAPI, {
    method: "POST",
    body: JSON.stringify({ name: name, age: age }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data.data));
}
addUser('Iarkovenko', 25)

const myID = "5b839758b1650d0014c9dd94";

function removeUser(id) {
  fetch(`${urlAPI}${id}`, {
    method: "DELETE"
  }).then(() => console.log("succes"));
}
// removeUser(myID)
const postToUpdate = {
  // name: 'Iarkovenko',
  age: 2
};
function updateUser(id, user) {
  fetch(`${urlAPI}${id}`, {
    method: "PUT",
    body: JSON.stringify(postToUpdate),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data.data));
}

updateUser(myID);
