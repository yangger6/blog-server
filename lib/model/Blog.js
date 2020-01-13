"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const Counter_1 = require("./Counter");
const Log_1 = require("../plugins/Log");
const PhotoService_1 = __importDefault(require("../services/PhotoService"));
const BlogSchema = ts_mongoose_1.createSchema({
    id: ts_mongoose_1.Type.number({
        default: 0
    }),
    title: ts_mongoose_1.Type.string(),
    describe: ts_mongoose_1.Type.optionalString(),
    cover: ts_mongoose_1.Type.optionalString({
        default: ''
    }),
    headImage: ts_mongoose_1.Type.string({
        default: 'https://avatars3.githubusercontent.com/u/23329645?s=460&v=4'
    }),
    author: ts_mongoose_1.Type.string(),
    body: ts_mongoose_1.Type.string(),
    tags: ts_mongoose_1.Type.array({
        default: []
    }).of(ts_mongoose_1.Type.string()),
    markdown: ts_mongoose_1.Type.optionalString(),
    hidden: ts_mongoose_1.Type.boolean({
        default: false
    }),
    type: ts_mongoose_1.Type.number({
        default: 1,
        enum: [1, 2, 3] // default router password
    }),
    password: ts_mongoose_1.Type.optionalNumber(),
    meta: ts_mongoose_1.Type.object({
        default: {}
    }).of({
        votes: ts_mongoose_1.Type.number({
            default: 0
        }),
        favs: ts_mongoose_1.Type.number({
            default: 0
        }),
    }),
    theme: ts_mongoose_1.Type.object({
        default: {}
    }).of({
        dominant: ts_mongoose_1.Type.string({
            default: ''
        }),
        secondary: ts_mongoose_1.Type.string({
            default: ''
        }),
    })
}, {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});
BlogSchema.pre('save', async function (next) {
    try {
        const doc = this;
        const result = await Counter_1.Counter.findOneAndUpdate({
            _id: 'blogId'
        }, {
            $inc: {
                seq: 1
            }
        }, {
            new: true,
            upsert: true
        });
        if (result) {
            doc.id = result.seq;
            if (!doc.cover) {
                const cover = await PhotoService_1.default.getRandomCover();
                doc.cover = cover.url;
                if (cover.theme) {
                    doc.theme = cover.theme;
                }
            }
            if (!doc.theme) {
                const theme = await PhotoService_1.default.getImageTheme(doc.cover);
                if (theme) {
                    doc.theme = theme;
                }
            }
        }
        await next();
    }
    catch (e) {
        Log_1.log.error(`blog add id error`);
        Log_1.log.error(e);
    }
});
exports.Blog = ts_mongoose_1.typedModel('Blog', BlogSchema);
