"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
const User_1 = require("../models/User");
const Log_1 = require("../plugins/Log");
const UtilsFuntions_1 = require("../utils/UtilsFuntions");
const Httpcode_1 = __importDefault(require("../utils/Httpcode"));
exports.default = {
    async login(userName, password) {
        try {
            const user = await User_1.User.findOne({
                $or: [
                    { userName },
                    { email: userName }
                ]
            });
            const hashPassword = R.compose(UtilsFuntions_1.hash, UtilsFuntions_1.mergeString);
            if (R.equals(user.password, hashPassword(password, user.salt))) {
                const nowAddTenMinutes = () => new Date().getTime() + 100 * 60 * 1000;
                const token = {
                    value: UtilsFuntions_1.genToken(),
                    expiredTime: nowAddTenMinutes()
                };
                user.token = token;
                await user.save();
                Log_1.log.info(`user login -> ${user.userName}`);
                return {
                    msg: 'ok',
                    data: token
                };
            }
            else {
                return {
                    error: 'login error',
                    detail: 'please checked you password',
                    httpCode: Httpcode_1.default.UN_AUTHORIZED
                };
            }
        }
        catch (e) {
            return {
                error: 'login error',
                detail: 'please checked you password or username',
                httpCode: Httpcode_1.default.UN_AUTHORIZED
            };
        }
    },
    async register(user) {
        try {
            const genSaltAndPassword = R.pipe(R.assoc('salt', UtilsFuntions_1.genSalt()), R.assoc('password', UtilsFuntions_1.hash(user.password + String(R.prop('salt')))));
            const newUser = new User_1.User(genSaltAndPassword(user));
            await newUser.save();
            Log_1.log.info(`user register -> ${user.userName}`);
            return {
                msg: 'ok',
            };
        }
        catch (e) {
            return {
                error: 'register error',
                detail: e.message,
                httpCode: Httpcode_1.default.INTERNAL_SERVER_ERROR
            };
        }
    }
};
