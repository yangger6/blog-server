export const httpcode = {
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

    BAD_REQUEST: 400 ,// BadRequest：服务器不理解客户端的请求，未做任何处理。

    UN_AUTHORIZED: 401, // Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。

    FORBIDDEN: 403, // Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。

    NO_TFINED: 404, // Not Found：所请求的资源不存在，或不可用。

    // 405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。

    // 410 Gone：所请求的资源已从这个地址转移，不再可用。

    // 415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。

    // 422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。

    // 429 Too Many Requests：客户端的请求次数超过限额。
    INTERNAL_SERVER_ERROR: 500, // Internal Server Error：客户端请求有效，服务器处理时发生了意外。
    SERVICE_UNAVALIABLE: 503, // Service Unavailable：服务器无法处理请求，一般用于网站维护状态。
}
