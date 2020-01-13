"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../models/Blog");
const Log_1 = require("../plugins/Log");
const HttpCode_1 = __importDefault(require("../utils/HttpCode"));
const baseFilterParams = '-password -_id -__v'; // 去掉敏感参数
const listFilterParams = ' -body -markdown'; // 去掉体积大的参数
const mergedFilterParams = (params) => {
    if (typeof params === 'string') {
        return baseFilterParams + params;
    }
    else {
        return baseFilterParams + params.join('');
    }
};
exports.default = {
    async selectBlogByQuery({ title, tags, page, pageSize }) {
        try {
            pageSize = pageSize || 10; // default 10
            page = page || 1; // default page 1
            title = title || '';
            tags = typeof tags === 'string' ? tags.split(',') : [];
            const blogArray = await Blog_1.Blog.find({
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
                .select(mergedFilterParams(listFilterParams));
            return {
                msg: 'ok',
                data: {
                    data: blogArray,
                    total: blogArray.length,
                    pageSize,
                    page
                },
            };
        }
        catch (e) {
            console.log(e);
            Log_1.log.error('query blog error');
            Log_1.log.error(e);
            return {
                error: 'search error',
                detail: 'query error',
                httpCode: HttpCode_1.default.INTERNAL_SERVER_ERROR
            };
        }
    },
    async selectBlogById(id) {
        try {
            const blog = await Blog_1.Blog.findOne({
                id
            }).select(baseFilterParams);
            if (blog) {
                return {
                    msg: 'ok',
                    data: blog
                };
            }
            else {
                return {
                    error: 'search error',
                    detail: 'cannot find blog id'
                };
            }
        }
        catch (e) {
            return {
                error: 'search error',
                detail: 'cannot find blog id',
                httpCode: HttpCode_1.default.INTERNAL_SERVER_ERROR
            };
        }
    },
    async createBlog(blog, author) {
        try {
            const newBlog = new Blog_1.Blog(blog);
            newBlog.author = author;
            await newBlog.save();
            return {
                msg: 'ok'
            };
        }
        catch (e) {
            Log_1.log.error(`create blog error`);
            Log_1.log.error(e);
            return {
                error: 'create blog error',
                detail: e.message,
                httpCode: HttpCode_1.default.INTERNAL_SERVER_ERROR
            };
        }
    },
    async updateBlog(blog) {
        try {
            console.log(blog);
            const result = await Blog_1.Blog.findOneAndUpdate({
                id: blog.id
            }, blog);
            if (result) {
                return {
                    msg: 'ok'
                };
            }
            else {
                throw Error('can not find blog id');
            }
        }
        catch (e) {
            Log_1.log.error('update blog error');
            Log_1.log.error(e);
            return {
                error: 'update blog error',
                detail: 'cannot find blog id to update',
                httpCode: HttpCode_1.default.INTERNAL_SERVER_ERROR
            };
        }
    },
    async deleteBlog(id) {
        try {
            await Blog_1.Blog.deleteOne({ id });
            return {
                msg: 'ok'
            };
        }
        catch (e) {
            return {
                error: 'delete blog error',
                detail: 'cannot find blog id to delete',
                httpCode: HttpCode_1.default.INTERNAL_SERVER_ERROR
            };
        }
    }
};
