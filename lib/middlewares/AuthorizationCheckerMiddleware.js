"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const HttpCode_1 = __importDefault(require("../utils/HttpCode"));
class AuthorizationCheckerMiddleware {
    async use(ctx, next) {
        const token = ctx.request.headers.authorization;
        const user = await User_1.User.findOne({
            'token.value': token
        });
        if (user) { // FIX user数据保存到内存 节省调用次数
            if (user.token.expiredTime > new Date()) {
                await next();
            }
            else {
                ctx.response.status = HttpCode_1.default.UN_AUTHORIZED;
                ctx.body = {
                    error: 'auth check error',
                    details: 'token is expired'
                };
            }
        }
        else {
            ctx.response.status = HttpCode_1.default.UN_AUTHORIZED;
            ctx.body = {
                error: 'auth check error',
                details: 'not token or no login'
            };
        }
    }
}
exports.AuthorizationCheckerMiddleware = AuthorizationCheckerMiddleware;
