import {Body, Controller, CurrentUser, Get, Param, Post, UseAfter, UseBefore, UseInterceptor} from 'routing-controllers'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
import {BlogDoc} from '../model/Blog'
import {IHttpResult} from '../interfaces/IHttpResult'
import BlogService from '../services/BlogService'
import {UserDoc} from '../model/User'
import {IHttpQuery} from '../interfaces/IHttpQuery'
import {beatyMongooseResult} from '../interceptors/beatyMongooseResult'

@Controller('/blogs')
export class BlogController {
    @Get('/:id')
    @UseInterceptor(beatyMongooseResult)
    async getBlogs(@Param('id') id: number, @Body() query: IHttpQuery) {
        if (!isNaN(id)) { // maybe id is 0
            const blog = await BlogService.selectBlogById(id)
            return blog
        }
        console.log(1)
    }
    @Post()
    @UseBefore(AuthorizationCheckerMiddleware)
    async addBlog(@CurrentUser() user: UserDoc, @Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.createBlog(blog, user.userName)
        return result
    }
}
