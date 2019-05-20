import {
    Body,
    Controller,
    CurrentUser,
    Get,
    Param,
    Post,
    QueryParams,
    UseBefore,
    UseInterceptor,
} from 'routing-controllers'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
import {BlogDoc} from '../model/Blog'
import {IHttpResult} from '../interfaces/IHttpResult'
import BlogService from '../services/BlogService'
import {UserDoc} from '../model/User'
import {IHttpQuery} from '../interfaces/IHttpQuery'
import {beautyMongooseResult} from '../interceptors/beautyMongooseResult'

@Controller('/blogs')
export class BlogController {
    @Get('/:id')
    @UseInterceptor(beautyMongooseResult)
    async getBlog(@Param('id') id: number) {
        const blog = await BlogService.selectBlogById(id)
        return blog
    }
    @Get()
    @UseInterceptor(beautyMongooseResult)
    async getBlogs(@QueryParams() query: IHttpQuery) {
        const blogs = await BlogService.selectBlogByQuery(query)
        return blogs
    }
    @Post()
    @UseBefore(AuthorizationCheckerMiddleware)
    async addBlog(@CurrentUser() user: UserDoc, @Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.createBlog(blog, user.userName)
        return result
    }
}
