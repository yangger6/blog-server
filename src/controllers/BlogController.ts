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
import httpCode from '../utils/HttpCode'

@JsonController('/blogs')
export class BlogController {
    @Get('/:id') // get blog by id
    @HttpCode(httpCode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlog(@Param('id') id: number) {
        return BlogService.selectBlogById(id)
    }

    @Get()
    @HttpCode(httpCode.OK)
    @UseInterceptor(beautyMongooseResult)
    async getBlogs(@QueryParams() query: IHttpQuery) { // 获取博客列表
        return BlogService.selectBlogByQuery(query)
    }

    @Post()
    @HttpCode(httpCode.CREATED)
    @UseBefore(AuthorizationCheckerMiddleware)
    async addBlog(@CurrentUser() user: UserDoc, @Body() blog: BlogDoc): Promise<IHttpResult> {
        return BlogService.createBlog(blog, user.userName)
    }

    @Put()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async updateBlog(@Body() blog: BlogDoc): Promise<IHttpResult> {
        return BlogService.updateBlog(blog)
    }

    @Delete('/:id')
    @HttpCode(httpCode.NO_CONTENT)
    @UseBefore(AuthorizationCheckerMiddleware)
    async deleteBlog(@Param('id') id: number): Promise<IHttpResult> {
        return BlogService.deleteBlog(id)
    }
}

