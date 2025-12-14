import conf from './conf/conf.js'
import app from './app.js'
import { connectDB } from './config/db.js'
import { Request, Response } from 'express'

// await connectDB()

// const PORT = conf.PORT || 3000
// app.listen(PORT, () => console.log(`Server running at ${PORT} Port...`))


let isConnected = false

export default async function handler(req: Request, res: Response) {
    if (!isConnected) {
        await connectDB()
        isConnected = true
    }

    return app(req, res)
}