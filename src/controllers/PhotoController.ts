import {Get, HttpCode, JsonController, UseBefore} from 'routing-controllers'
import {httpCode} from '../utils/httpcode'
import PhotoService from '../services/PhotoService'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
@JsonController('/photos')
export class UserController {
    @Get()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async login(): Promise<string> {
        const res = await PhotoService.getRandomCover()
        return res
    }
}
