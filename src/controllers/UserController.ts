import {Body, Controller, Get, HttpCode, Post} from 'routing-controllers'
import {UserDoc, UserProps} from '../model/User'
import UserService from '../services/UserService'
import {httpCode} from '../utils/httpcode'
import {IHttpResult} from '../interfaces/IHttpResult'
@Controller('/users')
// GET：读取（Read）
// POST：新建（Create）
// PUT：更新（Update）
// PATCH：更新（Update），通常是部分更新
// DELETE：删除（Delete）
export class UserController {
    @Get()
    @HttpCode(httpCode.OK)
    async login(@Body() {userName, password}: UserProps): Promise<IHttpResult> {
        const res = await UserService.login(userName, password)
        return res
    }
    @Post()
    @HttpCode(httpCode.CREATED)
    async register(@Body() user: UserDoc): Promise<IHttpResult> {
        const res = await UserService.register(user)
        return res
    }
}
