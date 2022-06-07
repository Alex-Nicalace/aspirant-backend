//конфигурирование файла подключения к базе данных
const {Sequelize} = require('sequelize'); // подключение модуля и сразу же деструктуризация

const proConfig = process.env.DATABASE_URL
const devConfig = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`


// создаю объект и сразу же его экспортирую на месте
// объект используется в index.js
module.exports = new Sequelize(
    process.env.NODE_ENV === 'production' ? proConfig : devConfig,
    process.env.NODE_ENV === 'production'
        ? {
            ssl: true,
            dialectOptions: {
                ssl: {
                    require: true, // This will help you. But you will see nwe error
                    rejectUnauthorized: false // This line will fix new error
                },
            },
        }
        : {}

)