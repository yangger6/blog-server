import {Action} from 'routing-controllers'
import {User, UserDoc} from '../models/User'

export const currentUserChecker = async (action: Action) => {
    const token = action.request.headers.authorization
    const user: UserDoc | null = await User.findOne({
        'token.value': token
    })
    return user
}
