const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b0m9oyj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const toysCollection = client.db("toyTails").collection("toys");
    const addedtoyCollection = client.db("toyTails").collection("addedtoys");

    // allToys data
    app.get("/toys", async (req, res) => {
      const cursor = toysCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Cows data
    const cowsCollection = client.db("toyTails").collection("Cow");
    app.get("/cow", async (req, res) => {
      const cursor = cowsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Bear data
    const bearCollection = client.db("toyTails").collection("Bear");
    app.get("/bear", async (req, res) => {
      const cursor = bearCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // horse data
    const horseCollection = client.db("toyTails").collection("horse");
    app.get("/horse", async (req, res) => {
      const cursor = horseCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("ToyTails is running");
});

app.listen(port, () => {
  console.log(`ToyTails server is running on port ${port}`);
});
