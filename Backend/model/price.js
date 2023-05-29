const { DataTypes: { INTEGER, DATEONLY }} = require('sequelize')
const { sequelize } = require('../db/index')
const Coins = require("./coins")

const Price = sequelize.define('price', {
    id: {
      type: INTEGER(7),
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DATEONLY,
      primaryKey: true,
      allowNull: false
    },
    price: {
      type: INTEGER(7),
    }
});
Price.belongsTo(Coins, {foreignKey: 'id'});
Price.sync()

module.exports = Price
