module.exports = (sequelize, DataTypes) =>
  sequelize.define("session", {
    session_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cinema_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    session_time: { 
      type: DataTypes.DATE,
      allowNull: false,
    },
    session_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });

