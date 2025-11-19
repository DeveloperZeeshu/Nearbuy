import conf from './conf/conf.js'
import app from './app.js'
import { connectDB } from './config/db.js'

await connectDB()

// const PORT = conf.PORT || 3000
// app.listen(PORT, () => console.log(`Server running at ${PORT} Port...`))

export default app