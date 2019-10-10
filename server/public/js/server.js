//import express 
const express = require('express');
//our express app
const app = express();
//use body-parser for parse body of requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));

//mongodb Conection 
const {mongoConnect} = require('../../utils/database');
const User = require('../../models/user');

 /**
 * 
 * Route With Middleware : we can route our pages using node.js 
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
 * Templating Engin End
 * 
 */

/**
 *  
 * Mysql Database 
 * 
 */
    

 /**
 *  
 * Mysql Database End 
 * 
 */

 app.use((req,res,next) => {
     User.findById('5d9f1735326b035ed76ff7b8')
     .then(user => {
         console.log(user._id)
        req.user = new User(user.name,user.email,user.cart,user._id);
        next();
     })
     .catch(err => console.log(err));
    // next();
 })


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

 app.use('/admin' , adminRoutes);
 app.use(shopRoutes);

 /*
   
    const fourOFour = require('../../routes/404');

    app.use(fourOFour);

*/
   
 /**
 *  
 * Routing End 
 * 
 */

 mongoConnect(() => {

    const port = process.env.PORT || 3003;
    app.listen(port,()=>{
        console.log('SERVER IS RUNNING.')
    })
 })

