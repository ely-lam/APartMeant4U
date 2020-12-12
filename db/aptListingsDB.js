const { MongoClient } = require("mongodb");
const assert = require("assert");

function MyDB() {
  // Connection URL
  const url = process.env.MONGO_URL || "mongodb://localhost:27017";

  // Database Name
  const dbName = "aptListings";
  const myDB = {};

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
  });

  const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted documents into the collection");
      callback(result);
    });
  }

  return myDB;
}



module.exports = myDB();