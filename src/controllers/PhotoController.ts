import {Get, HttpCode, JsonController, UseBefore} from 'routing-controllers'
import httpCode from '../utils/HttpCode'
import PhotoService from '../services/PhotoService'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
import {ICover} from '../interfaces/IPhoto'

@JsonController('/photos')
export class PhotoController {
    @Get()
    @HttpCode(httpCode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async getCover(): Promise<ICover> {
        return PhotoService.getRandomCover()
    }
}
