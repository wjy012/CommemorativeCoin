const path = require('path')
const fs = require('fs')
const multer = require('@koa/multer')
let fileNowName = ''
const dir = './public/uploads/'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, {
                recursive: true
            })
        }
        cb(null, dir)
    },
    filename: function(req, file, cb){
        const [fileName, fileFormat] = file.originalname.split('.')
        fileNowName = fileName +'-'+ Date.now() +'.'+ fileFormat
        cb(null, fileNowName)
    }
})
const upload = multer({ storage })

module.exports = upload