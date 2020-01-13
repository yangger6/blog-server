import {Get, HttpCode, JsonController, UseBefore} from 'routing-controllers'
import httpCode from '../utils/Httpcode'
import PhotoService from '../services/PhotoService'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
import {ICover} from '../interfaces/IPhoto'
/**
 * PhotoController
 */
@JsonController('/photos')
export class PhotoController {
    /**
     * getRandomCover
     */
    @Get()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async getCover(): Promise<ICover> {
        return PhotoService.getRandomCover()
    }
}
