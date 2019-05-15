import mongoose from 'mongoose'
import config from '../config'
export const connectDB = async () => {
    mongoose.connect(config.dbLink, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log('mongodb is connected successfully')
    })
}
