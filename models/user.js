'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Email required'
        },
        notNull: {
          msg : 'Email required'
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'First Name required'
        },
        notNull: {
          msg : 'First Name required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Last Name required'
        },
        notNull: {
          msg : 'Last Name required'
        }
      }
    },
    profile_image: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Password Required"
        },
        notNull: {
          msg : "Password Required"
        },
        len: {
          args : [8, Infinity],
          msg : "Password minimal 8 karakter"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Hanya nomor yang diperbolehkan"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  
  return User;
};