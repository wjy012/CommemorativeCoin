const {
    getCoinList,
    getCoinDetail,
    updateCoin
} = require('../controller/coins')
const router = require('koa-router')()

router.get('/coinList', getCoinList)

router.get('/coinDetail', getCoinDetail)

router.post('/updateCoin', updateCoin)

module.exports = router