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
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required "
        },
        notNull: {
          msg: "Name is required "
        }
      }
    },
    description:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required "
        },
        notNull: {
          msg: "Description is required "
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required "
        },
        notNull: {
          msg: "Price is required "
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Categories',
        key:'id'
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock is required "
        },
        notNull: {
          msg: "Stock is required "
        }
      }
    },
    imageUrl: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ImageUrl is required "
        },
        notNull: {
          msg: "ImageUrl is required "
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};