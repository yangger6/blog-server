import * as R from 'ramda'
import {User, UserDoc, UserProps} from '../model/User'
import {log} from '../plugins/log'
import {IHttpResult} from '../interfaces/httpResult'
import {genSalt, genToken, hash, mergeString} from '../utils/utilsFuntions'
import {httpCode} from '../utils/httpcode'
export default {
    async login(userName: string, password: string): Promise<IHttpResult> {
        try {
            const user: any = await User.findOne({
                $or: [
                    {userName},
                    {email: userName}
                ]
            })
            const hashPassword = R.compose(hash, mergeString)
            if (R.equals(
                (user as UserProps).password,
                hashPassword(password, (user as UserProps).salt)
            )) {
                const nowAddTenMinutes = () => new Date().getTime() + 10 * 60 * 1000
                const token = {
                    value: genToken(),
                    expiredTime: nowAddTenMinutes()
                }
                user.token = token
                await user.save()
                log.info(`user login -> ${user.userName}`)
                return {
                    msg: 'ok',
                    data: token
                }
            } else {
                return {
                    error: 'login error',
                    detail: 'please checked you password',
                    httpCode:  httpCode.UN_AUTHORIZED
                }
            }
        } catch (e) {
            return {
                error: 'login error',
                detail: 'please checked you password or username',
                httpCode:  httpCode.UN_AUTHORIZED
            }
        }
    },
    async register(user: UserDoc): Promise<IHttpResult> {
        try {
            const genSaltAndPassword = R.pipe(
                R.assoc('salt', genSalt()),
                R.assoc('password', hash(user.password + String(R.prop('salt'))))
            )
            const newUser = new User(genSaltAndPassword(user))
            await newUser.save()
            log.info(`user register -> ${user.userName}`)
            return {
                msg: 'ok',
            }
        } catch (e) {
            return {
                error: 'register error',
                detail: e.message,
                httpCode:  httpCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}
