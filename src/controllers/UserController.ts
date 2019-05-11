import {Body, Controller, Get, HttpCode, Post} from 'routing-controllers'
import {UserDoc, UserProps} from '../model/User'
import Userservice from '../services/Userservice'
import {httpCode} from '../utils/httpcode'
@Controller('/users')
// GET：读取（Read）
// POST：新建（Create）
// PUT：更新（Update）
// PATCH：更新（Update），通常是部分更新
// DELETE：删除（Delete）
export class UserController {
    @Get()
    login(@Body() {userName, password}: UserProps) {
        console.log(userName)
        console.log(password)
        return {
            userName,
            password
        }
    }
    @Post()
    @HttpCode(httpCode.CREATED)
    async register(@Body() user: UserDoc) {
        const res = await Userservice.register(user)
        return res

    }
}
