const {
    getCommentList
} = require("../controller/comments")
const router = require('koa-router')()

router.get('/commentList', getCommentList)

module.exports = router