const { DataTypes: { STRING }} = require('sequelize')
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
    }
}, {
    tableName: 'users',
    underscored: true
});

// sequelize.sync().then(_=>{
//     return Users.create({
//         username: 'admin',
//         password: '123456'
//     })
// }).catch(err=>{
//     console.error(err);
// })

module.exports = Users

// module.exports = (sequelize, DataTypes) =>{
//     class User extends Model {

//     }
//     User.init({
//         username: {
//             type: STRING(20),
//             primaryKey: true,
//             allowNull: false,
//             comment: '用户名'
//         },
//         password: {
//             type: STRING(40),
//             allowNull: false,
//             comment: '密码'
//         },
//     }, {
//         sequelize,
//         tableName: 'user',
//         underscored: true
//     });
//     return User;
// };