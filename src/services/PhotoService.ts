import request from 'request'
export default {
    getRandomCover(): Promise<string> {
        return new Promise((resolve, reject) => {
            request
                .get('https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture')
                .on('response', resp => {
                    console.log(resp)
                })
                .on('error', function(err) {
                    console.error(err)
                })
        })
    }
}
//
