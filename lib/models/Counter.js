"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const CounterSchema = ts_mongoose_1.createSchema({
    _id: ts_mongoose_1.Type.string({
        require: true
    }),
    seq: ts_mongoose_1.Type.number({
        default: 0
    })
});
exports.Counter = ts_mongoose_1.typedModel('Counter', CounterSchema);
