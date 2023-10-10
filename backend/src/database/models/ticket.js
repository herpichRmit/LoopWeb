module.exports = (sequelize, DataTypes) =>
  sequelize.define("ticket", {
    status: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });