import {IHttpResult} from '../interfaces/IHttpResult'
import {BlogDoc, Blog} from '../models/Blog'
import {log} from '../plugins/Log'
import HttpCode from '../utils/HttpCode'
import {IHttpQuery} from '../interfaces/IHttpQuery'

const baseFilterParams = '-password -_id -__v' // 去掉敏感参数
const listFilterParams = ' -body -markdown' // 去掉体积大的参数
const mergedFilterParams = (params: string | string[]) => {
    if (typeof params === 'string') {
        return baseFilterParams + params
    } else {
        return baseFilterParams + params.join('')
    }
}

export default {
    async selectBlogByQuery({title, tags, page, pageSize}: IHttpQuery): Promise<IHttpResult> {
        try {
            pageSize = pageSize || 10 // default 10
            page = page || 1 // default page 1
            title = title || ''
            tags = typeof tags === 'string' ? tags.split(',') : []
            const blogArray = await Blog.find({
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
            .select(mergedFilterParams(listFilterParams))
            return {
                msg: 'ok',
                data: {
                    data: blogArray,
                    total: blogArray.length,
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
                httpCode:  HttpCode.INTERNAL_SERVER_ERROR
            }
        }
    },

    async selectBlogById(id: number): Promise<IHttpResult> {
        try {
            const blog = await Blog.findOne({
                id
            }).select(baseFilterParams)
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
                httpCode:  HttpCode.INTERNAL_SERVER_ERROR
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
                httpCode:  HttpCode.INTERNAL_SERVER_ERROR
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
                httpCode:  HttpCode.INTERNAL_SERVER_ERROR
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
                httpCode:  HttpCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}
