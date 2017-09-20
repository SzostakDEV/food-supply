const SHA256 = require("crypto-js/sha256");

class SessionManager {
    static createSession(user){
        const sid = SHA256(new Date().toUTCString()).toString();

        SessionManager._sessions[sid] = {
            data: user
        };

        return sid;
    }

    static getSession(sid){
        return SessionManager._sessions[sid];
    }
}

SessionManager._sessions = [];


module.exports = { SessionManager };