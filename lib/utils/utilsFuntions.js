"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const crypto_1 = require("crypto");
const R = __importStar(require("ramda"));
exports.genSalt = () => v4_1.default();
exports.hash = (str) => crypto_1.createHash('md5').update(str).digest('hex');
exports.mergeString = (str1, str2) => String(str1) + R.prop(str2);
// toekn
const rand = () => Math.random().toString(36).substr(2);
exports.genToken = () => rand() + rand();
