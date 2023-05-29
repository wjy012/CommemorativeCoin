const Coins = require('../model/coins')
const Comments = require('../model/comments')

const getIndex = async (ctx, next) => {
    try {
      const news = await Comments.findAll({
        limit: 8,
        order: [['date', 'DESC']]
      })
      const newsCount = await Comments.count()
      const newCoins = await Coins.findAll({
        limit: 5,
        order: [['date', 'DESC']],
        attributes: ['id', 'image', 'name']
      }) 
      const coinsCount = await Coins.count()
      ctx.body = {
        code: 200,
        data: {
          news,
          newCoins,
          newsCount,
          coinsCount
        }
      }
      
    } catch (error) {
      
    }
  }

const getPopCoins = async (ctx) => {
    try {
      const coinName = [], visits = [], coinid = []
      const popCoins = await Coins.findAll({
        limit: 7,
        order: [['visited', 'DESC']],
        attributes: ['id', 'name', 'visited']
      })
      popCoins.forEach(e=>{
        coinName.push(e.name)
        visits.push(e.visited)
        coinid.push(e.id)
      })
      
      ctx.body = {
        code: 200,
        data: {
          coinName, visits, coinid
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    getIndex,
    getPopCoins
}