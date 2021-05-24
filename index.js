require('dotenv').config(); // позволяет использовать файл переменных окружения
const express = require('express'); //импорт модуля
const sequelize = require('./db'); // импорт конфигурации БД

const PORT = process.env.PORT || 8080;

const app = express();

// описание функции для подключения к базе данных
const start = async () => {
    //все операции с БД ассинхроны
    try {
        // у объекта , кот. сюда импортирован вызываем ф-цию authenticate...
        // c помощью нее устанавливается подключение к БД. т.к. ф-ция
        // асинхронная исп. зарезервированное слово await
        await sequelize.authenticate();
        // ф-ция sync() сверяет состояние БД со схемой данных
        await sequelize.sync();

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {

    }
}
// вызываю функцию для подключения к базе данных
start();



