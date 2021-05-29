const ApiError = require("../error/ApiError");

// можно обойтись без класса создавая просто ф-ции, но
// классы группируют
class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const query = req.query;
        if (!query.val){
            return next(ApiError.badRequest('не задан ID'))
        }
        res.json(query.val);

    }

}

// на выходе новый объект, созданный из этого класса
module.exports = new UserController()