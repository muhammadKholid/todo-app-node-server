module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define(
    'todos',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      activity_group_id: {
        type: Sequelize.INTEGER,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      priority : {
        type: Sequelize.STRING,
        defaultValue: 'very-high',
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return Todo;
};

