const ApiError = require('../error/ApiError');

module.exports = function (err /*ошибка*/, req /*запрос*/, res, next /*ф-ция next*/) {
// экспорт ф-ции по сути ф-ция в данном случае и есть мидлваре
// next ф-ция перадает управление ф-ции следующей в цепочке

    if (err instanceof ApiError){
        // если класс ошибки апи ерор
        //вернуть на клиент статус ошибки
        return res.status(err.status).json({message: err.message})

    }

    return res.status(500).json({message: 'undefined error'})
}
