module.exports = function (sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      },
      references: {
        model: 'Users',
        key: 'id'
      },
    },
  });
  return Item;
  
};
