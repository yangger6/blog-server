import * as R from 'ramda'
import {IHttpResult} from '../interfaces/IHttpResult'
import {BlogDoc, Blog} from '../model/Blog'
import {log} from '../plugins/log'
import {httpCode} from '../utils/httpcode'
import {IHttpQuery} from '../interfaces/IHttpQuery'
const filterParams = '-password -_id -__v'
export default {
    async selectBlogByQuery({title, tags, page, pageSize}: IHttpQuery): Promise<IHttpResult> {
        try {
            pageSize = Number(pageSize) || 10 // default 10
            page = page || 1 // default page 1
            title = title || ''
            tags = typeof tags === 'string' ? tags.split(',') : []
            const blogs = await Blog.find({
                $or: [
                    {
                        title: {
                            $regex: new RegExp(title, 'gi')
                        }
                    },
                    {
                        tags: {
                            $in: tags
                        }
                    }
                ]
            })
            .sort('-createTime')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select(filterParams)
            return {
                msg: 'ok',
                data: {
                    data: blogs,
                    total: blogs.length,
                    pageSize,
                    page
                },
            }
        } catch (e) {
            console.log(e)
            log.error('query blog error')
            log.error(e)
            return {
                error: 'search error',
                detail: 'query error',
                httpCode:  httpCode.INTERNAL_SERVER_ERROR
            }
        }

    },
    async selectBlogById(id: number): Promise<IHttpResult> {
        try {
            const blog = await Blog.findOne({
                id
            }).select(filterParams)
            if (blog) {
                return {
                    msg: 'ok',
                    data: blog
                }
            } else {
                return {
                    error: 'search error',
                    detail: 'cannot find blog id'
                }
            }
        } catch (e) {
            return {
                error: 'search error',
                detail: 'cannot find blog id',
                httpCode:  httpCode.INTERNAL_SERVER_ERROR
            }
        }
    },
    async createBlog(blog: BlogDoc, author: string): Promise<IHttpResult> {
        try {
            const newBlog = new Blog(blog)
            newBlog.author = author
            await newBlog.save()
            return {
                msg: 'ok'
            }
        } catch (e) {
            log.error(`create blog error`)
            log.error(e)
            return {
                error: 'create blog error',
                detail: e.message,
                httpCode:  httpCode.INTERNAL_SERVER_ERROR
            }
        }
    },
    async updateBlog(blog: BlogDoc): Promise<IHttpResult> {
        try {
            console.log(blog)
            const  result = await Blog.findOneAndUpdate({
                id: blog.id
            }, blog)
            if (result) {
                return {
                    msg: 'ok'
                }
            } else {
                throw Error('can not find blog id')
            }
        } catch (e) {
            log.error('update blog error')
            log.error(e)
            return {
                error: 'update blog error',
                detail: 'cannot find blog id to update',
                httpCode:  httpCode.INTERNAL_SERVER_ERROR
            }
        }
    },
    async deleteBlog(id: number): Promise<IHttpResult> {
        try {
            await Blog.deleteOne({id})
            return {
                msg: 'ok'
            }
        } catch (e) {
            return {
                error: 'delete blog error',
                detail: 'cannot find blog id to delete',
                httpCode:  httpCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}
