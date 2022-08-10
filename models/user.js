'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auth extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            contact: DataTypes.STRING,
            image: DataTypes.STRING,
            gender: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
}