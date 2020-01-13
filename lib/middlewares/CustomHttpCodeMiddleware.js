"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let CustomHttpCodeMiddleware = class CustomHttpCodeMiddleware {
    async use(ctx, next) {
        if (ctx.response && ctx.response.body && ctx.response.body.httpCode) { // catch custom httpCode
            ctx.response.status = ctx.response.body.httpCode; // set response status
            delete ctx.response.body.httpCode; // delete unused property
        }
        return next(); // cannot await next()
    }
};
CustomHttpCodeMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], CustomHttpCodeMiddleware);
exports.CustomHttpCodeMiddleware = CustomHttpCodeMiddleware;
