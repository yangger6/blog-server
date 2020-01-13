"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
const config = __importStar(require("../config/logConfig.json"));
log4js_1.configure(config);
exports.httpLog = log4js_1.getLogger('http');
exports.log = log4js_1.getLogger('app');
