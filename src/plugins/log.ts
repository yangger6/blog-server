import {getLogger, configure} from 'log4js'
import * as config from '../config/logConf.json'
configure(config)
export const httpLog = getLogger('http')
export const log = getLogger('app')
