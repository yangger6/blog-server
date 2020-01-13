"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
exports.currentUserChecker = async (action) => {
    const token = action.request.headers.authorization;
    const user = await User_1.User.findOne({
        'token.value': token
    });
    return user;
};
