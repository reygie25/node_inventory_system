const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbname = 'inventory_system';

const session = null;
const app = express();
const router = require('./routes.js')

app.use(morgan('short'))

app.use(bodyParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(router)

//setup template engine
app.set('view engine', 'ejs');


//static Files/ import user files
app.use(express.static('./public'));

app.listen(4000, function(){
  console.log('Listening at port 4000');
});
