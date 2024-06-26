module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });


  /*
  user_email: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }

    movie_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
    */