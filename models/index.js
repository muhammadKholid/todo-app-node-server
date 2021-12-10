const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    // operatorsAliases: false,

    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activity = require('./activity.model')(sequelize, Sequelize);
db.todo = require('./todo.model')(sequelize, Sequelize);

//relation activity & todo
db.activity.hasMany(db.todo, { 
  foreignKey: 'activity_group_id',
  as: 'todo_items'
});
db.todo.belongsTo(db.activity, {
    foreignKey: 'activity_group_id',
    as: 'activity',
});

module.exports = db;
