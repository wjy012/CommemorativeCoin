const Coins = require('../model/coins')
const {Op, fn, col, where} = require('sequelize')

/**
 * 查询列表
 */
const getCoinList = async ctx =>{
    console.log('getCoinList', ctx.query);
    const { currentPage, pageSize, type, year, key, theme} = ctx.query
    const criteria = {
        type
    }
    // if(year){
    //     criteria.date = {
    //         [fn('Year', col('date'))]: year
    //     }
    // }
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
        // {
        //     type,
        //     // name: {
        //     //     [Op.like] : key
        //     // },
        // },
        // where: and(
        //     key? `name like %${key}%` : null,
        //     theme? `theme = ${theme}` : null,
        //     year? `Year(date) = ${year}`: null
        // ),
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


module.exports = {
    getCoinList
}