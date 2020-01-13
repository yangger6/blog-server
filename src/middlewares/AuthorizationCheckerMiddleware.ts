import {KoaMiddlewareInterface} from 'routing-controllers'
import {User, UserDoc} from '../models/User'
import httpCode from '../utils/HttpCode'

export class AuthorizationCheckerMiddleware implements KoaMiddlewareInterface {
    async use(ctx: any, next: (err?: any) => Promise<any>): Promise<any> {
        const token = ctx.request.headers.authorization
        const user: UserDoc | null = await User.findOne({
            'token.value': token
        })
        if (user) {  // FIX user数据保存到内存 节省调用次数
            if (user.token.expiredTime > new Date()) {
                await next()
            } else {
                ctx.response.status = httpCode.UN_AUTHORIZED
                ctx.body = {
                    error: 'auth check error',
                    details: 'token is expired'
                }
            }
        } else {
            ctx.response.status = httpCode.UN_AUTHORIZED
            ctx.body = {
                error: 'auth check error',
                details: 'not token or no login'
            }
        }
    }
}
