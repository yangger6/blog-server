import * as R from 'ramda'
import {IHttpResult} from '../interfaces/IHttpResult'
import {BlogDoc, Blog} from '../model/Blog'
import {log} from '../plugins/log'
import {httpCode} from '../utils/httpcode'
const filterParams = '-password -_id -__v'
export default {
    async selectBlogByQuery(query: string): Promise<IHttpResult> {
        Blog.find()
        return {
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
                detail: 'cannot find blog id'
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
    }
}
