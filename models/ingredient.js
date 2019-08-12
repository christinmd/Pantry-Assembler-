module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: DataTypes.STRING,
  });

  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Recipe, {
      through: "recipeIngredients",
      as: 'recipes',
      foreignKey: 'ingredientId',
      onDelete: "cascade"
    });
  };


  return Ingredient;
};


