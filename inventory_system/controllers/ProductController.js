var fetchSql = "SELECT * FROM products";
module.exports = function(app, conn){

  app.get('/addProducts', (req, res) => {
    conn.query(fetchSql, (error, row, fields) => {
      if(error){
        console.log("FETCH QUERY = " + error)
      }else{
        const prod = row.map((r) => {
          console.log("PRODUCT NAME = " + r.product)
          return ( { pID:r.id,
                     prodName: r.product, 
                     quantity: r.quantity, 
                     price: r.price 
                  })
        })
        res.render('master', {
          content:'add_products',
          data: prod
        })
      }
    })
  })

  app.post('/add', (req, res) => {
    var name = req.body.product_name;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var id = req.body.id;
    console.log("VALUE OF ID = " + id);
    if(id == ""){
      var sql = "INSERT INTO products (product, quantity, price) VALUES (?, ?, ?)";
      conn.query(sql, [name, quantity, price], (error, results, fields) => {
        if(error){
          console.log("ADD = " + error)
          res.sendStatus(500)
          return
        }else{
          conn.query(fetchSql, (error, row, fields) => {
            if(error){
              console.log("ADD PRODUCT QUERY" + error)
            }else{
              res.redirect('/addProducts')
            }

          })
        }
      })
    }else{
      var sql = "UPDATE products SET product = ?, quantity = ?, price = ? WHERE id = ?";
      conn.query(sql, [name, quantity, price, id], (error, results, fields) => {
        if(error){
          console.log("EDIT = " + error)
          res.sendStatus(500)
          return
        }else{
            res.redirect('/addProducts')
        }
      })
    }
  })

  app.get('/DeleteProduct/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM products WHERE id = ?";
    conn.query(sql, [id], (error, results, field) => {
      if(error){
        console.log("DELETE PRODUCT = " + error)
      }else{
        conn.query(fetchSql, (error, row, field) => {
          const prod = row.map((r) => {
            return ( { pID:r.id, prodName: r.product, quantity: r.quantity, price: r.price })
          })
            res.redirect('/addProducts')
        })

      }
    })
  })

}
