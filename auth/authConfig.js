const passport = require("passport");
const Strategy = require("passport-local").Strategy;
// const db = require("./db");

const findByUsername(username, password) {
  return username === "John" ? { username: "Ely", password: "007" } : null;
}

passport.use(new LocalStrategy(
  function(username, password, cb) {
    User.findOne({ username: username }, function (err, user) {
      console.log("Authenticating", username, password);

      try{
        const user = findByUsername(username);

        if (!user) { // user not found in db
          console.log("User not found");
          return cb(null, false); 
        }
        if (!user.verifyPassword(password)) { // incorrect password
          console.log("Wrong password");
          return cb(null, false); 
        }

        console.log("User authenticated");

        return cb(null, user); // user and password match
      } catch (err) {
        console.log("Error authenticating", err); // error
        return cb(err, null);
      }
    });

    passport.serializeUser(function (user, cb) {
      cb(null, user.username);
    });

    passport.deserializeUser(async function (username, cb) {
      try {
        const user = await findByUsername(username);
        cb(null, user);
      } catch (err) {
        cb(err);
      }
    });

    app.use(require("body-parser").urlencoded({ extended: true }));
    app.use(
      require("express-session")({
        secret: "bond",
        resave: false,
        saveUninitialized: false,
      })
    );

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
  }
));