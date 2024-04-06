import multer from 'multer'

const config: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

export const storage = multer({ storage: config })
