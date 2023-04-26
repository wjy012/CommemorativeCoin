const { DataTypes: { INTEGER, }} = require('sequelize')
const { sequelize } = require('../db/index')
const Coins = require("./coins")
const Comments = require('./comments')

const Mention = sequelize.define('mention', {
    coinid: {
        type: INTEGER(7),
        references: {
            model: Coins,
            key: 'id'
        }
    },
    commentid: {
        type: INTEGER(7),
        references: {
            model: Comments,
            key: 'id'
        }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['coinid', 'commentid']
        }
    ]
})

Mention.belongsTo(Comments, { foreignKey: 'commentid'})


Coins.belongsToMany(Comments, { through: Mention})
Comments.belongsToMany(Coins, { through: Mention})


module.exports = Mention