const Comments = require('../model/comments')

/**
 * 查询列表 get
 */
const getCommentList = async ctx=>{
    const { currentPage, pageSize, kw } = ctx.query
    const criteria = {}
    if(kw){
        criteria['kw'] = kw
    }
    await Comments.findAndCountAll({
        where: criteria,
        offset: pageSize * (currentPage-1),
        limit: pageSize-0
    }).then(res=>{
        if(res){
            ctx.body = {
                code: 200,
                date: res
            }
        }else{
            return Promise.reject()
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            date: '查询错误'
        }
    })
}

module.exports = {
    getCommentList
}