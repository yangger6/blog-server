import {Body, Controller, Post, UseBefore} from 'routing-controllers'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
import {BlogDoc} from '../model/Blog'
import {IHttpResult} from '../interfaces/httpResult'
import {httpCode} from '../utils/httpcode'

@Controller('/blogs')
@UseBefore(AuthorizationCheckerMiddleware)
export class BlogController {
    @Post()
    async addBlog(@Body() blog: BlogDoc): Promise<IHttpResult> {
        return {
            httpCode: httpCode.FORBIDDEN
        }
    }
}
