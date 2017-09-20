const { Container } = require('../container/Container');
const { SessionManager } = require('../../app/api/v1/session/SessionManager');

class Acl {
    static isAllowed(req, res, next) {
        const routeManager = Container.get('route_manager');
        const role = routeManager.getRoute(req.method.toLowerCase(), req.route.path).acl;

        if(role === 'guest') next();
        else {
            const sid = req.headers.sid || '';
            const session = SessionManager.getSession(sid);
            if(session === undefined || session === null){
                res.status(403).json({
                   "message": "Not allowed",
                   "code": 2
                });
            } else {
                if(role === 'logged' && (session.data.role === 'admin' || session.data.role === 'logged')){
                    next();
                } else if(role === 'admin' && session.data.role === 'admin'){
                    next();
                } else {
                    res.status(403).json({
                        "message": "Not allowed",
                        "code": 2
                    });
                }
            }
        }
    }
}

module.exports = { Acl };