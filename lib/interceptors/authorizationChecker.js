"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
// unused cause can not handler error ( author not fix this bug hummmmmmmmm.....
exports.authorizationChecker = async (action) => {
    const token = action.request.headers.authorization;
    const user = await User_1.User.findOne({
        'token.value': token
    });
    if (user) { // FIX user数据保存到内存 节省调用次数
        console.log(new Date() > user.token.expiredTime);
        return new Date() < user.token.expiredTime; // FIX 鉴权放到 mongo表达式里边
    }
    return false;
};
