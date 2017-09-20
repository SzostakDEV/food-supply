const _ = require('lodash');
const Sequelize = require('sequelize');
const { CONFIG } = require('../../config/Config');

class ItemNotFoundError extends Error { }

let _items = [];

class Container {
    static async init(){
        const res = await Container.getSequelize();

        _items = [];
    }

    static get(key){
        if(_.isUndefined(_items) || _.isUndefined(_items[key])){
            throw new ItemNotFoundError('Item not found: ' + key);
        }

        return _items[key];
    }

    static set(key, val){
        _items[key] = val;
    }

    static getSequelize(){
        try {
            return Container.get('sequelize');
        }
        catch(err){
            const sequelize = new Sequelize(CONFIG.SEQUELIZE.postgresURL, {
                dialectOptions: {
                    ssl: true
                },
                schema: "salesforce"
            });

            Container.set('sequelize', sequelize);

            return sequelize;
        }
    }

    static getRedisImporter(){
        try {
            return Container.get('redis_importer');
        }
        catch(err){
            const redisImporter = new RedisImporter(Container.getRedis(), Container.getSequelize());

            Container.set('redis_importer', redisImporter);

            return redisImporter;
        }
    }

    static getPostgresImporter(){
        try {
            return Container.get('postgres_importer');
        }
        catch(err){
            const postgresImporter = new PostgresImporter(Container.getRedis(), Container.getSequelize());

            Container.set('postgres_importer', postgresImporter);

            return postgresImporter;
        }
    }
}

module.exports = { Container, ItemNotFoundError }