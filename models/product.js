'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**j
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order, {through: models.OrderDetail})
      Product.belongsTo(models.Categorie, {foreignKey:"CategoryId"})
    }
    static findSearch(query){
      let where ={}
      if(query){
        where={
          name:{
            [Op.iLike]:`%${query}%`
          }
        }
      }
      return Product.findAll({where,
        order: [
          ["CategoryId", "ASC"],
          ["name", "ASC"],
        ],
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Categories',
        key:'id'
      }
    },
    stock: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};