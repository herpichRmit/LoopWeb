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
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.session = require("./models/session.js")(db.sequelize, DataTypes);
db.ticket = require("./models/ticket.js")(db.sequelize, DataTypes);

// Relate user and review. One user has many reviews
db.user.hasMany(db.review, { foreignKey: "user_email" })
db.review.belongsTo(db.user, { foreignKey: "user_email" }) //, allowNull: true 

// Relate movie and review. One movie has many reviews
db.movie.hasMany(db.review, { foreignKey: "movie_id" }) 
db.review.belongsTo(db.movie, { foreignKey: "movie_id" }) //, allowNull: false 

// Relate movie and session. One movie has many sessions
db.movie.hasMany(db.session, { foreignKey: "movie_id" }) 
db.session.belongsTo(db.movie, { foreignKey: "movie_id" }) //, allowNull: false 

// Relate session and user through tickets join table. Many sessions have many users
db.session.belongsToMany(db.user, { through: db.ticket, foreignKey: "session_id" });
db.user.belongsToMany(db.session, { through: db.ticket, foreignKey: "user_email" });

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  //await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  await db.sequelize.sync({ force: true }); // TODO: switch from force to normal sync when moving to build
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2")

  // users
  let hash = await argon2.hash("abc123", {type: argon2.argon2id});
  await db.user.create({ user_email: "test@gmail.com", first_name: "Shekhar", last_name : "Kalra", password_hash: hash, join_date : "2023-10-01" });
  hash = await argon2.hash("def345", {type: argon2.argon2id});
  await db.user.create({ user_email: "test2@gmail.com", first_name: "Matthew", last_name : "Bolger", password_hash: hash, join_date : "2023-10-01" });

  // movies
  await db.movie.create({ title: "Test movie 2", description: "In 'Test Movie 2,' a scientist delves into a world of cutting-edge technology, pushing the boundaries of reality. As they experiment with mind-bending concepts, they face unforeseen consequences, blurring the line between dreams and existence. This sci-fi thriller challenges the very fabric of our perception.", director : "Ethan Herpich", stars: "Ethan Herpich, Liam Keenan, Leonardo Di Caprico", released : "2023", image : "url here" });

  // reviews
  await db.review.create({ rating: 5, comment: "Great movie well done", post_date: "2023-10-01 00:00:00", user_email: "test@gmail.com", movie_id: 1 })
  await db.review.create({ rating: 3, comment: "Very good, I even watched it twice", post_date: "2023-12-01 03:00:00", user_email: "test@gmail.com", movie_id: 1 })
  
  // sessions
  await db.session.create({ cinema_name: "Cinema Nova", session_time: "2023-10-01 00:00:00", session_capacity: 10, movie_id: 1 })
  await db.session.create({ cinema_name: "Cinema Nova", session_time: "2023-10-01 09:00:00", session_capacity: 10, movie_id: 1 })
  await db.session.create({ cinema_name: "HOYTS", session_time: "2023-10-01 09:00:00", session_capacity: 10, movie_id: 1 })

  // tickets
  await db.ticket.create({ status: "test", session_id: 1, user_email: "test@gmail.com" })

}

module.exports = db;


/*
SELECT `user`.`user_email`, `user`.`first_name`, `user`.`last_name`, `user`.`password_hash`, `user`.`join_date`, `reviews`.`review_id` AS `reviews.review_id`, `reviews`.`rating` AS `reviews.rating`, `reviews`.`comment` AS `reviews.comment`, `reviews`.`post_date` AS `reviews.post_date`, `reviews`.`userUserEmail` AS `reviews.userUserEmail`, `reviews`.`user_email` AS `reviews.user_email` 
FROM `users` AS `user` 
LEFT OUTER JOIN `reviews` AS `reviews` 
  ON `user`.`user_email` = `reviews`.`userUserEmail` 
  WHERE `user`.`user_email` = 'test@gmail.com';

SELECT `user`.`user_email`, `user`.`first_name`, `user`.`last_name`, `user`.`password_hash`, `user`.`join_date`, `reviews`.`review_id` AS `reviews.review_id`, `reviews`.`rating` AS `reviews.rating`, `reviews`.`comment` AS `reviews.comment`, `reviews`.`post_date` AS `reviews.post_date`, `reviews`.`userUserEmail` AS `reviews.userUserEmail`, `reviews`.`user_email` AS `reviews.user_email` 
FROM `users` AS `user` 
LEFT OUTER JOIN `reviews` AS `reviews` 
  ON `user`.`user_email` = `reviews`.`userUserEmail` 
  WHERE `user`.`user_email` = 'test@gmail.com';
*/