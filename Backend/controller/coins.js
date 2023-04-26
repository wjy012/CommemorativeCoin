const Coins = require('../model/coins')
const Comments = require('../model/comments')
const {Op, fn, col, where} = require('sequelize')
const { exec } = require('child_process')
const Mention = require('../model/mention')

/**
 * 查询列表
 */
const getCoinList = async ctx =>{
    const { currentPage, pageSize, type, year, key, theme} = ctx.query
    const criteria = {
        type
    }
    if(key){
        criteria.name = {
            [Op.like]: `%${key}%`
        }
    }
    if(theme){
        criteria.theme = theme
    }


    await Coins.findAndCountAll({
        where: {
            [Op.and]: [
                year? where(fn('Year', col('date')), year): null,
                criteria
            ]
        },
        limit: pageSize-0,
        offset: pageSize * (currentPage-1)
    }).then(res=>{
        if(res){
            ctx.body = {
                code: 200,
                data: res
            }
        }
    })
}

/**
 * 查询单个详细信息
 * get
 */
const getCoinDetail = async ctx=>{
    const {id} = ctx.query
    await Coins.findByPk(id).then(res=>{
        if(res){
            ctx.body = {
                code: 200,
                data: res
            }
        }
        else{
            ctx.body = {
                code: 404,
                msg: '该纪念币不存在或已被删除！'
            }
        }
    })
}

/**
 * 查询单个纪念币相关的文章
 * get
 * params: currentPage, pageSize, coinID
 */
const getMentioned = async ctx =>{
    const {currentPage, pageSize, coinID} = ctx.query
    await Mention.findAndCountAll({
        include: [Comments],
        where: {
            coinid: coinID
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
        // limit: pageSize-0,
        // offset: pageSize * (currentPage-1)
    }).then(res=>{
        if(res){
            const rows = []
            res.rows.forEach(item =>{
                rows.push(item.comment)
            })
            ctx.body = {
                code: 200,
                data: {
                    count: res.count,
                    rows
                }
            }
        }
    }).catch(err=>{
        console.log('catcherr', err);
    })
}

/**
 * 添加纪念币信息
 * post
 */
const addCoin = async ctx =>{
    const {name, type, value, amount, material, theme, date, image } = ctx.request.body
    await Coins.create({
        name,
        type,
        value,
        amount,
        material,
        theme,
        date,
        image
    }).then(coin=>{
        if(coin){
            const {id} = coin.dataValues
            const year = date.split('-')[0]
            let comments = 0
            exec(`python ./pycode/google.py ${name} ${id} ${year}`, (err, stdout)=>{
                if(err){
                    console.log(err.message);
                    return
                }
                comments = stdout
            })
            ctx.body={
                code: 200,
                msg: `添加成功！`
            }
        }
        else return Promise.reject()
    }).catch(err=>{
        console.log(err);
        ctx.body = {
            code: 500,
            msg: '添加失败'
        }
    })
}

/**
 * 删除纪念币信息
 * get
 */
const deleteCoin = async ctx=>{

}

/**
 * 修改纪念币信息
 * post
 */
const updateCoin = async ctx=>{
    const {id, coinInfo} = ctx.request.body

    try {
        const coin = await Coins.findByPk(id)
        if(!coin){
            throw new Error('该纪念币不存在！')
        }
        for(const key in coinInfo){
            coin[key] = coinInfo[key]
            await coin.save()
            ctx.body = {
                code: 200,
                msg: '编辑成功！'
            }
        }
    } catch (error) {
        console.log('编辑失败', error);
    }
}

/**
 * 上传图片接口
 * post /uploadCoinImg
 */
const uploadCoinImg = async ctx =>{
    let path = ctx.origin + ctx.file.path.replace('public', '')
    path = path.replace(/\\/g, '/')

    ctx.body = {
        code: 200,
        data: path
    }
}

module.exports = {
    getCoinList,
    getCoinDetail,
    getMentioned,
    addCoin,
    deleteCoin,
    updateCoin,
    uploadCoinImg
}