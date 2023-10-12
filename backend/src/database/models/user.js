module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    user_email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    password_hash: { // encryption or something?
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    join_date: { // encryption or something?
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
