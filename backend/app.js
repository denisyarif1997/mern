const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');



//middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)



// const Product = require('./models/product');??

//server
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection Is Running');
})
.catch((err)=>{
    console.log(err);
})
app.listen(3000, ()=>{
    console.log(api);
    console.log('server is running on http://localhost:3000');
})