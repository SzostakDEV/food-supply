const { Container } = require('../container/Container');
const { RouteResponseUtil } = require('../util/RouteResponseUtil');

class BaseController {
    static getContainer(){
        return Container;
    }

    static async init(){ }

    static getModel(key){
        return Container.get('database_manager').getModel(key);
    }

    static getSequelize(){
        return Container.get('database_manager').getSequelize();
    }

    static getRouteResponseUtil(){
        return RouteResponseUtil;
    }

    static async getAll(req, res, next){
        const key = req.route.path.split('/')[1];

        if(BaseController._model[key] === undefined){
            next();
            return;
        }

        const Model = BaseController._model[key];

        const since = req.params.since;

        return Model.findAll().then((results) => {
            if(results === null){
                res.status(400).json({
                    "message": "Not found",
                    "code": 1
                });
                next();
            } else {
                res.status(200).json(results.map(result => result.dataValues));
                next();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    static async get(req, res, next){
        const key = req.route.path.split('/')[1];

        if(BaseController._model[key] === undefined){
            next();
            return;
        }

        const Model = BaseController._model[key];

        const id = req.params.id || 1;

        return Model.findOne({
            where: {
                id: id
            }
        }).then((result) => {
            if(result === null){
                res.status(400).json({
                    "message": "Not found",
                    "code": 1
                });
                next();
            } else {
                res.status(200).json(result.dataValues);
                next();
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = BaseController;