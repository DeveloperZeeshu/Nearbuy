import mongoose from "mongoose"
import conf from "../conf/conf.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(conf.databaseUrl)
        mongoose.set('debug', true)
        console.log('MongoDB Connected.')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
