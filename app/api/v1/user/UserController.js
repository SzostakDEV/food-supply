const BaseController = require('../../../../core/controller/BaseController');
const SHA256 = require("crypto-js/sha256");
const { SessionManager } = require('../session/SessionManager');

class UserController extends BaseController {
    static init(){
        if(BaseController._model === undefined) BaseController._model = [];
        BaseController._model['user'] = super.getModel('User');
    }

    static auth(req, res, next){
        const { login, password } = req.params;

        const User = super.getModel('User');

        return User.findOne({
            where: {
                $and: {
                    login: login,
                    password: SHA256(password).toString()
                }
            }
        }).then((result) => {
            if(result !== null){
                const sid = SessionManager.createSession(result);

                res.status(200).json({
                    "message": "Ok",
                    "sid": sid
                });
            } else {
                res.status(400).json({
                    "message": "Bad credentials"
                });
            }
        });
    }
}

module.exports = { UserController };