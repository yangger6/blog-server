import {Action} from 'routing-controllers'
import {User, UserDoc} from '../models/User'
// unused cause can not handler error ( author not fix this bug hummmmmmmmm.....
export const authorizationChecker = async (action: Action) => {
    const token = action.request.headers.authorization
    const user: UserDoc | null = await User.findOne({
        'token.value': token
    })
    if (user) { // FIX user数据保存到内存 节省调用次数
        console.log(new Date() > user.token.expiredTime)
        return new Date() < user.token.expiredTime // FIX 鉴权放到 mongo表达式里边
    }
    return false
}
