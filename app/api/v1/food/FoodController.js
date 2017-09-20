const BaseController = require('../../../../core/controller/BaseController');

class FoodController extends BaseController {
    static init(){
        if(BaseController._model === undefined) BaseController._model = [];
        BaseController._model['food'] = super.getModel('Food');
    }
}

module.exports = { FoodController };