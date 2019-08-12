module.exports = function(sequelize, DataTypes) {
    var PantryItems = sequelize.define("PantryItems", {
      item_name: DataTypes.STRING,
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      unit: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      expireDate:{
        type: DataTypes.TEXT,
        allowNull: true
      }
      
    });


    // PantryItems.associate = function(models) {
    //   PantryItems.belongsToMany(models.Users, {
    //     through: "Users_PantryItems",
    //     as: 'users',
    //     foreignKey: 'pantryItemId',
    //     onDelete: "cascade"
    //   });
    // };
    return PantryItems;
  };