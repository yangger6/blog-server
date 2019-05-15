import {Action} from 'routing-controllers'
import * as R from 'ramda'
export const beatyMongooseResult = (action: Action, content: any) => { // no good code need rewrite！！！
    const isObject = (obj: any) => obj instanceof Object
    const isArray = (obj: any) => obj instanceof isArray
    const toObject = (obj: any) => {
        console.log(obj)
        return obj.toObject()
    }
    if (isObject(content.data)) {
        const beautyObject = R.pipe(
            R.prop('data'),
            R.tap(toObject)
        )
        return beautyObject(content)
    } else if (isArray(content.data)) {
        const beautyArray = R.filter(isObject)
        return R.pipe(
            R.assoc('data', beautyArray(R.prop('data')))
        )(content)
    }
    return content
}
