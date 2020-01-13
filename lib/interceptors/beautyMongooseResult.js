"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
exports.beautyMongooseResult = (action, content) => {
    const dataIsArray = (obj) => obj.data instanceof Array;
    const toObject = (obj) => {
        if (obj.data && obj.data.length) {
            obj.data = obj.data.map(toObject);
            return obj;
        }
        return obj.toObject();
    };
    const beautyData = R.ifElse(dataIsArray, R.over(R.lensProp('data'), R.map(toObject)), R.over(R.lensProp('data'), toObject));
    return beautyData(content);
};
