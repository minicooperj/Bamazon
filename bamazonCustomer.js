//  npm install mysql
var mysql = require('mysql');
var Table = require('easy-table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,


	// Your username

	user: "root",

	// Your password

	password:"Coopp758702",
	database: "Bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("Connected as id " + connection.threadId);
});

// Show items for sale

connection.query('SELECT * FROM products', function(err,res){
if (err) throw err;

console.log(Table.print(res));

}); //close connection.query


//Launch inquirer and prompts
var prompts = function() {
inquirer.prompt([
{
	type: 'rawlist',
	name: 'ProdID',
	message: 'What product ID do you want to purchase?',
	choices: ['1','2','3','4','5','6','7','8','9']
},
{ type: 'input',
	name: 'Quantity',
	message:'How many of these do you want to buy?',
	validate: function(value) {
		var pass = value.match(/^\+?[1-9]\d*$/);
		if (pass) {
			return true;
		}

		return "Please enter a valid Quantity";
	} //close validate
}
]).then(function(answers){
	console.log(JSON.stringify(answers,null, ' '));
	connection.query('SELECT * FROM products WHERE item_id =? ',[answers.ProdID], function(err, res){
		console.log(res[0].stock_quantity);
		if (err) throw err;

		// if Quantity is not enough to complete purchase request
		if (res[0].stock_quantity < answers.Quantity) {
					console.log("Not enough of the item in stock! There are only " + res[0].stock_quantity + " left.");
					connection.end();

					} else if (res[0].stock_quantity >= answers.Quantity) {
						console.log( '-----');
						console.log(answers.Quantity + " item purchased");

						// Calculate total price for purchased
						var salesPrice = res[0].price * answers.Quantity;
						console.log("The total price of your purchase is " + salesPrice);


					// Update to stock_quantity
					var newStock = res[0].stock_quantity - answers.Quantity;
					console.log('New Stock: ' + newStock);
					connection.query('UPDATE products SET stock_quantity=? WHERE item_id=? ',[newStock,answers.ProdID], function(err,res){
						if (err) throw err;
						console.log("Order has been processed. Thank you!");

					// end connection
					connection.end();

					})// close connection query

					}
	}); // close connection query


}) // close then function

}; // close prompts


// connection.query('SELECT * FROM products WHERE item_id =? ',[answers.ProdID], function(err, res){
// 	console.log(res);
// 	if (err) throw err;
//
// 	// if Quantity is not enough to complete purchase request
// 	// if(res[0])
// })});
prompts();

// show all songs
// connection.query('SELECT * FROM ice_cream', function(err, res){
// 	if (err) throw err;
// 	for(i=0; i<res.length;i++){
// 		console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
// 		};
// 	console.log("------------------------------");
// });

// Select all from genre column
// connection.query('SELECT * FROM products WHERE genre =? ',["Punk Rock"], function(err, res){
// 	if (err) throw err;
// 	for(i=0; i<res.length;i++){
// 		console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
// 		};
// });


// CRUD
// CREATE

// connection.query('INSERT INTO ice_cream SET ?',{
// 		title: "Alternative Ulster",
// 		artist:"Stiff Little FIngers",
// 		genre: "Punk Rock"
// }, function(err, res){
// 	console.log('response',res);
// });
//
//
// // UPDATE
// connection.query('UPDATE ice_cream SET ? WHERE ?', [{genre: 'punk rock'},{genre:"Punk Rock"}],
// 	function(err, res){
// 		console.log('response', res);
// });
//
//
// // DELETE
// connection.query('DELETE FROM ice_cream WHERE ?',{artist: "Stiff Little Fingers"},
// 	function(err, res){
// 		console.log('response',res);
// });
//
// //READ
// connection.query('SELECT * FROM ice_cream', function(err, res){
// 	if (err) throw err;
// 	for(i=0; i<res.length;i++){
// 		console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
// 		};
// 	console.log("------------------------------");
// });
