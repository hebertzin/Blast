import multer from 'multer'

const config: multer.StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '/tmp')
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

export const storage = multer({ storage: config })
