import dotenv from 'dotenv'

dotenv.config()

const conf = {
    databaseUrl: String(process.env.DATABASE_URI),
    PORT: Number(process.env.PORT),
    jwtSecret: String(process.env.JWT_SECRET),
    environment: String(process.env.NODE_ENV)
}

export default conf
