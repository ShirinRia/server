const {
    MongoClient,
    ServerApiVersion,
    ObjectId
  } = require('mongodb');
const express=require('express')
const app=express()
const cors =require('cors')
require('dotenv').config()
const port =process.env.PORT || 5000
//middleware
app.use(cors());
app.use(express.json())

USERNAME = process.env.S3_BUCKET
PASS = process.env.SECRET_KEY
const uri = `mongodb+srv://${USERNAME}:${PASS}@cluster0.xrp2z6o.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const menucollection = client.db("Restaurnt").collection("menu");

   // get all menu from database
   app.get('/menu', async (req, res) => {
    const cursor = menucollection.find();
    const result = await cursor.toArray();
    res.send(result)
  })
    

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})