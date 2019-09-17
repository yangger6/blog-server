import {Body, Get, HttpCode, JsonController, Post} from 'routing-controllers'
import {UserDoc, UserProps} from '../models/User'
import UserService from '../services/UserService'
import httpCode from '../utils/HttpCode'
import {IHttpResult} from '../interfaces/IHttpResult'

@JsonController('/users')
export class UserController {
    @Get()
    @HttpCode(httpCode.OK)
    async login(@Body() {userName, password}: UserProps): Promise<IHttpResult> {
        return UserService.login(userName, password)
    }

    @Post()
    @HttpCode(httpCode.CREATED)
    async register(@Body() user: UserDoc): Promise<IHttpResult> {
        return UserService.register(user)
    }
}
