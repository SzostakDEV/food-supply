class RouteResponseUtil {
    static routeNotFound(res){
        res.status(404).json({
            "message": "Page not exist"
        });
    }

    static invalidParams(res){
        res.status(400).json({
            "message": "Invalid params"
        });
    }

    static forbidden(res){
        res.status(401).json({
            "message": "Authorize first"
        });
    }
}

module.exports = { RouteResponseUtil };