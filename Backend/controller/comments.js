const Comments = require('../model/comments')
const {Op} = require('sequelize')
const { exec, execSync } = require('child_process')

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
        limit: pageSize-0,
        order: [['date', 'DESC']]
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

/**
 * 手动启动文章爬虫
 */
const refreshComments = async ctx =>{
    try {
        const lines = await execSync('python ./pycode/comments.py').toString()
        ctx.body = {
            code: 200,
            lines
        }
    } catch (error) {
        ctx.body = {
            code: 500
        }
    }
}


module.exports = {
    getCommentList,
    refreshComments
}