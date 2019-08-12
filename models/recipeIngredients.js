module.exports = function (sequelize, DataTypes) {
  var recipeIngredients = sequelize.define("recipeIngredients", {

    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
      references: {
        model: 'Recipe',
        key: 'id'
      },
    },
    ingredientId: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      },
      references: {
        model: 'Ingredient',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return recipeIngredients;
};


