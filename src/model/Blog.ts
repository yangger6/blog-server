import {createSchema, ExtractDoc, ExtractProps, Type, typedModel} from 'ts-mongoose'
import {Counter, CounterDoc} from './Counter'
import {log} from '../plugins/log'
import PhotoService from '../services/PhotoService'
const BlogSchema = createSchema({
    id: Type.number({
        default: 0
    }),
    title: Type.string(),
    describe: Type.optionalString(),
    cover: Type.optionalString({
        default: ''
    }),
    headImage: Type.string({
        default: 'https://avatars3.githubusercontent.com/u/23329645?s=460&v=4'
    }),
    author: Type.string(),
    body: Type.string(),
    tags: Type.array({
        default: []
    }).of(Type.string()),
    markdown: Type.optionalString(),
    hidden: Type.boolean({
        default: false
    }),
    type: Type.number({
        default: 1,
        enum: [1, 2, 3] // default router password
    }),
    password: Type.optionalNumber(), // with type === 3
    meta: Type.object({
        default: {}
    }).of({
        votes: Type.number({
            default: 0
        }),
        favs: Type.number({
            default: 0
        }),
    }),
    theme: Type.object({
        default: {}
    }).of({
        dominant: Type.string({
            default: ''
        }),
        secondary: Type.string({
            default: ''
        }),
    })
}, {
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

BlogSchema.pre('save', async function (next) {
    try {
        const doc = (this as BlogDoc)
        const result: CounterDoc = await Counter.findOneAndUpdate(
            {
                _id: 'blogId'
            }, {
                $inc: {
                    seq: 1
                }
            },
            {
                new: true,
                upsert: true
            })
        if (result) {
            doc.id = result.seq
            if (!doc.cover) {
                const cover = await PhotoService.getRandomCover()
                doc.cover = cover.url
                if (cover.theme) {
                    doc.theme = cover.theme
                }
            }
            if (!doc.theme) {
                const theme = await PhotoService.getImageTheme(doc.cover)
                if (theme) {
                    doc.theme = theme
                }
            }
        }
        await next()
    } catch (e) {
        log.error(`blog add id error`)
        log.error(e)
    }
})

export const Blog = typedModel('Blog', BlogSchema)
export type BlogDoc = ExtractDoc<typeof BlogSchema>
export type BlogProps = ExtractProps<typeof BlogSchema>
