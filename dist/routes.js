"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var RoomController_1 = __importDefault(require("./controllers/RoomController"));
var AuthController_1 = __importDefault(require("./controllers/AuthController"));
var authRequired_1 = __importDefault(require("./middlewares/authRequired"));
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.redirect('/rooms');
});
router.get('/rooms', authRequired_1.default, RoomController_1.default.index);
router.get('/rooms/:room_name', authRequired_1.default, RoomController_1.default.room);
router.get('/login', AuthController_1.default.getLogin);
router.post('/login', AuthController_1.default.postLogin);
router.get('/signup', AuthController_1.default.getSignup);
router.post('/signup', AuthController_1.default.postSignup);
exports.default = router;
