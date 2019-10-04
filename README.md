1. npm init
2. npm install --save express
3. create server/server.js
4. changes in package.js

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server/server.js",
        "backend": "nodemon server/server.js",
        "dev": "npm run backend"
    }

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
    



