"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var server_1 = __importDefault(require("./server"));
var io = new socket_io_1.Server(server_1.default);
exports.default = io;
