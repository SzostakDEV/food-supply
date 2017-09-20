const { BootstrapInterface } = require('../bootstrap/BootstrapInterface');
const { CONFIG } = require('../../config/Config');

class ControllerBootstrap extends BootstrapInterface {
    static async run(){
        for(const controller of CONFIG.CONTROLLERS){
            if(controller.init){
                controller.init();
            }
        }
    }
}

module.exports = { ControllerBootstrap };