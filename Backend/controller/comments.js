const Comments = require('../model/comments')
const {Op} = require('sequelize')

/**
 * 查询列表 get
 */
const getCommentList = async ctx=>{
    const { currentPage, pageSize, kw } = ctx.query
    const criteria = {}
    if(kw){
        criteria['title'] = {
            [Op.like]: `%${kw}%`
        }
    }
    await Comments.findAndCountAll({
        where: criteria,
        offset: pageSize * (currentPage-1),
        limit: pageSize-0
    }).then(res=>{
        if(res){
            ctx.body = {
                code: 200,
                data: res
            }
        }else{
            return Promise.reject()
        }
    }).catch(err=>{
        console.log(err);
        ctx.body = {
            code: 500,
            data: '查询错误'
        }
    })
}

module.exports = {
    getCommentList
}