"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authRequired(req, res, next) {
    var _a;
    var token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', function (err, decoded) {
        if ((err === null || err === void 0 ? void 0 : err.name) === 'TokenExpiredError') {
            return res.redirect('/login');
        }
        req.body.userId = decoded === null || decoded === void 0 ? void 0 : decoded.id;
        req.body.userName = decoded === null || decoded === void 0 ? void 0 : decoded.username;
        req.body.userPassword = decoded === null || decoded === void 0 ? void 0 : decoded.password;
        next();
    });
}
exports.default = authRequired;
