import {createSchema, ExtractDoc, ExtractProps, Type, typedModel} from 'ts-mongoose'
import uuidV4 from 'uuid/v4'
const UserSchema = createSchema({
    id: Type.string({
        default: uuidV4()
    }),
    userName: Type.string(),
    password: Type.string(),
    salt: Type.string(),
    email: Type.string(),
    createTime: Type.date({
        default: Date.now() as any,
    }),
    updateTime: Type.date({
        default: Date.now() as any
    })
}, {
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})
export const User = typedModel('User', UserSchema)
export type UserDoc = ExtractDoc<typeof UserSchema>
export type UserProps = ExtractProps<typeof UserSchema>
