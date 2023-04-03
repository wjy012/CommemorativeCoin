const { DataTypes: { STRING, INTEGER, DATEONLY, CHAR }} = require('sequelize')
const { sequelize } = require('../db/index')

const Comments = sequelize.define('comments', {
    id: {
        type: INTEGER(7),
        primaryKey: true,
        autoIncrement: true,
        comment: '标识文章'
    },
    title: {
        type: STRING(50),
        allowNull: false,
        comment: '标题'
    }, 
    link: {
        type: STRING(100),
        allowNull: false,
        comment: '链接'
    },
    preview: {
        type: STRING(300),
        comment: '缩略'
    },
    date: {
        type: DATEONLY,
        comment: '发布时间'
    }
})

// sequelize.sync()

module.exports = Comments