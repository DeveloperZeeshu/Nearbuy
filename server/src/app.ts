import express, { type Request, type Response } from 'express'
import cors from 'cors'
import requestIp from 'request-ip'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import { authRoutes } from './routes/auth.routes.js'
import { shopRoutes } from './routes/shop.routes.js'
import { productRoute } from './routes/product.routes.js'

const app = express()

app.use(
    helmet({
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false,
        contentSecurityPolicy: false
    })
)

app.use(cors({
    origin: [
        'http://localhost:5173',
        "https://nearbuyshop.vercel.app"
    ],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({limit: '1mb'}))
app.use(requestIp.mw())

app.use('/api', authRoutes)
app.use('/api', shopRoutes)
app.use('/api/product', productRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Nearbuy backend is running...')
})

export default app

