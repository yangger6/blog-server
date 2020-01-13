"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const v4_1 = __importDefault(require("uuid/v4"));
const UserSchema = ts_mongoose_1.createSchema({
    id: ts_mongoose_1.Type.string({
        default: v4_1.default // FIX
    }),
    userName: ts_mongoose_1.Type.string(),
    password: ts_mongoose_1.Type.string(),
    salt: ts_mongoose_1.Type.string(),
    email: ts_mongoose_1.Type.string(),
    token: ts_mongoose_1.Type.object({
        default: {}
    }).of({
        value: ts_mongoose_1.Type.string(),
        expiredTime: ts_mongoose_1.Type.date()
    }),
    createTime: ts_mongoose_1.Type.date({
        default: Date.now,
    }),
    updateTime: ts_mongoose_1.Type.date({
        default: Date.now
    })
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});
exports.User = ts_mongoose_1.typedModel('User', UserSchema);
