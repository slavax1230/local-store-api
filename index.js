const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


const accountsRoute = require('./controllers/accounts');

const store = require('./controllers/store');
const productRoute = require('./controllers/product');



app.use('/api/accounts', accountsRoute);
app.use('/api/store', store);
app.use('/api/product', productRoute);

const port = 5090;

const url = 'mongodb+srv://admin:admin@cluster0.vbq4k.mongodb.net/local_store_db?retryWrites=true&w=majority'
mongoose.connect(url)
    .then(results =>{
    console.log(results);
    app.listen(port, function(){
        console.log(`Server is running via port ${port}`);
    })
})
.catch( err =>{
    console.log(err);
})