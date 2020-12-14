const express = require("express");
const router = express.Router();

const passport = require("passport");

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const aptDB = require("../db/apm4uDB.js");

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/login?msg='Invalid username or password'" }),
  (req, res) => {
    console.log("Logged In: ", req.body);
    res.redirect("/");
  });

router.post("/signup", async (req, res, cb) => {
  const registrationParams = req.body;
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();

  const users = await aptDB.initializeUsers();
  // let user = req.body.username;
  // await aptDB.createTeam(user);
  // await aptDB.createFavorites(user);

  console.log("Trying to create user: ", req.body);

  if (
    registrationParams.password != registrationParams.passwordConfirm ||
      registrationParams.username == "" ||
      registrationParams.password == ""
  ) {
    res.redirect("/signup?error=Passwords must match.");
  } else {
    const payload = {
      username: registrationParams.username,
      password: registrationParams.password,
    };

    users.findOne({ username: registrationParams.username }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (user) {
        res.redirect("/signup?error=Username already exists.");
      } else {
        users.insertOne(payload, (err) => {
          if (err) {
            res.redirect("/signup?error=Error signing in.");
          }
        });
        res.redirect("/");
      }
    });
  }

  console.log("User " + req.user.username + " created", req.body);
  res.redirect("/login");
});

router.get("/getUser", (req, res) => {
  res.send({ username: req.user ? req.user.username : null });
  console.log("user:", req.user.username);
}
);

router.get("/logout",
  function(req, res) {
    req.logout();
    res.send({});
  });


module.exports = router;
