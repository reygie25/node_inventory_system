var errorMsg = { errorMsg: "Invalid Username or Password"};
module.exports = function(router, conn){

  router.get('/', function(req, res){
    res.render('login', { data:null });
  });

  router.post('/login', function(req, res){
    console.log("UNDIFINED")
    session = req.session;
    if(session.uniqueID){
      res.redirect('/redirects');
    }
    const username = req.body.username;
    const password = req.body.password;

    conn.query("SELECT * FROM users WHERE username = '"+username+"' AND password = '"+password+"'", function(error, rows, fields){
      if(error){
        console.log(error);
      }else {
        if(rows.length > 0){
          session.uniqueID = rows[0].id;
          session.username = rows[0].username;
          session.restriction = rows[0].restriction;
            res.redirect('/index');
        }else{
          res.render('login', { data:errorMsg.errorMsg } );
        }
      }
    });
  });

  router.get('/index', function(req, res){
    if(req.session.uniqueID){
      res.render('master', { content: 'home'});
    }else{
      res.redirect('/');
    }
  });

};
