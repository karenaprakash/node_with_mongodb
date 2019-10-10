//import express 
const express = require('express');
//our express app
const app = express();
//use body-parser for parse body of requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));

//mysql database 
const sequelize = require('../../utils/database');

//our models 
const Product = require('../../models/product');
const User = require('../../models/user');
const Cart = require('../../models/cart');
const CartItem = require('../../models/cart_item');
const Order = require('../../models/order');
const OrderItem = require('../../models/order_item');

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

//middleware for accessing user data globelly so we can create products associates with this user.

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user => {
        console.log(user)
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
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
    const fourOFour = require('../../routes/404');

    app.use('/admin' , adminRoutes);
    app.use(shopRoutes);
    app.use(fourOFour);

 /**
 *  
 * Routing End 
 * 
 */

Product.belongsTo(User,{constrints: true,onDelete : 'CASCADE'});
User.hasMany(Product); 
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{ through: CartItem });
Product.belongsToMany(Cart,{ through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product , { through : OrderItem });



sequelize
.sync()
//.sync({force:true})
.then( result => {
    return User.findByPk(1);
})
.then( user => {
    if(!user){
       return User.create({name: 'Prakash' , email : 'karenaprakash14@gmail.com'});
    }
    return user;
})
.then(user => {
   // console.log(user);
   //console.log(result)
   return user.createCart();
})
.then(cart => {
    const port = process.env.PORT || 3003;
   app.listen(port,()=>{
       console.log('SERVER IS RUNNING.')
   })
})
.catch( err => {
    console.log(err)   
});

