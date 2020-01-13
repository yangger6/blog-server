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
import {BlogDoc} from '../models/Blog'
import {IHttpResult} from '../interfaces/IHttpResult'
import BlogService from '../services/BlogService'
import {UserDoc} from '../models/User'
import {IHttpQuery} from '../interfaces/IHttpQuery'
import {beautyMongooseResult} from '../interceptors/BeautyMongooseResult'
import httpCode from '../utils/Httpcode'

/**
 * BlogController
 */
@JsonController('/blogs')
export class BlogController {
    /**
     * select Blog by blogId
     * @param id {number} blogId
     */
    @Get('/:id')
    @HttpCode(httpCode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlog(@Param('id') id: number) {
        return BlogService.selectBlogById(id)
    }

    /**
     * select Blogs by query
     * @param query {IHttpQueryD}
     */
    @Get()
    @HttpCode(httpCode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlogs(@QueryParams() query: IHttpQuery) {
        return BlogService.selectBlogByQuery(query)
    }

    /**
     * create blog
     * @param user {UserDoc}
     * @param blog {BlogDoc}
     */
    @Post()
    @HttpCode(httpCode.CREATED)
    @UseBefore(AuthorizationCheckerMiddleware)
    async addBlog(@CurrentUser() user: UserDoc, @Body() blog: BlogDoc): Promise<IHttpResult> {
        const result = await BlogService.createBlog(blog, user.userName)
        return result
    }

    /**
     * update blog
     * @param blog {BlogDoc}
     */
    @Put()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async updateBlog(@Body() blog: BlogDoc): Promise<IHttpResult> {
        return BlogService.updateBlog(blog)
    }

    /**
     * delete blog by id
     * @param id {number} blogId
     */
    @Delete('/:id')
    @HttpCode(httpCode.NO_CONTENT)
    @UseBefore(AuthorizationCheckerMiddleware)
    async deleteBlog(@Param('id') id: number): Promise<IHttpResult> {
        const result = await BlogService.deleteBlog(id)
        return result
    }
}

