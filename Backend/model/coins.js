const { DataTypes: { STRING, INTEGER, DATEONLY, CHAR }} = require('sequelize')
const { sequelize } = require('../db/index')

const Coins = sequelize.define('coins', {
    id: {
        type: INTEGER(7),
        primaryKey: true,
        autoIncrement: true,
        comment: '标识纪念币'
    },
    type: {
        type: STRING(8),
        comment: '类型'
    },
    name: {
        type: STRING(20),
        allowNull: false,
        comment: '名称'
    },
    value: {
        type: INTEGER(6),
        allowNull: false,
        comment: '面值'
    },
    amount: {
        type: INTEGER(10),
        comment: '发行数量'
    },
    date: {
        type: DATEONLY,
        comment: '发行时间'
    },
    image: {
        type: STRING(80),
        comment: '图片链接'
    },
    theme: {
        type: STRING(8),
        comment: '题材',
    },
    material: {
        type: STRING(10),
        comment: '材质'
    }
})


module.exports = Coins