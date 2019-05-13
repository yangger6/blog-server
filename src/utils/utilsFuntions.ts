import uuidV4 from 'uuid/v4'
import {createHash} from "crypto"
import * as R from 'ramda'
export const genSalt = (): string => uuidV4()
export const hash = (str: any): string => createHash('md5').update(str).digest('hex')
export const mergePropString = (prop1: string, pro2: string) => String(R.prop(prop1)) + R.prop(pro2)
export const mergeString = (str1: any, str2: any) => String(str1) + R.prop(str2)

// toekn
const rand = () => Math.random().toString(36).substr(2)
export const genToken = () => rand() + rand()
