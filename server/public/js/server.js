//import express 
const express = require('express');
//our express app
const app = express();
//use body-parser for parse body of requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));

/**
 * 
 * Middleware Example
 * 
 */

    /*

    app.use((req,res,next) => {
        console.log('in first middleware!');
        next() // Allows the request to continue to the next middleware in the line 
    })

    app.use((req,res,next) => {
        console.log('in second middleware!');
        //we can directly send response in any formate like html,json or etc..
        res.send('Hello World!') // Allows us to send response directly using send().
    })

    */

/**
 * 
 * Middleware Example End 
 * 
 */

 /**
 * 
 * Route With Middleware : we can route our pages using node.js 
 * 
 */

    /*

    //Products page : we have to define '/products' before '/' 
    app.use('/products',(req,res,next)=>{
        res.send('<H1> Product Page </h1>');
    })

    //we can pass our route as first argument in use method 
    app.use('/',(req,res,next)=>{
        res.send('<H1> Home Page </h1>');
    })

    */

 /**
 * 
 * Route With Middleware End
 * 
 */

 /**
 * 
 * Handling Request and Response 
 * 1. res.redirect -> redirect
 * 2. req.body  -> for access request body  use body-parser
 * 3. use get , post , patch , delete and put  insted of use in app.use() 
 * 
 */
    /*

    //Products page : we have to define '/products' before '/' 
    app.get('/add-product',(req,res,next)=>{
        res.send('<form action="/add-product" method="post"><input type="text" name="title" /> <button>Add Product</button></form>');
    })

    app.post('/add-product',(req,res,next)=>{
        //we can not directly access req.body for that we need to use thired party library called body-parser.So,install it using npm install --save body-parser 
        //check line 6 and 7
        console.log(req.body);
        res.redirect('/'); // we can redirect to other routes as well using redirect
    })

    //we can pass our route as first argument in use method 
    app.get('/',(req,res,next)=>{
        res.send('<H1> Home Page </h1>');
    })

    */

 /**
 * 
 * Handling Request and Response End
 * 
 */

 /**
 *  
 * Static Module : static module of express which allows us to access some static folders in our application
 * 
 */

    const path = require('path');
    app.use(express.static(path.join(__dirname,'../../public')));
    console.log(path.join(__dirname,'../../public'))

 /**
 *  
 * Static Module End 
 * 
 */

 /**
 *  
 * Templating Engin : EJS 
 * 
 */
    const views =  path.join(__dirname,'../../views')

    app.set('view engine' , 'ejs');
    app.set('views',views);

 /**
 *  
 * Routing : How to split routing code in multiple files export from that files and import in server.js file ?
 * 1. add routes folder in server 
 * 2. add all routes in routes folder : admin.js, shop.js etc..
 * 3. Filtering using app.use('/admin' , adminRoutes) pass path as first argument so all /admin/ is checking into adminRoutes
 * 4. static module of express which allows us to access some static folders in our application
 * 
 */

    // import Routes from other files 
    const adminRoutes = require('../../routes/admin');
    const shopRoutes = require('../../routes/shop');
    const fourOFour = require('../../routes/404');

    app.use('/admin' , adminRoutes);
    app.use(shopRoutes);
    app.use(fourOFour);

 /**
 *  
 * Routing End 
 * 
 */



const port = process.env.PORT || 3003;
app.listen(port,()=>{
    console.log('SERVER IS RUNNING.')
})