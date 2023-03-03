const jwt = require('jsonwebtoken')
const { sequelize } = require('../db/index')
const Users = require('../model/users')

const login = async ctx => {
    let user = {
        username: 'admin',
        pwd: '123'
    }

    let {username, password} = ctx.request.body

    await Users.findOne({
        where: {username, password}
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.error(err);
    })

    let token = jwt.sign({
        username: user.username
    }, 'wjy-graduationdesign', {
        expiresIn: 3600*24  //一天有效期
    })

    ctx.body = {
        token
    }
}

module.exports = {
    login
}