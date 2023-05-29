const router = require('koa-router')()
const {getIndex, getPopCoins} = require('../controller/index')

router.get('/index', getIndex)

router.get('/popCoins', getPopCoins)

module.exports = router
