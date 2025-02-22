const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log('mongo db started');
})


module.exports = connectDB;





        /*  try to interact with mongodb */
// const { MongoClient } = require('mongodb');
// const url = "mongodb+srv://abdallahabdelrahman186:Abdallah15@learn-mongo-db.74qhc.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";
// const client = new MongoClient(url);
//
// // Database Name
// const dbName = 'codeZone';
//
// async function main() {
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('courses');
//     const data = await collection.find().toArray();
//     console.log(data);
// }
//
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());