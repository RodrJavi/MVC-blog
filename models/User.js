const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9_-]+$/i,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: [8],
        // Regex to ensure no characters to a foreign keyboard can be input
        is: /^[a-zA-Z0-9#$@!%*?^&()\-_+=<>[\]{}|;:'",./\\~`\s]*$/i,
      },
    },
  },
  {
    hooks: {
      // Encrypts the password for any newly created users
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
