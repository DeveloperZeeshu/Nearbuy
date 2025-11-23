import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'src/uploads/users'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

export const uploads = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }
})

