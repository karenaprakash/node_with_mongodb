1. npm init
2. npm install 
3. changes in package.js

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server/public/js/server.js",
    "backend": "nodemon server/public/js/server.js",
    "dev": "npm run backend"
  }

4. npm run backend 
5. server/server.js

//import express 
const express = require('express');
//our express app
const app = express();
//all logic 
const port = process.env.PORT || 3003;
app.listen(port,()=>{
    console.log('SERVER IS RUNNING.')
})

6. Middlewares :  request :-> middleware (req,res,next) => {...} ---(next())---> other middleware (req,res,next)  => {...}  ---(res.send())--> response 
    app.use(); : allows us to use other middleware functions like bodyParser,cookieParser,etc,...

7. Routing : ROUTES folder
                const route = express.Router();
                modul.export = router;

8. Handling Requests and Responses : get,post,put,patch,delete 

9. Create html VIEWS and serve them as per request 
    //example 
    const path = require('path');
    const rootDir = require('../utils/path'); // path.dirname(process.mainModule.filename); it gives main directory name 
    const shopHtml = path.join(rootDir,'views','shop.html');
    res.sendFile(shopHtml);

10. Styling to html in node.js 

11. static module : to give permissions for accessing css,images,etc....

    const path = require('path');
    app.use(express.static(path.join(__dirname,'public')));

12. Rendering dynamic content in our views with array 
    const products = []
    products.push({ title : req.body.title })        

    module.exports = {
        router,
        products
    }


13. Templating engine : pug , handlebar , ejs , etc....
    npm install --save ejs 

    13.1 create ejs views 
    13.2 use in project using express 


14. MVC architecture 

15. store data into file and fetch data from the file 
    

16. store data into mysql database 

    npm install --save mysql2

    create database.js file in utils folder
============
    const mysql = require('mysql2');

    const pool = mysql.createPool({
        host : 'localhost',
        user : 'root',
        database : 'node-demo-one',
        password : 'root'
    });

    module.exports = pool.promise();
============
17. USE DATABASE IN SERVER 

    1.  mysql -u root -p
    2. use node_demo_one
    3. create table products(id int NOT NUll AUTO_INCREMENT, name VARCHAR(200), imageUrl VARCHAR(250) ,price DOUBLE NOT NULL, description TEXT NOT NULL, PRIMARY KEY('id') );
    4. INSERT INTO products ( id , imageUrl , price , description , name ) VALUES (1,"https://bit.ly/2OxLNLN",5,'this is first product.','Shirt');
    5.  //example to fetch all products from database 
        db.execute('SELECT * FROM products;')
        .then( result => {
            console.log(result[0])
        })
        .catch( err => {
            console.log(err)
        }); 

=============

18. Sequelize : the Object Relational Mapping Library 

npm install --save sequelize

Create sequelize object;

add sequelize to server.js 

  1. Association : relations between tables 