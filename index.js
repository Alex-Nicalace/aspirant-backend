require('dotenv').config(); // позволяет использовать файл переменных окружения
const express = require('express'); //импорт фрейммворка
const sequelize = require('./db'); // импорт конфигурации БД
//const models = require('./models/models'); // импорт созданных моделей (ORM)
const cors = require('cors'); // импорт функции cors из пакета cors
const fileUpload = require('express-fileupload'); //для работы с файлами
const router = require('./routes'); // импорт основного роутера
const errorHandler = require('./middleware/ErrorHandlerMiddleware'); // мидлваре который работает с ошибками
const path = require('path'); //  утилиты для работы с путями к файлам и каталогам

const PORT = process.env.PORT || 8080;
//необходимо указать серверу, что файлы из папки static необходмио раздавать как статику
const app = express();
app.use(cors()); // настройка cors для возможности отправлять запросы с браузера
app.use(express.json()) // чтобы приложение могло парсить json
app.use(express.static(path.resolve(__dirname, 'static'))); // чтобы из браузера был доступ к файлам
app.use(fileUpload({})); //регистрация ф-ции для работы с файлами
app.use('/api', router);

// обработка ошибок, последний Middleware
app.use(errorHandler); // мидл кот. работает с ошибками должен регистрироваться в самом конце

// должно быть последним
app.use('/', express.static(path.join(__dirname,'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// описание функции для подключения к базе данных
const start = async () => {
    //все операции с БД ассинхроны
    try {
        // у объекта , кот. сюда импортирован вызываем ф-цию authenticate...
        // c помощью нее устанавливается подключение к БД. т.к. ф-ция
        // асинхронная исп. зарезервированное слово await
        await sequelize.authenticate();

        await sequelize.sync( // ф-ция sync() сверяет состояние БД со схемой данных
            //{ alter: true } // проверяет состяние таблиц в СУБД и приводит в соответствие с описанием моделей, но не добавлет поля вроде а по справке дожно блять
            //{force: true} // создает таблицу, сначала удяляя ее, если она уже существует
            // сервер не отвечае при указании одной из опций
        );

        app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
    } catch (e) {

    }
}
// вызываю функцию для подключения к базе данных
start();



