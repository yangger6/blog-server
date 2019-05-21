import {
    Body,
    CurrentUser, Delete,
    Get, HttpCode, JsonController,
    Param,
    Post, Put,
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
import {httpCode} from '../utils/httpcode'

@JsonController('/blogs')
export class BlogController {
    @Get('/:id')
    @HttpCode(httpCode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlog(@Param('id') id: number) {
        const blog = await BlogService.selectBlogById(id)
        return blog
    }
    @Get()
    @HttpCode(httpCode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlogs(@QueryParams() query: IHttpQuery) {
        const blogs = await BlogService.selectBlogByQuery(query)
        return blogs
    }
    @Post()
    @HttpCode(httpCode.CREATED)
    @UseBefore(AuthorizationCheckerMiddleware)
    async addBlog(@CurrentUser() user: UserDoc, @Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.createBlog(blog, user.userName)
        return result
    }
    @Put()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async updateBlog(@Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.updateBlog(blog)
        return result
    }
    @Delete('/:id')
    @HttpCode(httpCode.NO_CONTENT)
    @UseBefore(AuthorizationCheckerMiddleware)
    async deleteBlog(@Param('id') id: number): Promise<IHttpResult> {
        const result = await BlogService.deleteBlog(id)
        return result
    }
}

