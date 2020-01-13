"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const index_1 = __importDefault(require("../config/index"));
const cos_nodejs_sdk_v5_1 = __importDefault(require("cos-nodejs-sdk-v5"));
const Log_1 = require("../plugins/Log");
const colorthief_1 = __importDefault(require("colorthief"));
const v4_1 = __importDefault(require("uuid/v4"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = {
    getRandomCover() {
        return new Promise((resolve, reject) => {
            const url = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture';
            request_1.default({
                url,
                encoding: null
            }, (error, response, body) => {
                if (error) {
                    Log_1.log.error('upload image error:');
                    Log_1.log.error(error);
                    return reject(error);
                }
                const timeStamp = `${Date.now()}_${Math.floor(Math.random() * 1000000000)}`;
                const fileType = new RegExp('jpeg|jpg|png|webp|gif', 'gi').exec(response.headers['content-type'] || '');
                const date = new Date(); // FIX momentjs exchane Date
                const y = date.getFullYear();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                const currentFileType = fileType ? fileType[0] : 'jpg';
                const Key = `assets/image/${y}/${m}/${d}/${timeStamp}.${currentFileType}`;
                if (body instanceof Buffer) {
                    if (Object.values(index_1.default.oss).filter((str) => str).length >= 4) { // need 4 correct params
                        const { SecretId, SecretKey, Bucket, Region, HostPrefix } = index_1.default.oss;
                        // upload to oss
                        const cos = new cos_nodejs_sdk_v5_1.default({ SecretId, SecretKey });
                        cos.putObject({
                            Bucket,
                            Region,
                            Key,
                            Body: body
                        }, (err, data) => {
                            Log_1.log.error('upload image error:');
                            Log_1.log.error(err);
                            if (!HostPrefix) {
                                resolve({
                                    url: data.Location
                                });
                            }
                            else {
                                const imageUrl = HostPrefix + Key;
                                this.getImageTheme(body, currentFileType).then(theme => {
                                    resolve({
                                        url: imageUrl,
                                        theme
                                    });
                                }).catch(e => {
                                    console.log(e);
                                });
                            }
                        });
                    }
                    else {
                        // TODO upload to local
                    }
                }
            });
        });
    },
    getImageTheme(url, fileType = 'png') {
        const bufferToImage = (buffer) => {
            try {
                let imgPath = path_1.default.join(process.cwd(), './tempImage/');
                imgPath += `${v4_1.default()}.${fileType}`;
                fs.writeFileSync(imgPath, buffer);
                return path_1.default.resolve(imgPath);
            }
            catch (e) {
                Log_1.log.error(`buffer to image error -> ${e}`);
                return false;
            }
        };
        const deleteLocalImage = (deleteUrl) => {
            try {
                Log_1.log.info(`start delete local file by ->${deleteUrl}`);
                fs.unlinkSync(deleteUrl);
                Log_1.log.info(`deleted local image by -> ${deleteUrl}`);
                return true;
            }
            catch (e) {
                Log_1.log.error(`delete local image error -> ${e}`);
                return false;
            }
        };
        return new Promise((resolve, reject) => {
            try {
                if (url instanceof Buffer) {
                    Log_1.log.info('buffer get palette start');
                    const img = bufferToImage(url);
                    if (img) {
                        colorthief_1.default.getPalette(img).then(([dominant, secondary]) => {
                            Log_1.log.info('resolved image palette');
                            if (deleteLocalImage(img)) {
                                Log_1.log.info('buffer get palette end');
                                resolve({
                                    dominant,
                                    secondary
                                });
                            }
                        });
                    }
                    else {
                        reject(null);
                    }
                }
                else {
                    Log_1.log.info('imgUrl get palette start');
                    colorthief_1.default.getPalette(url).then(([dominant, secondary]) => {
                        resolve({
                            dominant,
                            secondary
                        });
                    }).catch(e => {
                        Log_1.log.error('');
                    });
                }
            }
            catch (e) {
                Log_1.log.error(e);
                reject(e);
            }
        });
    }
};
//
