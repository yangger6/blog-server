"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const AuthorizationCheckerMiddleware_1 = require("../middlewares/AuthorizationCheckerMiddleware");
const BlogService_1 = __importDefault(require("../services/BlogService"));
const BeautyMongooseResult_1 = require("../interceptors/BeautyMongooseResult");
const Httpcode_1 = __importDefault(require("../utils/Httpcode"));
/**
 * BlogController
 */
let BlogController = class BlogController {
    /**
     * select Blog by blogId
     * @param id {number} blogId
     */
    async getBlog(id) {
        return BlogService_1.default.selectBlogById(id);
    }
    /**
     * select Blogs by query
     * @param query {IHttpQueryD}
     */
    async getBlogs(query) {
        return BlogService_1.default.selectBlogByQuery(query);
    }
    /**
     * create blog
     * @param user {UserDoc}
     * @param blog {BlogDoc}
     */
    async addBlog(user, blog) {
        const result = await BlogService_1.default.createBlog(blog, user.userName);
        return result;
    }
    /**
     * update blog
     * @param blog {BlogDoc}
     */
    async updateBlog(blog) {
        return BlogService_1.default.updateBlog(blog);
    }
    /**
     * delete blog by id
     * @param id {number} blogId
     */
    async deleteBlog(id) {
        const result = await BlogService_1.default.deleteBlog(id);
        return result;
    }
};
__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.HttpCode(Httpcode_1.default.OK),
    routing_controllers_1.UseInterceptor(BeautyMongooseResult_1.beautyMongooseResult),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlog", null);
__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.HttpCode(Httpcode_1.default.OK),
    routing_controllers_1.UseInterceptor(BeautyMongooseResult_1.beautyMongooseResult),
    __param(0, routing_controllers_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogs", null);
__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.HttpCode(Httpcode_1.default.CREATED),
    routing_controllers_1.UseBefore(AuthorizationCheckerMiddleware_1.AuthorizationCheckerMiddleware),
    __param(0, routing_controllers_1.CurrentUser()), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addBlog", null);
__decorate([
    routing_controllers_1.Put(),
    routing_controllers_1.HttpCode(Httpcode_1.default.OK),
    routing_controllers_1.UseBefore(AuthorizationCheckerMiddleware_1.AuthorizationCheckerMiddleware),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlog", null);
__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.HttpCode(Httpcode_1.default.NO_CONTENT),
    routing_controllers_1.UseBefore(AuthorizationCheckerMiddleware_1.AuthorizationCheckerMiddleware),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
BlogController = __decorate([
    routing_controllers_1.JsonController('/blogs')
], BlogController);
exports.BlogController = BlogController;
