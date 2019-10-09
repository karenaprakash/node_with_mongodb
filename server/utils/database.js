const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_demo_one','root','root',{
                                dialect : 'mysql' ,
                                host : 'localhost' 
                            });

module.exports = sequelize;




/*const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node_demo_one',
    password : 'root'
});

module.exports = pool.promise();
*/

