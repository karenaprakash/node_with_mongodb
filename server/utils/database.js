const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://Prakask:Prakash@cluster0-qih3q.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client =>{
         console.log('Connected!');
         _db = client.db();
         callback(client);
        })
    .catch(err => {
        console.log(err)
        throw err;
    });    
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

module.exports = {
    mongoConnect, 
    getDb
};



/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_demo_one','root','root',{
                                dialect : 'mysql' ,
                                host : 'localhost' 
                            });

module.exports = sequelize;
*/

/*const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node_demo_one',
    password : 'root'
});

module.exports = pool.promise();
*/

