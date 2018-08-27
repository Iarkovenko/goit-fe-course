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

    function getAllUsers() {
    fetch(urlAPI)
        .then(res => res.json())
        .then(data => console.log(data.data));
    }

    // getAllUsers()

    function getUserById(id) {
    fetch(`${urlAPI}${id}`)
        .then(res => res.json())
        .then(data => console.log(data.data));
    }

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
        .then(data => console.log(data));
    }
    // addUser('Iarkovenko', 25)

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
    getUserById(myID);


