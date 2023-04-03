const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const KoaStatic = require('koa-static')

const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')
const coins = require('./routes/coins')
const comments = require('./routes/comments')
const {mysqlConnect} = require('./db/index')

// error handler
onerror(app)
mysqlConnect()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())
app.use(KoaStatic(path.join(__dirname, './public/uploads')))

// app.use(koajwt({
//   secret: 'wjy-graduationdesign-server'
// }).unless({
//   path: [/^\/users/]  //不需要jwt验证的接口
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(coins.routes(), coins.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
