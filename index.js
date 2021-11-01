const express = require('express');
const app = express();
const port = process.env.PORT ||5000;
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config();
// mkeydleware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Form Node with nodemon')
});

// Database info 
// username: my_node_db,
// password: 5wjexkvqTOHRWHWO

// insurt db 


const uri = `mongodb+srv://my_node_db:${process.env.DB_PASS}@cluster0.ezich.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database= client.db('food_delivery');
        const foodCollection = database.collection('foods')
        console.log("Database Connect Successfully");

        // get product api
        app.get('/foods', async (req, res)=>{
            const cursor = foodCollection.find({});
            const foods = await cursor.toArray();
            res.send(foods);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// <--------------------------------------------->
// const users = [
    
//     { "key": 1, "name": "American themed food", "price": 50, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://media.istockphoto.com/photos/fourth-of-july-american-food-above-view-table-scene-on-white-wood-picture-id1317295804?k=20&m=1317295804&s=612x612&w=0&h=KJqY_zz6zfulwZ_UpiMbbBHZ1B5lRrijCVz3l9tqJXI=" },
    
//     { "key": 1, "name": "Chicken Birani", "price": 60, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/rFK46BX/Arabic-Mandi.jpg" },
    
//     { "key": 1, "name": "Arabic Mandi", "price": 150, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/28YXG8F/BEACH-GAMES.png" },
    
//     { "key": 1, "name": "BEACH GAMES", "price": 180, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/wspB8wY/Capachino.jpg" },
    
//     { "key": 1, "name": "Capachino", "price": 200, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/zJ6c6ZQ/feature-product.png" },
    
//     { "key": 1, "name": "Maslenitca", "price": 20, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/R0hbjTT/Maslenitca.jpg" },
    
//     { "key": 1, "name": "Moussaka", "price": 50, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/QJtYs2f/Moussaka.jpg" },
    
//     { "key": 1, "name": "Risotto", "price": 250, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/JcW4Tgf/pasta.png" },
    
//     { "key": 1, "name": "Pakistani Chicken Platter", "price": 300, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/LRzHRSb/Risotto.jpg" },
    
//     { "key": 1, "name": "olive oil", "price": 320, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/XSYW5dc/Pakistani-Chicken-Platter.jpg" },
    
//     { "key": 1, "name": "pasta", "price": 420, "discribe": "Fourth of July, patriotic, American themed food. Above view table scene on a white wood background", "img":"https://i.ibb.co/5c5cgcj/olive-oil.png" }
    
// ]






app.get('/users',(req, res)=>{
    res.send(users)
});

app.get('/users/:key',(req, res)=>{
    const key = req.params.key;
    const user = users[key];
    res.send(user)
});

app.listen(port, ()=>{
    console.log("Start Node Server, Port No",port)
});