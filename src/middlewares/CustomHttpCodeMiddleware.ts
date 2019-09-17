import {KoaMiddlewareInterface, Middleware} from 'routing-controllers'

@Middleware({type: 'after'})
export class CustomHttpCodeMiddleware implements KoaMiddlewareInterface {
    async use(ctx: any, next: (err?: any) => Promise<any>): Promise<any> {
        if (ctx.response && ctx.response.body && ctx.response.body.httpCode) { // catch custom httpCode
            ctx.response.status = ctx.response.body.httpCode // set response status
            delete ctx.response.body.httpCode // delete unused property
        }
        return next() // cannot await next()
    }
}
