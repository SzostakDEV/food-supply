const {CONFIG} = require('../config/Config');
const {Container} = require('./container/Container');
const _ = require('lodash');
var cors = require('cors');
var bodyParser = require('body-parser');

class Core {
    static getPort() {
        return (process.env.PORT || CONFIG.PORT || 3000);
    }

    static async run(app, bootstraps) {
        app.use(cors());
        app.use(bodyParser.json());
        Core.dependencies['app'] = app;

        for(const bootstrap of bootstraps){
            const dep = Core.parseRequired(bootstrap.getRequired());
            if(dep.length !== 0){
                await (bootstrap.run.bind(null, ...dep)());
            } else {
                await bootstrap.run();
            }
        }


        app.listen(Core.getPort(), () => {
            console.log(`App listening on PORT : ${Core.getPort()}`);
        });
    }

    static parseRequired(bootstrap){
        const depToReturn = [];

        for(const req of bootstrap) {
            if (!_.isUndefined(Core.dependencies[req]) && !_.isNull(Core.dependencies[req])) {
                depToReturn.push(Core.dependencies[req]);
            }
        }

        return depToReturn;
    }
}

Core.dependencies = [];

module.exports = {Core};