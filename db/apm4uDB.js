const { MongoClient } = require("mongodb");
const assert = require("assert");

function MyDB() {
  // Connection URL
  const url = process.env.MONGO_URL || "mongodb://localhost:27017";

  // Database Name
  const dbName = "apm4uDB";
  const myDB = {};

  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // myDB.insertListings = async (db, callback) => {
    //   // Get the documents collection
    //   const collection = db.collection("aptlistings");
    //   // Insert some documents
    //   db.collection("inserts").insertOne({
    //     a:1
    //     , b: function() { return "hello"; }
    //   }, {
    //     w: "majority"
    //     , wtimeout: 10000
    //     , serializeFunctions: true
    //   }, function(err, r) {
    //     assert.equal(null, err);
    //     assert.equal(1, r.insertedCount);
    //     client.close();
    //   });
    // };

    myDB.initializeUsers = async () => {
      const users = db.collection("users");
      return users;
    };

    myDB.getUsers = async () => {
      //collection
      const users = db.collection("users");

      const query = {};
      return users
        .find(query)
        .toArray()
        .finally(() => client.close());
    };

    myDB.getListings = async () => {
      const listings = db.collection("aptlistings"); // access apt listings collection
      const query = {};
      return listings.find(query).toArray(); // return the listings file (JSON)
    };

    // client.close();
  });

  return myDB;
}



module.exports = MyDB();