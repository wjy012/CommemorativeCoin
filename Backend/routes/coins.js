const {
    getCoinList
} = require('../controller/coins')
const router = require('koa-router')()

router.get('/coinList', getCoinList)

module.exports = router