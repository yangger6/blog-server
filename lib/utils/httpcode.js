"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * 请求成功  幂等的
     */
    OK: 200,
    /**
     * POST/PUT/PATCH   新建或修改成功
     */
    CREATED: 201,
    /**
     * 添加到队列 (异步任务)
     */
    ACCEPTED: 202,
    /**
     * 删除成功
     */
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    // 405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。
    // 410 Gone：所请求的资源已从这个地址转移，不再可用。
    // 415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。
    // 422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。
    // 429 Too Many Requests：客户端的请求次数超过限额。
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVALIABLE: 503,
};
