import 'reflect-metadata'
import {useKoaServer} from 'routing-controllers'
import Koa from 'koa'
import {connectDB} from './model'
import {log} from './plugins/log'
async function startApp() {
    const app = new Koa()
    await connectDB()
    log.info('the app is starting')
    useKoaServer(app, {
        routePrefix: '/api',
        controllers: [__dirname + '/controllers/**/*.js'],
        middlewares: [__dirname + '/middlewares/**/*.js'],
        interceptors: [__dirname + '/interceptors/**/*.js'],
        validation: true,
        defaultErrorHandler: true,
    }).listen(3000, () => {
        console.log(`server listen 3000 port`)
    })
}
startApp()
