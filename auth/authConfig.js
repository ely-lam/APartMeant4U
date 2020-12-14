const passport = require("passport");
const Strategy = require("passport-local").Strategy;

// const db = require("../db/aptListingsDB.js");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "apm4uDB";


module.exports = function configPassport(app) {
  console.log("configuring Passport");

  passport.use(
    new Strategy({ passReqsToCallback : true }, async function (username, password, cb) {
      console.log("Authenticating", username, password);
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = await client.db(dbName);
      const users = db.collection("users");

      try {
        users.findOne({ username }, (err, user) => {
          if (!user) { // user not found in db
            console.log("User not found");
            return cb(null, false);
          }
          if (user.password !== password) { // incorrect password
            console.log("Wrong password");
            return cb(null, false);
          }

          console.log("User authenticated");

          return cb(null, user); // valid user login
        });
      } catch (err) {
        console.log("Error authenticating", err); // error
        return cb(err, null);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.username);
  });

  passport.deserializeUser(async (username, cb) => {
    try {
      cb(null, { username });
    } catch (err) {
      cb(err);
    }
  });

  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "apm4uDB-cookie-secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
};
