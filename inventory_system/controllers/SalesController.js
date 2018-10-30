var fetchSQL = "SELECT * FROM sales"
module.exports = function(app, conn, dp){
	app.get('/sales', (req, res)=>{
		conn.query(fetchSQL, (error, row, fields) => {
			if(error){
				console.log("FETCH SALES = " + error)
			}else{
				const sales = row.map((r) => {
					var date = dp(r.date_purchase, "yyyy-mm-dd h:MM:ss")
					return ({
						id:r.id,
						p_name:r.product_name,
						quantity:r.quantity,
						dp:date
					})
				})
				res.render('master', {
							content:'sales',
							data: sales
						})

			
			}
		})
	})

	app.post('/api/insert-sales', (req, res) => {
		var prod = req.body.product_name;
		var quantity = req.body.quantity;
		var insertQuery = "INSERT INTO sales (product_name, quantity, date_purchase) VALUES (?, ?, NOW())";

		conn.query(insertQuery, [prod, quantity], (error, row, fields) => {
			if(error){
				console.log("API INSERT SALES = " + error)
			}else{
				var o = {
					success:true,
					msg:"Successfully added!"
				};

				res.send(JSON.stringify(o))
			}
		})
	})

	app.post('/api/sales', (req, res) => {
		conn.query(fetchSQL, (error, row, fields) => {
			if(error){
				console.log("API SALES FETCH ERROR = " + error)
			}else{
				var o = {};
				var key = "products";
				o[key] = [];

				const sales = row.map((r) => {
					return ({
						id:r.id,
						p_name:r.product_name,
						quantity:r.quantity,
						date_purchase:r.date_purchase
					})
				})

				for(var i = 0; i < sales.length; i++){
					var data = {
						product_name:sales[i].p_name,
						quantity:sales[i].quantity,
						date_purchased:sales[i].date_purchase
					}
					o[key].push(data)
				}

				res.send(JSON.stringify(o));

			}
		})

	
	})

}