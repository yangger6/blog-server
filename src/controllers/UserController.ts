import {Body, Get, HttpCode, JsonController, Post} from 'routing-controllers'
import {UserDoc, UserProps} from '../model/User'
import UserService from '../services/UserService'
import {httpcode} from '../utils/Httpcode'
import {IHttpResult} from '../interfaces/IHttpResult'

const TryCatchFunction = function (target: object,
                                   propertyName: string,
                                   propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value
    propertyDesciptor.value = async function (...args: any[]) {
        const params = args.map(arg => JSON.stringify(arg)).join()
        try {
            const result = await method.apply(this, args)
            const r = JSON.stringify(result)
            console.log(`Call: ${propertyName}(${params}) => ${r}`);
            return result
        } catch (e) {
            console.log(e)
        }
    }
return propertyDesciptor
}

@JsonController('/users')
export class UserController {
    @Get()
    @HttpCode(httpcode.OK)
    @TryCatchFunction
    async login(@Body() {userName, password}: UserProps): Promise<IHttpResult> {
        return await UserService.login(userName, password)
    }
    @Post()
    @HttpCode(httpcode.CREATED)
    async register(@Body() user: UserDoc): Promise<IHttpResult> {
        const res = await UserService.register(user)
        return res
    }
}
