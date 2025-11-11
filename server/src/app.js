import express from 'express'
import cors from 'cors'
import { authRoutes } from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import requestIp from 'request-ip'
import { shopRoutes } from './routes/shop.routes.js'
import { productRoute } from './routes/product.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use(requestIp.mw())

app.use('/api', authRoutes)
app.use('/api', shopRoutes)
app.use('/api/product', productRoute)

export default app
