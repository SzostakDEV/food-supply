const { BootstrapInterface } = require('../bootstrap/BootstrapInterface');
const { CONFIG } = require('../../config/Config');
const { Container } = require('../container/Container');
const { RouteManager } = require('./RouteManager');
var Table = require('cli-table2');

class RouteBootstrap extends BootstrapInterface {
    static async run(app){
        const routeTable = CONFIG.ROUTE_TABLE;
        RouteBootstrap._app = app;

        for(const method in routeTable){
            if(!routeTable.hasOwnProperty(method)){
                return;
            }

            for(const route of routeTable[method]){
                RouteBootstrap.createRoutes(method, route);
            }
        }

        const table = new Table({
            head: ['Method', 'Path'],
            colWidths: [10, 90],
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        });

        table.options.colWidths = [];
        table.options.rowHeights = []

        for(const method in RouteBootstrap.routeMap){
            const item = RouteBootstrap.routeMap[method];
            for(const route in item){
                table.push([method, route]);
            }
        }

        console.log(table.toString());

        const routeManager = new RouteManager(RouteBootstrap.routeMap);
        Container.set('route_manager', routeManager);
    }

    static createRoute(method, parent, route){
        if(route.acl === undefined){
            if(parent.acl === undefined){
                parent.acl = 'logged';
            } else {
                route.acl = parent.acl;
            }
        }

        if(parent === null) {
            RouteBootstrap.finallyCreateRoute(method, route.path, route);
        } else {
            RouteBootstrap.finallyCreateRoute(method, parent.path + route.path, route);
        }
    }

    static finallyCreateRoute(method, path, route){
        const app = RouteBootstrap._app;

        if (method === "get") {
            let str;

            if(route.args !== undefined){
                if(route.args.length === 1){
                    if(path[path.length - 1] === '/'){
                        str = ":" + route.args[0]
                    } else {
                        str = "/:" + route.args[0];
                    }
                } else {
                    str = "/:" + route.args.join("/:");
                }
            }
            path += str;

            app.get(path, CONFIG.ACL_ALLOWED_METHOD);
            app.get(path, ...route.actions);
        } else if (method === "post") {
            app.post(path, CONFIG.ACL_ALLOWED_METHOD);
            app.post(path, ...route.actions);
        }

        if(RouteBootstrap.routeMap[method] === undefined) RouteBootstrap.routeMap[method] = [];
        RouteBootstrap.routeMap[method][path] = route;
    }

    static createRoutes(method, data){
        if(data.child === undefined){
            RouteBootstrap.createRoute(method, null, data);
        } else {
            for(const route of data.child){
                RouteBootstrap.createRoute(method, data, route);
            }
        }
    }

    static getRequired(){
        return ['app'];
    }
}

RouteBootstrap.routeMap = [];

module.exports = { RouteBootstrap };