import uuidV4 from 'uuid/v4'
import {createHash} from "crypto"
export const genSalt = (): string => uuidV4()
export const hash = (str: any): string => {
    console.log(str)
    return createHash('md5').update(str).digest('hex')
}
