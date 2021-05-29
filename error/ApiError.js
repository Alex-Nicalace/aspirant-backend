// класс расширяет Error
class ApiError extends Error {
    constructor(status, message) {
        // конструктор параметрами принимает
        // статус код и сообщение, возвращаемое на клиент
        super(); // вызов родительского конструктора
        this.status = status;
        this.message = message;

    }

    // статические функции - функции, которые можно вызывать без создания объекта
    static badRequest(message){
        return new ApiError(484, message);
    }
    static internal(message){
        return new ApiError(500, message);
    }
    static forbidden(message){
        return new ApiError(403, message);
    }
}

module.exports = ApiError;