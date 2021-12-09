const Sequelize = require('sequelize');
const sequelize = new Sequelize('user', 'root','root', {
    dialect: 'mysql',
    host:'localhost'
}); 

module.exports=sequelize;