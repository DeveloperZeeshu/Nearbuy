import { defineConfig } from 'drizzle-kit'
import './app/db/schema.js'

export default defineConfig({
    out: './app/db',
    schema: './app/db/schema.js',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
})

