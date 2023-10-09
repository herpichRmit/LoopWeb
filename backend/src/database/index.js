const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);

// Relate user and ticket.
//db.ticket.belongsTo(db.user, { foreignKey: { name:"user_id", allowNull: true } })

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2")

  let hash = await argon2.hash("abc123", {type: argon2.argon2id});
  await db.user.create({ user_email: "test@gmail.com", first_name: "Shekhar", last_name : "Kalra", password_hash: hash, join_date : "2023-10-01" });

  hash = await argon2.hash("def345", {type: argon2.argon2id});
  await db.user.create({ user_email: "test2@gmail.com", first_name: "Matthew", last_name : "Bolger", password_hash: hash, join_date : "2023-10-01" });

  await db.movie.create({ title: "Test movie 2", description: "In 'Test Movie 2,' a scientist delves into a world of cutting-edge technology, pushing the boundaries of reality. As they experiment with mind-bending concepts, they face unforeseen consequences, blurring the line between dreams and existence. This sci-fi thriller challenges the very fabric of our perception.", director : "Ethan Herpich", stars: "Ethan Herpich, Liam Keenan, Leonardo Di Caprico", released : "2023", image : "url here" });
}

module.exports = db;
