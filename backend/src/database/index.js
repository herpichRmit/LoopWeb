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
db.review.belongsTo(db.user, { foreignKey: "user_email" }) 

// Relate movie and review. One movie has many reviews
db.movie.hasMany(db.review, { foreignKey: "movie_id" }) 
db.review.belongsTo(db.movie, { foreignKey: "movie_id" }) 

// Relate movie and session. One movie has many sessions
db.movie.hasMany(db.session, { foreignKey: "movie_id" }) 
db.session.belongsTo(db.movie, { foreignKey: "movie_id" }) 

// Relate session and user through tickets join table. Many sessions have many users
// db.session.belongsToMany(db.user, { through: db.ticket, foreignKey: "session_id" });
// db.user.belongsToMany(db.session, { through: db.ticket, foreignKey: "user_email" });

// Relate session and ticket. One session has many tickets
db.session.hasMany(db.ticket, { foreignKey: "session_id" }) 
db.ticket.belongsTo(db.session, { foreignKey: "session_id" }) 

// Relate user and ticket. One user has many tickets
db.user.hasMany(db.ticket, { foreignKey: "user_email" }) 
db.ticket.belongsTo(db.user, { foreignKey: "user_email" }) 

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  //await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  await db.sequelize.sync(); // TODO: switch from force to normal sync when moving to build
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2")

  const currentDate = new Date()

  function getRandomJoinDate() {
    const randomDate = new Date(
      currentDate.getFullYear() - 1,
      Math.floor(Math.random() * 12), // Random month (0-11)
      Math.floor(Math.random() * 28) + 1 // Random day (1-28)
    );
    return randomDate;
  }

  // movies
  await db.movie.create({ title: "Barbie", description: "Join Barbie in a magical adventure with her unicorn companion, as they embark on a journey of friendship and wonder.", director: "Greta Gerwig", stars: "Margot Robbie, Ryan Gosling, Issa Rae", released: "2023", image: "url_here"});
  await db.movie.create({title: "Akira",description: "Step into the dystopian world of Akira, a cyberpunk anime masterpiece filled with technological marvels and post-apocalyptic chaos.",director: "Katsuhiro Otomo",stars: "Mitsuo Iwata, Nozomu Sasaki, Mami Koyama",released: "1988",image: "url_here"});
  await db.movie.create({ title: "Step Brothers", description: "Laugh-out-loud comedy as two adult men become stepbrothers, leading to hilarious chaos, absurd pranks, and unexpected bonding.", director: "Adam McKay", stars: "Will Ferrell, John C. Reilly, Mary Steenburgen", released: "2008", image: "url_here"});
  await db.movie.create({ title: "Beau is Afraid", description: "Prepare for a thrilling psychological journey as Beau faces his deepest fears and confronts a world of unexpected twists and mysteries.", director: "Helena Coan", stars: "Beau Wise, Pollyanna McIntosh, Josh Widdecombe", released: "2023", image: "url_here"});
  await db.movie.create({ title: "Midnight in Paris", description: "Experience the enchanting streets of Paris in this romantic comedy-drama. A writer explores the city of love and time-traveling adventures.", director: "Woody Allen", stars: "Owen Wilson, Rachel McAdams, Kathy Bates", released: "2011", image: "url_here"});
  await db.movie.create({ title: "Spiderman Beyond The Spiderverse", description: "Dive into the animated world of Spider-Man. Multiple Spider-People unite for an epic adventure filled with humor, heart, and heroism.", director: "Peter Ramsey, Rodney Rothman", stars: "Shameik Moore, Jake Johnson, Hailee Steinfeld", released: "2018", image: "url_here"})
  await db.movie.create({ title: "The Grand Budapest Hotel", description: "Wes Anderson's quirky masterpiece set in a fictional European hotel, following the adventures of its eccentric staff and guests.", director: "Wes Anderson", stars: "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric", released: "2014", image: "url_here"});
  await db.movie.create({ title: "Her", description: "A heartfelt sci-fi romance where a lonely writer develops an unlikely relationship with his operating system.", director: "Spike Jonze", stars: "Joaquin Phoenix, Scarlett Johansson, Amy Adams", released: "2013", image: "url_here"});
  await db.movie.create({ title: "Moonlight", description: "A coming-of-age drama that tells the story of a young African American's struggle with his identity and sexuality in a rough Miami neighborhood.", director: "Barry Jenkins", stars: "Mahershala Ali, Naomie Harris, Trevante Rhodes", released: "2016", image: "url_here"});
  await db.movie.create({ title: "The Shape of Water", description: "Guillermo del Toro's enchanting fantasy romance about a mute woman who forms a unique bond with an amphibious creature.", director: "Guillermo del Toro", stars: "Sally Hawkins, Michael Shannon, Octavia Spencer", released: "2017", image: "url_here"});

  // users
  let hash = await argon2.hash("abc123", {type: argon2.argon2id});
  await db.user.create({ user_email: "ethan@loopweb.com", first_name: "Ethan", last_name : "Herpich", password_hash: hash, join_date : "2020-10-01" });
  hash = await argon2.hash("def345", {type: argon2.argon2id});
  await db.user.create({ user_email: "liam@loopweb.com", first_name: "Liam", last_name : "Keenan", password_hash: hash, join_date : "2020-10-01" });
  await db.user.create({ user_email: "john_rockstar@gmail.com", first_name: "Johnny", last_name: "Johnson", password_hash: await argon2.hash("password1", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "luna.stargazer@gmail.com", first_name: "Luna", last_name: "Smith", password_hash: await argon2.hash("password2", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "max.mystery88@gmail.com", first_name: "Max", last_name: "Williams", password_hash: await argon2.hash("password3", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "ruby-adventurer-42@gmail.com", first_name: "Ruby", last_name: "Brown", password_hash: await argon2.hash("password4", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "oliver_lovestocode@example.com", first_name: "Oliver", last_name: "Davis", password_hash: await argon2.hash("password5", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "jane.coder88@gmail.com", first_name: "Jane", last_name: "Johnson", password_hash: await argon2.hash("password1", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "lucas.wonderland@gmail.com", first_name: "Lucas", last_name: "Smith", password_hash: await argon2.hash("password2", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "olivia.explore99@gmail.com", first_name: "Olivia", last_name: "Williams", password_hash: await argon2.hash("password3", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "matthew.artsy2022@gmail.com", first_name: "Matthew", last_name: "Brown", password_hash: await argon2.hash("password4", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "victoria.musicallyinclined@example.com", first_name: "Victoria", last_name: "Davis", password_hash: await argon2.hash("password5", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "william.moviebuff99@gmail.com", first_name: "William", last_name: "Taylor", password_hash: await argon2.hash("password6", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});
  await db.user.create({ user_email: "zoey.literarylover@example.com", first_name: "Zoey", last_name: "Walker", password_hash: await argon2.hash("password7", { type: argon2.argon2id }), join_date: getRandomJoinDate().toLocaleDateString("en-US")});

  // reviews
  await db.review.create({ rating: 5, headline: "Great", comment: "Great movie well done", post_date: "2023-10-01 00:00:00", user_email: "oliver_lovestocode@example.com", movie_id: 1 })
  await db.review.create({ rating: 3, headline: "Great, could watch many times over", comment: "Very good, I even watched it twice", post_date: "2023-12-01 03:00:00", user_email: "john_rockstar@gmail.com", movie_id: 1 })
  await db.review.create({ rating: Math.random() * 5, headline: "Impressive!", comment: "This movie exceeded my expectations.", post_date: "2023-10-02 10:30:00", user_email: "john_rockstar@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "Not My Cup of Tea", comment: "I found this movie to be quite boring.", post_date: "2023-10-02 11:45:00", user_email: "luna.stargazer@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "A Must-Watch", comment: "I'd recommend this movie to anyone.", post_date: "2023-10-02 12:15:00", user_email: "max.mystery88@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "So-So", comment: "It was an okay movie, nothing special.", post_date: "2023-10-02 13:30:00", user_email: "max.mystery88@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "Masterpiece!", comment: "I was blown away by this film.", post_date: "2023-10-02 14:45:00", user_email: "ruby-adventurer-42@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "A Bit Disappointing", comment: "I expected more from this movie.", post_date: "2023-10-02 15:00:00", user_email: "ruby-adventurer-42@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "Unforgettable", comment: "This film left a lasting impression on me.", post_date: "2023-10-02 16:15:00", user_email: "max.mystery88@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "Worth a Watch", comment: "I enjoyed my time watching this movie.", post_date: "2023-10-02 17:30:00", user_email: "ruby-adventurer-42@gmail.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "Can't Recommend Enough", comment: "One of the best movies I've seen.", post_date: "2023-10-02 18:00:00", user_email: "oliver_lovestocode@example.com", movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.review.create({ rating: Math.random() * 5, headline: "Pleasant Surprise", comment: "I didn't expect much, but I was pleasantly surprised.", post_date: "2023-10-02 19:15:00", user_email: "oliver_lovestocode@example.com", movie_id: Math.floor(Math.random() * 10) + 1 });

  // sessions
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 00:00:00", session_capacity: 10, movie_id: 1 })
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 09:00:00", session_capacity: 10, movie_id: 1 })
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 09:00:00", session_capacity: 10, movie_id: 1 })
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 15:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 18:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 14:15:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 17:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 13:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 11:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 16:20:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 19:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 14:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 12:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 12:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 16:15:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 15:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 18:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 14:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 11:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 17:15:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 19:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 13:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 15:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 15:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 18:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 14:15:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-01 17:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-01 16:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-01 19:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-02 13:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-02 16:15:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-02 14:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-02 17:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-02 19:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-02 15:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-03 12:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-03 16:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-03 14:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-04 17:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-04 20:15:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Kensington", session_time: "2023-10-04 18:00:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Richmond", session_time: "2023-10-05 15:45:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  await db.session.create({ cinema_name: "Carlton", session_time: "2023-10-05 14:30:00", session_capacity: 10, movie_id: Math.floor(Math.random() * 10) + 1 });
  

  // tickets
  await db.ticket.create({ session_id: 1, user_email: "ethan@loopweb.com" })
  await db.ticket.create({ session_id: 1, user_email: "liam@loopweb.com" })
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "jane.coder88@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "lucas.wonderland@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "olivia.explore99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "matthew.artsy2022@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "victoria.musicallyinclined@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "william.moviebuff99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "zoey.literarylover@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "ethan@loopweb.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "jane.coder88@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "lucas.wonderland@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "olivia.explore99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "matthew.artsy2022@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "victoria.musicallyinclined@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "william.moviebuff99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "zoey.literarylover@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "ethan@loopweb.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "jane.coder88@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "lucas.wonderland@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "olivia.explore99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "matthew.artsy2022@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "victoria.musicallyinclined@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "william.moviebuff99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "zoey.literarylover@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "ethan@loopweb.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "jane.coder88@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "lucas.wonderland@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "olivia.explore99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "matthew.artsy2022@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "victoria.musicallyinclined@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "william.moviebuff99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "zoey.literarylover@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "ethan@loopweb.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "jane.coder88@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "lucas.wonderland@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "olivia.explore99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "matthew.artsy2022@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "victoria.musicallyinclined@example.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "william.moviebuff99@gmail.com" });
  await db.ticket.create({ session_id: Math.floor(Math.random() * 22) + 1, user_email: "zoey.literarylover@example.com" });
  
}

module.exports = db;

