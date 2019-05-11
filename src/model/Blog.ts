import {createSchema, ExtractDoc, ExtractProps, Type, typedModel} from 'ts-mongoose'
const BlogSchema = createSchema({
    id: Type.number(),
    title: Type.string(),
    author: Type.string(),
    body: Type.string(),
    markdown: Type.string(),
    hidden: Type.boolean(),
    type: Type.number({
       enum: [1, 2, 3] // default router password
    }),
    password: Type.optionalNumber(), // with type === 3
    meta: Type.object().of({
        votes: Type.number({
            default: 0
        }),
        favs: Type.number({
            default: 0
        }),
    })
}, {
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})
export const Blog = typedModel('Blog', BlogSchema)
export type BlogDoc = ExtractDoc<typeof BlogSchema>
export type BlogProps = ExtractProps<typeof BlogSchema>
