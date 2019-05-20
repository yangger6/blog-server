import {Action} from 'routing-controllers'
import * as R from 'ramda'
import {IHttpResult} from '../interfaces/IHttpResult'
export const beautyMongooseResult = (action: Action, content: IHttpResult) => {
    const dataIsArray = (obj: IHttpResult): boolean => obj.data instanceof Array
    const toObject = (obj: any) => obj.toObject()
    const beautyData = R.ifElse(
        dataIsArray,
        R.over(R.lensProp('data'), R.map(toObject)),
        R.over(R.lensProp('data'), toObject)
    )
    return beautyData(content)
}
