import {Get, HttpCode, JsonController, UseBefore} from 'routing-controllers'
import {httpcode} from '../utils/Httpcode'
import PhotoService from '../services/PhotoService'
import {AuthorizationCheckerMiddleware} from '../middlewares/AuthorizationCheckerMiddleware'
import {ICover} from '../interfaces/IPhoto'
@JsonController('/photos')
export class PhotoController {
    @Get()
    @HttpCode(httpcode.OK)
    @UseBefore(AuthorizationCheckerMiddleware)
    async getCover(): Promise<ICover> {
        const res = await PhotoService.getRandomCover()
        return res
    }
}
