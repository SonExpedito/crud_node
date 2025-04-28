import { Sequelize } from 'sequelize'; 

const sequelize = new Sequelize('NikeBD', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


export { sequelize, Sequelize };