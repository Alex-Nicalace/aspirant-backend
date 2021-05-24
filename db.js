//конфигурирование файла подключения к базе данных
const {Sequelize} = require('sequelize'); // подключение модуля и сразу же деструктуризация

// создаю объект и сразу же его экспортирую на месте
// объект используется в index.js
module.exports = new Sequelize(
    // в конструктуре будет указана конфигурация
    // необходимо передать пользователя пароли и т.д.
    // данные берутся из файла .env
    process.env.DB_NAME, // название БД
    process.env.DB_USER, // пользователь
    process.env.DB_PASSWORD, // пароль
    {
        dialect: process.env.DIALECT, // диалект СУБД ...
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }

)