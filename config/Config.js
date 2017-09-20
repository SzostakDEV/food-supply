const {RouteTable} = require('./RouteTable');
const {Acl} = require('../core/acl/Acl');
const {FoodController} = require('../app/api/v1/food/FoodController');
const {UserController} = require('../app/api/v1/user/UserController');

const CONFIG = {
    SEQUELIZE: {
        postgresURL: process.env.DATABASE_URL,
        externalConfig: {
            timestamp: false
        }
    },
    PORT: 8080,
    TOKEN: 'polsource',
    ROUTE_TABLE: RouteTable,
    ACL_ALLOWED_METHOD: Acl.isAllowed,
    MODEL_PATH: __dirname + '/../app/model/',
    MODELS: {
        'salesforce': ['Food'],
        'public': ['User']
    },
    CONTROLLERS: [
        FoodController, UserController
    ]
};

module.exports = { CONFIG };