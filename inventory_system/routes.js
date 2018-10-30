const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const sessions = require('express-session');
const dateFormat = require('dateformat');

router.use(sessions({
  secret: 'reygie',
  resave: false,
  saveUninitialized: true
}))

//controllers
const loginController = require('./controllers/LoginController');
const ProductsController = require('./controllers/ProductController');
const SalesController = require('./controllers/SalesController');

//db connection
const conn = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventory_system'
});

router.get('/home', (req, res) => {
  res.render('master', { content:'home'})
})

router.get('/logout', (req, res) => {
  req.session.destroy( (error) => {
    res.redirect('/');
  })
});

//fire controllers
loginController(router, conn);
ProductsController(router, conn);
SalesController(router, conn, dateFormat);

module.exports = router
