export interface Config  {
    dbLink: string,
    oss: {
        SecretId: string
        SecretKey: string
        Bucket: string
        Region: string
        hostPrefix?: string
    }
}
export default {
    dbLink: '', // mongodb://username:password@host:port/database?options...
    oss: { // upload image to oss
        SecretId: '',
        SecretKey: '',
        Bucket: '',
        Region: '',
        hostPrefix: '' // https://oss.xxx.com/
    }
} as any as Config