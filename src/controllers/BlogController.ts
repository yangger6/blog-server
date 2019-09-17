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
import {IHttpQueryD} from '../interfaces/IHttpQuery'
import {beautyMongooseResult} from '../interceptors/BeautyMongooseResult'
import {httpcode} from '../utils/Httpcode'

@JsonController('/blogs')
export class BlogController {
    @Get('/:id')
    @HttpCode(httpcode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlog(@Param('id') id: number) {
        await BlogService.selectBlogById(id)
    }
    @Get()
    @HttpCode(httpcode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlogs(@QueryParams() query: IHttpQueryD) {
        const blogs = await BlogService.selectBlogByQuery(query)
        return blogs
    }
    @Post()
    @HttpCode(httpcode.CREATED)
    @UseBefore(AuthorizationCheckerMiddleware)
    async addBlog(@CurrentUser() user: UserDoc, @Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.createBlog(blog, user.userName)
        return result
    }
    @Put()
    @HttpCode(httpcode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async updateBlog(@Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.updateBlog(blog)
        return result
    }
    @Delete('/:id')
    @HttpCode(httpcode.NO_CONTENT)
    @UseBefore(AuthorizationCheckerMiddleware)
    async deleteBlog(@Param('id') id: number): Promise<IHttpResult> {
        const result = await BlogService.deleteBlog(id)
        return result
    }
}

