module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define(
    'activities',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Activity;
};
