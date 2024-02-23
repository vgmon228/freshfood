'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsToMany(models.Product,{onDelete: 'CASCADE',through: models.OrderDetail})
    }
    get date(){
      return this.orderDate.toLocaleDateString()
    }
  }
  Order.init({
    order: DataTypes.STRING,
    status: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    hooks:{
      beforeCreate: (order,options)=>{
        order.orderDate=new Date()
        order.status='Pending'
        let tmp = ['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGS','SEP','OKT','NOV','DES']
        order.order=`${tmp[order.orderDate.getMonth()]}${order.orderDate.getTime()}`
      }
    }
  });
  return Order;
};