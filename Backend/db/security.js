const md5 = require('md5')

const MD5 = function(val, salt){
    return new Promise((resolve, reject)=>{
        const passSalt = md5(md5(val), salt)
        resolve(passSalt)
    })
}

module.exports = {
    MD5
}