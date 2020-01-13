"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const koa_1 = __importDefault(require("koa"));
const models_1 = require("./models");
const Log_1 = require("./plugins/Log");
const CurrentUserChecker_1 = require("./interceptors/CurrentUserChecker");
async function startApp() {
    const app = new koa_1.default();
    await models_1.connectDB();
    Log_1.log.info('the app is starting');
    routing_controllers_1.useKoaServer(app, {
        routePrefix: '/api',
        currentUserChecker: CurrentUserChecker_1.currentUserChecker,
        controllers: [__dirname + '/controllers/**/*.js'],
        middlewares: [__dirname + '/middlewares/**/*.js'],
        interceptors: [__dirname + '/interceptors/**/*.js'],
        // authorizationChecker,
        validation: true,
        defaultErrorHandler: true,
    }).listen(3000, () => {
        console.log(`server listen 3000 port`);
    });
}
startApp();
