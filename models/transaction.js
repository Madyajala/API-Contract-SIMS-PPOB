'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
    }
  }
  Transaction.init({
    invoice_number: DataTypes.STRING,
    service_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Service Code required'
        },
        notNull: {
          msg : 'Service Code required'
        }
      }
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Service Name required'
        },
        notNull: {
          msg : 'Service Name required'
        }
      }
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Transaction Type required'
        },
        notNull: {
          msg : 'Transaction Type required'
        }
      }
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Total Amount required'
        },
        notNull: {
          msg : 'Total Amount required'
        },
        isNumeric: {
          args: true,
          msg: "Hanya nomor yang diperbolehkan"
        }
      }
    },
    created_on: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};