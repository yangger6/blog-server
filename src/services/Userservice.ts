import * as R from 'ramda'
import {User, UserDoc, UserProps} from '../model/User'
import {log} from '../plugins/log'
import {IHttpResult} from '../interfaces/httpResult'
import {genSalt, hash} from '../utils/utilsFuntions'
export default {
    async login({userName, password}: UserProps) {
        try {
            const user = User.findOne({
                $or: {
                    userName,
                    email: userName
                }
            }).select('password salt')

        } catch (e) {
            log.error(`user login error -> ${e}`)
            return {
                error: 'login error',
                detail: 'please checked you password or username'
            }
        }
    },
    async register(user: UserDoc): Promise<IHttpResult> {
        try {
            const genPassword = (obj: any) => {
                return R.pipe(
                    R.assoc('password', obj.password + obj.salt),
                    R.assoc('password', hash(obj.password)),
                )(obj)
            }
            console.log(R.pipe(
                R.assoc('salt', genSalt()),
                R.tap(genPassword)
            )(user))
            throw Error('233')
            // console.log(genPassword(user))
            // const newUser = new User(genPassword(user))
            // await newUser.save()
            log.info(`user register -> ${user.userName}`)
            return {
                msg: 'ok'
            }
        } catch (e) {
            log.error(`user register error -> ${e}`)
            return {
                error: 'register error',
                detail: e.message
            }
        }
    }
}
