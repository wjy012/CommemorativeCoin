const {
    getCommentList,
    refreshComments
} = require("../controller/comments")
const router = require('koa-router')()

router.get('/commentList', getCommentList)

router.get('/refreshComments', refreshComments)

module.exports = router