import {Action} from 'routing-controllers'
import {User, UserDoc, UserProps} from '../model/User'
// unused cause can not handler error ( author not fix this bug hummmmmmmmm.....
export const authorizationChecker = async (action: Action) => {
    const token = action.request.headers.authorization
    const user: UserDoc | null = await User.findOne({
        'token.value': token
    })
    if (user) {
        console.log(new Date() > user.token.expiredTime)
        return new Date() < user.token.expiredTime
    }
    return false
}
