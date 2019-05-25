import request from 'request'
import config from '../config/index'
import Cos from 'cos-nodejs-sdk-v5'
import {log} from '../plugins/log'
export default {
    getRandomCover(): Promise<string> {
        return new Promise((resolve, reject) => {
            const url = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
            request({
                url,
                encoding: null
            }, (error, response, body) => {
                if (error) {
                    log.error('upload image error:')
                    log.error(error)
                    reject(error)
                }
                const timeStamp = `${Date.now()}_${Math.floor(Math.random() * 1000000000)}`
                const fileType = new RegExp('jpeg|jpg|png|webp|gif', 'gi').exec(response.headers['content-type'] || '')
                const date = new Date()
                const y = date.getFullYear()
                const m = date.getMonth() + 1
                const d = date.getDate()
                const currentFileType = fileType ? fileType[0] : 'jpg'
                const Key = `assets/image/${y}/${m}/${d}/${timeStamp}.${currentFileType}`
                if (body instanceof Buffer) {
                    if (Object.values(config.oss).filter((str: string | undefined) => str).length >= 4) { // need 4 correct params
                        const {SecretId, SecretKey, Bucket, Region, hostPrefix} = config.oss
                        // upload to oss
                        const cos = new Cos({SecretId, SecretKey})
                        cos.putObject({
                            Bucket,
                            Region,
                            Key,
                            Body: body
                        }, (err: string, data: {Location: string}) => {
                            log.error('upload image error:')
                            log.error(err)
                            if (!hostPrefix) {
                                resolve(data.Location)
                            } else {
                                resolve(hostPrefix + Key)
                            }
                        })
                    } else {
                        // upload to path
                    }
                }
            })
        })
    }
}
//
