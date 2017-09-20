const _ = require('lodash');

class DatabaseManagerError extends Error {}

class DatabaseManager {
    constructor(sequelize, models){
        this._models = models;
        this._sequelize = sequelize;
    }

    getModel(key){
        if(_.isUndefined(this._models[key]) || _.isNull(this._models[key])){
            throw new DatabaseManagerError('MODEL NOT FOUND : ' + key);
        }

        return this._models[key];
    }

    getSequelize(){
        return this._sequelize;
    }
}

module.exports = { DatabaseManager, DatabaseManagerError };