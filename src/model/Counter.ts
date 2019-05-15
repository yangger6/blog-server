import {createSchema, ExtractDoc, ExtractProps, Type, typedModel} from 'ts-mongoose'

const CounterSchema = createSchema({ // 自增
    _id: Type.string({
        require: true
    }),
    seq: Type.number({
        default: 0
    })
})
export const Counter = typedModel('Counter', CounterSchema)
export type CounterDoc = ExtractDoc<typeof CounterSchema>
export type CounterProps = ExtractProps<typeof CounterSchema>
