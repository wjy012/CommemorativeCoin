const {
    getCoinList,
    getCoinDetail,
    getPriceData,
    getMentioned,
    addCoin,
    updateCoin,
    uploadCoinImg
} = require('../controller/coins')
const router = require('koa-router')()
const upload = require('../db/upload')

router.get('/coinList', getCoinList)

router.get('/coinDetail', getCoinDetail)

router.get('/getPriceData', getPriceData)

router.get('/mentionedComments', getMentioned)

router.post('/addCoin', addCoin)

router.post('/updateCoin', updateCoin)

router.post('/uploadCoinImg', upload.single('file'), uploadCoinImg)

module.exports = router