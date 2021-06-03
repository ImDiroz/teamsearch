const Sequelize = require('sequelize'); //Подключаем библиотеку
const config =  {
  username: 'root',
  password: null, // Для sqlite пароль не обязателен
  database: 'test_db', // Имя базы данных
  host: '127.0.0.1', // Адрес субд, для sqlite всегда локалхост
  dialect: 'sqlite', // Говорим, какую СУБД будем юзать
  dialectOptions: {
    multipleStatements: true
  },
  logging: console.log, // Включаем логи запросов, нужно передать именно функцию, либо false
  storage: './database.db', // Путь к файлу БД
  operatorsAliases: Sequelize.Op 
}
let sequelize = new Sequelize(config); // Создаём подключение


// Создаём описание таблички posts
let users = sequelize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER
  },
  login: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING
  },
  email: {
    type: Sequelize.DataTypes.STRING
  }
}, {
  timestamps: true // Колонки createdAt и updatedAt будут созданы автоматически
});

sequelize.sync();

module.exports = sequelize;
