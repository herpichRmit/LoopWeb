module.exports = (sequelize, DataTypes) =>
  sequelize.define("movie", {
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    director: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stars: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    released: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    image: { 
      type: DataTypes.TEXT('long'),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
