import request from 'request'
import config from '../config/index'
import Cos from 'cos-nodejs-sdk-v5'
import {log} from '../plugins/Log'
import colorThief from 'colorthief'
import {ICover, ICoverTheme} from '../interfaces/IPhoto'
import * as fs from 'fs'
import {resolve, join} from 'path'
export default {
    getRandomCover(): Promise<ICover> {
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
                                resolve({
                                    url: data.Location
                                })
                            } else {
                                const imageUrl = hostPrefix + Key
                                this.getImageTheme(body, currentFileType).then(theme => {
                                    resolve({
                                        url: imageUrl,
                                        theme
                                    })
                                }).catch(e => {
                                    console.log(e)
                                })
                            }
                        })
                    } else {
                        // upload to path
                    }
                }
            })
        })
    },
    getImageTheme(url: string | Buffer, fileType: string = 'png'): Promise<ICoverTheme> {
        const bufferToImage = (buffer: Buffer) => {
            try {
                const key = new Date().getTime() + Math.floor(Math.random() * 10000).toString().slice(1, 5)
                let imgPath = join(process.cwd(), './tempImage/')
                imgPath += `${key}.${fileType}`
                fs.writeFileSync(imgPath, buffer)
                return resolve(imgPath)
            } catch (e) {
                log.error(`buffer to image error -> ${e}`)
                return false
            }
        }
        const deleteLocalImage = (deleteUrl: string) => {
            try {
                log.info(`start delete local file by ->${deleteUrl}`)
                fs.unlinkSync(deleteUrl)
                log.info(`deleted local image by -> ${deleteUrl}`)
                return true
            } catch (e) {
                log.error(`delete local image error -> ${e}`)
                return false
            }
        }
        return new Promise((resolve, reject) => {
            try {
                if (url instanceof Buffer) {
                    log.info('buffer get palette start')
                    const img = bufferToImage(url)
                    if (img) {
                        colorThief.getPalette(img).then(([dominant, secondary]: string[]) => {
                            log.info('resolved image palette')
                            if (deleteLocalImage(img)) {
                                log.info('buffer get palette end')
                                resolve({
                                    dominant,
                                    secondary
                                })
                            }
                        })
                    } else {
                        reject(null)
                    }
                } else {
                    log.info('imgUrl get palette start')
                    colorThief.getPalette(url).then(([dominant, secondary]: string[]) => {
                        resolve({
                            dominant,
                            secondary
                        })
                    }).catch(e => {
                        log.error('')
                    })
                }
            } catch (e) {
                log.error(e)
                reject(e)
            }
        })
    }
}
//
