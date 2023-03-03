const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'commemorativecoin',
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0
    }
});

async function mysqlConnect(){
    try {
        await sequelize.authenticate()
        console.log('connected!!');
    } catch (error) {
        console.error('fail to connect', error);
    }
}

module.exports = {
    sequelize,
    mysqlConnect
}