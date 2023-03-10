const { DataTypes: { STRING, UUID }} = require('sequelize')
const { sequelize } = require('../db/index')

const Users = sequelize.define('users', {
    username: {
        type: STRING(20),
        allowNull: false,
        primaryKey: true,
        comment: '用户名'
    },
    password: {
        type: STRING(60),
        allowNull: false,
        comment: '密码'
    },
    salt: {
        type: UUID,
        allowNull: false,
        comment: 'md5加密盐'
    }
}, {
    tableName: 'users',
    underscored: true
});

// sequelize.sync()
//.then(_=>{
//     return Users.create({
//         username: 'admin',
//         password: '123456'
//     })
// }).catch(err=>{
//     console.error(err);
// })

module.exports = Users