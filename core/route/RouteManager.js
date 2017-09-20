class RouteManager {
    constructor(routes){
        this._routes = routes;
    }

    getRoute(method, path) {
        const routes = (this._routes[method] === undefined)? [] : this._routes[method];
        return routes[path];
    }
}

module.exports = { RouteManager };