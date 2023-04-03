const {
    getCoinList,
    getCoinDetail,
    addCoin,
    updateCoin,
    uploadCoinImg
} = require('../controller/coins')
const router = require('koa-router')()
const upload = require('../db/upload')

router.get('/coinList', getCoinList)

router.get('/coinDetail', getCoinDetail)

router.post('/addCoin', addCoin)

router.post('/updateCoin', updateCoin)

router.post('/uploadCoinImg', upload.single('file'), uploadCoinImg)

module.exports = router