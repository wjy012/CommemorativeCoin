const jwt = require('jsonwebtoken')
const { sequelize } = require('../db/index')
const { MD5 } = require('../db/security')
const { v4: uuidv4} = require('uuid')
const Users = require('../model/users')

/**
 * 用户登录
 */
const login = async ctx => {
    let {username, password} = ctx.request.body

    await Users.findOne({
        where: {username}
    }).then(async res=>{
        if(res){
            const { password: dbpwd, salt} = res.dataValues //数据库里存的加密密码
            const frontpwd = await MD5(password, salt)
            if(frontpwd===dbpwd){
                const token = jwt.sign({
                    username,
                }, 'wjy-graduationdesign-server', {
                    expiresIn: 3600*24  //一天有效期
                })
                ctx.body = {
                    code: 200,
                    msg: '登录成功',
                    token
                }
            }
            else{
                ctx.body = {
                    code: 400,
                    msg: '密码不匹配', 
                }
            }

        }else{
            ctx.body = {
                code: 404,
                msg: '用户不存在！'
            }
        }
    }).catch(err=>{
        console.error('error',err);
    })


}

/**
 * 用户注册
 */
const reg = async ctx =>{
    const {username, password} = ctx.request.body

    await Users.findOne({
        where: {username}
    }).then(async (res)=>{
        if(res){
            ctx.body = {
                code: 400,
                msg: '用户已存在'
            }
        }else{
            const salt = uuidv4()
            const md5pwd = await MD5(password, salt)
            return Users.create({
                username,
                password: md5pwd,
                salt
            })
        }
    }).then(res=>{
        if(res){
            const token = jwt.sign({
                username,
            }, 'wjy-graduationdesign-server', {
                expiresIn: 3600*24  //一天有效期
            })
            ctx.body = {
                code: 200,
                msg: '注册成功，自动登录',
                token
            }
        }else{
            ctx.body = {
                code: 500,
                msg: '注册失败！'
            }
        }
    }).catch(err=>{
        console.log(err);
    })
    

}

/**
 * 验证用户登录
 */
const verify = async ctx =>{
    const token = ctx.header.authorization.replace('Bearer ', '')

    try {
        let res = jwt.verify(token, 'wjy-graduationdesign-server')
        await Users.findOne({username: res.username}).then(rel=>{
            if(rel){
                ctx.body = {
                    code: 200,
                    msg: '用户认证成功',
                    user: rel.dataValues
                }
            }else{
                ctx.body = {
                    code: 404,
                    msg: '用户认证失败'
                }
            }
        }).catch(err=>{
            ctx.body = {
                code: 500,
                msg: '用户认证失败'
            }
        })
    } catch (error) {
        console.log('catch',error);
        ctx.body = {
            code: 500,
            msg: '用户认证失败'
        }
    }
}

module.exports = {
    login,
    reg,
    verify
}