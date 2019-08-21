import {Get, HttpCode, JsonController, UseBefore} from 'routing-controllers'
import {httpCode} from '../utils/httpcode'
import PhotoService from '../services/PhotoService'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
@JsonController('/photos')
export class PhotoController {
    @Get()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async getCover(): Promise<string> {
        const res = await PhotoService.getRandomCover()
        return res
    }
}
