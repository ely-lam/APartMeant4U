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
    res.redirect("/listings?username=" + req.user.username);
  });

router.post("/signup", async (req, res, cb) => {
  const registrationParams = req.body;
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();

  const users = await aptDB.initializeUsers();
  let user = req.body.username;
  if (user != "") {
    await aptDB.createFavorites(user);
  }

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
        res.redirect("/login");
      }
    });
  }

  console.log("User " + req.user.username + " created", req.body);
  res.redirect("/login?msg='User created succesfully'");
});

router.get("/getUser", (req, res) => {
  res.send({ username: req.user ? req.user.username : null });
  console.log("user:", req.user.username);
});

router.post("/deleteUser", async (req, res) => {
  let user = req.body.deletedUser;
  aptDB.deleteUser(user);
  res.redirect("/"); // redirect to home page
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/?msg=Signed out successfully.");
});

// Seems like you are doing something else here. I suggest that we should move /getListings, /newFav, and /favorites to another router.
router.get("/getListings", async (req, res) => {
  // Okay, I see that you await the promise here. Mostly, for the reabability, we await at the line of code that returns the promise object.
  const listings = await aptDB.getListings();
  res.json(listings); // get apt listings
  console.log("Fetch listings", listings);
});

router.post("/newFav", async (req, res) => {
  let newFav = req.body.addFav;
  let user = req.body.user;
  aptDB.addFavorites(user, newFav);
  res.redirect("/userPage?username=" + req.user.username); // redirect to home page
});

router.get("/favorites", async (req, res) => {
  const favorites = await aptDB.getFavorites();
  res.json(favorites); // get apt listings
  console.log("Fetch favorites", favorites);
});




module.exports = router;
