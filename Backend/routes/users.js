const {
  login,
  reg,
  verify
} = require('../controller/users')
const router = require('koa-router')()

router.prefix('/users')

//登录
router.post('/login', login)

//注册
router.post('/reg', reg)

//验证登录
router.get('/verify', verify)

module.exports = router
